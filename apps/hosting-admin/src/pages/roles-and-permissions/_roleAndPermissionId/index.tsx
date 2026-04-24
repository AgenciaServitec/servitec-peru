import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Legend,
  message,
  Row,
  Tabs,
  TextArea,
  Typography,
} from "../../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import { PERMISSION_LIST } from "../../../data-list/permissions.ts";
import {
  addRole,
  fetchRole,
  getRoleId,
} from "../../../firebase/collections/rolesAndPermissons.ts";
import type { RoleFormData } from "../../../globalTypes.ts";

const { Title } = Typography;

export const RoleIntegration: React.FC = () => {
  const { roleAndPermissionId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState({});
  const [loading, setLoading] = useState(false);

  const { assignCreateProps } = useDefaultFirestoreProps();

  const isNew = roleAndPermissionId === "new";

  useEffect(() => {
    (async () => {
      if (isNew) {
        setRole({ id: getRoleId() });
      } else {
        const _role = await fetchRole(roleAndPermissionId);
        setRole(_role);
      }
    })();
  }, [roleAndPermissionId]);

  console.log("role: ", role);

  const mapPermissions = (formData: RoleFormData) => ({
    id: formData.roleCode.toLowerCase().trim().replace(" ", "_"),
    name: formData.name,
    roleCode: formData.roleCode,
    description: formData.description,
    permissions: formData.permissions,
  });

  const onSaveRoleAndPermissions = async (formData: RoleFormData) => {
    try {
      setLoading(true);

      await addRole(assignCreateProps(mapPermissions(formData)));

      message.success("Rol guardado exitosamente");
      navigate("/roles-and-permissions");
    } catch (e) {
      console.error(e);
      message.error("Hubo un error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Role
      role={role}
      onSaveRoleAndPermissions={onSaveRoleAndPermissions}
      loading={loading}
    />
  );
};

const Role = ({ role, onSaveRoleAndPermissions, loading }) => {
  const { roleAndPermissionId } = useParams();
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required(),
    roleCode: yup.string().required(),
    description: yup.string().optional().default(""),
    permissions: yup.array().of(yup.string()),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    reset,
  } = useForm<RoleFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      permissions: [],
      name: "",
      roleCode: "",
      description: "",
    },
  });

  const { required, error } = useFormUtils({ errors, schema });

  const selectedPermissions = watch("permissions") || [];

  const handleMainAction = async () => {
    if (activeTab === "1") {
      const isTabOneValid = await trigger(["name", "roleCode"]);
      if (isTabOneValid) setActiveTab("2");
    } else {
      await handleSubmit(onSaveRoleAndPermissions)();
    }
  };

  const togglePermission = (id: string) => {
    const current = [...selectedPermissions];
    const index = current.indexOf(id);
    index > -1 ? current.splice(index, 1) : current.push(id);
    setValue("permissions", current);
  };

  const toggleCategoryPermissions = (actionIds: string[]) => {
    const current = [...selectedPermissions];
    const allSelected = actionIds.every((id) => current.includes(id));

    if (allSelected) {
      const filtered = current.filter((id) => !actionIds.includes(id));
      setValue("permissions", filtered);
    } else {
      const uniquePermissions = Array.from(new Set([...current, ...actionIds]));
      setValue("permissions", uniquePermissions);
    }
  };

  const resetForm = () => {
    reset({
      name: role?.name || "",
      roleCode: role?.roleCode || "",
      description: role?.description || "",
      permissions: role?.permissions || [],
    });
  };

  useEffect(() => {
    if (role && Object.keys(role).length > 0) {
      resetForm();
    }
  }, [role]);

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Title level={2}>
          {roleAndPermissionId ? "Editar Rol" : "Crear Nuevo Rol"}
        </Title>
      </Col>

      <Col span={24}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <Tabs.TabPane tab="Información General" key="1">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Nombre del Rol"
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
                    name="roleCode"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <Input
                        label="Código del rol (En inglés)"
                        name={name}
                        value={value}
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          const formattedValue = rawValue
                            .replace(/\s/g, "_")
                            .toLowerCase();
                          onChange(formattedValue);
                        }}
                        error={error(name)}
                        required={required(name)}
                      />
                    )}
                  />
                </Col>
                <Col span={24}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value, name } }) => (
                      <TextArea
                        label="Descripción del Rol"
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
            <Tabs.TabPane tab="Permisos y Accesos" key="2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {Object.entries(PERMISSION_LIST).map(([key, category]) => {
                  const categoryActionIds = category.actions.map((a) => a.id);
                  const isAllCategoryChecked = categoryActionIds.every((id) =>
                    selectedPermissions.includes(id)
                  );

                  return (
                    <Legend key={key} title={category.label}>
                      <Row gutter={[16, 16]}>
                        <Col span={24} style={{ marginBottom: "8px" }}>
                          <Checkbox
                            checked={isAllCategoryChecked}
                            onChange={() =>
                              toggleCategoryPermissions(categoryActionIds)
                            }
                            style={{ fontWeight: "bold", color: "#1890ff" }}
                          >
                            {isAllCategoryChecked
                              ? "Deseleccionar"
                              : "Seleccionar"}{" "}
                            todos los permisos de {category.label}
                          </Checkbox>
                          <hr
                            style={{
                              border: ".5px solid #303030",
                              marginTop: "8px",
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
        </Form>
      </Col>

      <Col span={24}>
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button
              size="large"
              onClick={() => {
                if (activeTab === "2") setActiveTab("1");
                else navigate("/roles-and-permissions");
              }}
              disabled={loading}
            >
              {activeTab === "2" ? "Anterior" : "Cancelar"}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleMainAction}
            >
              {activeTab === "1" ? "Siguiente" : "Guardar Cambios"}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
