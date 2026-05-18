import styled, { css } from "styled-components";
import { Drawer, Menu } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faBuilding,
  faClipboardUser,
  faFileLines,
  faGears,
  faGlobe,
  faHome,
  faInbox,
  faList,
  faMagnifyingGlass,
  faSquarePlus,
  faUserLock,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { usePermissions } from "../../providers/PermissionsProvider.tsx";
import { useMemo } from "react";

type DrawerLayoutProps = {
  isVisibleDrawer: boolean;
  onSetIsVisibleDrawer: (isVisibleDrawer: boolean) => void;
  onNavigateTo: (url: string) => void;
};

export const DrawerLayout = ({
  isVisibleDrawer,
  onSetIsVisibleDrawer,
  onNavigateTo,
}: DrawerLayoutProps) => {
  const { permissions, hasPermission, loading } = usePermissions();

  const onClickMenu = (pathname: string) => {
    onSetIsVisibleDrawer(false);
    onNavigateTo(pathname);
  };

  const onClickHome = () => {
    onSetIsVisibleDrawer(false);
    onNavigateTo("/home");
  };

  const items = [
    {
      label: "Inicio",
      key: "home",
      icon: <FontAwesomeIcon icon={faHome} />,
      onClick: () => onClickHome(),
    },
    {
      label: "Administración",
      key: "manager",
      icon: <FontAwesomeIcon icon={faGears} />,
      permission: "",
      children: [
        {
          label: "Usuarios",
          key: "users",
          icon: <FontAwesomeIcon icon={faUsers} />,
          onClick: () => onClickMenu("/users"),
          permission: "users_view_list",
        },
        {
          label: "Roles y Permisos",
          key: "rolesAndPermissions",
          icon: <FontAwesomeIcon icon={faUserLock} />,
          permission: "roles_view",
          children: [
            {
              label: "Crear Rol",
              key: "quotation-new",
              icon: <FontAwesomeIcon icon={faSquarePlus} />,
              onClick: () => onClickMenu("/roles-and-permissions/new"),
              permission: "roles_create",
            },
            {
              label: "Lista de Roles",
              key: "quotations-list",
              icon: <FontAwesomeIcon icon={faList} />,
              onClick: () => onClickMenu("/roles-and-permissions"),
              permission: "roles_view",
            },
          ],
        },
      ],
    },
    {
      label: "Cotizaciones",
      key: "quotations-group",
      icon: <FontAwesomeIcon icon={faFileLines} />,
      permission: "quotes_view_all",
      children: [
        {
          label: "Crear Cotización",
          key: "quotation-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/quotations/new"),
          permission: "quotes_create",
        },
        {
          label: "Lista de cotizaciones",
          key: "quotations-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/quotations"),
          permission: "quotes_view_all",
        },
      ],
    },
    {
      label: "Solicitudes de Servicio",
      key: "services-requests-group",
      icon: <FontAwesomeIcon icon={faWrench} />,
      permission: "service_view_all",
      children: [
        {
          label: "Lista de Solictudes de Servicio",
          key: "services-requests-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/services-requests"),
          permission: "service_view_all",
        },
      ],
    },
    {
      label: "Sitios Web",
      key: "web-manager",
      icon: <FontAwesomeIcon icon={faGlobe} />,
      permission: "client_view_all",
      children: [
        {
          label: "Clientes",
          key: "web-manager-sites",
          icon: <FontAwesomeIcon icon={faBuilding} />,
          permission: "client_view_all",
          children: [
            {
              label: "Crear Cliente",
              key: "client-new",
              icon: <FontAwesomeIcon icon={faSquarePlus} />,
              onClick: () => onClickMenu("/web-manager/sites/new"),
              permission: "client_create",
            },
            {
              label: "Lista de Clientes",
              key: "clients-list",
              icon: <FontAwesomeIcon icon={faList} />,
              onClick: () => onClickMenu("/web-manager/sites"),
              permission: "client_view_all",
            },
          ],
        },
        {
          label: "Entradas",
          key: "web-manager-entries",
          icon: <FontAwesomeIcon icon={faInbox} />,
          onClick: () => onClickMenu("/web-manager/leads"),
          permission: "entry_view_all",
        },
        {
          label: "Revisión de Webs",
          key: "web-manager-reviews",
          icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
          onClick: () => onClickMenu("/web-manager/reviews"),
          permission: "website_review_view_all",
        },
      ],
    },
    {
      label: "Proveedores",
      key: "suppliers",
      icon: <FontAwesomeIcon icon={faBoxesPacking} />,
      permission: "suppliers_view_all",
      children: [
        {
          label: "Crear Proveedor",
          key: "supplier-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/suppliers/new"),
          permission: "suppliers_create",
        },
        {
          label: "Lista de Proveedores",
          key: "suppliers-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/suppliers"),
          permission: "suppliers_view_all",
        },
      ],
    },
    {
      label: "Asistencias",
      key: "assistances-group",
      icon: <FontAwesomeIcon icon={faClipboardUser} />,
      permission: "assist_view_all",
      children: [
        {
          label: "Marcar asistencia",
          key: "assistance-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/assistances/assistance"),
          permission: "assist_mark_self",
        },
        {
          label: "Lista de asistencias",
          key: "assistances-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/assistances"),
          permission: "assist_view_all",
        },
      ],
    },
  ];

  const filterItems = (menuItems: any[]) => {
    return menuItems
      .filter((item) => {
        if (!item.permission || item.permission === "") return true;
        return hasPermission(item.permission);
      })
      .map((item) => {
        if (item.children) {
          const authorizedChildren = filterItems(item.children);
          return {
            ...item,
            children: authorizedChildren,
          };
        }
        return item;
      })
      .filter((item) => {
        if (item.children && item.children.length === 0) return false;
        return true;
      });
  };

  if (loading) return null;

  const authorizedItems = useMemo(
    () => filterItems(items),
    [permissions, isVisibleDrawer]
  );

  return (
    <DrawerContainer
      title={
        <HeaderTitle>
          <h3>Servitec Perú System</h3>
          <VersionBadge>v1.0.0</VersionBadge>
        </HeaderTitle>
      }
      placement="left"
      width={300}
      closable={true}
      onClose={() => onSetIsVisibleDrawer(false)}
      open={isVisibleDrawer}
    >
      <MenuContainer>
        <Menu
          defaultSelectedKeys={["home"]}
          mode="inline"
          items={authorizedItems}
          inlineIndent={16}
        />
      </MenuContainer>
    </DrawerContainer>
  );
};

