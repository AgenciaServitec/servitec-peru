import { type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout, Spin } from "../ui";
import { SidebarLayout } from "./SidebarLayout.tsx";
import { HeaderLayout } from "./HeaderLayout.tsx";
import { BreadcrumbLayout } from "./Breadcrumb.tsx";

const { Content } = Layout;

type AdminLayoutProps = {
  children: ReactNode;
  isLoading?: boolean;
};

export const AdminLayout = ({
  children,
  isLoading = false,
}: AdminLayoutProps) => {
  const navigate = useNavigate();
  // Estado nativo para controlar el colapso del Sider
  const [collapsed, setCollapsed] = useState(false);

  const onNavigateTo = (url: string) => {
    navigate(url);
  };

  return (
    <Spin tip="Cargando..." spinning={isLoading}>
      <LayoutContainer>
        <SidebarLayout collapsed={collapsed} onNavigateTo={onNavigateTo} />

        <MainWrapper>
          <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
          <StyledContent>
            <BreadcrumbLayout />
            <div className="site-layout-content">{children}</div>
          </StyledContent>
        </MainWrapper>
      </LayoutContainer>
    </Spin>
  );
};

const LayoutContainer = styled(Layout)`
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgPrimary};
  display: flex;
  flex-direction: row;
`;

const MainWrapper = styled(Layout)`
  flex: 1;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.border_radius.xl};
  margin: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (${({ theme }) => theme.spacing.sm} * 2));
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition:
    background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal};
`;

const StyledContent = styled(Content)`
  padding: ${({ theme }) => theme.spacing.lg};

  .site-layout-content {
    background: transparent;
    min-height: 280px;
  }
`;
