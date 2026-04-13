import styled, { css } from "styled-components";
import { Drawer, Menu } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faClipboardUser,
  faFileLines,
  faGears,
  faHome,
  faList,
  faSquarePlus,
  faUserLock,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthentication } from "../../providers";

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
  const { authUser } = useAuthentication();

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
    ...([
      "XfQXaMRZD7Gro2kPaIvU",
      "fRiTn5k6TP5TJvpXZeLS",
      "woc2g3M8EO4RYtXFap6n",
      "U0kKdzTPY0rVgWcCY8dV",
      "UXrpXFxJhVi5Tl1MTMu2",
    ].includes(authUser?.id || "")
      ? [
          {
            label: "Administración",
            key: "manager",
            icon: <FontAwesomeIcon icon={faGears} />,
            children: [
              {
                label: "Usuarios",
                key: "users",
                icon: <FontAwesomeIcon icon={faUsers} />,
                onClick: () => onClickMenu("/users"),
              },
              {
                label: "Roles y Permisos",
                key: "rolesAndPermissions",
                icon: <FontAwesomeIcon icon={faUserLock} />,
                onClick: () => onClickMenu("/roles-and-permissions"),
              },
            ],
          },
        ]
      : []),
    {
      label: "Cotizaciones",
      key: "quotations-group",
      icon: <FontAwesomeIcon icon={faFileLines} />,
      children: [
        {
          label: "Crear Cotización",
          key: "quotation-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/quotations/new"),
        },
        {
          label: "Lista de cotizaciones",
          key: "quotations-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/quotations"),
        },
      ],
    },
    {
      label: "Solicitudes de Servicio",
      key: "services-requests-group",
      icon: <FontAwesomeIcon icon={faWrench} />,
      children: [
        {
          label: "Crear Solictud de Servicio",
          key: "service-request-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/services-requests/new"),
        },
        {
          label: "Lista de Solictudes de Servicio",
          key: "services-requests-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/services-requests"),
        },
      ],
    },
    {
      label: "Proveedores",
      key: "suppliers",
      icon: <FontAwesomeIcon icon={faBoxesPacking} />,
      children: [
        {
          label: "Crear Proveedor",
          key: "supplier-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/suppliers/new"),
        },
        {
          label: "Lista de Proveedores",
          key: "suppliers-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/suppliers"),
        },
      ],
    },
    {
      label: "Asistencias",
      key: "assistances-group",
      icon: <FontAwesomeIcon icon={faClipboardUser} />,
      children: [
        {
          label: "Marcar asistencia",
          key: "assistance-new",
          icon: <FontAwesomeIcon icon={faSquarePlus} />,
          onClick: () => onClickMenu("/assistances/assistance"),
        },
        {
          label: "Lista de asistencias",
          key: "assistances-list",
          icon: <FontAwesomeIcon icon={faList} />,
          onClick: () => onClickMenu("/assistances"),
        },
      ],
    },
  ];

  return (
    <DrawerContainer
      title={
        <HeaderTitle>
          <h3>Servitec Work</h3>
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
          items={items}
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

      /* Ítem base */
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

      /* Ítem activo/seleccionado */
      .ant-menu-item-selected {
        background: ${theme.colors.primaryAlpha} !important;
        color: ${theme.colors.primary} !important;
        font-weight: ${theme.font_weight.medium};

        &::after {
          display: none; /* Quitamos la línea molesta de AntD */
        }
      }

      /* Iconos */
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
