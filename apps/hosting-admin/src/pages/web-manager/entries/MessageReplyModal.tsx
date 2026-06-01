import {
  Button,
  Col,
  Form,
  Input,
  Row,
  TextArea,
  Upload,
  useNotification,
} from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../hooks";
import * as yup from "yup";
import type { Entry } from "../../../globalTypes.ts";
import { useState } from "react";
import { useModal } from "../../../providers";

export type MessageReplyFormValues = {
  from: string;
  to: string;
  subject: string;
  message: string;
  attachment?: any;
};

interface MessageReplyModalProps {
  entry: Entry;
  clientEmail: string;
  companyEmail: string;
  originalSubject?: string;
  siteId?: string;
}

export const MessageReplyModal = ({
  entry,
  clientEmail,
  companyEmail,
  originalSubject,
  siteId,
}: MessageReplyModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notification } = useNotification();
  const { onCloseModal } = useModal();

  const schema = yup.object({
    from: yup.string().required(),
    to: yup.string().required(),
    subject: yup.string().required("El asunto es obligatorio"),
    message: yup.string().required("El cuerpo del mensaje es obligatorio"),
    attachment: yup.mixed().optional(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MessageReplyFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      from: companyEmail,
      to: clientEmail,
      subject: originalSubject
        ? `Re: ${originalSubject}`
        : "Respuesta a tu consulta - Servitec",
      message: "",
    },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const onSubmit = async (data: MessageReplyFormValues) => {
    setIsSubmitting(true);

    try {
      const formattedAttachment = data.attachment
        ? {
            name: data.attachment.name,
            url: data.attachment.url,
            uid: data.attachment.uid,
            thumbUrl: data.attachment.thumbUrl,
          }
        : null;

      const payload = {
        entryId: entry.id,
        contactId: entry.contactId,
        siteId: siteId,
        hostname: entry.hostname,
        from: data.from,
        to: data.to,
        subject: data.subject,
        message: data.message,
        attachment: formattedAttachment,
      };

      const response = await fetch(
        "https://api-servitec-peru.web.app/entries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Error en la petición");

      notification({
        type: "success",
        title: "¡Respuesta enviada!",
        description: "El mensaje ha sido enviado y registrado en el historial.",
      });

      onCloseModal();
    } catch (err) {
      console.error(err);
      notification({
        type: "error",
        title: "Error al enviar",
        description: "Hubo un problema al intentar enviar la respuesta.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Controller
            name="from"
            control={control}
            render={({ field: { value, name } }) => (
              <Input
                label="De"
                value={value}
                name={name}
                size="large"
                disabled
                required={required(name)}
              />
            )}
          />
        </Col>

        <Col xs={24} md={12}>
          <Controller
            name="to"
            control={control}
            render={({ field: { value, name } }) => (
              <Input
                label="Para"
                value={value}
                name={name}
                size="large"
                disabled
                required={required(name)}
              />
            )}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="subject"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Asunto"
                value={value}
                onChange={onChange}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
                size="large"
              />
            )}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="message"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <TextArea
                label="Mensaje"
                name={name}
                value={value}
                onChange={onChange}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
                rows={3}
              />
            )}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="attachment"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Upload
                label="Archivo adjunto (opcional)"
                accept="image/*,.pdf,.doc,.docx"
                buttonText="Subir archivo"
                value={value}
                name={name}
                filePath={`contacts/${entry?.contactId}/entries/${entry.id}/replies`}
                fileName={`reply_${Date.now()}`}
                onChange={(file) => onChange(file)}
                error={error(name)}
              />
            )}
          />
        </Col>
      </Row>
      <Row justify="end" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Button
            size="large"
            block
            onClick={() => onCloseModal()}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={isSubmitting}
          >
            Enviar Respuesta
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
