import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import { useEffect, useState } from "react";
import { useApiDataByDniOrRucGet } from "../../../api";
import {
  addServiceRequest,
  fetchServiceRequest,
  getServiceRequestId,
  updateServiceRequest,
} from "../../../firebase/collections";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { capitalize } from "lodash";
import {
  Row,
  Col,
  Title,
  Form,
  ComponentContainer,
  Select,
  TextArea,
  Input,
  LocationPicker,
  AddressSearchInput,
} from "../../../components";
import { deviceTypes, DocumentTypes } from "../../../data-list";
import { Button } from "antd";
import type { ServiceRequest } from "../../../globalTypes.ts";

export function ServiceRequestIntegration() {
  const navigate = useNavigate();
  const { serviceRequestId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [documentType, setDocumentType] = useState("ruc");
  const [serviceRequest, setServiceRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    getDataByDniOrRuc,
    getDataByDniOrRucLoading,
    getDataByDniOrRucResponse,
  } = useApiDataByDniOrRucGet(documentType);

  const isNew = serviceRequestId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => {
      const _serviceRequest = isNew
        ? { id: getServiceRequestId() }
        : await fetchServiceRequest(serviceRequestId);

      if (!_serviceRequest) return onGoBack();

      setServiceRequest(_serviceRequest);
    })();
  }, []);

  const mapServiceRequest = (formData: any): Partial<ServiceRequest> => {
    const isRuc = formData.client.document.type === "ruc";

    return {
      id: formData.id || serviceRequest?.id,
      status: formData.status || "pending",
      client: {
        firstName: isRuc ? "" : formData.client.firstName,
        paternalSurname: isRuc ? "" : formData.client.paternalSurname,
        maternalSurname: isRuc ? "" : formData.client.maternalSurname,
        companyName: isRuc ? formData.client.companyName : "",
        document: {
          type: formData.client.document.type,
          number: formData.client.document.number,
        },
        phone: {
          prefix: "+51",
          number: formData.client.phone.number,
        },
        email: formData.client.email,
      },
      location: {
        address: formData.location.address,
        geoPoint: {
          lat: Number(formData.location.geoPoint.lat),
          lng: Number(formData.location.geoPoint.lng),
        },
      },
      problemDescription: formData.problemDescription,
      device: formData.device || "",
      assignment: formData.assignment || null,
    };
  };

  const onSubmit = async (formData: ServiceRequest) => {
    try {
      setLoading(true);

      isNew
        ? await addServiceRequest(
            assignCreateProps(mapServiceRequest(formData))
          )
        : await updateServiceRequest(
            serviceRequestId,
            assignUpdateProps(mapServiceRequest(formData))
          );

      navigate("/services-requests");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceRequest
      serviceRequest={serviceRequest}
      loading={loading}
      isNew={isNew}
      onSubmit={onSubmit}
      onGoBack={onGoBack}
      setDocumentType={setDocumentType}
      getDataByDniOrRuc={getDataByDniOrRuc}
      getDataByDniOrRucLoading={getDataByDniOrRucLoading}
    />
  );
}

