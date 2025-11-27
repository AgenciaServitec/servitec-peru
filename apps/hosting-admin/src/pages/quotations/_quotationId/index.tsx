import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthentication } from "../../../providers";
import { useEffect, useState } from "react";
import {
  Col,
  ComponentContainer,
  Form,
  Input,
  QuotationItemsTable,
  RichTextEditor,
  Row,
  Select,
  Title,
} from "../../../components";
import {
  addQuotation,
  fetchQuotation,
  getQuotationId,
  updateQuotation,
} from "../../../firebase/collections";
import { Button } from "antd";
import { deviceTypes, DocumentTypes } from "../../../data-list";

export function QuotationIntegration() {
  const { authUser } = useAuthentication();
  const navigate = useNavigate();
  const { quotationId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(false);

  const isNew = quotationId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => {
      const _quotation = isNew
        ? { id: getQuotationId() }
        : await fetchQuotation(quotationId);

      if (!_quotation) return onGoBack();

      setQuotation(_quotation);
    })();
  }, []);

  const mapQuotation = (formData) => ({
    ...quotation,
    client: {
      document: {
        type: formData.client.documentType,
        number: formData.client.documentNumber,
      },
      firstName: formData.client.firstName,
      paternalSurname: formData.client.paternalSurname,
      maternalSurname: formData.client.maternalSurname,
      phone: {
        prefix: "+51",
        number: formData.client.phoneNumber,
      },
      email: formData.client.email,
      address: formData.client.address,
    },
    device: {
      type: formData.device.type,
      brand: formData.device.brand,
      model: formData.device.model,
      serialNumber: formData.device.serialNumber,
      color: formData.device.color,
      condition: formData.device.condition,
      accessories: formData.device.accessories,
      ram: formData.device.ram,
      processor: formData.device.processor,
      operationSystem: formData.device.operationSystem,
    },
    reportedIssue: formData.reportedIssue,
    analysis: formData.analysis,
    solutionAndRecommendations: formData.solutionAndRecommendations,
    quotationDetails: formData.quotationDetails.map((item) => ({
      ...item,
      description: item.description,
    })),
  });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      isNew
        ? await addQuotation(assignCreateProps(mapQuotation(formData)))
        : updateQuotation(
            quotationId,
            assignUpdateProps(mapQuotation(formData))
          );

      navigate(-1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Quotation
      quotation={quotation}
      user={authUser}
      loading={loading}
      isNew={isNew}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
    />
  );
}

const Quotation = ({
  quotation,
  quotationId,
  user,
  loading,
  isNew,
  onSubmit,
  onGoBack,
}) => {
  const schema = yup.object({
    client: yup.object({
      documentType: yup.string(),
      documentNumber: yup.string(),
      firstName: yup.string(),
      paternalSurname: yup.string(),
      maternalSurname: yup.string(),
      phoneNumber: yup.string(),
      email: yup.string().email(),
      address: yup.string(),
    }),
    device: yup.object({
      type: yup.string(),
      brand: yup.string(),
      model: yup.string(),
      serialNumber: yup.string(),
      color: yup.string(),
      condition: yup.string(),
      accessories: yup.string(),
      ram: yup.string(),
      processor: yup.string(),
      operationSystem: yup.string(),
    }),
    reportedIssue: yup.string().nullable(),
    analysis: yup.string().nullable(),
    solutionAndRecommendations: yup.string().nullable(),
    quotationDetails: yup
      .array()
      .of(
        yup.object({
          description: yup.string().nullable(),
          quantity: yup.number().min(1),
          unitPrice: yup.number().min(0),
          subTotal: yup.number().min(0),
        })
      )
      .min(1),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const resetForm = () => {
    reset({
      client: {
        documentType: quotation?.client?.document?.type || "dni",
        documentNumber: quotation?.client?.document?.number || "",
        firstName: quotation?.client?.firstName || "",
        paternalSurname: quotation?.client?.paternalSurname || "",
        maternalSurname: quotation?.client?.maternalSurname || "",
        phoneNumber: quotation?.client?.phone?.number || "",
        email: quotation?.client?.email || "",
        address: quotation?.client?.address || "",
      },
      device: {
        type: quotation?.device?.type || "",
        brand: quotation?.device?.brand || "",
        model: quotation?.device?.model || "",
        serialNumber: quotation?.device?.serialNumber || "",
        color: quotation?.device?.color || "",
        condition: quotation?.device?.condition || "",
        accessories: quotation?.device?.accessories || "",
        ram: quotation?.device?.ram || "",
        processor: quotation?.device?.processor || "",
        operationSystem: quotation?.device?.operationSystem || "",
      },
      reportedIssue: quotation?.reportedIssue || "",
      analysis: quotation?.analysis || "",
      solutionAndRecommendations: quotation?.solutionAndRecommendations || "",
      quotationDetails: quotation?.quotationDetails || [],
    });
  };

  useEffect(() => {
    resetForm();
  }, [quotation]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}>{isNew ? "Nuevo" : "Editar"} Cotización</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ComponentContainer.group label="Datos del Cliente">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Controller
                      name="client.documentType"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Tipo de documento"
                          name={name}
                          value={value}
                          options={DocumentTypes}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="client.documentNumber"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Número de documento"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="client.firstName"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Nombres"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
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
                  <Col span={24} md={8}>
                    <Controller
                      name="client.maternalSurname"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Apellido Materno"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="client.phoneNumber"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Celular"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="client.email"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Email"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="client.address"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Dirección"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>
            <Col span={24}>
              <ComponentContainer.group label="Datos del dispositivo">
                <Row gutter={[16, 16]}>
                  <Col span={24} md={16}>
                    <Controller
                      name="device.type"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Select
                          label="Tipo"
                          name={name}
                          value={value}
                          options={deviceTypes}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.serialNumber"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Número de serie"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <Controller
                      name="device.brand"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Marca"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <Controller
                      name="device.model"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Modelo"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.color"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Color"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.condition"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Condición"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.accessories"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Accesorios"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.ram"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Ram"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.processor"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Procesador"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <Controller
                      name="device.operationSystem"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Sistema operativo"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="reportedIssue"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <RichTextEditor
                    label="Problema que presenta"
                    name={name}
                    value={value}
                    onChange={onChange}
                    height="200px"
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="analysis"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <RichTextEditor
                    label="Análisis"
                    name={name}
                    value={value}
                    onChange={onChange}
                    height="200px"
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="solutionAndRecommendations"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <RichTextEditor
                    label="Soluciones y recomendaciones"
                    name={name}
                    value={value}
                    onChange={onChange}
                    height="200px"
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <ComponentContainer.group label="Detalles de la cotización">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Controller
                      name="quotationDetails"
                      control={control}
                      render={({ field: { onChange, value, name } }) => (
                        <QuotationItemsTable
                          name={name}
                          value={value}
                          onChange={onChange}
                          control={control}
                          errors={errors}
                          required={required(name)}
                        />
                      )}
                    />
                  </Col>
                </Row>
              </ComponentContainer.group>
            </Col>
            <Col span={24}>
              <Row justify="end" gutter={[16, 16]}>
                <Col xs={24} sm={6} md={4}>
                  <Button
                    type="default"
                    size="large"
                    block
                    onClick={onGoBack}
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
                  >
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
