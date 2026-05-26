import { useMemo, useRef, useState } from "react";
import { useDefaultFirestoreProps } from "../../../hooks";
import {
  Alert,
  Button,
  Col,
  ComponentContainer,
  Radio,
  Row,
  Spin,
  Tabs,
  Typography,
  useModalConfirm,
  useNotification,
} from "../../../components";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";
import { deleteEntry, updateEntry } from "../../../firebase/collections";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import styled, { css, useTheme } from "styled-components";
import { RenderBubbles } from "./RenderBubbles.tsx";
import { RenderList } from "./RenderList.tsx";
import type { Entry } from "../../../globalTypes.ts";
import { DrawerDetails } from "./DrawerDetails.tsx";
import { orderBy } from "lodash";

const { Title } = Typography;

export const EntriesIntegration = () => {
  const [view, setView] = useState<"bubbles" | "list">("bubbles");
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedSite, setSelectedSite] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");

  const { assignDeleteProps, assignUpdateProps } = useDefaultFirestoreProps();

  const { modalConfirm } = useModalConfirm();
  const { notification } = useNotification();

  const theme = useTheme();

  const [entries, entriesLoading, entriesError] = useCollectionData(
    firestore.collection("entries").where("isDeleted", "==", false)
  );

  const [sites, sitesLoading, sitesError] = useCollectionData(
    firestore.collection("sites").where("isDeleted", "==", false)
  );

  const isLoading = entriesLoading || sitesLoading;
  const hasError = entriesError || sitesError;

  const filterSites = useMemo(() => {
    return sites
      ? [{ id: "all", name: "Todos" }, ...sites]
      : [{ id: "all", name: "Todos" }];
  }, [sites]);

  const handleOpenDrawer = (ticket: any) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const handleReset = () => {
    setSelectedSite("all");
    setSelectedCategory("all");
    setSelectedStatus("pending");
  };

  const filteredEntries = orderBy(entries, "createAt", "desc")?.filter(
    (entry: any) => {
      const matchesSite =
        selectedSite === "all" || entry.siteId === selectedSite;

      const matchesCategory =
        selectedCategory === "all" ||
        entry.category?.toLowerCase() === selectedCategory.toLowerCase();

      const entryStatus = entry.status || "pending";
      const matchesStatus = entryStatus === selectedStatus;

      return matchesSite && matchesCategory && matchesStatus;
    }
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && filteredEntries) {
      const allIds = filteredEntries.map((entry: any) => entry.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const onDeleteEntry = async (entry: Entry) => {
    try {
      await deleteEntry(entry.id, assignDeleteProps(entry));

      notification({
        type: "success",
        title: "¡Cliente Web eliminado exitosamente!",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onConfirmRemoveEntry = (entry: Entry): void => {
    modalConfirm({
      content: "La entrada se eliminará",
      onOk: async () => {
        await onDeleteEntry(entry);
      },
    });
  };

  const onConfirmRemoveBulk = (): void => {
    modalConfirm({
      title: "¿Estás seguro de que quieres eliminar?",
      content: `Se eliminarán ${selectedIds.length} entradas seleccionadas. Esta acción no se puede deshacer.`,
      onOk: async () => {
        try {
          const entriesToDelete = entries?.filter((entry) =>
            selectedIds.includes(entry.id)
          );

          if (entriesToDelete) {
            await Promise.all(
              entriesToDelete.map((entry) =>
                deleteEntry(entry.id, assignDeleteProps(entry))
              )
            );

            notification({
              type: "success",
              title: `¡${selectedIds.length} entradas eliminadas con éxito!`,
            });

            setSelectedIds([]);
          }
        } catch (e) {
          console.error("Error en borrado masivo:", e);
          notification({
            type: "error",
            title: "Hubo un error al eliminar las entradas",
          });
        }
      },
    });
  };

  const handleUpdateStatus = async (
    ticketId: string,
    status: "pending" | "attended"
  ) => {
    try {
      await updateEntry(
        ticketId,
        assignUpdateProps({
          status,
        })
      );

      notification({
        type: "success",
        title: "¡Estado actualizado!",
        description: "La entrada ahora está marcada como Atendida",
      });

      setSelectedTicket((prev: any) =>
        prev && prev.id === ticketId ? { ...prev, status } : prev
      );
    } catch (e) {
      console.error("Error al actualizar el estado:", e);
      notification({
        type: "error",
        title: "Hubo un error",
        description: "No se pudo actualizar el estado de la entrada.",
      });
    }
  };

  if (hasError) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "300px", width: "100%" }}
      >
        <Col xs={24} md={12}>
          <Alert
            message="Error de Conexión"
            description="Hubo un problema al cargar los datos desde Firebase. Por favor, recarga la página o inténtalo más tarde."
            type="error"
            showIcon
          />
        </Col>
      </Row>
    );
  }

  if (isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "400px", width: "100%" }}
      >
        <Col style={{ textAlign: "center" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: theme.colors.fontSecondary }}>
            Sincronizando con la base de datos...
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title
          level={4}
          style={{
            color: theme.colors.fontPrimary,
            fontWeight: 500,
          }}
        >
          Total entradas: {entries?.length}
        </Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ComponentContainer.group label="Filtrar por Cliente">
              <ScrollWrapper>
                <ScrollArrow
                  className="left"
                  onClick={() => scroll("left")}
                  icon={<FontAwesomeIcon icon={faChevronLeft} size="xs" />}
                />

                <div
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    maskImage:
                      "linear-gradient(to right, transparent, black 5%, black 95%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 5%, black 95%, transparent 100%)",
                  }}
                >
                  <ClientScrollContainer ref={scrollRef}>
                    {filterSites.map((client, i) => {
                      const isActive = selectedSite === client.id;
                      return (
                        <Button
                          key={client.id}
                          type="text"
                          onClick={() => setSelectedSite(client.id)}
                          style={{
                            borderRadius: 0,
                            borderRight:
                              i !== filterSites.length - 1
                                ? `1px solid ${theme.colors.border}`
                                : "none",
                            backgroundColor: isActive
                              ? theme.colors.bgTertiary
                              : "transparent",
                            color: isActive
                              ? theme.colors.primary
                              : theme.colors.fontSecondary,
                            fontWeight: isActive ? 600 : 400,
                            fontSize: "13px",
                            minWidth: "140px",
                          }}
                        >
                          {client.name}
                        </Button>
                      );
                    })}
                  </ClientScrollContainer>
                </div>

                <ScrollArrow
                  className="right"
                  onClick={() => scroll("right")}
                  icon={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
                />
              </ScrollWrapper>
            </ComponentContainer.group>
          </Col>

          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ComponentContainer.group label="Tipo de Entrada">
                  <div
                    style={{
                      height: "40px",
                      maxHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 12px",
                      gap: "16px",
                      background: theme.colors.bgSecondary,
                      borderRadius: theme.border_radius.md,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <Radio.Group
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                      }}
                    >
                      {[
                        { label: "Todos", value: "all" },
                        { label: "Contacto", value: "contact" },
                        { label: "Reclamos", value: "claim" },
                        { label: "Sugerencias", value: "suggestion" },
                        {
                          label: "Libro de Reclamaciones",
                          value: "complaints_book",
                        },
                      ].map((t) => {
                        const isSelected = selectedCategory === t.value;
                        return (
                          <Radio
                            key={t.value}
                            value={t.value}
                            style={{
                              color: isSelected
                                ? theme.colors.fontPrimary
                                : theme.colors.fontSecondary,
                            }}
                          >
                            <span
                              style={{
                                fontSize: "13px",
                                fontWeight: isSelected ? 600 : 400,
                              }}
                            >
                              {t.label}
                            </span>
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </div>
                </ComponentContainer.group>
              </Col>

              <Col xs={24} md={12}>
                <ComponentContainer.group label="Estado de Entrada">
                  <Radio.Group
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    buttonStyle="solid"
                    style={{ width: "100%", display: "flex" }}
                  >
                    <Radio.Button
                      value="pending"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        height: "40px",
                        lineHeight: "38px",
                      }}
                    >
                      Pendientes
                    </Radio.Button>
                    <Radio.Button
                      value="attended"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        height: "40px",
                        lineHeight: "38px",
                      }}
                    >
                      Atendidos
                    </Radio.Button>
                  </Radio.Group>
                </ComponentContainer.group>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row justify="end" gutter={[16, 16]}>
              <Col xs={24} sm={6} md={4}>
                <Button
                  type="primary"
                  block
                  danger
                  icon={<FontAwesomeIcon icon={faRotateLeft} />}
                  onClick={handleReset}
                >
                  Limpiar Filtros
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Tabs
          activeKey={view}
          type="card"
          onChange={(key) => setView(key as "bubbles" | "list")}
          className="custom-tabs"
          items={[
            {
              key: "bubbles",
              label: "RADAR",
              children: (
                <RenderBubbles
                  handleOpenDrawer={handleOpenDrawer}
                  entries={filteredEntries || []}
                  sites={sites || []}
                />
              ),
            },
            {
              key: "list",
              label: "REGISTROS",
              children: (
                <RenderList
                  entries={filteredEntries || []}
                  sites={sites || []}
                  selectedIds={selectedIds}
                  onSelectAll={handleSelectAll}
                  onSelectItem={handleSelectItem}
                  onDeleteBulk={onConfirmRemoveBulk}
                  onConfirmRemoveEntry={onConfirmRemoveEntry}
                  handleOpenDrawer={handleOpenDrawer}
                />
              ),
            },
          ]}
        />
      </Col>

      <DrawerDetails
        selectedTicket={selectedTicket}
        setOpen={setOpen}
        open={open}
        onUpdateStatus={handleUpdateStatus}
      />
    </Row>
  );
};

const ClientScrollContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.md};
    background: ${theme.colors.bgSecondary};
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    button {
      flex: 0 0 auto;
      height: 40px;
      padding: 0 20px;
      color: ${theme.colors.fontSecondary};
      transition: all 0.2s ease;

      &:hover {
        color: ${theme.colors.primary};
        background: rgba(255, 255, 255, 0.05);
      }
    }
  `}
`;

const ScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  align-items: center;
`;

const ScrollArrow = styled(Button)`
  ${({ theme }) => css`
    position: absolute;
    z-index: 10;
    width: 35px !important;
    height: 35px !important;
    min-width: 35px !important;
    padding: 0 !important;
    border-radius: 50% !important;
    background: ${theme.colors.bgTertiary} !important;
    border: 2px solid ${theme.colors.border} !important;
    color: ${theme.colors.primary} !important;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${theme.colors.border} !important;
    }

    &.left {
      left: -2px;
    }
    &.right {
      right: -2px;
    }
  `}
`;
