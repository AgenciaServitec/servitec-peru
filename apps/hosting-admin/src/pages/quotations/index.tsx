import { useMemo, useState } from "react";
import { Spin } from "antd";
import { QuotationTable } from "./QuotationTable.tsx";
import { Button, CanAccess, Col, Row, Title, Toolbar } from "../../components";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDebounce, useFilters } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function QuotationsIntegrations() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const { filters, handleFilterChange, resetFilters } = useFilters({
    search: "",
    dateRange: null as [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const isFiltering = filters.search !== debouncedSearch;

  const { data: quotations = [], isLoading } = useQuery({
    queryKey: ["quotations"],
    queryFn: async () => {
      const q = query(
        collection(firestore, "quotations"),
        where("isDeleted", "==", false)
      );
      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
    staleTime: 1000 * 60 * 5,
  });

  const filteredQuotations = useMemo(() => {
    let result = [...quotations];

    if (filters.dateRange?.[0] && filters.dateRange?.[1]) {
      const start = filters.dateRange[0].startOf("day");
      const end = filters.dateRange[1].endOf("day");
      result = result.filter((q: any) => {
        const dateRaw = q.createAt?.seconds ? q.createAt.toDate() : q.createAt;
        const date = dayjs(dateRaw);
        return (
          (date.isAfter(start) || date.isSame(start)) &&
          (date.isBefore(end) || date.isSame(end))
        );
      });
    }

    if (debouncedSearch && result.length > 0) {
      const fuse = new Fuse(result, {
        keys: [
          "contractNumber",
          "client.firstName",
          "client.paternalSurname",
          "client.companyName",
          "client.document.number",
          "device.brand",
          "device.model",
          "reportedIssueText",
          "analysisText",
          "solutionAndRecommendationsText",
          "quotationDetails.descriptionText",
        ],
        threshold: 0.3,
        distance: 100,
      });
      result = fuse.search(debouncedSearch).map((r) => r.item);
    }

    return result;
  }, [quotations, filters.dateRange, debouncedSearch]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Cotizaciones
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FontAwesomeIcon icon={faPlus} />}
              size="large"
              onClick={() => navigate("/quotations/new")}
            >
              Agregar Cotización
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Toolbar
          totalCount={filteredQuotations.length}
          searchText={filters.search}
          onSearchChange={(val) => handleFilterChange("search", val)}
          dateRange={filters.dateRange}
          onDateRangeChange={(dates) => handleFilterChange("dateRange", dates)}
          viewTypeValue={viewType}
          onViewChange={setViewType}
          onClear={resetFilters}
        />
      </Col>

      <Col span={24}>
        <CanAccess permission="quotes_view_all">
          <Spin
            spinning={isLoading || isFiltering}
            tip={isLoading ? "Descargando..." : "Buscando..."}
          >
            <QuotationTable
              quotations={filteredQuotations}
              quotationsLoading={isLoading}
            />
          </Spin>
        </CanAccess>
      </Col>
    </Row>
  );
}
