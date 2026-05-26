import { Layout, Spin } from "../ui";
import styled, { css } from "styled-components";
import { type ReactNode, useState } from "react";
import { DrawerLayout } from "./DrawerLayout.tsx";
import { HeaderLayout } from "./HeaderLayout.tsx";
import { BreadcrumbLayout } from "./Breadcrumb.tsx";
import { useNavigate } from "react-router-dom";

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
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const onNavigateTo = (url: string) => {
    navigate(url);
    setIsVisibleDrawer(false);
  };

  return (
    <Spin tip="Cargando..." spinning={isLoading}>
      <LayoutContainer>
        <DrawerLayout
          isVisibleDrawer={isVisibleDrawer}
          onSetIsVisibleDrawer={setIsVisibleDrawer}
          onNavigateTo={onNavigateTo}
        />
        <MainLayout>
          <HeaderLayout
            isVisibleDrawer={isVisibleDrawer}
            onSetIsVisibleDrawer={setIsVisibleDrawer}
          />
          <StyledContent>
            <BreadcrumbLayout />
            <div className="site-layout-content">{children}</div>
          </StyledContent>
        </MainLayout>
      </LayoutContainer>
    </Spin>
  );
};

const LayoutContainer = styled(Layout)`
  ${({ theme }) => css`
    width: 100vw;
    min-height: 100vh;
    background: ${theme.mode === "dark"
      ? `linear-gradient(135deg, ${theme.colors.bgPrimary} 0%, ${theme.colors.bgSecondary} 100%)`
      : theme.colors.bgPrimary} !important;
  `}
`;

const MainLayout = styled(Layout)`
  background: transparent !important;
`;

const StyledContent = styled(Content)`
  ${({ theme }) => css`
    margin: 0 ${theme.spacing.md};

    .site-layout-content {
      background: ${theme.colors.bgSecondary};
      padding: ${theme.spacing.lg};
      border-radius: ${theme.border_radius.lg};
      border: 1px solid ${theme.colors.border};
      min-height: 280px;
      box-shadow: ${theme.shadows.sm};
      transition: background ${theme.transitions.normal};
      margin-bottom: 2rem;
    }
  `}
`;
