import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Legend,
  Row,
  Title,
  useNotification,
} from "../../components/ui";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faEraser,
  faFileExcel,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {
  addAssistance,
  assistancesRef,
  fetchUser,
  getAssistanceId,
} from "../../firebase/collections";
import {
  ModalProvider,
  useAuthentication,
  useModal,
  type User,
} from "../../providers";
import { AssistancesFilter } from "./AssistancesFilter.tsx";
import { AssistancesNameFilter } from "./AssistancesNameFilter.tsx";

import type { Assistance } from "../../globalTypes.ts";
import type { DateFilter } from "./types.ts";
import { exportAssistancesExcel } from "./_utils";
import { AssistancesSubmitOrderLunch } from "./AssistancesSubmitOrderLunch.tsx";
import { useDefaultFirestoreProps, useDevice } from "../../hooks";
import { AssistancesTable } from "./Assistances.Table.tsx";
import { canApproveLunch } from "./_utils/permissions.ts";
import { Modal } from "../../components";

export function AssistancesIntegration() {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const [open, setOpen] = useState(false);
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

  const { notification } = useNotification();

  const assistancesView = (assistances || []).filter((assistance) => {
    if (
      [
        "XfQXaMRZD7Gro2kPaIvU",
        "fRiTn5k6TP5TJvpXZeLS",
        "woc2g3M8EO4RYtXFap6n",
        "UXrpXFxJhVi5Tl1MTMu2",
        "U0kKdzTPY0rVgWcCY8dV",
      ].includes(authUser?.id)
    )
      return true;
    if (assistance.userId === authUser?.id) return assistance;
    return false;
  });

  const applyFilters = () => {
    if (!assistancesView) return;

    const result = assistancesView.filter((a) => {
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
    setDateFilter({ startDate: null, endDate: null });
    setResetSignal((prev) => prev + 1);
  };

  useEffect(() => {
    applyFilters();
  }, [assistances, dateFilter, nameFilter]);

  const handleFilter = (filter: DateFilter) => setDateFilter(filter);
  const handleNameSearch = (text: string) => setNameFilter(text);

  useEffect(() => {
    if (assistancesError) notification({ type: "error" });
  }, [assistancesError]);

  const onNavigateGoTo = (pathname = "/") => navigate(pathname);

  return (
    <ModalProvider>
      <AssistancesList
        assistancesLoading={assistancesLoading}
        filteredAssistances={filteredAssistances}
        resetSignal={resetSignal}
        onFilter={handleFilter}
        onSearchName={handleNameSearch}
        onClearFilters={clearAllFilters}
        onNavigateGoTo={onNavigateGoTo}
        user={authUser}
        setOpen={setOpen}
        open={open}
      />
    </ModalProvider>
  );
}

function AssistancesList({
  assistancesLoading,
  filteredAssistances,
  resetSignal,
  onFilter,
  onSearchName,
  onClearFilters,
  onNavigateGoTo,
  user,
  setOpen,
  open,
}) {
  const { onShowModal, onCloseModal } = useModal();
  const { isTablet } = useDevice();

  const { assignCreateProps } = useDefaultFirestoreProps();

  const onShowSubmitOrderLunch = (assistance: Assistance) => {
    onShowModal({
      title: "Pidio Almuerzo?",
      width: `${isTablet ? "90%" : "50%"}`,
      onRenderBody: () => (
        <AssistancesSubmitOrderLunch
          key={assistance.id}
          assistance={assistance}
          onCloseModal={onCloseModal}
        />
      ),
    });
  };
  // 11:20 a 21:00

  const mapAssistance = (user: User) => ({
    id: getAssistanceId(),
    createAtString: "21-01-2026 11:20",
    entry: {
      date: "21-01-2026 11:20",
    },
    outlet: {
      date: "21-01-2026 21:00",
    },
    userId: "AQwioreyVabvnTYmj6tH",
    minutesWorked: 0,
    workPlace: "Servitec",
    user,
  });

  const onSaveAssistances = async () => {
    try {
      const user = await fetchUser("AQwioreyVabvnTYmj6tH");

      await addAssistance(assignCreateProps<Assistance>(mapAssistance(user)));

      console.log("SATISFACTORIO!!!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={6} md={4}>
          <Button onClick={onSaveAssistances} type="primary" size="large" block>
            <FontAwesomeIcon icon={faPlus} />
            Agregar Asistencia
          </Button>
        </Col>
        <Col span={24}>
          <Legend title="Filtros">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8}>
                <AssistancesNameFilter onSearch={onSearchName} />
              </Col>
              <Col xs={24} md={8}>
                <AssistancesFilter
                  onFilter={onFilter}
                  resetSignal={resetSignal}
                />
              </Col>
              <Col xs={24} md={8} style={{ textAlign: "right" }}>
                <Button size="large" onClick={onClearFilters}>
                  <FontAwesomeIcon icon={faEraser} />
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
            <FontAwesomeIcon icon={faCameraRetro} />
            Registrar mi rostro
          </Button>
        </Col>
        <Col span={24}>
          <Title level={2}>Lista de Asistencias</Title>
        </Col>
        <Col span={24}>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="primary"
                onClick={() => exportAssistancesExcel(filteredAssistances)}
                size="large"
                block
              >
                <FontAwesomeIcon icon={faFileExcel} />
                Exportar a Excel
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <AssistancesTable
            assistances={filteredAssistances || []}
            onShowSubmitOrderLunch={onShowSubmitOrderLunch}
            assistancesLoading={assistancesLoading}
            canApproveLunch={canApproveLunch(user?.id)}
          />
        </Col>
      </Row>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Agregar Asistencia"
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancelar
          </Button>,
          <Button key="save" type="primary" onClick={() => ""}>
            Guardar
          </Button>,
        ]}
      >
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={24}></Col>
            <Col span={24}></Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
