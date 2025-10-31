import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Button, Col, IconAction, Input, Row, Space, TextArea } from "../ui";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export const QuotationItemsTable = ({ name = "items", control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <h6 style={{ textAlign: "center" }}>Descripción</h6>
          </Col>
          <Col span={4}>
            <h6 style={{ textAlign: "center" }}>Unidades(mts)</h6>
          </Col>
          <Col span={4}>
            <h6 style={{ textAlign: "center" }}>Precio Unitario</h6>
          </Col>
          <Col span={4}>
            <h6 style={{ textAlign: "center" }}>Subtotal</h6>
          </Col>
          <Col span={4}>
            <h6 style={{ textAlign: "center" }}>Opciones</h6>
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
          <Button
            size="large"
            onClick={() =>
              append({
                description: "",
                quantity: 1,
                unitPrice: 0,
                subTotal: 0,
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Agregar ítem</span>
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

const QuotationItemRow = ({ name, index, control, errors, onRemove }) => {
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
    const subTotal = (quantity || 0) * (unitPrice || 0);
    control._formValues[name][index].subTotal = subTotal;
  }, [quantity, unitPrice, control, name, index]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={8}>
        <Controller
          name={`${name}.${index}.description`}
          control={control}
          render={({ field: { onChange, value, name: fieldName } }) => (
            <TextArea
              label="Descripción"
              name={fieldName}
              value={value}
              rows={4}
              onChange={onChange}
              error={errors?.[name]?.[index]?.description?.message}
              required={true}
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
              value={value || ""}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : "")
              }
              error={errors?.[name]?.[index]?.quantity?.message}
              required={true}
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
              value={value || ""}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : "")
              }
              error={errors?.[name]?.[index]?.unitPrice?.message}
              required={true}
              placeholder="S/ 0.00"
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
              value={value || 0}
              disabled={true}
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
              onClick={() => ""}
              size={33}
              icon={faEdit}
              iconStyles={{
                color: () => theme.colors.warning,
              }}
            />
            <IconAction
              tooltipTitle="Eliminar"
              onClick={onRemove}
              size={33}
              icon={faTrash}
              iconStyles={{
                color: () => theme.colors.error,
              }}
            />
          </Space>
        </Row>
      </Col>
    </Row>
  );
};
