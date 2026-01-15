import React, { useMemo } from "react";
import { orderBy } from "lodash";
import { Row, Col, Card, Empty } from "../../components";
import { ServicesRequestCard } from "./ServiceRequestCard";

interface Props {
  servicesRequests: any[];
  servicesRequestsLoading: boolean;
  onShowServiceDetail: () => void;
}

export const ServicesRequestsCards: React.FC<Props> = ({
  servicesRequests,
  servicesRequestsLoading,
  onShowServiceDetail,
  navigate,
}) => {
  const sortedRequests = useMemo(() => {
    return orderBy(
      servicesRequests || [],
      [(item) => item.createAt?.seconds || 0],
      ["desc"]
    );
  }, [servicesRequests]);

  if (servicesRequestsLoading) {
    return (
      <Row gutter={[24, 24]}>
        {[1, 2, 3].map((i) => (
          <Col xs={24} sm={12} xl={8} key={i}>
            <Card loading={true} style={{ borderRadius: "28px" }} />
          </Col>
        ))}
      </Row>
    );
  }

  if (!sortedRequests.length) {
    return <Empty description="No hay solicitudes" style={{ marginTop: 40 }} />;
  }

  return (
    <Row gutter={[24, 24]}>
      {sortedRequests.map((request) => (
        <Col xs={24} sm={12} xl={8} key={request.id}>
          <ServicesRequestCard
            request={request}
            onShowServiceDetail={onShowServiceDetail}
            navigate={navigate}
          />
        </Col>
      ))}
    </Row>
  );
};
