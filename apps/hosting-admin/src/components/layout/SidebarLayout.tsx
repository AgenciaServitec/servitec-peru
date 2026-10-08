import { type ReactNode, useMemo } from "react";
import styled from "styled-components";
import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import {
  Bell,
  BookUser,
  Boxes,
  Building,
  ClipboardList,
  FileText,
  FolderGit2,
  Home,
  Inbox,
  List,
  MoreVertical,
  Package,
  PlusSquare,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  Sliders,
  Store,
  Truck,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";
import { usePermissions } from "../../providers/PermissionsProvider.tsx";
import { useAuthentication } from "../../providers";

const { Sider } = Layout;

interface MenuItemCustom {
  key?: string;
  label: string;
  icon?: ReactNode;
  type?: "group" | "divider";
  permission?: string;
  onClick?: () => void;
  children?: MenuItemCustom[];
}

type SidebarLayoutProps = {
  collapsed: boolean;
  onNavigateTo: (url: string) => void;
};

export const SidebarLayout = ({
  collapsed,
  onNavigateTo,
}: SidebarLayoutProps) => {
  const { authUser } = useAuthentication();
  const { permissions, hasPermission, loading } = usePermissions();

  const onClickMenu = (pathname: string) => {
    onNavigateTo(pathname);
  };

  const onClickHome = () => {
    onNavigateTo("/home");
  };

  const items: MenuItemCustom[] = [
    {
      label: "Inicio",
      key: "home",
      icon: <Home size={16} />,
      onClick: () => onClickHome(),
    },
    {
      type: "group",
      label: "ADMINISTRACIÓN",
      children: [
        {
          label: "Usuarios",
          key: "users",
          icon: <Users size={16} />,
          onClick: () => onClickMenu("/users"),
          permission: "users_view_list",
        },
        {
          label: "Roles y Permisos",
          key: "rolesAndPermissions",
          icon: <ShieldCheck size={16} />,
          permission: "roles_view",
          children: [
            {
              label: "Crear Rol",
              key: "role-new",
              icon: <PlusSquare size={14} />,
              onClick: () => onClickMenu("/roles-and-permissions/new"),
              permission: "roles_create",
            },
            {
              label: "Lista de Roles",
              key: "roles-list",
              icon: <List size={14} />,
              onClick: () => onClickMenu("/roles-and-permissions"),
              permission: "roles_view",
            },
          ],
        },
        {
          label: "Configuración",
          key: "settings-group",
          icon: <Settings size={16} />,
          permission: "",
          children: [
            {
              label: "General",
              key: "settings-general",
              icon: <Sliders size={14} />,
              onClick: () => onClickMenu("/settings/general"),
              permission: "",
            },
            {
              label: "Sistema",
              key: "settings-system",
              icon: <FolderGit2 size={14} />,
              onClick: () => onClickMenu("/settings/system"),
              permission: "",
            },
          ],
        },
      ],
    },
    {
      type: "group",
      label: "GESTIÓN COMERCIAL",
      children: [
        {
          label: "Cotizaciones",
          key: "quotations-group",
          icon: <FileText size={16} />,
          permission: "quotes_view_all",
          children: [
            {
              label: "Crear Cotización",
              key: "quotation-new",
              icon: <PlusSquare size={14} />,
              onClick: () => onClickMenu("/quotations/new"),
              permission: "quotes_create",
            },
            {
              label: "Lista de cotizaciones",
              key: "quotations-list",
              icon: <List size={14} />,
              onClick: () => onClickMenu("/quotations"),
              permission: "quotes_view_all",
            },
          ],
        },
        {
          label: "Solicitudes de Servicio",
          key: "services-requests-group",
          icon: <Wrench size={16} />,
          permission: "service_view_all",
          children: [
            {
              label: "Lista de Solicitudes",
              key: "services-requests-list",
              icon: <List size={14} />,
              onClick: () => onClickMenu("/services-requests"),
              permission: "service_view_all",
            },
          ],
        },
      ],
    },
    {
      type: "group",
      label: "SITIOS WEB",
      children: [
        {
          label: "Contactos",
          key: "web-manager-contacts",
          icon: <BookUser size={16} />,
          onClick: () => onClickMenu("/web-manager/contacts"),
          permission: "entry_view_all",
        },
        {
          label: "Clientes",
          key: "web-manager-sites",
          icon: <Building size={16} />,
          permission: "client_view_all",
          children: [
            {
              label: "Crear Cliente",
              key: "client-new",
              icon: <PlusSquare size={14} />,
              onClick: () => onClickMenu("/web-manager/sites/new"),
              permission: "client_create",
            },
            {
              label: "Lista de Clientes",
              key: "clients-list",
              icon: <List size={14} />,
              onClick: () => onClickMenu("/web-manager/sites"),
              permission: "client_view_all",
            },
          ],
        },
        {
          label: "Entradas",
          key: "web-manager-entries",
          icon: <Inbox size={16} />,
          onClick: () => onClickMenu("/web-manager/entries"),
          permission: "entry_view_all",
        },
        {
          label: "Revisión de Webs",
          key: "web-manager-reviews",
          icon: <Search size={16} />,
          onClick: () => onClickMenu("/web-manager/reviews"),
          permission: "website_review_view_all",
        },
      ],
    },
    {
      type: "group",
      label: "OPERACIONES",
      children: [
        {
          label: "Inventario",
          key: "inventory-group",
          icon: <Boxes size={16} />,
          permission: "",
          children: [
            {
              label: "Productos",
              key: "inventory-products-group",
              icon: <Package size={15} />,
              children: [
                {
                  label: "Agregar Producto",
                  key: "inventory-product-new",
                  icon: <PlusSquare size={14} />,
                  onClick: () => onClickMenu("/inventory/products/new"),
                  permission: "",
                },
                {
                  label: "Lista de Productos",
                  key: "inventory-products-list",
                  icon: <List size={14} />,
                  onClick: () => onClickMenu("/inventory/products"),
                  permission: "",
                },
              ],
            },
            {
              label: "Sedes / Sucursales",
              key: "inventory-branches-group",
              icon: <Store size={15} />,
              children: [
                {
                  label: "Agregar Sede",
                  key: "inventory-branch-new",
                  icon: <PlusSquare size={14} />,
                  onClick: () => onClickMenu("/inventory/branches/new"),
                  permission: "",
                },
                {
                  label: "Lista de Sedes",
                  key: "inventory-branches-list",
                  icon: <List size={14} />,
                  onClick: () => onClickMenu("/inventory/branches"),
                  permission: "",
                },
              ],
            },
          ],
        },
        {
          label: "Proveedores",
          key: "suppliers",
          icon: <Truck size={16} />,
          permission: "suppliers_view_all",
          children: [
            {
              label: "Crear Proveedor",
              key: "supplier-new",
              icon: <PlusSquare size={14} />,
              onClick: () => onClickMenu("/suppliers/new"),
              permission: "suppliers_create",
            },
            {
              label: "Lista de Proveedores",
              key: "suppliers-list",
              icon: <List size={14} />,
              onClick: () => onClickMenu("/suppliers"),
              permission: "suppliers_view_all",
            },
          ],
        },
        {
          label: "Asistencias",
          key: "assistances-group",
          icon: <UserCheck size={16} />,
          permission: "assist_view_all",
          children: [
            {
              label: "Marcar asistencia",
              key: "assistance-new",
              icon: <PlusSquare size={14} />,
              onClick: () => onClickMenu("/assistances/assistance"),
              permission: "assist_mark_self",
            },
            {
              label: "Lista de asistencias",
              key: "assistances-list",
              icon: <ClipboardList size={14} />,
              onClick: () => onClickMenu("/assistances"),
              permission: "assist_view_all",
            },
          ],
        },
        {
          label: "Herramientas",
          key: "tools-group",
          icon: <Wrench size={16} />,
          permission: "",
          children: [
            {
              label: "Códigos QR",
              key: "tool-qr",
              icon: <QrCode size={15} />,
              children: [
                {
                  label: "Crear Código QR",
                  key: "tool-qr-new",
                  icon: <PlusSquare size={14} />,
                  onClick: () => onClickMenu("/tools/qr-generator/new"),
                  permission: "",
                },
                {
                  label: "Lista de Códigos QR",
                  key: "tool-qr-list",
                  icon: <List size={14} />,
                  onClick: () => onClickMenu("/tools/qr-generator"),
                  permission: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const filterItems = (menuItems: MenuItemCustom[]): MenuItemCustom[] => {
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
        if (
          item.type === "group" &&
          item.children &&
          item.children.length === 0
        )
          return false;
        if (item.children && item.children.length === 0) return false;
        return true;
      });
  };

  const authorizedItems = useMemo(() => filterItems(items), [permissions]);

  if (loading) return null;

  return (
    <StyledSider
      width={260}
      collapsed={collapsed}
      collapsedWidth={0}
      trigger={null}
    >
      <SidebarContent $collapsed={collapsed}>
        <TopbarHeader>
          <LogoContainer>
            <LogoImg src="/logo-servitec.png" alt="Servitec Perú Logo" />
            <VersionBadge>v0.0.2</VersionBadge>
          </LogoContainer>

          <IconButton
            icon={<Bell size={16} />}
            onClick={() => onClickMenu("/notifications")}
            title="Notificaciones"
          />
        </TopbarHeader>

        <MenuContainer>
          <Menu
            defaultSelectedKeys={["home"]}
            mode="inline"
            items={authorizedItems}
            inlineIndent={12}
          />
        </MenuContainer>

        <UserProfileFooter>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Servitec" />
          <UserInfo>
            <span className="name">{`${authUser?.firstName || ""} ${authUser?.paternalSurname || ""} ${authUser?.maternalSurname || ""}`}</span>
            <span className="email">{authUser?.email}</span>
          </UserInfo>
          <Dropdown
            menu={{
              items: [
                { key: "profile", label: "Perfil" },
                { key: "logout", label: "Cerrar sesión", danger: true },
              ],
            }}
            trigger={["click"]}
          >
            <IconButton icon={<MoreVertical size={16} />} />
          </Dropdown>
        </UserProfileFooter>
      </SidebarContent>
    </StyledSider>
  );
};

/* --- ESTILOS --- */

const StyledSider = styled(Sider)`
  background: transparent;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
`;

const SidebarContent = styled.div<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  visibility: ${({ $collapsed }) => ($collapsed ? "hidden" : "visible")};
  transition:
    opacity ${({ theme }) => theme.transitions.fast},
    visibility ${({ theme }) => theme.transitions.fast};
`;

const TopbarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const LogoImg = styled.img`
  height: 26px;
  object-fit: contain;
`;

const VersionBadge = styled.span`
  background: ${({ theme }) => theme.colors.bgTertiary};
  color: ${({ theme }) => theme.colors.fontSecondary};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.border_radius.xs};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.font_weight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const IconButton = styled(Button)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.fontSecondary};
  border-radius: ${({ theme }) => theme.border_radius.sm};
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.bgHover};
    color: ${({ theme }) => theme.colors.fontPrimary};
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const MenuContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-inline: -${({ theme }) => theme.spacing.xs};

  .ant-menu {
    background: transparent;
    border-inline-end: none;

    .ant-menu-item-group-title {
      color: ${({ theme }) => theme.colors.fontTertiary};
      font-size: 11px;
      font-weight: ${({ theme }) => theme.font_weight.semibold};
      letter-spacing: 0.5px;
      padding: ${({ theme }) => `${theme.spacing.xs}${theme.spacing.md}`};
      margin-top: ${({ theme }) => theme.spacing.xs};
    }

    .ant-menu-item,
    .ant-menu-submenu-title {
      color: ${({ theme }) => theme.colors.fontSecondary};
      height: 36px;
      line-height: 36px;
      margin-block: 2px;
      border-radius: ${({ theme }) => theme.border_radius.sm};
      font-size: ${({ theme }) => theme.font_sizes.sm};

      &:hover {
        color: ${({ theme }) => theme.colors.fontPrimary};
        background: ${({ theme }) => theme.colors.bgHover};
      }
    }

    .ant-menu-item-selected {
      background: ${({ theme }) => theme.colors.bgHover};
      color: ${({ theme }) => theme.colors.fontPrimary};
      font-weight: ${({ theme }) => theme.font_weight.medium};
    }

    .ant-menu-item-icon {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.fontSecondary};
    }

    .ant-menu-item-selected .ant-menu-item-icon {
      color: ${({ theme }) => theme.colors.primary};
    }

    .ant-menu-sub {
      background: transparent;
    }
  }
`;

const UserProfileFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .name {
    color: ${({ theme }) => theme.colors.fontPrimary};
    font-size: ${({ theme }) => theme.font_sizes.sm};
    font-weight: ${({ theme }) => theme.font_weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .email {
    color: ${({ theme }) => theme.colors.fontTertiary};
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
