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
} from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEraser,
  faFileExcel,
  faListUl,
  faLocationDot,
  faSearch,
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const MainBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled(Space)`
  flex-wrap: wrap;
  width: 100%;

  .ant-space-item {
    @media (max-width: 1024px) {
      width: 100% !important;
      max-width: none !important;
    }
  }

  @media (min-width: 1025px) {
    width: auto;
  }
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

interface RequestToolbarProps {
  totalCount: number;
  searchTextValue: string;
  districtValue: string;
  priorityValue: string;
  technicianValue: string;
  dateRangeValue: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  onSearch: (value: string) => void;
  onFilterChange: (type: string, value: any) => void;
  onClear: () => void;
  onExport?: () => void;
}

export const RequestToolbar: React.FC<RequestToolbarProps> = ({
  totalCount,
  searchTextValue,
  districtValue,
  priorityValue,
  technicianValue,
  dateRangeValue,
  onSearch,
  onFilterChange,
  onClear,
  onExport,
}) => {
  const hasFilters =
    searchTextValue ||
    districtValue !== "all" ||
    priorityValue !== "all" ||
    technicianValue !== "all" ||
    dateRangeValue !== null;

  const elementStyle = { borderRadius: "8px", height: 38 };

  return (
    <ToolbarWrapper>
      <MainBar>
        <FilterGroup size={12} wrap>
          <Input
            placeholder="Buscar cliente, equipo o imei..."
            value={searchTextValue}
            prefix={
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: "#8c8c8c", fontSize: 13 }}
              />
            }
            style={{ ...elementStyle, width: "100%", maxWidth: "340px" }}
            onChange={(e) => onSearch(e.target.value)}
            allowClear
          />

          <RangePicker
            value={dateRangeValue}
            placeholder={["Desde", "Hasta"]}
            style={{
              ...elementStyle,
              width: "100%",
              maxWidth: "340px",
              background: "transparent",
            }}
            suffixIcon={
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ fontSize: 12, color: "#8c8c8c" }}
              />
            }
            onChange={(dates) => onFilterChange("dateRange", dates)}
            allowClear
          />

          <Select
            value={technicianValue === "all" ? undefined : technicianValue}
            placeholder="Técnico"
            style={{ ...elementStyle, width: "100%", maxWidth: "340px" }}
            suffixIcon={
              <FontAwesomeIcon icon={faUserGear} style={{ fontSize: 11 }} />
            }
            onChange={(val) => onFilterChange("technician", val || "all")}
            options={TECHNICIAN_OPTIONS}
            allowClear
          />

          <Select
            value={districtValue === "all" ? undefined : districtValue}
            placeholder="Distrito"
            style={{ ...elementStyle, width: "100%", maxWidth: "340px" }}
            suffixIcon={
              <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 10 }} />
            }
            onChange={(val) => onFilterChange("district", val || "all")}
            options={DISTRICT_OPTIONS}
            allowClear
          />

          <Select
            value={priorityValue === "all" ? undefined : priorityValue}
            placeholder="Prioridad"
            style={{ ...elementStyle, width: "100%", maxWidth: "340px" }}
            suffixIcon={
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ fontSize: 10 }}
              />
            }
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
              style={{ ...elementStyle, width: "100%" }}
            >
              Limpiar
            </Button>
          )}
        </FilterGroup>

        <Segmented
          size="large"
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
      </MainBar>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Space size={8} wrap>
          <Text style={{ fontSize: 13, color: "#8c8c8c", marginRight: 8 }}>
            Se encontraron{" "}
            <Text style={{ color: "#fff", fontWeight: 600 }}>{totalCount}</Text>{" "}
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
                color: "#fff",
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
                color: "#fff",
              }}
            >
              técnico:{" "}
              {
                TECHNICIAN_OPTIONS.find((t) => t.value === technicianValue)
                  ?.label
              }
            </Tag>
          )}
        </Space>

        <Button
          onClick={onExport}
          icon={<FontAwesomeIcon icon={faFileExcel} />}
          style={{
            background: "#217346",
            color: "#ffffff",
            borderRadius: "6px",
            fontSize: "12px",
            height: "32px",
            border: "none",
          }}
        >
          Exportar excel
        </Button>
      </div>
    </ToolbarWrapper>
  );
};
