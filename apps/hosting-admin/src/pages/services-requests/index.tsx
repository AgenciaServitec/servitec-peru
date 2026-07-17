import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  servicesRequestsRef,
  mobileServicesRequestsRef,
  usersRef,
} from "../../firebase/collections";
import { CanAccess, Col, Row, Select, Title, Toolbar } from "../../components";
import { ServicesRequestsCards } from "./ServicesRequestsCards.tsx";
import { ModalProvider, useAuthentication } from "../../providers";
import { useMemo, useState } from "react";
import { useDebounce, useFilters } from "../../hooks";
import dayjs from "dayjs";
import { Spin, Tag, Radio } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTriangleExclamation,
  faGlobe,
  faMobileScreen,
} from "@fortawesome/free-solid-svg-icons";
import type { User } from "../../globalTypes.ts";

export const ServicesRequestsIntegrations = () => {
  const { authUser } = useAuthentication();
  const [source, setSource] = useState<"web" | "mobile">("web");

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

  const currentCollectionRef =
    source === "web" ? servicesRequestsRef : mobileServicesRequestsRef;

  // CAPTURAMOS EL ERROR: Abre la consola F12 si sale vacío, ahí estará el link para crear tu índice de Firestore
  const [servicesRequests, servicesRequestsLoading, error] = useCollectionData(
    currentCollectionRef
      .where("isDeleted", "==", false)
      .orderBy("createAt", "desc")
  );

  if (error) {
    console.error(
      "Error cargando solicitudes de Firestore. Revisa si falta crear el índice index:",
      error
    );
  }

  const filteredData = useMemo(() => {
    if (!servicesRequests) return [];

    return servicesRequests.filter((req) => {
      const clientName =
        req.client?.fullName ||
        req.client?.names ||
        req.client?.firstName ||
        "";
      const matchesSearch =
        !debouncedSearch ||
        clientName.toLowerCase().includes(debouncedSearch.toLowerCase());

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
        source={source}
        setSource={setSource}
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
  source: "web" | "mobile";
  setSource: (val: "web" | "mobile") => void;
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
  source,
  setSource,
}) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  return (
    <CanAccess permission="service_view_all">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} style={{ margin: 0 }}>
                Solicitudes de Servicio
              </Title>
            </Col>
            <Col>
              <Radio.Group
                value={source}
                onChange={(e) => setSource(e.target.value)}
                buttonStyle="solid"
                size="large"
              >
                <Radio.Button value="web">
                  <FontAwesomeIcon icon={faGlobe} style={{ marginRight: 8 }} />
                  Plataforma Web
                </Radio.Button>
                <Radio.Button value="mobile">
                  <FontAwesomeIcon
                    icon={faMobileScreen}
                    style={{ marginRight: 8 }}
                  />
                  App Móvil
                </Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
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
              source={source} // <-- Enviamos el origen a las tarjetas
            />
          </Spin>
        </Col>
      </Row>
    </CanAccess>
  );
};
