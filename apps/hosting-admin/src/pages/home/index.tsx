import { Col, Row, Title } from "../../components";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { AssistanceMonitor } from "../../components/layout/AssistanceMonitor.tsx";
import { useEffect, useState } from "react";
import { subscribeToCounters } from "../../firebase/collections";
import { ShortcutsSection } from "./ShortcutsSection.tsx";

export function Home() {
  const navigate = useNavigate();

  const [counts, setCounts] = useState<Record<string, number>>({
    users: 0,
    quotations: 0,
    "service-requests": 0,
    assistances: 0,
    suppliers: 0,
    entries: 0,
    reviews: 0,
  });

  useEffect(() => {
    const unsubscribe = subscribeToCounters((updatedCounts) => {
      setCounts((prev) => ({
        ...prev,
        ...updatedCounts,
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Row gutter={[16, 32]}>
      <Col span={24}>
        <SectionHeader>
          <Title level={4} style={{ margin: 0 }}>
            Accesos directos
          </Title>
        </SectionHeader>
        <ShortcutsSection counts={counts} />
      </Col>

      <Col span={24}>
        <SectionHeader style={{ marginTop: "1rem" }}>
          <Title level={4} style={{ margin: 0 }}>
            Monitoreo de asistencia
          </Title>
        </SectionHeader>
        <AssistanceMonitor />
      </Col>
    </Row>
  );
}

const SectionHeader = styled.div`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.md};

    h4 {
      color: ${theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.large} !important;
    }

    .description {
      color: ${theme.colors.fontSecondary};
      font-size: ${theme.font_sizes.sm};
      margin: ${theme.spacing.xs} 0 0 0;
      opacity: 0.8;
    }
  `}
`;
