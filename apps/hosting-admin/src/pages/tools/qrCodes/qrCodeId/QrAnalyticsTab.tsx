import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Col, Row, Title } from "../../../../components";
import { Select as AntSelect } from "antd";
import { theme } from "../../../../styles";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface QrAnalyticsTabProps {
  totalClicks: number;
}

export const QrAnalyticsTab = ({ totalClicks }: QrAnalyticsTabProps) => {
  const [analyticsFilter, setAnalyticsFilter] = useState("year");
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);

  useEffect(() => {
    if (totalClicks === 0) {
      setAnalyticsData([]);
      return;
    }

    const distributeClicks = (percentages: number[], labels: string[]) => {
      let accumulated = 0;
      const data = percentages.map((p, idx) => {
        const val = Math.round(totalClicks * p);
        accumulated += val;
        return { name: labels[idx], escaneos: val };
      });

      data.push({
        name: labels[labels.length - 1],
        escaneos: Math.max(0, totalClicks - accumulated),
      });
      return data;
    };

    if (analyticsFilter === "week") {
      setAnalyticsData(
        distributeClicks(
          [0.1, 0.15, 0.1, 0.2, 0.15, 0.2],
          ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
        )
      );
    } else if (analyticsFilter === "month") {
      setAnalyticsData(
        distributeClicks([0.25, 0.3, 0.2], ["Sem 1", "Sem 2", "Sem 3", "Sem 4"])
      );
    } else {
      setAnalyticsData(
        distributeClicks(
          [0.05, 0.1, 0.15, 0.1, 0.2],
          ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]
        )
      );
    }
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
                { value: "week", label: "Esta Semana" },
                { value: "month", label: "Este Mes" },
                { value: "year", label: "Este Año" },
              ]}
              style={{ width: 140 }}
            />
          </Row>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorEscaneos"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={theme.colors.primary}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme.colors.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
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
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme.colors.bgTertiary,
                    borderColor: theme.colors.border,
                    borderRadius: theme.border_radius.sm,
                    color: theme.colors.fontPrimary,
                  }}
                  itemStyle={{ color: theme.colors.primary }}
                />
                <Area
                  type="monotone"
                  dataKey="escaneos"
                  stroke={theme.colors.primary}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEscaneos)"
                />
              </AreaChart>
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
