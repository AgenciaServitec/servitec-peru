import { useCollectionData } from "react-firebase-hooks/firestore";
import { servicesRequestsRef } from "../../firebase/collections";
import { Col, Row } from "../../components";
import { ServicesRequestsCards } from "./ServicesRequestsCards.tsx";
import { ModalProvider } from "../../providers";
import { RequestToolbar } from "./RequestToolbar.tsx";
import { useMemo, useState } from "react";

export const ServicesRequestsIntegrations = () => {
  const [servicesRequests, servicesRequestsLoading, servicesRequestsError] =
    useCollectionData(
      servicesRequestsRef
        .where("isDeleted", "==", false)
        .orderBy("createAt", "desc")
    );

  if (servicesRequestsError) {
    console.error("Error en Firebase:", servicesRequestsError);
  }

  const generalRequests = useMemo(() => {
    if (!servicesRequests) return [];
    return servicesRequests.filter(
      (req) => req.status === "pending" && !req.assignment
    );
  }, [servicesRequests]);

  return (
    <ModalProvider>
      <ServicesRequests
        generalRequests={generalRequests}
        servicesRequestsLoading={servicesRequestsLoading}
      />
    </ModalProvider>
  );
};

interface ServicesRequestsProps {
  generalRequests: any[];
  servicesRequestsLoading: boolean;
}

const ServicesRequests: React.FC<ServicesRequestsProps> = ({
  generalRequests,
  servicesRequestsLoading,
}) => {
  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("all");
  const [priority, setPriority] = useState("all");

  const filteredData = useMemo(() => {
    return (generalRequests || []).filter((req) => {
      const matchesSearch = req.client?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesDistrict =
        district === "all" ||
        req.location?.district?.toLowerCase() === district.toLowerCase();
      const matchesPriority = priority === "all" || req.priority === priority;
      return matchesSearch && matchesDistrict && matchesPriority;
    });
  }, [generalRequests, search, district, priority]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <RequestToolbar
          totalCount={filteredData.length}
          searchTextValue={search}
          districtValue={district}
          priorityValue={priority}
          onSearch={setSearch}
          onFilterChange={(type, value) => {
            if (type === "district") setDistrict(value);
            if (type === "priority") setPriority(value);
          }}
          onClear={() => {
            setSearch("");
            setDistrict("all");
            setPriority("all");
          }}
        />
      </Col>

      <Col span={24}>
        <ServicesRequestsCards
          servicesRequests={filteredData}
          servicesRequestsLoading={servicesRequestsLoading}
          onShowServiceDetail={(req) => console.log(req)}
        />
      </Col>
    </Row>
  );
};
