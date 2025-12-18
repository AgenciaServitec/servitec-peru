import React, { useEffect } from "react";
import {
  type Control,
  Controller,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import {
  Button,
  Col,
  IconAction,
  Input,
  RichTextEditor,
  Row,
  Space,
} from "../ui";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

interface QuotationItemsTableProps {
  name?: string;
  control: Control<any>;
  errors?: any;
}

interface QuotationItemRowProps {
  name: string;
  index: number;
  control: Control<any>;
  errors?: any;
  onRemove: () => void;
}

export const QuotationItemsTable: React.FC<QuotationItemsTableProps> = ({
  name = "items",
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAddItem = () => {
    append({
      description: "",
      quantity: 1,
      unitPrice: 0,
      subTotal: 0,
    });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <HeaderCell>Descripción</HeaderCell>
          </Col>
          <Col span={4}>
            <HeaderCell>Unidades (mts)</HeaderCell>
          </Col>
          <Col span={4}>
            <HeaderCell>Precio unitario</HeaderCell>
          </Col>
          <Col span={4}>
            <HeaderCell>Subtotal</HeaderCell>
          </Col>
          <Col span={4}>
            <HeaderCell>Opciones</HeaderCell>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        {fields.map((field, index) => (
          <QuotationItemRow
            key={field.id}
            name={name}
            index={index}
            control={control}
            errors={errors}
            onRemove={() => remove(index)}
          />
        ))}
      </Col>

      <Col span={24}>
        <Row justify="center" gutter={[16, 16]}>
          <Button size="large" onClick={handleAddItem}>
            <Space size="small">
              <FontAwesomeIcon icon={faPlus} />
              <span>Agregar ítem</span>
            </Space>
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

const QuotationItemRow: React.FC<QuotationItemRowProps> = ({
  name,
  index,
  control,
  errors,
  onRemove,
}) => {
  const quantity = useWatch({
    control,
    name: `${name}.${index}.quantity`,
    defaultValue: 0,
  });

  const unitPrice = useWatch({
    control,
    name: `${name}.${index}.unitPrice`,
    defaultValue: 0,
  });

  // Nota: aquí se sigue usando la mutación directa, como en tu código original.
  // Si luego quieres, lo cambiamos a setValue pasando setValue como prop.
  useEffect(() => {
    const subTotal = (quantity || 0) * (unitPrice || 0);
    if (control?._formValues?.[name]?.[index]) {
      control._formValues[name][index].subTotal = subTotal;
    }
  }, [quantity, unitPrice, control, name, index]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={8}>
        <Controller
          name={`${name}.${index}.description`}
          control={control}
          render={({ field: { onChange, value, name: fieldName } }) => (
            <RichTextEditor
              label="Descripción"
              name={fieldName}
              value={value || ""}
              onChange={onChange}
              height="150px"
              error={errors?.[name]?.[index]?.description?.message}
              required
            />
          )}
        />
      </Col>

      <Col span={24} md={4}>
        <Controller
          name={`${name}.${index}.quantity`}
          control={control}
          render={({ field: { onChange, value, name: fieldName } }) => (
            <Input
              label="Unidades"
              name={fieldName}
              type="number"
              value={value ?? ""}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : "")
              }
              error={errors?.[name]?.[index]?.quantity?.message}
              required
              min={1}
            />
          )}
        />
      </Col>

      <Col span={24} md={4}>
        <Controller
          name={`${name}.${index}.unitPrice`}
          control={control}
          render={({ field: { onChange, value, name: fieldName } }) => (
            <Input
              label="Precio unitario"
              name={fieldName}
              type="number"
              step="0.01"
              value={value ?? ""}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : "")
              }
              error={errors?.[name]?.[index]?.unitPrice?.message}
              required
            />
          )}
        />
      </Col>

      <Col span={24} md={4}>
        <Controller
          name={`${name}.${index}.subTotal`}
          control={control}
          render={({ field: { value, name: fieldName } }) => (
            <Input
              label="Subtotal"
              name={fieldName}
              type="number"
              step="0.01"
              value={value ?? 0}
              disabled
              placeholder="S/ 0.00"
            />
          )}
        />
      </Col>

      <Col span={24} md={4}>
        <Row justify="center" gutter={[16, 16]}>
          <Space>
            <IconAction
              tooltipTitle="Editar"
              onClick={() => null}
              size={33}
              icon={faEdit}
              iconStyles={{
                color: (theme) => theme.colors.warning,
              }}
            />
            <IconAction
              tooltipTitle="Eliminar"
              onClick={onRemove}
              size={33}
              icon={faTrash}
              iconStyles={{
                color: (theme) => theme.colors.error,
              }}
            />
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

const HeaderCell = styled.h6`
  ${({ theme }) => css`
    text-align: center;
    margin: 0;
    font-size: ${theme.font_sizes.small};
    font-weight: ${theme.font_weight.medium};
    color: ${theme.colors.fontSecondary};
  `}
`;
