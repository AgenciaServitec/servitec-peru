import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Legend,
  notification,
  Row,
  Spinner,
  Title,
} from "../../components/ui";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { AssistancesTable } from "./Assistances.Table";
import { useNavigate } from "react-router-dom";
import { assistancesRef } from "../../firebase/collections";
import { useAuthentication } from "../../providers";
import { AssistancesFilter } from "./AssistancesFilter.tsx";
import { AssistancesNameFilter } from "./AssistancesNameFilter.tsx";

import type { Assistance } from "../../globalTypes.ts";
import type { DateFilter } from "./types.ts";
import { exportAssistancesExcel } from "./_utils";

export function AssistancesIntegration() {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const [resetSignal, setResetSignal] = useState(0);
  const [filteredAssistances, setFilteredAssistances] = useState<Assistance[]>(
    []
  );
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    startDate: null,
    endDate: null,
  });
  const [nameFilter, setNameFilter] = useState("");

  const [assistances, assistancesLoading, assistancesError] = useCollectionData(
    assistancesRef.where("isDeleted", "==", false)
  );

  const applyFilters = () => {
    if (!assistances) return;

    const result = assistances.filter((a) => {
      const date = a.createAt.toDate();
      const fullName = a.user.firstName.toLowerCase();

      const matchesName =
        nameFilter.trim() === "" || fullName.includes(nameFilter.toLowerCase());

      const matchesStart =
        !dateFilter.startDate || date >= dateFilter.startDate;

      const matchesEnd = !dateFilter.endDate || date <= dateFilter.endDate;

      return matchesName && matchesStart && matchesEnd;
    });

    setFilteredAssistances(result);
  };

  const clearAllFilters = () => {
    setNameFilter("");
    setDateFilter({
      startDate: null,
      endDate: null,
    });

    setResetSignal((prev) => prev + 1);
  };

  useEffect(() => {
    applyFilters();
  }, [assistances, dateFilter, nameFilter]);

  const handleFilter = (filter: DateFilter) => {
    setDateFilter(filter);
  };

  const handleNameSearch = (text: string) => {
    setNameFilter(text);
  };

  useEffect(() => {
    if (assistancesError) {
      notification({ type: "error" });
    }
  }, [assistancesError]);

  const onNavigateGoTo = (pathname = "/") => navigate(pathname);

  return (
    <>
      {assistancesLoading ? (
        <Spinner height="40svh" size="4x" />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Legend title="Filtros">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={8}>
                  <AssistancesNameFilter onSearch={handleNameSearch} />
                </Col>
                <Col xs={24} md={8}>
                  <AssistancesFilter
                    onFilter={handleFilter}
                    resetSignal={resetSignal}
                  />
                </Col>
                <Col xs={24} md={8} style={{ textAlign: "right" }}>
                  <Button onClick={clearAllFilters} danger>
                    Limpiar filtros
                  </Button>
                </Col>
              </Row>
            </Legend>
          </Col>

          <Col span={24} md={12}>
            <Button
              onClick={() => onNavigateGoTo("/assistances/assistance")}
              type="primary"
              size="large"
              block
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Marcar mi asistencia
            </Button>
          </Col>

          <Col span={24} md={12}>
            <Button
              onClick={() => onNavigateGoTo("/assistances/register")}
              size="large"
              block
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Registrar mi rostro
            </Button>
          </Col>

          <Col span={24}>
            <Title level={2}>Lista de Asistencias</Title>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              onClick={() => exportAssistancesExcel(filteredAssistances)}
            >
              Exportar a Excel
            </Button>
          </Col>
          <Col span={24}>
            <AssistancesTable
              assistances={filteredAssistances || []}
              user={authUser}
              loading={assistancesLoading}
            />
          </Col>
        </Row>
      )}
    </>
  );
}
