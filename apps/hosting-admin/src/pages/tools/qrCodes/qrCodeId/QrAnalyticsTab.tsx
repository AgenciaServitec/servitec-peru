import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row, Title } from "../../../../components";
import { Select as AntSelect } from "antd";
import { theme } from "../../../../styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface QrAnalyticsTabProps {
  totalClicks: number;
}

export const QrAnalyticsTab = ({ totalClicks }: QrAnalyticsTabProps) => {
  const [analyticsFilter, setAnalyticsFilter] = useState("week");

  const analyticsData = useMemo(() => {
    if (totalClicks === 0) return [];

    const generateLabels = () => {
      switch (analyticsFilter) {
        case "day":
          return ["00h", "06h", "12h", "18h", "23h"];
        case "week":
          return ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
        case "month":
          return ["Sem 1", "Sem 2", "Sem 3", "Sem 4"];
        default:
          return ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];
      }
    };

    const labels = generateLabels();
    return labels.map((label, index) => ({
      name: label,
      escaneos: index === 0 ? totalClicks : 0,
    }));
  }, [analyticsFilter, totalClicks]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: theme.spacing.lg }}
          >
            <Title level={4} style={{ margin: 0 }}>
              Rendimiento de Escaneos
            </Title>
            <AntSelect
              value={analyticsFilter}
              onChange={(val) => setAnalyticsFilter(val)}
              options={[
                { value: "day", label: "Hoy" },
                { value: "week", label: "Semana" },
                { value: "month", label: "Mes" },
                { value: "year", label: "Año" },
              ]}
              style={{ width: 140 }}
            />
          </Row>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData}
                margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme.colors.border}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke={theme.colors.fontTertiary}
                  tickLine={false}
                  style={{ fontSize: 12 }}
                />
                <YAxis
                  stroke={theme.colors.fontTertiary}
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: theme.colors.bgHover || "#333" }}
                  contentStyle={{
                    backgroundColor: theme.colors.bgTertiary || "#1f1f1f",
                    borderColor: theme.colors.border || "#444",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  itemStyle={{
                    color: "#ffffff",
                    fontWeight: "bold",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                    marginBottom: "5px",
                  }}
                />
                <Bar dataKey="escaneos" radius={[4, 4, 0, 0]}>
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={theme.colors.primary} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const Card = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    padding: ${theme.spacing.lg};

    &.preview-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${theme.spacing.lg};
    }
  `}
`;
