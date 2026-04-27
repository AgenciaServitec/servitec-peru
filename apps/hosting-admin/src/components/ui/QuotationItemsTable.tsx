import React, { useEffect } from "react";
import {
  type Control,
  Controller,
  useFieldArray,
  type UseFormSetValue,
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
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface QuotationItemsTableProps {
  name?: string;
  control: Control<any>;
  errors?: any;
  setValue: UseFormSetValue<any>;
}

interface QuotationItemRowProps {
  name: string;
  index: number;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  errors?: any;
  onRemove: () => void;
}

export const QuotationItemsTable: React.FC<QuotationItemsTableProps> = ({
  name = "items",
  control,
  errors,
  setValue,
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
        {fields.map((field, index) => (
          <QuotationItemRow
            key={field.id}
            name={name}
            setValue={setValue}
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
  setValue,
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

  useEffect(() => {
    const q = Number(quantity) || 0;
    const p = Number(unitPrice) || 0;
    const total = parseFloat((q * p).toFixed(2));

    setValue(`${name}.${index}.subTotal`, total, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [quantity, unitPrice, index, name, setValue]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={8}>
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

      <Col span={24} lg={4}>
        <Controller
          name={`${name}.${index}.quantity`}
          control={control}
          render={({ field: { onChange, value, name: fieldName } }) => (
            <div style={{ marginTop: "1.5rem" }}>
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
            </div>
          )}
        />
      </Col>

      <Col span={24} lg={4}>
        <Controller
          name={`${name}.${index}.unitPrice`}
          control={control}
          render={({ field: { onChange, value, name: fieldName } }) => (
            <div style={{ marginTop: "1.5rem" }}>
              <Input
                label="Precio unitario"
                name={fieldName}
                type="number"
                step="0.01"
                value={value ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  onChange(val === "" ? 0 : Number(val));
                }}
                error={errors?.[name]?.[index]?.unitPrice?.message}
                required
              />
            </div>
          )}
        />
      </Col>

      <Col span={24} lg={4}>
        <Controller
          name={`${name}.${index}.subTotal`}
          control={control}
          render={({ field: { value, name: fieldName } }) => (
            <div style={{ marginTop: "1.5rem" }}>
              <Input
                label="Subtotal"
                name={fieldName}
                type="number"
                step="0.01"
                value={value ?? 0}
                disabled
                placeholder="S/ 0.00"
              />
            </div>
          )}
        />
      </Col>

      <Col span={24} lg={4}>
        <div style={{ marginTop: "1.5rem" }}>
          <Space align="center">
            <IconAction
              tooltipTitle="Eliminar"
              onClick={onRemove}
              icon={faXmark}
              iconStyles={{
                color: (theme) => theme.colors.error,
              }}
            />
          </Space>
        </div>
      </Col>
    </Row>
  );
};
