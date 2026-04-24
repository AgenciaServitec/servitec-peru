import React, { useMemo, useState } from "react";
import {
  Button,
  CanAccess,
  Col,
  Form,
  Row,
  Select,
  Title,
  Toolbar,
  useNotification,
} from "../../components/ui";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCameraRetro,
  faFileExcel,
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
import { useTheme } from "styled-components";

import type { Assistance } from "../../globalTypes.ts";
import { exportAssistancesExcel } from "./_utils";
import { AssistancesSubmitOrderLunch } from "./AssistancesSubmitOrderLunch.tsx";
import {
  useDebounce,
  useDefaultFirestoreProps,
  useDevice,
  useFilters,
} from "../../hooks";
import { AssistancesTable } from "./Assistances.Table.tsx";
import { canApproveLunch } from "./_utils/permissions.ts";
import { Modal, Spin, Tag } from "../../components";
import dayjs from "dayjs";

export function AssistancesIntegration() {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  const today = dayjs();
  const initialDateRange: [dayjs.Dayjs, dayjs.Dayjs] = [
    today.startOf("day"),
    today.endOf("day"),
  ];

  const { filters, handleFilterChange, resetFilters } = useFilters({
    search: "",
    dateRange: initialDateRange as [dayjs.Dayjs | null, dayjs.Dayjs | null],
    workPlace: undefined,
  });

  const debouncedSearch = useDebounce(filters.search, 500);
  const isFiltering = filters.search !== debouncedSearch;

  const [assistances, assistancesLoading, assistancesError] = useCollectionData(
    assistancesRef.where("isDeleted", "==", false)
  );

  const { notification } = useNotification();

  const assistancesView = useMemo(() => {
    if (!assistances) return [];
    const superUsers = [
      "XfQXaMRZD7Gro2kPaIvU",
      "fRiTn5k6TP5TJvpXZeLS",
      "woc2g3M8EO4RYtXFap6n",
      "UXrpXFxJhVi5Tl1MTMu2",
      "U0kKdzTPY0rVgWcCY8dV",
    ];

    return assistances.filter((a) => {
      if (superUsers.includes(authUser?.id)) return true;
      return a.userId === authUser?.id;
    });
  }, [assistances, authUser]);

  const filteredAssistances = useMemo(() => {
    let result = [...assistancesView];

    if (filters.dateRange?.[0] && filters.dateRange?.[1]) {
      const start = filters.dateRange[0].startOf("day");
      const end = filters.dateRange[1].endOf("day");

      result = result.filter((a) => {
        const date = dayjs(a.createAt.toDate());
        return (
          (date.isAfter(start) || date.isSame(start)) &&
          (date.isBefore(end) || date.isSame(end))
        );
      });
    }

    if (filters.workPlace) {
      result = result.filter((a) => a.workPlace === filters.workPlace);
    }

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (a) =>
          a.user.firstName.toLowerCase().includes(searchLower) ||
          a.user.paternalSurname.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [assistancesView, filters.dateRange, filters.workPlace, debouncedSearch]);

  const onNavigateGoTo = (pathname = "/") => navigate(pathname);

  return (
    <ModalProvider>
      <AssistancesList
        assistancesLoading={assistancesLoading}
        isFiltering={isFiltering}
        filteredAssistances={filteredAssistances}
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        setViewType={setViewType}
        onNavigateGoTo={onNavigateGoTo}
        onClear={() => handleFilterChange("dateRange", initialDateRange)}
        viewType={viewType}
        user={authUser}
        setOpen={setOpen}
        open={open}
        theme={theme}
      />
    </ModalProvider>
  );
}

function AssistancesList({
  assistancesLoading,
  isFiltering,
  filteredAssistances,
  filters,
  handleFilterChange,
  resetFilters,
  setViewType,
  onNavigateGoTo,
  viewType,
  user,
  setOpen,
  open,
  theme,
}) {
  const { onShowModal, onCloseModal } = useModal();
  const { isTablet } = useDevice();

  const { assignCreateProps } = useDefaultFirestoreProps();

  const onShowSubmitOrderLunch = (assistance: Assistance) => {
    onShowModal({
      title: "¿Pidio Almuerzo?",
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

  const mapAssistance = (user: User) => ({
    id: getAssistanceId(),
    createAtString: "21-01-2026 11:20",
    entry: {
      date: "21-01-2026 11:20",
    },
    outlet: {
      date: "21-01-2026 21:00",
    },
    userId: user.id,
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

  const workPlaceLabels: Record<string, string> = {
    "kiwi-workshop": "Tienda Kiwi",
    "servitec-study": "Estudio Servitec",
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>Asistencias</Title>
        </Col>

        <Col span={24}>
          <Toolbar
            totalCount={filteredAssistances.length}
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
              <Select
                placeholder="Lugar de Trabajo"
                value={filters.workPlace}
                prefix={<FontAwesomeIcon icon={faBuilding} />}
                onChange={(val) => handleFilterChange("workPlace", val)}
                size="large"
                allowClear
                options={[
                  { value: "kiwi-workshop", label: "Tienda Kiwi" },
                  { value: "servitec-study", label: "Estudio Servitec" },
                ]}
              />
            }
            extraTags={
              filters.workPlace && (
                <Tag
                  color="gold"
                  closable
                  onClose={() => handleFilterChange("workPlace", undefined)}
                  style={{ borderColor: "gold" }}
                >
                  Lugar: {workPlaceLabels[filters.workPlace]}
                </Tag>
              )
            }
          />
        </Col>

        <Col span={24} md={12}>
          <CanAccess permission="assist_mark_self">
            <Button
              onClick={() => onNavigateGoTo("/assistances/assistance")}
              type="primary"
              style={{
                backgroundColor: theme.colors.info,
              }}
              size="large"
              block
            >
              <FontAwesomeIcon icon={faSignInAlt} />
              Marcar mi asistencia
            </Button>
          </CanAccess>
        </Col>
        <Col span={24} md={12}>
          <CanAccess permission="assist_register_face">
            <Button
              onClick={() => onNavigateGoTo("/assistances/register")}
              size="large"
              block
            >
              <FontAwesomeIcon icon={faCameraRetro} />
              Registrar mi rostro
            </Button>
          </CanAccess>
        </Col>
        <Col span={24}>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="primary"
                onClick={() => exportAssistancesExcel(filteredAssistances)}
                style={{ backgroundColor: "#008000 " }}
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
          <CanAccess permission="assist_view_all">
            <Spin
              spinning={assistancesLoading || isFiltering}
              tip="Procesando asistencias..."
            >
              <AssistancesTable
                assistances={filteredAssistances}
                onShowSubmitOrderLunch={onShowSubmitOrderLunch}
                assistancesLoading={assistancesLoading}
                canApproveLunch={canApproveLunch(user?.id)}
              />
            </Spin>
          </CanAccess>
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
