import styled, { css } from "styled-components";
import ShortcutCard from "./ShortcutCard";
import { CanAccess } from "../../components";
import {
  Boxes,
  FileText,
  Inbox,
  type LucideIcon,
  Search,
  Users,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShortcutItem {
  title: string;
  icon: LucideIcon | React.ReactNode;
  path: string;
  newPath?: string;
  color: string;
  permission: string;
  count: string;
}

const shortcuts: ShortcutItem[] = [
  {
    title: "Usuarios",
    icon: Users,
    path: "/users",
    newPath: "/users/new",
    color: "#F43F5E",
    permission: "users_view_list",
    count: "users",
  },
  {
    title: "Cotizaciones",
    icon: FileText,
    path: "/quotations",
    newPath: "/quotations/new",
    color: "#F59E0B",
    permission: "quotes_view_all",
    count: "quotations",
  },
  {
    title: "Solicitud de Servicios",
    icon: Wrench,
    path: "/services-requests",
    newPath: "",
    color: "#0EA5E9",
    permission: "service_view_all",
    count: "service-requests",
  },
  {
    title: "Proveedores",
    icon: Boxes,
    path: "/suppliers",
    newPath: "/suppliers/new",
    color: "#8B5CF6",
    permission: "suppliers_view_all",
    count: "suppliers",
  },
  {
    title: "Entradas",
    icon: Inbox,
    path: "/web-manager/entries",
    newPath: "",
    color: "#F97316",
    permission: "entry_view_all",
    count: "entries",
  },
  {
    title: "Revisión de Webs",
    icon: Search,
    path: "/web-manager/reviews",
    newPath: "",
    color: "#EC4899",
    permission: "reviews_view_all",
    count: "reviews",
  },
];

export const ShortcutsSection = ({ counts }) => {
  const navigate = useNavigate();

  return (
    <FlexibleShortcutsGrid>
      {shortcuts.map((item, index) => (
        <CanAccess permission={item.permission} key={index}>
          <ShortcutCard
            item={item}
            count={counts[item.count]}
            onList={item.path ? () => navigate(item.path) : undefined}
            onCreate={item.newPath ? () => navigate(item.newPath) : undefined}
          />
        </CanAccess>
      ))}
    </FlexibleShortcutsGrid>
  );
};

const FlexibleShortcutsGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: ${theme.spacing.md};
    width: 100%;
  `}
`;
