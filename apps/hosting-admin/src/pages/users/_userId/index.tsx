import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Legend,
  Row,
  Select,
  Tabs,
  Title,
  useNotification,
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
import { PERMISSION_LIST } from "../../../data-list/permissions.ts";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { rolesRef } from "../../../firebase/collections/rolesAndPermissons.ts";

export const UserIntegration = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { users } = useGlobalData();
  const { authUser } = useAuthentication();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const { putUser, putUserResponse, putUserLoading } = useApiUserPut();
  const { notification } = useNotification();
  const [user, setUser] = useState({});

  const isNew = userId === "new";
  const onGoBack = () => navigate(-1);

  const [roles] = useCollectionData(rolesRef.where("isDeleted", "==", false));

  useEffect(() => {
    (async () => {
      const _user = isNew ? {} : users.find((user) => user.id === userId);

      if (!_user) return navigate(-1);

      setUser(_user);
    })();
  }, []);

  const mapUser = (formData) => ({
    ...(user?.id && { id: user?.id }),
    role: formData.role,
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
    payPerMinute: formData.payPerMinute,
    accountNumber: formData.accountNumber,
    extraPermissions: formData.extraPermissions || [],
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
      roles={roles}
      user={user}
      onGoBack={onGoBack}
      onSubmit={onSubmit}
      loading={postUserLoading || putUserLoading}
    />
  );
};

const User = ({ roles, user, onGoBack, onSubmit, loading }) => {
  const [activeTab, setActiveTab] = useState("1");

  const schema = yup.object({
    role: yup.string().required(),
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
    payPerMinute: yup.number(),
    accountNumber: yup.string(),
    extraPermissions: yup.array().of(yup.string()).default([]),
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
    defaultValues: {
      phoneNumber: "",
      extraPermissions: [],
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  const selectedPermissions = watch("extraPermissions") || [];

  const resetForm = () => {
    reset({
      role: user?.role || "",
      firstName: user?.firstName || "",
      paternalSurname: user?.paternalSurname || "",
      maternalSurname: user?.maternalSurname || "",
      email: user?.email || "",
      dni: user?.document?.number || "",
      phoneNumber: user?.phone?.number || "",
      payPerMinute: user?.payPerMinute || "",
      accountNumber: user?.accountNumber || "",
      extraPermissions: user?.extraPermissions || [],
    });
  };

  useEffect(() => {
    resetForm();
  }, [user]);

  const togglePermission = (id) => {
    const current = [...selectedPermissions];
    const index = current.indexOf(id);
    index > -1 ? current.splice(index, 1) : current.push(id);
    setValue("extraPermissions", current);
  };

  const toggleCategoryPermissions = (actionIds) => {
    const allSelected = actionIds.every((id) =>
      selectedPermissions.includes(id)
    );
    if (allSelected) {
      setValue(
        "extraPermissions",
        selectedPermissions.filter((id) => !actionIds.includes(id))
      );
    } else {
      setValue(
        "extraPermissions",
        Array.from(new Set([...selectedPermissions, ...actionIds]))
      );
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Configuración de Usuario</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <Tabs.TabPane tab="Información Personal" key="1">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Select
                        label="Rol"
                        onChange={onChange}
                        value={value}
                        options={roles?.map((role) => ({
                          label: role.name,
                          value: role.id,
                        }))}
                        name={name}
                        error={error(name)}
                        required={required(name)}
                      />
                    )}
                  />
                </Col>
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
                <Col span={24}>
                  <Controller
                    name="payPerMinute"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <InputNumber
                        label="Pago por minuto"
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
                    name="accountNumber"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="N° de Cuenta"
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="Permisos Especiales" key="2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  padding: "1rem 0",
                }}
              >
                <p style={{ color: "#faad14" }}>
                  Nota: Estos permisos son adicionales a los que el usuario ya
                  tiene por su Rol asignado.
                </p>

                {Object.entries(PERMISSION_LIST).map(([key, category]) => {
                  const categoryActionIds = category.actions.map((a) => a.id);
                  const isAllChecked = categoryActionIds.every((id) =>
                    selectedPermissions.includes(id)
                  );

                  return (
                    <Legend key={key} title={category.label}>
                      <Row gutter={[16, 16]}>
                        <Col span={24}>
                          <Checkbox
                            checked={isAllChecked}
                            onChange={() =>
                              toggleCategoryPermissions(categoryActionIds)
                            }
                            style={{ fontWeight: "bold", color: "#1890ff" }}
                          >
                            {isAllChecked ? "Quitar todos" : "Asignar todos"} en{" "}
                            {category.label}
                          </Checkbox>
                          <hr
                            style={{
                              border: ".5px solid #303030",
                              margin: "12px 0",
                            }}
                          />
                        </Col>
                        {category.actions.map((action) => (
                          <Col xs={24} sm={12} md={8} lg={6} key={action.id}>
                            <Checkbox
                              checked={selectedPermissions.includes(action.id)}
                              onChange={() => togglePermission(action.id)}
                            >
                              {action.label}
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Legend>
                  );
                })}
              </div>
            </Tabs.TabPane>
          </Tabs>
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
