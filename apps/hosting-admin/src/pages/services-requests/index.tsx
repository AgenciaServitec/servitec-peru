import { useCollectionData } from "react-firebase-hooks/firestore";
import { servicesRequestsRef, usersRef } from "../../firebase/collections";
import { CanAccess, Col, Row, Select, Title, Toolbar } from "../../components";
import { ServicesRequestsCards } from "./ServicesRequestsCards.tsx";
import { ModalProvider, useAuthentication } from "../../providers";
import { useMemo, useState } from "react";
import { useDebounce, useFilters } from "../../hooks";
import dayjs from "dayjs";
import { Spin, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../globalTypes.ts";

export const ServicesRequestsIntegrations = () => {
  const { authUser } = useAuthentication();
  const { filters, handleFilterChange, resetFilters } = useFilters({
    search: "",
    district: "all",
    priority: "all",
    dateRange: null,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const [users, usersLoading] = useCollectionData<User>(
    usersRef.where("isDeleted", "==", false)
  );

  const [servicesRequests, servicesRequestsLoading] = useCollectionData(
    servicesRequestsRef
      .where("isDeleted", "==", false)
      .orderBy("createAt", "desc")
  );

  const filteredData = useMemo(() => {
    if (!servicesRequests) return [];

    return servicesRequests.filter((req) => {
      const matchesSearch =
        !debouncedSearch ||
        req.client?.fullName
          ?.toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      let matchesDate = true;
      if (filters.dateRange?.[0] && filters.dateRange?.[1]) {
        const reqDate = dayjs(req.createAt?.toDate());
        matchesDate =
          reqDate.isAfter(filters.dateRange[0].startOf("day")) &&
          reqDate.isBefore(filters.dateRange[1].endOf("day"));
      }

      const matchesDistrict =
        filters.district === "all" ||
        req.location?.district === filters.district;
      const matchesPriority =
        filters.priority === "all" || req.priority === filters.priority;

      return matchesSearch && matchesDate && matchesDistrict && matchesPriority;
    });
  }, [servicesRequests, debouncedSearch, filters]);

  return (
    <ModalProvider>
      <ServicesRequests
        users={users}
        user={authUser}
        filters={filters}
        filteredData={filteredData}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        servicesRequestsLoading={servicesRequestsLoading}
        isSearching={filters.search !== debouncedSearch}
      />
    </ModalProvider>
  );
};

interface ServicesRequestsProps {
  users: User[] | undefined;
  user: any;
  filters: any;
  filteredData: any[];
  handleFilterChange: (val: any) => void;
  resetFilters: () => void;
  servicesRequestsLoading: boolean;
  isSearching: boolean;
}

const ServicesRequests: React.FC<ServicesRequestsProps> = ({
  users,
  user,
  filters,
  filteredData,
  handleFilterChange,
  resetFilters,
  servicesRequestsLoading,
  isSearching,
}) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const onViewChange = (val) => setViewType(val);

  return (
    <CanAccess permission="service_view_all">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2} style={{ margin: 0 }}>
            Solicitudes de Servicio
          </Title>
        </Col>
        <Col span={24}>
          <Toolbar
            totalCount={filteredData.length}
            searchText={filters.search}
            onSearchChange={(val) => handleFilterChange("search", val)}
            dateRange={filters.dateRange}
            onDateRangeChange={(dates) =>
              handleFilterChange("dateRange", dates)
            }
            viewTypeValue={viewType}
            onViewChange={setViewType}
            onClear={resetFilters}
            extraFilters={
              <>
                <Select
                  placeholder="Distrito"
                  value={filters.district}
                  prefix={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                  onChange={(v) => handleFilterChange("district", v || "all")}
                  size="large"
                  allowClear
                  options={[
                    { value: "all", label: "Todos los distritos" },
                    { value: "Chorrillos", label: "Chorrillos" },
                    { value: "Surco", label: "Santiago de Surco" },
                    { value: "Miraflores", label: "Miraflores" },
                  ]}
                />
                <Select
                  placeholder="Prioridad"
                  value={filters.priority}
                  prefix={<FontAwesomeIcon icon={faTriangleExclamation} />}
                  onChange={(v) => handleFilterChange("priority", v || "all")}
                  size="large"
                  allowClear
                  options={[
                    { value: "all", label: "Todas las prioridades" },
                    { value: "low", label: "Baja" },
                    { value: "normal", label: "Normal" },
                    { value: "high", label: "Alta" },
                    { value: "urgent", label: "Urgente" },
                  ]}
                />
              </>
            }
            extraTags={
              <>
                {filters.district !== "all" && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("district", "all")}
                    color="blue"
                  >
                    {filters.district}
                  </Tag>
                )}
                {filters.priority !== "all" && (
                  <Tag
                    closable
                    onClose={() => handleFilterChange("priority", "all")}
                    color="orange"
                  >
                    Prioridad: {filters.priority.toUpperCase()}
                  </Tag>
                )}
              </>
            }
          />
        </Col>

        <Col span={24}>
          <Spin
            spinning={servicesRequestsLoading || isSearching}
            tip="Sincronizando solicitudes..."
          >
            <ServicesRequestsCards
              users={users || []}
              viewType={viewType}
              user={user}
              servicesRequests={filteredData}
              servicesRequestsLoading={servicesRequestsLoading}
            />
          </Spin>
        </Col>
      </Row>
    </CanAccess>
  );
};
