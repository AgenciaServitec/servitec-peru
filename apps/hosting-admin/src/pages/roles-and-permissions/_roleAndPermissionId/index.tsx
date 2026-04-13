import React, { useState } from "react";
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
  Typography,
} from "../../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../hooks";

const { Title, Text } = Typography;

export const RoleEditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const schema = yup.object({
    name: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      message.success("Configuración de rol guardada exitosamente");
      setLoading(false);
      navigate("/roles");
    }, 1500);
  };

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Title level={2}>{id ? "Editar Rol" : "Nuevo Rol"}</Title>
      </Col>

      <Col span={24}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Información General" key="1">
            <Form onSubmit={handleSubmit(handleSave)}>
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
              </Row>
            </Form>
            {/*<Space direction="vertical">*/}
            {/*  <TextArea label="Descripción funcional" rows={6} />*/}
            {/*</Space>*/}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Permisos y Accesos" key="2">
            <Legend title="Módulo de Usuarios">
              <Row gutter={[16, 16]}>
                {[
                  "Ver lista",
                  "Crear nuevo",
                  "Editar datos",
                  "Eliminar (Hard Delete)",
                  "Resetear Password",
                ].map((p) => (
                  <Col xs={24} sm={12} md={6} key={p}>
                    <Checkbox>{p}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Legend>

            <Legend title="Módulo de Asistencias">
              <Row gutter={[16, 16]}>
                {[
                  "Marcar entrada/salida",
                  "Ver historial propio",
                  "Ver historial de todos",
                  "Corregir registros",
                  "Exportar a Excel",
                ].map((p) => (
                  <Col xs={24} sm={12} md={6} key={p}>
                    <Checkbox>{p}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Legend>
          </Tabs.TabPane>
        </Tabs>
      </Col>

      <Col span={24}>
        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button
              size="large"
              onClick={() => navigate("/roles")}
              disabled={loading}
            >
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handleSave}
            >
              Guardar Cambios
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