const ServiceRequest = ({
  serviceRequest,
  loading,
  isNew,
  onSubmit,
  onGoBack,
  setDocumentType,
  getDataByDniOrRuc,
  getDataByDniOrRucLoading,
}) => {
  const schema = yup.object({
    // category: yup.string().required("La categoría es obligatoria"),
    client: yup.object({
      firstName: yup.string(),
      paternalSurname: yup.string(),
      maternalSurname: yup.string(),
      companyName: yup.string(),
      document: yup.object({
        type: yup.string(),
        number: yup.string(),
      }),
      phone: yup.object({
        prefix: yup.string(),
        number: yup.string(),
      }),
      email: yup.string().email(),
    }),
    location: yup.object({
      address: yup.string().required("La dirección es obligatoria"),
      geoPoint: yup.object({
        lat: yup.number().typeError("Debe ser un número").required(),
        lng: yup.number().typeError("Debe ser un número").required(),
      }),
    }),
    problemDescription: yup.string().required("La descripción es obligatoria"),
    device: yup.string().required(),
    assignment: yup.object().nullable().optional(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    const docType = watch("client.document.type");
    if (docType) {
      setDocumentType(docType);
    }
  }, [watch("client.document.type"), setDocumentType]);

  const docNumber = watch("client.document.number") || "";
  const docType = watch("client.document.type");

  useEffect(() => {
    const isValidLength =
      (docType === "dni" && docNumber.length === 8) ||
      (docType === "ruc" && docNumber.length === 11);

    if (isValidLength && isNew) {
      (async () => {
        try {
          const data = await getDataByDniOrRuc(docNumber);
          if (!data) return;

          if (docType === "dni") {
            setValue("client.firstName", capitalize(data.firstName || ""));
            setValue(
              "client.paternalSurname",
              capitalize(data.paternalSurname || "")
            );
            setValue(
              "client.maternalSurname",
              capitalize(data.maternalSurname || "")
            );
            setValue("client.companyName", "");
          } else if (docType === "ruc") {
            const name = capitalize(data.companyName || "");
            setValue("client.companyName", name);
            setValue("client.paternalSurname", "");
            setValue("client.maternalSurname", "");
          }
        } catch (err) {
          console.error("Error al buscar documento:", err);
        }
      })();
    }
  }, [docNumber, docType, isNew, setValue, getDataByDniOrRuc]);

  const resetForm = () => {
    reset({
      id: serviceRequest?.id || "",
      // category: serviceRequest?.category || "",
      client: {
        firstName: serviceRequest?.client?.firstName || "",
        paternalSurname: serviceRequest?.client?.paternalSurname || "",
        maternalSurname: serviceRequest?.client?.maternalSurname || "",
        document: {
          type: serviceRequest?.client?.document?.type || "dni",
          number: serviceRequest?.client?.document?.number || "",
        },
        phone: {
          prefix: "+51",
          number: serviceRequest?.client?.phone?.number || "",
        },
        email: serviceRequest?.client?.email || "",
      },
      location: {
        address: serviceRequest?.location?.address || "",
        geoPoint: {
          lat:
            serviceRequest?.location?.geoPoint?.lat !== undefined
              ? Number(serviceRequest.location.geoPoint.lat)
              : "",
          lng:
            serviceRequest?.location?.geoPoint?.lng !== undefined
              ? Number(serviceRequest.location.geoPoint.lng)
              : "",
        },
      },
      problemDescription: serviceRequest?.problemDescription || "",
      device: serviceRequest?.device || "",
      assignment: serviceRequest?.assignment || null,
    });
  };

  useEffect(() => {
    resetForm();
  }, [serviceRequest]);

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Title level={2}>
          {isNew ? "Nueva" : "Editar"} Solicitud de Servicio
        </Title>
      </Col>

      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <ComponentContainer.group title="Ubicación del Servicio">
                <div style={{ marginBottom: "16px" }}>
                  <Controller
                    name="location.geoPoint"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <LocationPicker
                        value={value}
                        onChange={onChange}
                        isNew={isNew}
                        onAddressFound={(address) => {
                          setValue("location.address", address);
                        }}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="location.address"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <AddressSearchInput
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                      onSelect={(option) => {
                        setValue("location.address", option.value);
                        setValue(
                          "location.geoPoint",
                          {
                            lat: option.lat,
                            lng: option.lon,
                          },
                          { shouldValidate: true }
                        );
                      }}
                    />
                  )}
                />{" "}
              </ComponentContainer.group>
            </Col>
            <Col xs={24} lg={12}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ComponentContainer.group title="Información del Cliente">
                    <Row gutter={[12, 12]}>
                      <Col span={10}>
                        <Controller
                          name="client.document.type"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Select
                              label="Tipo"
                              name={name}
                              value={value}
                              options={DocumentTypes}
                              onChange={(val) => {
                                onChange(val);
                                reset({
                                  ...watch(),
                                  client: {
                                    ...watch("client"),
                                    firstName: "",
                                    paternalSurname: "",
                                    companyName: "",
                                  },
                                });
                              }}
                              error={error(name)}
                              required={required(name)}
                            />
                          )}
                        />
                      </Col>
                      <Col span={14}>
                        <Controller
                          name="client.document.number"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <Input
                              label="Documento"
                              name={name}
                              value={value}
                              onChange={onChange}
                              error={error(name)}
                              required={required(name)}
                              loading={getDataByDniOrRucLoading}
                            />
                          )}
                        />
                      </Col>
                      {docType === "ruc" ? (
                        <Col span={24}>
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
                      ) : (
                        <>
                          <Col span={24}>
                            <Controller
                              name="client.firstName"
                              control={control}
                              render={({
                                field: { onChange, value, name },
                              }) => (
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
                          <Col span={12}>
                            <Controller
                              name="client.paternalSurname"
                              control={control}
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <Input
                                  label="Ap. Paterno"
                                  name={name}
                                  value={value}
                                  onChange={onChange}
                                  error={error(name)}
                                  required={required(name)}
                                />
                              )}
                            />
                          </Col>
                          <Col span={12}>
                            <Controller
                              name="client.maternalSurname"
                              control={control}
                              render={({
                                field: { onChange, value, name },
                              }) => (
                                <Input
                                  label="Ap. Materno"
                                  name={name}
                                  value={value}
                                  onChange={onChange}
                                  error={error(name)}
                                />
                              )}
                            />
                          </Col>
                        </>
                      )}
                      <Col span={24}>
                        <Controller
                          name="client.phone.number"
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
                    </Row>
                  </ComponentContainer.group>
                </Col>

                <Col span={24}>
                  <ComponentContainer.group title="Dispositivo y Falla">
                    <Row gutter={[12, 12]}>
                      <Col span={24}>
                        <Controller
                          name="device"
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
                      <Col span={24}>
                        <Controller
                          name="problemDescription"
                          control={control}
                          render={({ field: { onChange, value, name } }) => (
                            <TextArea
                              label="¿Qué sucede?"
                              name={name}
                              value={value}
                              onChange={onChange}
                              error={error(name)}
                              required={required(name)}
                              rows={3}
                            />
                          )}
                        />
                      </Col>
                    </Row>
                  </ComponentContainer.group>
                </Col>
              </Row>
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
