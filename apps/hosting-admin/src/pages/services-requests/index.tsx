import { useCollectionData } from "react-firebase-hooks/firestore";
import { servicesRequestsRef } from "../../firebase/collections";
import { Col, Row, Select } from "../../components";
import { ServicesRequestsCards } from "./ServicesRequestsCards.tsx";
import { ModalProvider, useAuthentication } from "../../providers";
import { RequestToolbar } from "./RequestToolbar.tsx";
import { useMemo, useState } from "react";
import { useDebounce, useFilters } from "../../hooks";
import dayjs from "dayjs";

export const ServicesRequestsIntegrations = () => {
  const { authUser } = useAuthentication();
  const { filters, handleFilterChange, resetFilters } = useFilters({
    search: "",
    district: "all",
    priority: "all",
    dateRange: null,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const [servicesRequests, servicesRequestsLoading, servicesRequestsError] =
    useCollectionData(
      servicesRequestsRef
        .where("isDeleted", "==", false)
        .orderBy("createAt", "desc")
    );

  const filteredData = useMemo(() => {
    return (servicesRequests || []).filter((req) => {
      const matchesSearch =
        !debouncedSearch ||
        req.client?.fullName
          ?.toLowerCase()
          .includes(debouncedSearch.toLowerCase());

      let matchesDate = true;
      if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
        const reqDate = dayjs(req.createAt?.toDate());
        matchesDate =
          reqDate.isAfter(filters.dateRange[0].startOf("day")) &&
          reqDate.isBefore(filters.dateRange[1].endOf("day"));
      }

      const matchesDistrict =
        filters.district === "all" || req.district === filters.district;

      return matchesSearch && matchesDate && matchesDistrict;
    });
  }, [servicesRequests, debouncedSearch, filters]);

  return (
    <ModalProvider>
      <ServicesRequests
        user={authUser}
        filters={filters}
        filteredData={filteredData}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        servicesRequestsLoading={servicesRequestsLoading}
      />
    </ModalProvider>
  );
};

interface ServicesRequestsProps {
  user: any;
  filters: any;
  filteredData: any[];
  handleFilterChange: (val: any) => void;
  resetFilters: () => void;
  servicesRequestsLoading: boolean;
}

const ServicesRequests: React.FC<ServicesRequestsProps> = ({
  user,
  filters,
  filteredData,
  handleFilterChange,
  resetFilters,
  servicesRequestsLoading,
}) => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const onViewChange = (val) => setViewType(val);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <RequestToolbar
          searchText={filters.search}
          totalCount={filteredData.length}
          dateRange={filters.dateRange}
          onDateRangeChange={handleFilterChange}
          viewTypeValue={viewType}
          onClear={resetFilters}
          extraFilters={
            <>
              <Select
                value={filters.district}
                onChange={(v) => handleFilterChange("district", v)}
                options={[]}
              />
            </>
          }
        />
      </Col>

      <Col span={24}>
        <ServicesRequestsCards
          viewType={viewType}
          user={user}
          servicesRequests={filteredData}
          servicesRequestsLoading={servicesRequestsLoading}
        />
      </Col>
    </Row>
  );
};
