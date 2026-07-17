import React, { useMemo } from "react";
import { orderBy } from "lodash";
import styled from "styled-components";
import { Empty, Tabs } from "../../components";
import { ServiceRequestCard } from "./ServiceRequestCard";
import { ServicesRequestsTable } from "./ServicesRequestsTable";
import type { User } from "../../globalTypes.ts";

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
  users: User[];
  user: any;
  servicesRequests: any[];
  servicesRequestsLoading: boolean;
  viewType: "grid" | "list";
  source: "web" | "mobile"; // <-- Agregado
}

export const ServicesRequestsCards: React.FC<Props> = ({
  users,
  user,
  servicesRequests,
  servicesRequestsLoading,
  viewType,
  source, // <-- Agregado
}) => {
  const { pendingRequests, myRequests } = useMemo(() => {
    const sorted = orderBy(
      servicesRequests || [],
      [(item) => item.createAt?.seconds || 0],
      ["desc"]
    );

    return {
      pendingRequests: sorted.filter((req) => !req.technicalId),
      myRequests: sorted.filter((req) => req.technicalId === user?.id),
    };
  }, [servicesRequests, user?.id]);

  const renderContent = (data: any[]) => {
    if (data.length === 0) return <Empty description="No hay solicitudes" />;

    return viewType === "grid" ? (
      <RequestsGrid>
        {data.map((request) => (
          <ServiceRequestCard
            key={request.id}
            users={users}
            user={user}
            data={request}
            source={source} // <-- Pasamos el origen al renderizador de la tarjeta
          />
        ))}
      </RequestsGrid>
    ) : (
      <ServicesRequestsTable
        requests={data}
        loading={servicesRequestsLoading}
        user={user}
        source={source} // <-- Pasamos el origen a la tabla
      />
    );
  };

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      items={[
        {
          key: "1",
          label: `SOLICITUDES ENTRANTES (${pendingRequests.length})`,
          children: (
            <div style={{ marginTop: 16 }}>
              {renderContent(pendingRequests)}
            </div>
          ),
        },
        {
          key: "2",
          label: `MIS TRABAJOS (${myRequests.length})`,
          children: (
            <div style={{ marginTop: 16 }}>{renderContent(myRequests)}</div>
          ),
        },
      ]}
    />
  );
};
