import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
import { servicesRequestsRef } from "../../firebase/collections";
import { Button, Col, Row, Title } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ServicesRequestsCards } from "./ServicesRequestsCards.tsx";
import { ModalProvider, useModal } from "../../providers";
import { useDevice } from "../../hooks";
import { ServiceRequestDetail } from "./ServiceRequestDetail.tsx";
import type { ServiceRequest } from "../../globalTypes.ts";

export const ServicesRequestsIntegrations = () => {
  const navigate = useNavigate();

  const [
    servicesRequests = [],
    servicesRequestsLoading,
    servicesRequestsError,
  ] = useCollectionData(servicesRequestsRef.where("isDeleted", "==", false));
  return (
    <ModalProvider>
      <ServicesRequests
        navigate={navigate}
        servicesRequests={servicesRequests}
        servicesRequestsLoading={servicesRequestsLoading}
      />
    </ModalProvider>
  );
};

const ServicesRequests = ({
  navigate,
  servicesRequests,
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

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Button onClick={() => navigate("/services-requests/new")}>
          <FontAwesomeIcon icon={faPlus} />
          Agregar Solicitud de Servicio
        </Button>
      </Col>
      <Col span={24}>
        <Title level={2}>Solicitudes ({servicesRequests?.length})</Title>
      </Col>
      <Col span={24}>
        <ServicesRequestsCards
          servicesRequests={servicesRequests}
          servicesRequestsLoading={servicesRequestsLoading}
          onShowServiceDetail={onShowServiceDetail}
          navigate={navigate}
        />
      </Col>
    </Row>
  );
};
