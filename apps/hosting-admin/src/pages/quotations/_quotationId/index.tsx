import { useDefaultFirestoreProps, useFormUtils } from '../../../hooks';
import type { InferType } from 'yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Quotation } from '../../../globalTypes';
import { addQuotation, fetchQuotation, updateQuotation } from '../../../firebase/collections';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Col, Form, Input, notification, Row, TextArea } from '../../../components/ui';
import { Select } from '../../../components/ui/Select.tsx';
import { isEmpty } from 'lodash';
import { Spinner } from '../../../components/ui/Spinner.tsx';
import { createEmptyQuotation } from '../../../factories';

const quotationSchema = yup.object({
  client: yup.object({
    firstName: yup.string().notRequired(),
    paternalSurname: yup.string().notRequired(),
    maternalSurname: yup.string().notRequired(),
    companyName: yup.string().notRequired(),
    document: yup.object({
      type: yup.string().required(),
      number: yup.string().required(),
    }),
    phoneNumber: yup.string().required(),
  }),
  device: yup.object({
    problemDescription: yup.string().required(),
    type: yup.string().required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    color: yup.string().required(),
  }),
  analysis: yup.string().required(),
  solutions: yup.string().required(),
  recommendations: yup.string().required(),
  serialNumber: yup.string().required(),
  description: yup.string().required(),
  units: yup.number().required(),
  unitPrices: yup.number().required(),
});

type QuotationFormData = InferType<typeof quotationSchema>;

