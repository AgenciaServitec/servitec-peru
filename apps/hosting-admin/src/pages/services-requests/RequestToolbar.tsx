import React from "react";
import {
  Button,
  DatePicker,
  Input,
  Segmented,
  Select,
  Space,
  Tag,
  Typography,
} from "../../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEraser,
  faLaptopMedical,
  faListUl,
  faLocationDot,
  faSearch,
  faStore,
  faTableCellsLarge,
  faTriangleExclamation,
  faUserGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0 20px 0;
  margin-bottom: 12px;
`;

const MainBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ViewActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 12px;
`;

const TECHNICIAN_OPTIONS = [
  { label: "Todos los técnicos", value: "all" },
  { label: "Carlos Mendoza", value: "T001" },
  { label: "Ricardo Palma", value: "T002" },
  { label: "Sofía Loli", value: "T003" },
];

const DISTRICT_OPTIONS = [
  { label: "Todos los distritos", value: "all" },
  { label: "Chorrillos", value: "chorrillos" },
  { label: "Miraflores", value: "miraflores" },
  { label: "Surco", value: "surco" },
];

const PRIORITY_OPTIONS = [
  { label: "Todas las prioridades", value: "all" },
  { label: "Urgente", value: "high" },
  { label: "Normal", value: "medium" },
  { label: "Baja", value: "low" },
];

const SERVICE_MODE_OPTIONS = [
  { label: "Todos los servicios", value: "all" },
  { label: "A domicilio", value: "home-service" },
  { label: "En tienda", value: "store-visit" },
];

const CATEGORY_OPTIONS = [
  { label: "Todas las categorías", value: "all" },
  { label: "Smartphone", value: "smartphone" },
  { label: "Laptop", value: "laptop" },
  { label: "Tablet", value: "tablet" },
  { label: "Smartwatch", value: "smartwatch" },
];

interface RequestToolbarProps {
  totalCount: number;
  searchTextValue: string;
  districtValue: string;
  priorityValue: string;
  technicianValue: string;
  serviceModeValue: string;
  categoryValue: string;
  viewTypeValue: "grid" | "list";
  dateRangeValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  onSearch: (value: string) => void;
  onFilterChange: (type: string, value: any) => void;
  onViewChange: (value: "grid" | "list") => void;
  onClear: () => void;
}

