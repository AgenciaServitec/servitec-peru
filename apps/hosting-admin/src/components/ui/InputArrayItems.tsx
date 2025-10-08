import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Button, Input, Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export type EditableItem = {
  description: string;
  units: number;
  unitPrice: number;
};

type InputArrayItemsProps = {
  name: string;
  title?: string;
  showTotal?: boolean;
  columnsLabels?: {
    description?: string;
    units?: string;
    unitPrice?: string;
    total?: string;
  };
};

export const InputArrayItems: React.FC<InputArrayItemsProps> = ({
  name,
  title = 'Ítems',
  showTotal = true,
  columnsLabels = {
    description: 'Descripción',
    units: 'Unidades',
    unitPrice: 'Precio Unitario',
    total: 'Total',
  },
}) => {
  // lanza si no hay contexto: obliga a usar FormProvider en el padre
  const methods = useFormContext();
  if (!methods) {
    throw new Error(
      'InputArrayItems debe renderizarse dentro de un FormProvider (useForm) del formulario padre.'
    );
  }

  return (
    <InputArrayItemsInner
      name={name}
      title={title}
      showTotal={showTotal}
      columnsLabels={columnsLabels}
    />
  );
};

const InputArrayItemsInner: React.FC<InputArrayItemsProps> = ({
  name,
  title,
  showTotal,
  columnsLabels,
}) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });
  const values = watch(name) || [];

  const columns: any[] = [
    {
      title: columnsLabels?.description,
      dataIndex: 'description',
      render: (_: any, __: any, index: number) => (
        <Controller
          name={`${name}.${index}.description`}
          control={control}
          defaultValue={fields[index]?.description ?? ''}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Descripción"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value)}
              style={{ border: 'none', backgroundColor: 'transparent' }}
            />
          )}
        />
      ),
    },
    {
      title: columnsLabels?.units,
      dataIndex: 'units',
      width: 120,
      render: (_: any, __: any, index: number) => (
        <Controller
          name={`${name}.${index}.units`}
          control={control}
          defaultValue={fields[index]?.units ?? 1}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={1}
              placeholder="0"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                textAlign: 'center',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            />
          )}
        />
      ),
    },
    {
      title: columnsLabels?.unitPrice,
      dataIndex: 'unitPrice',
      width: 160,
      render: (_: any, __: any, index: number) => (
        <Controller
          name={`${name}.${index}.unitPrice`}
          control={control}
          defaultValue={fields[index]?.unitPrice ?? 0}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step="0.01"
              placeholder="S/."
              value={field.value ?? ''}
              onChange={(e) => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
              style={{
                textAlign: 'center',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            />
          )}
        />
      ),
    },
  ];

  if (showTotal) {
    columns.push({
      title: columnsLabels?.total,
      width: 120,
      align: 'center',
      render: (_: any, __: any, index: number) => {
        const item = values[index] ?? {};
        const total = (Number(item?.units) || 0) * (Number(item?.unitPrice) || 0);
        return <span>S/ {total.toFixed(2)}</span>;
      },
    });
  }

  columns.push({
    title: 'Acciones',
    width: 80,
    align: 'center',
    render: (_: any, __: any, index: number) => (
      <Button
        danger
        type="text"
        onClick={() => remove(index)}
        icon={<FontAwesomeIcon icon={faTrash} />}
      />
    ),
  });

  return (
    <div style={{ marginTop: 16 }}>
      <h3 className="font-semibold mb-2">{title}</h3>

      <Table
        dataSource={fields}
        columns={columns}
        pagination={false}
        rowKey="id"
        bordered
        size="small"
      />

      <div style={{ marginTop: 8, textAlign: 'center' }}>
        <Button
          type="dashed"
          icon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => append({ description: '', units: 1, unitPrice: 0 })}
        >
          Agregar ítem
        </Button>
      </div>

      {showTotal && values.length > 0 && (
        <div style={{ textAlign: 'right', marginTop: 8, fontWeight: 'bold' }}>
          Total general: S/{' '}
          {values
            .reduce(
              (acc: number, item: EditableItem) =>
                acc + (Number(item.units) || 0) * (Number(item.unitPrice) || 0),
              0
            )
            .toFixed(2)}
        </div>
      )}
    </div>
  );
};