interface QuotationFormProps {
  quotation: Quotation | null;
  isNew: boolean;
  onSubmitQuotation: (formData: QuotationFormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export function QuotationIntegration() {
  const navigate = useNavigate();
  const { quotationId } = useParams<{ quotationId: string }>();

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(false);

  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const isNew = quotationId === 'new';

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => {
      try {
        if (isNew) {
          setQuotation(createEmptyQuotation());
        } else if (quotationId) {
          const _quotation = await fetchQuotation(quotationId);
          if (!_quotation) {
            notification({
              type: 'error',
              description: 'Cotización no encontrada',
            });
            navigate(-1);
            return;
          }
          setQuotation(_quotation as Quotation);
        }
      } catch (error) {
        console.error('Error al cargar cotización:', error);
        notification({
          type: 'error',
          description: 'Error al cargar la cotización',
        });
        navigate(-1);
      } finally {
        setLoading(false);
      }
    })();
  }, [quotationId, isNew, navigate]);

  const mapQuotation = (formData: QuotationFormData, quotation: Quotation): Quotation => ({
    id: quotation.id,
    client: {
      firstName: formData.client.firstName,
      paternalSurname: formData.client.paternalSurname,
      maternalSurname: formData.client.maternalSurname,
      companyName: formData.client.companyName,
      document: {
        type: formData.client.document.type,
        number: formData.client.document.number,
      },
      phone: {
        prefix: '+51',
        number: formData.client.phoneNumber,
      },
    },
    device: {
      problemDescription: formData.device.problemDescription,
      type: formData.device.type,
      brand: formData.device.brand,
      model: formData.device.model,
      color: formData.device.color,
    },
    analysis: formData.analysis,
    solutions: formData.solutions,
    recommendations: formData.solutions,
    serialNumber: formData.serialNumber,
    description: formData.description,
    units: formData.units,
    unitPrices: formData.unitPrices,
  });

  const onSubmitQuotation = async (formData: QuotationFormData) => {
    if (isEmpty(quotation)) return;

    try {
      setLoading(true);

      if (isNew) {
        await addQuotation(assignCreateProps<Quotation>(mapQuotation(formData, quotation)));
        notification({
          type: 'success',
          description: 'Cotización creada con éxito',
        });
      } else {
        await updateQuotation(quotation.id, assignUpdateProps(mapQuotation(formData, quotation)));
        notification({
          type: 'success',
          description: 'Cotización actualizada con éxito',
        });
      }

      onGoBack();
    } catch (e) {
      console.error(e);
      notification({
        type: 'error',
        description: `Ocurrió un error al ${isNew ? 'guardar' : 'actualizar'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isEmpty(quotation)) <Spinner height="80vh" />;

  return (
    <div className="w-full py-10 px-4 md:px-10 lg:px-20">
      <QuotationForm
        quotation={quotation}
        isNew={isNew}
        onSubmitQuotation={onSubmitQuotation}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
}

const QuotationForm = ({
  quotation,
  isNew,
  onSubmitQuotation,
  onCancel,
  loading,
}: QuotationFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<QuotationFormData>({
    resolver: yupResolver(quotationSchema),
  });

  const resetForm = () => {
    reset({
      client: {
        firstName: quotation?.client?.firstName || '',
        paternalSurname: quotation?.client?.paternalSurname || '',
        maternalSurname: quotation?.client?.maternalSurname || '',
        companyName: quotation?.client?.companyName || '',
        document: {
          type: quotation?.client?.document?.type || '',
          number: quotation?.client?.document?.number || '',
        },
        phoneNumber: quotation?.client?.phone.number || '',
      },
      device: {
        problemDescription: quotation?.device?.problemDescription || '',
        type: quotation?.device?.type || '',
        brand: quotation?.device?.brand || '',
        model: quotation?.device?.model || '',
        color: quotation?.device?.color || '',
      },
      analysis: quotation?.analysis || '',
      solutions: quotation?.solutions || '',
      recommendations: quotation?.recommendations || '',
      serialNumber: quotation?.serialNumber || '',
      description: quotation?.description || '',
      units: quotation?.units || 0,
      unitPrices: quotation?.unitPrices || 0,
    });
  };

  useEffect(() => {
    resetForm();
  }, [quotation]);

  const { required, error } = useFormUtils({ errors, schema: quotationSchema });

  const handleFormSubmit: SubmitHandler<QuotationFormData> = (formData) => {
    onSubmitQuotation(formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h2>{isNew ? 'Nueva Cotización' : 'Editar Cotización'}</h2>
          </Col>
          <Col span={24}>
            <h3 className="font-semibold mb-2">Datos del Cliente</h3>
          </Col>
          <Col span={8}>
            <Controller
              name="client.firstName"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Nombre"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="client.paternalSurname"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Apellido Paterno"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={8}>
            <Controller
              name="client.maternalSurname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Apellido Materno"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="client.companyName"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Razón Social"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="client.document.type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Tipo de Documento"
                  options={[
                    { label: 'DNI', value: 'dni' },
                    { label: 'Carnet de Extranjería', value: 'foreigner_card' },
                    { label: 'RUC', value: 'ruc' },
                  ]}
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>

          <Col span={6}>
            <Controller
              name="client.document.number"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Número Documento"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="client.phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Teléfono"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <h3 className="font-semibold mb-2">Datos del Dispositivo</h3>
          </Col>
          <Col span={24}>
            <Controller
              name="device.problemDescription"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Problema Presentado"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="device.type"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Tipo"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="device.brand"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Marca"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="device.model"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Modelo"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={6}>
            <Controller
              name="device.color"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Color"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>

          <Col span={24}>
            <Controller
              name="analysis"
              control={control}
              render={({ field }) => <TextArea {...field} placeholder="Análisis" rows={3} />}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="solutions"
              control={control}
              render={({ field }) => <TextArea {...field} placeholder="Soluciones" rows={3} />}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="recommendations"
              control={control}
              render={({ field }) => <TextArea {...field} placeholder="Recomendaciones" rows={3} />}
            />
          </Col>

          <Col span={12}>
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Número de Serie"
                  error={error(field.name)}
                  required={required(field.name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <h3 className="font-semibold mb-2">Cotizacion</h3>
          </Col>
          <Col span={24}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextArea {...field} placeholder="Descripcion" rows={3} />}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="units"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Unidades"
                  name={name}
                  value={value}
                  type="number"
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="unitPrices"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Precio Unitarios"
                  name={name}
                  value={value}
                  type="number"
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Row
              justify="end"
              gutter={[16, 16]}
              style={{ marginTop: 24, borderTop: '1px solid #f0f0f0', paddingTop: 24 }}
            >
              <Col xs={24} sm={6} md={4}>
                <Button
                  type="default"
                  size="large"
                  block
                  onClick={() => !loading && onCancel()}
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </Col>
              <Col xs={24} sm={6} md={4}>
                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {isNew ? 'Crear Cotización' : 'Guardar Cambios'}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};