export const RequestToolbar: React.FC<RequestToolbarProps> = ({
  totalCount,
  searchTextValue,
  districtValue,
  priorityValue,
  technicianValue,
  serviceModeValue,
  categoryValue,
  viewTypeValue,
  dateRangeValue,
  onSearch,
  onFilterChange,
  onViewChange,
  onClear,
}) => {
  const hasFilters =
    searchTextValue ||
    districtValue !== "all" ||
    priorityValue !== "all" ||
    technicianValue !== "all" ||
    serviceModeValue !== "all" ||
    categoryValue !== "all" ||
    dateRangeValue !== null;

  return (
    <ToolbarWrapper>
      <MainBar>
        <TopRow>
          <Input
            placeholder="Buscar cliente, equipo o imei..."
            value={searchTextValue}
            prefix={<FontAwesomeIcon icon={faSearch} />}
            onChange={(e) => onSearch(e.target.value)}
            allowClear
          />

          <RangePicker
            value={dateRangeValue}
            placeholder={["Desde", "Hasta"]}
            prefix={<FontAwesomeIcon icon={faCalendarDays} />}
            suffixIcon={""}
            onChange={(dates) => onFilterChange("dateRange", dates)}
            allowClear
          />
        </TopRow>

        <FilterGrid>
          <Select
            value={technicianValue === "all" ? undefined : technicianValue}
            placeholder="Técnico"
            prefix={<FontAwesomeIcon icon={faUserGear} />}
            onChange={(val) => onFilterChange("technician", val || "all")}
            options={TECHNICIAN_OPTIONS}
            allowClear
          />

          <Select
            value={categoryValue === "all" ? undefined : categoryValue}
            placeholder="Categoría"
            prefix={<FontAwesomeIcon icon={faLaptopMedical} />}
            onChange={(val) => onFilterChange("category", val || "all")}
            options={CATEGORY_OPTIONS}
            allowClear
          />

          <Select
            value={serviceModeValue === "all" ? undefined : serviceModeValue}
            placeholder="Tipo de servicio"
            prefix={<FontAwesomeIcon icon={faStore} />}
            onChange={(val) => onFilterChange("serviceMode", val || "all")}
            options={SERVICE_MODE_OPTIONS}
            allowClear
          />

          <Select
            value={districtValue === "all" ? undefined : districtValue}
            placeholder="Distrito"
            prefix={<FontAwesomeIcon icon={faLocationDot} />}
            onChange={(val) => onFilterChange("district", val || "all")}
            options={DISTRICT_OPTIONS}
            allowClear
          />

          <Select
            value={priorityValue === "all" ? undefined : priorityValue}
            placeholder="Prioridad"
            prefix={<FontAwesomeIcon icon={faTriangleExclamation} />}
            onChange={(val) => onFilterChange("priority", val || "all")}
            options={PRIORITY_OPTIONS}
            allowClear
          />

          {hasFilters && (
            <Button
              type="primary"
              danger
              onClick={onClear}
              icon={<FontAwesomeIcon icon={faEraser} />}
            >
              Limpiar
            </Button>
          )}
        </FilterGrid>

        <ViewActionsRow>
          <Space size={8} wrap>
            <Text style={{ fontSize: 13, color: "#8c8c8c", marginRight: 8 }}>
              Se encontraron{" "}
              <Text style={{ color: "#fff", fontWeight: 600 }}>
                {totalCount}
              </Text>{" "}
              solicitudes
            </Text>

            {dateRangeValue && (
              <Tag
                closable
                onClose={() => onFilterChange("dateRange", null)}
                closeIcon={
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ fontSize: 9, color: "#fff" }}
                  />
                }
                style={{
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid #434343",
                }}
              >
                periodo: {dateRangeValue[0]?.format("DD/MM/YY")} -{" "}
                {dateRangeValue[1]?.format("DD/MM/YY")}
              </Tag>
            )}

            {technicianValue !== "all" && (
              <Tag
                closable
                onClose={() => onFilterChange("technician", "all")}
                closeIcon={
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ fontSize: 9, color: "#fff" }}
                  />
                }
                style={{
                  borderRadius: "4px",
                  background: "rgba(24, 144, 255, 0.15)",
                  border: "1px solid #177ddc",
                }}
              >
                técnico:{" "}
                {
                  TECHNICIAN_OPTIONS.find((t) => t.value === technicianValue)
                    ?.label
                }
              </Tag>
            )}

            {categoryValue !== "all" && (
              <Tag
                closable
                onClose={() => onFilterChange("category", "all")}
                closeIcon={
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ fontSize: 9, color: "#fff" }}
                  />
                }
                style={{
                  borderRadius: "4px",
                  background: "rgba(250, 173, 20, 0.1)",
                  border: "1px solid #faad14",
                }}
              >
                categoría:{" "}
                {CATEGORY_OPTIONS.find((c) => c.value === categoryValue)?.label}
              </Tag>
            )}

            {serviceModeValue !== "all" && (
              <Tag
                closable
                onClose={() => onFilterChange("serviceMode", "all")}
                closeIcon={
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ fontSize: 9, color: "#fff" }}
                  />
                }
                style={{
                  borderRadius: "4px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid #434343",
                }}
              >
                servicio:{" "}
                {
                  SERVICE_MODE_OPTIONS.find((s) => s.value === serviceModeValue)
                    ?.label
                }
              </Tag>
            )}
          </Space>

          <Segmented
            size="large"
            value={viewTypeValue}
            onChange={(val) => onViewChange(val as "grid" | "list")}
            options={[
              {
                value: "grid",
                icon: (
                  <FontAwesomeIcon
                    icon={faTableCellsLarge}
                    style={{ fontSize: 14 }}
                  />
                ),
              },
              {
                value: "list",
                icon: (
                  <FontAwesomeIcon icon={faListUl} style={{ fontSize: 14 }} />
                ),
              },
            ]}
            style={{ padding: "4px", borderRadius: "8px" }}
          />
        </ViewActionsRow>
      </MainBar>
    </ToolbarWrapper>
  );
};
