import { useEffect, useMemo, useState } from "react";
import { Layout } from "antd";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import { fetchRoles } from "../../firebase/collections/rolesAndPermissons";
import { useAuthentication } from "../../providers";
import { ThemeToggleButton } from "../ui";

const { Header } = Layout;

type HeaderLayoutProps = {
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  title?: string;
};

export const HeaderLayout = ({
  collapsed,
  setCollapsed,
  title,
}: HeaderLayoutProps) => {
  const { authUser } = useAuthentication();
  const [roles, setRoles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const _roles = await fetchRoles();
      setRoles(_roles || []);
    })();
  }, []);

  const currentRoleName = useMemo(() => {
    if (!authUser?.role || !roles.length) return "";
    const matched = roles.find((r) => r.id === authUser.role);
    return matched?.name || "";
  }, [roles, authUser]);

  return (
    <HeaderContainer>
      <LeftSection>
        {setCollapsed && (
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </IconButton>
        )}

        {title && (
          <TitleBreadcrumb>
            <span className="page-title">{title}</span>
          </TitleBreadcrumb>
        )}
      </LeftSection>

      <RightSection>
        {/* Badge discreto con el Rol del Usuario */}
        <RoleBadge>
          <span>{capitalize(currentRoleName || "Administrador")}</span>
        </RoleBadge>

        {/* Botón de cambio de tema compacto */}
        <ThemeToggleButton compact />
      </RightSection>
    </HeaderContainer>
  );
};

/* --- ESTILOS LIMPIOS Y ALINEADOS A TU THEME --- */

const HeaderContainer = styled(Header)`
  ${({ theme }) => css`
    background: transparent;
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    line-height: 1;
    border-bottom: 1px solid ${theme.colors.border};
    padding: 0 ${theme.spacing.md};
    transition: border-color ${theme.transitions.normal};
  `}
`;

const LeftSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `}
`;

const RightSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `}
`;

const IconButton = styled.button`
  ${({ theme }) => css`
    background: transparent;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.fontSecondary};
    border-radius: ${theme.border_radius.sm};
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:hover {
      background: ${theme.colors.bgHover};
      color: ${theme.colors.fontPrimary};
      border-color: ${theme.colors.borderHover};
    }
  `}
`;

const TitleBreadcrumb = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    .page-title {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.semibold};
      letter-spacing: -0.2px;
    }
  `}
`;

const RoleBadge = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: ${theme.border_radius.full};
    background: ${theme.colors.bgTertiary};
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.xs};
    font-weight: ${theme.font_weight.medium};
    letter-spacing: -0.01em;
    user-select: none;
  `}
`;
