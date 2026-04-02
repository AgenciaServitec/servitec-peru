import React, { useMemo } from "react";
import { orderBy } from "lodash";
import styled from "styled-components";
import { Empty } from "antd";
import { ServiceRequestCard } from "./ServiceRequestCard";
import { ServicesRequestsTable } from "./ServicesRequestsTable";

const RequestsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 345px);
  gap: 24px;
  width: 100%;
  justify-content: center;
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

interface Props {
  user: any;
  servicesRequests: any[];
  servicesRequestsLoading: boolean;
  viewType: "grid" | "list";
}

export const ServicesRequestsCards: React.FC<Props> = ({
  user,
  servicesRequests,
  servicesRequestsLoading,
  viewType,
}) => {
  const sortedRequests = useMemo(() => {
    return orderBy(
      servicesRequests || [],
      [(item) => item.createAt?.seconds || 0],
      ["desc"]
    );
  }, [servicesRequests]);

  // if (servicesRequestsLoading && sortedRequests.length === 0) {
  //   return <LoadingSkeletonGrid />;
  // }

  if (sortedRequests.length === 0) {
    return (
      <Empty
        description={
          <span style={{ color: "#8c8c8c" }}>No hay solicitudes</span>
        }
      />
    );
  }

  return (
    <>
      {viewType === "grid" ? (
        <RequestsGrid>
          {sortedRequests.map((request) => (
            <ServiceRequestCard key={request.id} user={user} data={request} />
          ))}
        </RequestsGrid>
      ) : (
        <ServicesRequestsTable
          requests={sortedRequests}
          loading={servicesRequestsLoading}
          user={user}
        />
      )}
    </>
  );
};
