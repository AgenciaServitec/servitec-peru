import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Title,
} from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { InputNumber } from "../../../components/ui/InputNumber.tsx";
import { useFormUtils } from "../../../hooks";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthentication, useGlobalData } from "../../../providers";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiUserPost,
  useApiUserPut,
} from "../../../api";

export const UserIntegration = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { users } = useGlobalData();
  const { authUser } = useAuthentication();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const { putUser, putUserResponse, putUserLoading } = useApiUserPut();

  const [user, setUser] = useState({});

  const isNew = userId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => {
      const _user = isNew ? {} : users.find((user) => user.id === userId);

      if (!_user) return navigate(-1);

      setUser(_user);
    })();
  }, []);

  const mapUser = (formData) => ({
    ...(user?.id && { id: user?.id }),
    firstName: formData.firstName.toLowerCase(),
    paternalSurname: formData.paternalSurname.toLowerCase(),
    maternalSurname: formData.maternalSurname.toLowerCase(),
    email: formData.email.toLowerCase(),
    document: {
      type: "dni",
      number: formData.dni,
    },
    phone: {
      prefix: "+51",
      number: formData.phoneNumber,
    },
    updateBy: `${authUser?.firstName} ${authUser?.paternalSurname} ${authUser?.maternalSurname}|${authUser?.document.number}`,
  });

  const onSubmit = async (formData) => {
    try {
      const _user = mapUser(formData);

      const response = isNew ? await postUser(_user) : await putUser(_user);

      if (isNew ? !postUserResponse.ok : !putUserResponse.ok) {
        throw new Error(response);
      }

      notification({
        type: "success",
        title: "¡El usuario se guardó correctamente!",
      });

      return onGoBack();
    } catch (e) {
      console.error(e);
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  return (
    <User
      user={user}
      onGoBack={onGoBack}
      onSubmit={onSubmit}
      loading={postUserLoading || putUserLoading}
    />
  );
};

const User = ({ user, onGoBack, onSubmit, loading }) => {
  const schema = yup.object({
    firstName: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    email: yup.string().email().required(),
    dni: yup
      .string()
      .min(8)
      .max(8)
      .required()
      .transform((value) => (value === null ? "" : value)),
    phoneNumber: yup
      .string()
      .min(9)
      .max(9)
      .required()
      .transform((value) => (value === null ? "" : value)),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  const resetForm = () => {
    reset({
      firstName: user?.firstName || "",
      paternalSurname: user?.paternalSurname || "",
      maternalSurname: user?.maternalSurname || "",
      email: user?.email || "",
      dni: user?.document?.number || "",
      phoneNumber: user?.phone?.number || "",
    });
  };

  useEffect(() => {
    resetForm();
  }, [user]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Usuario</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="dni"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="DNI"
                    onChange={onChange}
                    value={value}
                    name={name}
                    error={error(name)}
                    required={required(name)}
                    disabled={user?.dni}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="firstName"
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
            <Col span={24}>
              <Controller
                name="paternalSurname"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Apellido paterno"
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
                name="maternalSurname"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Apellido materno"
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
                name="email"
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
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputNumber
                    label="Ingrese teléfono"
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
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onGoBack()}
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
        </Form>
      </Col>
    </Row>
  );
};