const DrawerContainer = styled(Drawer)`
  ${({ theme }) => css`
    .ant-drawer-content {
      background: ${theme.colors.bgSecondary} !important;
    }

    .ant-drawer-header {
      background: ${theme.colors.bgPrimary};
      border-bottom: 1px solid ${theme.colors.divider};
      padding: ${theme.spacing.lg};
    }

    .ant-drawer-body {
      padding: 0;
      background: ${theme.colors.bgSecondary};
    }

    .ant-drawer-close {
      color: ${theme.colors.fontSecondary};
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

const HeaderTitle = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};

    h3 {
      margin: 0;
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.md};
      font-weight: ${theme.font_weight.large};
      letter-spacing: -0.5px;
    }
  `}
`;

const VersionBadge = styled.span`
  ${({ theme }) => css`
    background: ${theme.colors.primaryAlpha};
    color: ${theme.colors.primary};
    padding: 2px 8px;
    border-radius: ${theme.border_radius.xs};
    font-size: 10px;
    font-weight: ${theme.font_weight.large};
    border: 1px solid ${theme.colors.primary}40;
  `}
`;

const MenuContainer = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm} 0;

    .ant-menu {
      background: transparent !important;
      border-inline-end: none !important;

      .ant-menu-item,
      .ant-menu-submenu-title {
        color: ${theme.colors.fontSecondary};
        height: 44px;
        margin-inline: ${theme.spacing.sm} !important;
        width: calc(100% - ${theme.spacing.md});
        border-radius: ${theme.border_radius.sm};

        &:hover {
          color: ${theme.colors.primary} !important;
          background: ${theme.colors.bgHover} !important;
        }
      }

      .ant-menu-item-selected {
        background: ${theme.colors.primaryAlpha} !important;
        color: ${theme.colors.primary} !important;
        font-weight: ${theme.font_weight.medium};

        &::after {
          display: none;
        }
      }

      .ant-menu-item-icon {
        font-size: 16px !important;
      }

      /* Submenús */
      .ant-menu-submenu-arrow {
        color: ${theme.colors.fontTertiary};
      }

      .ant-menu-sub {
        background: ${theme.colors.bgPrimary}40 !important;
      }
    }
  `}
`;
