import { Col, Row, Tabs, Title } from "../../components";
import { ProfileDataForm } from "./ProfileDataForm";
import { ProfileInformation } from "./ProfileInformation";
import { useAuthentication } from "../../providers";
import { useQueryString } from "../../hooks";

const items = [
  {
    key: "profile_edit",
    label: "Editar Perfil",
    children: <ProfileDataForm />,
  },
  // {
  //   key: "documents_images",
  //   label: "Imagen DNI y firma",
  //   children: <ProfileDataForm />,
  // },{
  //   key: "biometrics_data",
  //   label: "Datos Biométricos",
  //   children: <ProfileDataForm />,
  // },
];

export const Profile = () => {
  const { authUser } = useAuthentication();
  const [dataEdit] = useQueryString("dataEdit", "1");

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={2}>Perfil</Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12}>
            <Title level={4}>Datos del usuario</Title>
            <ProfileInformation user={authUser} />
          </Col>
          <Col span={24} lg={12}>
            <Title level={4}>Editar datos</Title>
            <Tabs type="card" items={items} defaultActiveKey={dataEdit} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
