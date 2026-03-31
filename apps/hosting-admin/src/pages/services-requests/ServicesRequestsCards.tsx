import React, { useMemo } from "react";
import { orderBy } from "lodash";
import styled from "styled-components";
import { Card, Empty, Skeleton } from "antd";
import { ServiceRequestCard } from "./ServiceRequestCard";

const RequestsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 345px);
  gap: 24px;
  width: 100%;
  justify-content: center;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const LoadingCard = styled(Card)`
  width: 345px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 420px) {
    width: 100%;
  }
`;

interface Props {
  servicesRequests: any[];
  servicesRequestsLoading: boolean;
  onShowServiceDetail: (request: any) => void;
}

export const ServicesRequestsCards: React.FC<Props> = ({
  servicesRequests,
  servicesRequestsLoading,
  onShowServiceDetail,
}) => {
  const sortedRequests = useMemo(() => {
    return orderBy(
      servicesRequests || [],
      [(item) => item.createAt?.seconds || 0],
      ["desc"]
    );
  }, [servicesRequests]);

  if (servicesRequestsLoading && sortedRequests.length === 0) {
    return (
      <RequestsGrid>
        {[1, 2, 3, 4].map((i) => (
          <LoadingCard key={i}>
            <Skeleton
              active
              avatar={{ size: "large" }}
              paragraph={{ rows: 4 }}
            />
          </LoadingCard>
        ))}
      </RequestsGrid>
    );
  }

  if (sortedRequests.length === 0) {
    return (
      <Empty
        description={
          <span style={{ color: "#8c8c8c" }}>No hay solicitudes entrantes</span>
        }
        style={{ marginTop: 80 }}
      />
    );
  }

  return (
    <RequestsGrid>
      {sortedRequests.map((request) => (
        <ServiceRequestCard
          key={request.id}
          data={request}
          onOpenPage={() => onShowServiceDetail(request)}
        />
      ))}
    </RequestsGrid>
  );
};
