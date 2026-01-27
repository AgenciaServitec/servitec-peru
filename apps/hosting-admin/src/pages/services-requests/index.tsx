import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { servicesRequestsRef } from "../../firebase/collections";
import { Button, Col, Row, Title, Tabs } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ServicesRequestsCards } from "./ServicesRequestsCards.tsx";
import { ModalProvider, useAuthentication, useModal } from "../../providers";
import { useDevice } from "../../hooks";
import { ServiceRequestDetail } from "./ServiceRequestDetail.tsx";
import type { ServiceRequest } from "../../globalTypes.ts";

export const ServicesRequestsIntegrations = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const [
    servicesRequests = [],
    servicesRequestsLoading,
    servicesRequestsError,
  ] = useCollectionData(servicesRequestsRef.where("isDeleted", "==", false));

  const generalRequests = servicesRequests.filter(
    (req) => req.status === "pending" && !req.assignment
  );

  const myRequests = servicesRequests.filter(
    (req) => req.assignment === authUser?.id
  );

  return (
    <ModalProvider>
      <ServicesRequests
        navigate={navigate}
        generalRequests={generalRequests}
        myRequests={myRequests}
        servicesRequestsLoading={servicesRequestsLoading}
        user={authUser}
      />
    </ModalProvider>
  );
};

const ServicesRequests = ({
  navigate,
  generalRequests,
  myRequests,
  servicesRequestsLoading,
}) => {
  const { isTablet } = useDevice();
  const { onShowModal, onCloseModal } = useModal();

  const onShowServiceDetail = (serviceRequest: ServiceRequest) => {
    onShowModal({
      title: "Detalle del Servicio",
      width: `${isTablet ? "90%" : "50%"}`,
      onRenderBody: () => (
        <ServiceRequestDetail
          serviceRequest={serviceRequest}
          onCloseModal={onCloseModal}
        />
      ),
    });
  };

  const items = [
    {
      key: "1",
      label: `Generales (${generalRequests.length})`,
      children: (
        <ServicesRequestsCards
          servicesRequests={generalRequests}
          servicesRequestsLoading={servicesRequestsLoading}
          onShowServiceDetail={onShowServiceDetail}
          navigate={navigate}
        />
      ),
    },
    {
      key: "2",
      label: `Mis Servicios (${myRequests.length})`,
      children: (
        <ServicesRequestsCards
          servicesRequests={myRequests}
          servicesRequestsLoading={servicesRequestsLoading}
          onShowServiceDetail={onShowServiceDetail}
          navigate={navigate}
        />
      ),
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      <Col
        span={24}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>Solicitudes de Servicio</Title>
        <Button
          type="primary"
          onClick={() => navigate("/services-requests/new")}
        >
          <FontAwesomeIcon icon={faPlus} />
          Nuevo Servicio
        </Button>
      </Col>

      <Col span={24}>
        <Tabs defaultActiveKey="1" items={items} />
      </Col>
    </Row>
  );
};
