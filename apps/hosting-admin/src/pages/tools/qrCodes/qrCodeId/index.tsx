import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Row,
  Title,
  useNotification,
} from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faGear } from "@fortawesome/free-solid-svg-icons";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  addQrCode,
  fetchQrCode,
  getQrCodeId,
  sitesRef,
  updateQrCode,
} from "../../../../firebase/collections";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { useAuthentication } from "../../../../providers";
import { useNavigate, useParams } from "react-router-dom";
import { Spin, Tabs } from "antd";
import { QrFormTab } from "./QrFormTab.tsx";
import { QrAnalyticsTab } from "./QrAnalyticsTab.tsx";

interface QrFormData {
  type: "static" | "dynamic";
  domain?: string | null;
  title: string;
  description?: string | null;
  destinationUrl: string;
}

interface QrFormTabProps {
  isNew: boolean;
  isSaving: boolean;
  qrMode: string;
  dynamicId: string;
  selectedDomain: string;
  destinationUrl: string;
  qrValue: string;
  sitesLoading: boolean;
  qrTypeOptions: { value: string; label: string }[];
  DOMAINS_LIST: { value: string; label: string }[];
  control: any;
  error: (name: string) => boolean;
  required: (name: string) => boolean;
  errorMessage: (name: string) => string | undefined;
  handleSubmit: any;
  onSubmit: (data: QrFormData) => Promise<void>;
  handleDomainChange: (value: string) => void;
  qrRef: React.RefObject<HTMLDivElement>;
}

export const QrGeneratorIntegration = () => {
  const { qrGeneratorId } = useParams<{ qrGeneratorId: string }>();
  const navigate = useNavigate();
  const isNew = !qrGeneratorId || qrGeneratorId === "new";

  const [dynamicId, setDynamicId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(!isNew);
  const [totalClicks, setTotalClicks] = useState(0);

  const qrRef = useRef<HTMLDivElement>(null);
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { authUser } = useAuthentication();
  const { notification } = useNotification();

  const [sites, sitesLoading] = useCollectionData(
    sitesRef.where("isDeleted", "==", false)
  );

  const DOMAINS_LIST =
    sites?.map((site) => ({
      value: site.hostname,
      label: site.hostname,
    })) || [];

  const qrTypeOptions = [
    { value: "static", label: "Estático" },
    { value: "dynamic", label: "Dinámico" },
  ];

  const schema = yup.object({
    type: yup.string().oneOf(["static", "dynamic"]).required(),
    domain: yup
      .string()
      .nullable()
      .when("type", {
        is: "dynamic",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.nullable(),
      }),
    title: yup.string().required(),
    description: yup.string().nullable(),
    destinationUrl: yup.string().url("Debe ser una URL válida").required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
  } = useForm<QrFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      type: "static",
      domain: "servitecperu.com",
      title: "",
      description: "",
      destinationUrl: "",
    },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const qrMode = watch("type");
  const selectedDomain = watch("domain") || "servitecperu.com";
  const destinationUrl = watch("destinationUrl") || "";

  useEffect(() => {
    if (isNew) return;

    const loadQrData = async () => {
      try {
        setIsLoadingData(true);
        const data = await fetchQrCode(qrGeneratorId as string);

        if (data) {
          reset({
            type: data.type,
            domain: data.domain || "servitecperu.com",
            title: data.title,
            description: data.description,
            destinationUrl: data.destinationUrl,
          });
          if (data.type === "dynamic" && data.shortId) {
            setDynamicId(data.shortId);
          }
          setTotalClicks(data.analytics?.clicks || 0);
        } else {
          notification({
            type: "error",
            description: "Código QR no encontrado",
          });
          navigate("/tools/qr-generator");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadQrData();
  }, [qrGeneratorId, isNew, reset, navigate]);

  useEffect(() => {
    if (isNew && qrMode === "dynamic" && !dynamicId) {
      const shortId = getQrCodeId().substring(0, 6).toUpperCase();
      setDynamicId(shortId);
    }
  }, [qrMode, dynamicId, isNew]);

  const handleDomainChange = (value: string) => {
    setValue("domain", value);
    setValue("destinationUrl", `https://${value}`, { shouldValidate: true });
  };

  const onSubmit = async (formData: QrFormData) => {
    try {
      setIsSaving(true);
      const qrId = isNew ? getQrCodeId() : (qrGeneratorId as string);

      const mapQrCode = {
        id: qrId,
        type: formData.type,
        domain: formData.type === "dynamic" ? formData.domain : null,
        shortId: formData.type === "dynamic" ? dynamicId : null,
        destinationUrl: formData.destinationUrl,
        shortUrl:
          formData.type === "dynamic"
            ? `https://${formData.domain}/q/${dynamicId}`
            : null,
        title: formData.title.trim(),
        description: formData.description?.trim() || null,
        status: "active" as const,
        userId: authUser?.id || "",
        ...(isNew && { analytics: { clicks: 0 } }),
      };

      if (isNew) {
        await addQrCode(assignCreateProps(mapQrCode));
        notification({
          type: "success",
          description: "Código QR creado correctamente.",
        });
        navigate("/tools/qr-generator");
      } else {
        await updateQrCode(qrId, assignUpdateProps(mapQrCode));
        notification({
          type: "success",
          description: "Código QR actualizado.",
        });
      }
    } catch (err) {
      console.error("Error guardando el QR:", err);
      notification({ type: "error", description: "Hubo un error al guardar." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingData) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "60vh" }}>
        <Spin size="large" />
      </Row>
    );
  }

  const formTabProps: QrFormTabProps = {
    isNew,
    isSaving,
    qrMode,
    dynamicId,
    selectedDomain,
    destinationUrl,
    qrValue:
      qrMode === "static"
        ? destinationUrl
        : `https://${selectedDomain}/q/${dynamicId}`,
    sitesLoading,
    qrTypeOptions,
    DOMAINS_LIST,
    control,
    error,
    required,
    errorMessage,
    handleSubmit,
    onSubmit,
    handleDomainChange,
    qrRef,
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>{isNew ? "Crear" : "Editar"} Código QR</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => navigate("/tools/qr-generator")}
            >
              Volver a la lista
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: (
                <span>
                  <FontAwesomeIcon icon={faGear} style={{ marginRight: 8 }} />
                  Configuración
                </span>
              ),
              children: <QrFormTab {...formTabProps} />,
            },
            {
              key: "2",
              label: (
                <span>
                  <FontAwesomeIcon
                    icon={faChartSimple}
                    style={{ marginRight: 8 }}
                  />
                  Estadísticas
                </span>
              ),
              disabled: isNew || qrMode === "static",
              children: <QrAnalyticsTab totalClicks={totalClicks} />,
            },
          ]}
        />
      </Col>
    </Row>
  );
};
