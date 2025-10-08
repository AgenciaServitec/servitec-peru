import { useDefaultFirestoreProps, useFormUtils } from '../../../hooks';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import type { Quotation } from '../../../globalTypes';
import {
  addQuotation,
  fetchQuotation,
  getQuotationId,
  updateQuotation,
} from '../../../firebase/collections';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  Row,
  Col,
  Form,
  Input,
  TextArea,
  Button,
  notification,
  InputArrayItems,
} from '../../../components/ui';
import { Select } from '../../../components/ui/Select'; // sin extensión .tsx

export function QuotationIntegration() {
  const navigate = useNavigate();
  const { quotationId } = useParams<{ quotationId: string }>();
  const isNew = quotationId === 'new';
  const [initialData, setInitialData] = useState<Quotation | null>(null);

  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const saveQuotation = async (data: Quotation, _isNew: boolean) => {
    if (_isNew) {
      await addQuotation(assignCreateProps(data));
      notification({ type: 'success', description: 'Cotización creada con éxito' });
    } else {
      if (!data.id) throw new Error('ID de cotización faltante para actualizar');
      await updateQuotation(data.id, assignUpdateProps(data));
      notification({ type: 'success', description: 'Cotización actualizada con éxito' });
    }
  };

  useEffect(() => {
    (async () => {
      if (isNew) {
        setInitialData({
          id: getQuotationId(),
          client: {
            firstName: '',
            paternalSurname: '',
            maternalSurname: '',
            companyName: '',
            document: { type: '', number: '' },
            phone: '',
          },
          device: { problemDescription: '', type: '', brand: '', model: '', color: '' },
          analysis: '',
          solutionsRecommendations: '',
          serialNumber: '',
          items: [
            {
              description: '',
              units: 1,
              unitPrice: 0,
            },
          ],
        } as Quotation);
      } else if (quotationId) {
        const fetched = await fetchQuotation(quotationId);
        if (!fetched) return navigate(-1);
        setInitialData(fetched as Quotation);
      }
    })();
  }, [quotationId, isNew, navigate]);

  if (!initialData) {
    return <div className="text-center text-muted-foreground py-20">Cargando...</div>;
  }

  return (
    <div className="w-full py-10 px-4 md:px-10 lg:px-20">
      <QuotationForm
        isNew={isNew}
        saveQuotation={saveQuotation}
        defaultValues={initialData}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
}

interface QuotationFormProps {
  isNew: boolean;
  defaultValues: Quotation;
  onCancel: () => void;
  saveQuotation: (data: Quotation, isNew: boolean) => Promise<void>;
}

const QuotationForm: React.FC<QuotationFormProps> = ({
  isNew,
  defaultValues,
  onCancel,
  saveQuotation,
}) => {
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
      phone: yup.string().required(),
    }),
    device: yup.object({
      problemDescription: yup.string().required(),
      type: yup.string().required(),
      brand: yup.string().required(),
      model: yup.string().required(),
      color: yup.string().required(),
    }),
    analysis: yup.string().required(),
    solutionsRecommendations: yup.string().required(),
    serialNumber: yup.string().required(),
    items: yup
      .array()
      .of(
        yup.object({
          description: yup.string().required('La descripción es obligatoria'),
          units: yup.number().required().min(1),
          unitPrice: yup.number().required().min(0),
        })
      )
      .required()
      .min(1, 'Debe agregar al menos un ítem'),
  });

  const methods = useForm<Quotation>({
    resolver: yupResolver(quotationSchema),
    defaultValues,
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = methods;

  const navigate = useNavigate();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { required, error } = useFormUtils({ errors, schema: quotationSchema });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmit = async (data: Quotation) => {
    setIsSaving(true);
    try {
      await saveQuotation(data, isNew);
      navigate(-1);
    } catch (err) {
      console.error('Error al guardar cotización:', err);
      notification({ type: 'error', description: 'Ocurrió un error al guardar la cotización.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nombre"
                    error={error(field.name)}
                    required={required(field.name)}
                  />
                )}
              />
            </Col>
            <Col span={8}>
              <Controller
                name="client.paternalSurname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Apellido Paterno"
                    error={error(field.name)}
                    required={required(field.name)}
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
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Razón Social"
                    error={error(field.name)}
                    required={required(field.name)}
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
                name="client.phone"
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
            <Col span={12}>
              <Controller
                name="device.problemDescription"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Problema que Presenta"
                    error={error(field.name)}
                    required={required(field.name)}
                  />
                )}
              />
            </Col>
            <Col span={12}>
              <Controller
                name="device.type"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Equipo o Dispositivo a Reparar"
                    error={error(field.name)}
                    required={required(field.name)}
                  />
                )}
              />
            </Col>
            <Col span={6}>
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
                render={({ field }) => <TextArea {...field} label="Análisis" rows={3} />}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="solutionsRecommendations"
                control={control}
                render={({ field }) => (
                  <TextArea {...field} label="Soluciones y Recomendaciones" rows={3} />
                )}
              />
            </Col>
            <Col span={24}>
              <InputArrayItems
                name="items"
                title="Cotización"
                showTotal
                columnsLabels={{
                  description: 'Descripción',
                  units: 'Unidades',
                  unitPrice: 'Precio Unitario (S/)',
                  total: 'Total',
                }}
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
                    onClick={() => !isSaving && onCancel()}
                    disabled={isSaving}
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
                    loading={isSaving}
                    disabled={isSaving}
                  >
                    {isNew ? 'Crear Cotización' : 'Guardar Cambios'}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </FormProvider>
    </>
  );
};
