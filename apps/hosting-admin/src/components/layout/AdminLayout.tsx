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
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const onNavigateTo = (url: string) => navigate(url);

  return (
    <Spin tip="Cargando..." spinning={false}>
      <LayoutContainer>
        <Layout>
          <DrawerLayout
            isVisibleDrawer={isVisibleDrawer}
            onSetIsVisibleDrawer={setIsVisibleDrawer}
            onNavigateTo={onNavigateTo}
          />
          <HeaderLayout
            isVisibleDrawer={isVisibleDrawer}
            onSetIsVisibleDrawer={setIsVisibleDrawer}
          />
          <Content style={{ margin: "0 16px" }}>
            <BreadcrumbLayout />
            <div className="site-layout-background" style={{ padding: 24 }}>
              {children}
            </div>
          </Content>
        </Layout>
      </LayoutContainer>
    </Spin>
  );
};

const LayoutContainer = styled(Layout)`
  ${({ theme }) => css`
    width: 100vw;
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      ${theme.colors.bgPrimary} 0%,
      #0f1419 100%
    ) !important;

    .site-layout-background {
      background: ${theme.colors.bgSecondary};
      border-radius: ${theme.border_radius.small};
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
  `}
`;
