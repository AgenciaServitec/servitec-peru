import { useNavigate, useParams } from "react-router-dom";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import { useEffect, useState } from "react";
import { useApiDataByDniOrRucGet } from "../../../api";
import {
  addSupplier,
  fetchSupplier,
  getSupplierId,
  updateSupplier,
} from "../../../firebase/collections";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Row,
  Col,
  Title,
  Form,
  Input,
  Select,
  Button,
} from "../../../components";
import { capitalize } from "lodash";
import { SpecialtyOptions } from "../../../data-list";

export function SupplierIntegration() {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const [documentType, setDocumentType] = useState("ruc");
  const [supplier, setSupplier] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { getDataByDniOrRuc, getDataByDniOrRucLoading } =
    useApiDataByDniOrRucGet(documentType);

  const isNew = supplierId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    if (isNew) {
      setSupplier({
        id: getSupplierId(),
        fullName: "",
        email: "",
        phone: {
          type: "mobile",
          prefix: "+51",
          number: "",
        },
        whatsapp: {
          prefix: "+51",
          number: "",
        },
        document: {
          type: "ruc",
          number: "",
        },
        company: {
          ruc: "",
          legalName: "",
          address: "",
          district: "",
        },
        specialties: [],
        status: "active",
        searchData: [""],
      });
    } else {
      const fetchSupplierData = async () => {
        try {
          const _supplier = await fetchSupplier(supplierId);
          if (!_supplier) {
            navigate(-1);
            return;
          }
          setSupplier(_supplier);
        } catch (error) {
          console.error("Error obteniendo proveedor:", error);
          navigate(-1);
        }
      };
      fetchSupplierData();
    }
  }, [supplierId, isNew, navigate]);

  const mapSupplier = (formData: any) => ({
    ...supplier,
    fullName: formData.fullName,
    email: formData.email,
    phone: {
      type: formData.phone.type,
      prefix: "+51",
      number: formData.phone.number,
    },
    whatsapp: {
      prefix: "+51",
      number: formData.whatsapp.number,
    },
    document: {
      type: formData.document.type,
      number: formData.document.number,
    },
    company: {
      ruc: formData.company?.ruc || "",
      legalName: formData.company?.legalName || "",
      address: formData.company?.address || "",
      district: formData.company?.district || "",
    },
    specialties: formData.specialties,
  });

  const onSubmit = async (formData: any) => {
    try {
      setLoading(true);

      isNew
        ? await addSupplier(assignCreateProps(mapSupplier(formData)))
        : await updateSupplier(
            supplierId as string,
            assignUpdateProps(mapSupplier(formData))
          );

      navigate("/suppliers");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Supplier
      supplier={supplier}
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

const Supplier = ({
  supplier,
  loading,
  isNew,
  onSubmit,
  onGoBack,
  setDocumentType,
  getDataByDniOrRuc,
}: any) => {
  const schema = yup.object({
    document: yup
      .object({
        type: yup.string().required("El tipo de documento es requerido"),
        number: yup.string().required("El número de documento es requerido"),
      })
      .optional(),
    fullName: yup.string(),
    email: yup.string().email().optional(),
    phone: yup
      .object({
        type: yup.string(),
        number: yup.string().optional(),
      })
      .optional(),
    whatsapp: yup
      .object({
        number: yup.string().optional(),
      })
      .optional(),
    company: yup.object({
      ruc: yup.string(),
      legalName: yup.string(),
      address: yup.string(),
      district: yup.string(),
    }),
    specialties: yup.array().of(yup.string()),
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

  const docType = watch("document.type") || "ruc";
  const documentNumber = watch("document.number") || "";

  useEffect(() => {
    setDocumentType(docType);
  }, [docType, setDocumentType]);

  useEffect(() => {
    const isValidLength =
      (docType === "dni" && documentNumber.length === 8) ||
      (docType === "ruc" && documentNumber.length === 11);

    if (isValidLength && isNew) {
      (async () => {
        try {
          const data = await getDataByDniOrRuc(documentNumber);
          if (!data) return;

          if (docType === "dni") {
            const fullNameString =
              `${data.firstName || ""} ${data.paternalSurname || ""} ${data.maternalSurname || ""}`.trim();
            setValue("fullName", capitalize(fullNameString), {
              shouldValidate: true,
            });
          } else if (docType === "ruc") {
            setValue("company.ruc", documentNumber, { shouldValidate: true });
            setValue("company.legalName", capitalize(data.companyName || ""), {
              shouldValidate: true,
            });
            setValue("company.address", capitalize(data.address || ""), {
              shouldValidate: true,
            });

            if (!watch("fullName")) {
              setValue("fullName", capitalize(data.companyName || ""), {
                shouldValidate: true,
              });
            }
          }
        } catch (err) {
          console.error("Error consultando API:", err);
        }
      })();
    }
  }, [documentNumber, docType, isNew]);

  const resetForm = () => {
    if (!supplier) return;
    reset({
      fullName: supplier.fullName || "",
      email: supplier.email || "",

      phone: {
        type: supplier.phone?.type || "mobile",
        number: supplier.phone?.number || "",
      },
      whatsapp: {
        number: supplier.whatsapp?.number || "",
      },
      document: {
        type: supplier.document?.type || "ruc",
        number: supplier.document?.number || "",
      },
      company: {
        ruc: supplier.company?.ruc || "",
        legalName: supplier.company?.legalName || "",
        address: supplier.company?.address || "",
        district: supplier.company?.district || "",
      },

      specialties: supplier.specialties?.length ? supplier.specialties : [],
    });
  };

  useEffect(() => {
    resetForm();
  }, [supplier]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}>{isNew ? "Nuevo" : "Editar"} Proveedor</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24} md={8}>
              <Controller
                name="document.type"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Tipo de Documento"
                    name={name}
                    value={value}
                    onChange={(val) => {
                      onChange(val);
                      setValue("document.number", "");
                    }}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "RUC", value: "ruc" },
                      { label: "DNI", value: "dni" },
                    ]}
                  />
                )}
              />
            </Col>
            <Col span={24} md={16}>
              <Controller
                name="document.number"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Número de Documento"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    maxLength={docType === "dni" ? 8 : 11}
                  />
                )}
              />
            </Col>

            {docType === "ruc" && (
              <>
                <Col span={24} md={8}>
                  <Controller
                    name="company.ruc"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="RUC de la Empresa"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                      />
                    )}
                  />
                </Col>
                <Col span={24} md={16}>
                  <Controller
                    name="company.legalName"
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
                <Col span={24} md={12}>
                  <Controller
                    name="company.address"
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
                <Col span={24} md={12}>
                  <Controller
                    name="company.district"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Distrito"
                        name={name}
                        value={value}
                        onChange={onChange}
                        error={error(name)}
                        required={required(name)}
                      />
                    )}
                  />
                </Col>
              </>
            )}

            <Col span={24} md={12}>
              <Controller
                name="fullName"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label={
                      docType === "dni"
                        ? "Nombre Completo"
                        : "Nombre del Contacto"
                    }
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
                name="email"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Correo Electrónico"
                    type="email"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>

            <Col span={24} md={6}>
              <Controller
                name="phone.type"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Tipo de Teléfono"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "Móvil", value: "mobile" },
                      { label: "Fijo", value: "landline" },
                    ]}
                  />
                )}
              />
            </Col>
            <Col span={24} md={9}>
              <Controller
                name="phone.number"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Número de Teléfono"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={9}>
              <Controller
                name="whatsapp.number"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Número de WhatsApp"
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
                name="specialties"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Especialidades"
                    name={name}
                    value={value || []}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={SpecialtyOptions}
                    mode="multiple"
                    placeholder="Seleccione las especialidades..."
                  />
                )}
              />
            </Col>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              <Button type="default" onClick={onGoBack} disabled={loading}>
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isNew ? "Crear Proveedor" : "Guardar Cambios"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
