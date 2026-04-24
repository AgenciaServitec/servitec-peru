import { Layout, Space } from "antd";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBarsStaggered,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles";
import { useAuthentication } from "../../providers";
import { Dropdown } from "../ui";
import { PhotoNoFound } from "../../images";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { capitalize } from "lodash";
import { userFullName } from "../../utils";
import { fetchRoles } from "../../firebase/collections/rolesAndPermissons.ts";

const { Header } = Layout;

type HeaderLayoutProps = {
  isVisibleDrawer: boolean;
  onSetIsVisibleDrawer: (isVisibleDrawer: boolean) => void;
};

export const HeaderLayout = ({
  isVisibleDrawer,
  onSetIsVisibleDrawer,
}: HeaderLayoutProps) => {
  const { authUser, logout } = useAuthentication();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [roles, setRoles] = useState(false);

  const menuItems = [
    {
      label: (
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <MenuItemContent>
            <FontAwesomeIcon icon={faUser} />
            <span>Perfil</span>
          </MenuItemContent>
        </Link>
      ),
      key: "profile",
    },
    {
      type: "divider" as const,
    },
    {
      label: (
        <MenuItemContent $danger onClick={() => logout()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          <span>Cerrar sesión</span>
        </MenuItemContent>
      ),
      key: "logout",
    },
  ];

  useEffect(() => {
    (async () => {
      const _roles = await fetchRoles();
      setRoles(_roles);
    })();
  }, []);

  const findRole = (myRole) =>
    (roles || [])?.find((role) => role.id === myRole);

  return (
    <HeaderContainer>
      <div className="left-item">
        <Space align="center" className="items-wrapper">
          <MenuToggleButton
            onClick={() => onSetIsVisibleDrawer(!isVisibleDrawer)}
          >
            <FontAwesomeIcon icon={faBarsStaggered} className="icon-item" />
          </MenuToggleButton>
          <Link to="/home">
            <img src="/logo-servitec.png" alt="" className="logo" />
          </Link>
        </Space>
      </div>
      <div className="user-items">
        <Dropdown
          trigger={["click"]}
          menu={{ items: menuItems }}
          open={openDropdown}
          onOpenChange={setOpenDropdown}
          placement="bottomRight"
        >
          <UserProfile>
            <div className="user-info">
              <h4>{capitalize(userFullName(authUser) || "")}</h4>
              <p>{capitalize(findRole(authUser?.role)?.name)}</p>{" "}
            </div>
            {authUser && (
              <UserAvatar
                src={authUser?.profilePhoto?.thumbUrl || PhotoNoFound}
                alt="user profile"
              />
            )}
          </UserProfile>
        </Dropdown>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Header)`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary} !important;
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1; /* Reset antd line-height */
    height: 64px;
    border-bottom: 1px solid ${theme.colors.border};
    padding: 0 ${theme.spacing.md};

    .left-item {
      display: flex;
      align-items: center;
    }

    .user-items {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
    }

    .logo {
      height: 23px;
    }
  `}
`;

const MenuToggleButton = styled.div`
  ${({ theme }) => css`
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${theme.colors.fontPrimary};
    transition: all ${theme.transitions.fast};
    padding: ${theme.spacing.xs};
    border-radius: ${theme.border_radius.sm};

    &:hover {
      color: ${theme.colors.primary};
      background: ${theme.colors.bgHover};
    }
  `}
`;

const UserProfile = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    cursor: pointer;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.border_radius.md};
    transition: all ${theme.transitions.fast};

    &:hover {
      background: ${theme.colors.bgHover};
    }

    .user-info {
      display: none;
      text-align: right;

      ${mediaQuery.minTablet} {
        display: block;
      }

      h4 {
        margin: 0;
        font-size: ${theme.font_sizes.sm};
        color: ${theme.colors.fontPrimary};
        font-weight: ${theme.font_weight.medium};
      }

      p {
        margin: 0;
        font-size: ${theme.font_sizes.xs};
        color: ${theme.colors.fontTertiary};
      }
    }
  `}
`;

const UserAvatar = styled.img`
  ${({ theme }) => css`
    width: 36px;
    height: 36px;
    border-radius: ${theme.border_radius.full};
    object-fit: cover;
    border: 1.5px solid ${theme.colors.border};
    transition: all ${theme.transitions.fast};

    ${UserProfile}:hover & {
      border-color: ${theme.colors.primary};
    }
  `}
`;

const MenuItemContent = styled.div<{ $danger?: boolean }>`
  ${({ theme, $danger }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    color: ${$danger ? theme.colors.error : theme.colors.fontPrimary};
    transition: all ${theme.transitions.fast};

    svg {
      font-size: 1rem;
      width: 16px;
      color: ${$danger ? theme.colors.error : theme.colors.fontTertiary};
    }

    span {
      font-size: ${theme.font_sizes.sm};
    }

    &:hover {
      color: ${$danger ? theme.colors.error : theme.colors.primary};

      svg {
        color: ${$danger ? theme.colors.error : theme.colors.primary};
      }
    }
  `}
`;
