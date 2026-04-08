import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Input,
  Segmented,
  Space,
  Tag,
  Typography,
} from "../../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEraser,
  faListUl,
  faSearch,
  faTableCellsLarge,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0 0 0;
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

interface RequestToolbarProps {
  viewTypeValue: "grid" | "list";
  totalCount: number;
  searchText: string;
  onSearchChange: (val: string) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  onDateRangeChange: (dates: any) => void;
  onClear: () => void;
  onViewChange: (view: "grid" | "list") => void;
  extraFilters?: React.ReactNode;
  extraTags?: React.ReactNode;
}

export const RequestToolbar: React.FC<RequestToolbarProps> = ({
  totalCount,
  viewTypeValue,
  searchText,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onClear,
  onViewChange,
  extraFilters,
  extraTags,
}) => {
  const [localValue, setLocalValue] = useState(searchText);

  useEffect(() => {
    setLocalValue(searchText);
  }, [searchText]);

  const hasFilters = !!(
    searchText ||
    (dateRange && dateRange[0]) ||
    extraFilters
  );

  return (
    <ToolbarWrapper>
      <MainBar>
        <TopRow>
          <Input
            placeholder="Buscar cliente, equipo o imei..."
            value={localValue}
            prefix={<FontAwesomeIcon icon={faSearch} />}
            size="large"
            onChange={(e) => {
              const val = e.target.value;
              setLocalValue(val);
              onSearchChange(val);
            }}
            allowClear
          />

          <RangePicker
            value={dateRange}
            placeholder={["Desde", "Hasta"]}
            prefix={<FontAwesomeIcon icon={faCalendarDays} />}
            suffixIcon={""}
            size="large"
            onChange={onDateRangeChange}
            allowClear
            style={{ width: "100%" }}
          />
        </TopRow>

        {extraFilters && (
          <FilterGrid>
            {extraFilters}
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
        )}

        <ViewActionsRow>
          <Space size={8} wrap>
            <Text style={{ fontSize: 13, color: "#8c8c8c", marginRight: 8 }}>
              Se encontraron{" "}
              <Text style={{ fontWeight: 600 }}>{totalCount}</Text> resultados
            </Text>

            {dateRange && dateRange[0] && (
              <Tag
                closable
                onClose={() => onDateRangeChange(null)}
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
                periodo: {dateRange[0]?.format("DD/MM/YY")} -{" "}
                {dateRange[1]?.format("DD/MM/YY")}
              </Tag>
            )}
            {extraTags}
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
