import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Form,
  Row,
  Upload,
  useNotification,
} from "../../components";
import { updateUser } from "../../firebase/collections";
import { useDefaultFirestoreProps, useFormUtils } from "../../hooks";
import type { User } from "../../providers";

export type ProfileImageType = "profile" | "cover";

interface ProfileImageModalProps {
  user: User;
  type: ProfileImageType;
  onCloseModal: () => void;
}

interface ImageFormValues {
  image: any;
}

const IMAGE_CONFIG: Record<
  ProfileImageType,
  {
    field: "profilePhoto" | "coverPhoto";
    fileName: string;
    label: string;
    buttonText: string;
    helperText: string;
  }
> = {
  profile: {
    field: "profilePhoto",
    fileName: "profilePhoto",
    label: "Foto de Perfil (Recomendado: 400 x 400 px)",
    buttonText: "Seleccionar foto de perfil",
    helperText: "Formatos admitidos: JPG, PNG o WEBP.",
  },
  cover: {
    field: "coverPhoto",
    fileName: "coverPhoto",
    label: "Imagen de Portada (Recomendado: 1200 x 360 px)",
    buttonText: "Seleccionar portada",
    helperText: "Formatos admitidos: JPG, PNG o WEBP.",
  },
};

export const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
  user,
  type,
  onCloseModal,
}) => {
  const [loading, setLoading] = useState(false);
  const { assignUpdateProps } = useDefaultFirestoreProps();
  const { notification } = useNotification();

  const config = IMAGE_CONFIG[type];

  const schema = yup.object({
    image: yup
      .mixed()
      .nullable()
      .required("Debes seleccionar una imagen para continuar"),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<ImageFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      image: user?.[config.field] || null,
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    reset({
      image: user?.[config.field] || null,
    });
  }, [user, config.field, reset]);

  const onSubmit = async (formData: ImageFormValues) => {
    if (!user?.id) return;

    try {
      setLoading(true);

      await updateUser(
        user.id,
        assignUpdateProps({
          [config.field]: formData.image,
        })
      );

      notification({
        type: "success",
        title: "Imagen actualizada",
        description:
          type === "profile"
            ? "Tu foto de perfil se actualizó correctamente."
            : "Tu imagen de portada se actualizó correctamente.",
      });

      onCloseModal();
    } catch (err) {
      console.error("Error actualizando imagen de perfil:", err);
      notification({
        type: "error",
        title: "Error al guardar",
        description: "No se pudo actualizar la imagen. Inténtalo nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Upload
                isImage
                label={config.label}
                accept="image/*"
                buttonText={config.buttonText}
                value={value}
                name={name}
                filePath={`users/${user.id}/profile`}
                fileName={config.fileName}
                onChange={(file) => onChange(file)}
                required={required(name)}
                error={error(name)}
              />
            )}
          />
          <small style={{ opacity: 0.7, display: "block", marginTop: 6 }}>
            {config.helperText}
          </small>
        </Col>

        <Col span={24}>
          <Row justify="end" gutter={[12, 12]}>
            <Col xs={12} sm={8} md={6}>
              <Button
                type="default"
                size="large"
                block
                onClick={onCloseModal}
                disabled={loading}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={12} sm={8} md={6}>
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
  );
};
