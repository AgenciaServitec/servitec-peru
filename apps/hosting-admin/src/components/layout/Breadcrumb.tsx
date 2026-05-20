import { capitalize } from "lodash";
import { Breadcrumb } from "antd";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export const BreadcrumbLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  const breadcrumbItems = [
    {
      title: <FontAwesomeIcon icon={faHome} />,
      onClick: () => navigate("/home"),
      className: "breadcrumb-link-active",
    },
    ...pathnames.map((path, index) => {
      const isLast = index === pathnames.length - 1;
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;

      return {
        title: capitalize(path.replace(/-/g, " ")),
        onClick: !isLast ? () => navigate(url) : undefined,
        className: !isLast ? "breadcrumb-link-active" : "breadcrumb-link-last",
      };
    }),
  ];

  return (
    <BreadcrumbContainer
      items={breadcrumbItems}
      separator={
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "10px" }} />
      }
    />
  );
};

const BreadcrumbContainer = styled(Breadcrumb)`
  ${({ theme }) => css`
    margin: ${theme.spacing.sm} 0;
    padding: ${theme.spacing.xs} 0;
    display: flex;
    align-items: center;

    .breadcrumb-link-active {
      color: ${theme.colors.fontSecondary} !important;
      font-size: ${theme.font_sizes.sm};
      cursor: pointer;
      transition: color ${theme.transitions.fast};

      &:hover {
        color: ${theme.colors.primary} !important;
      }

      .ant-breadcrumb-link {
        display: flex;
        align-items: center;
      }
    }

    .breadcrumb-link-last {
      .ant-breadcrumb-link {
        color: ${theme.colors.fontPrimary} !important;
        font-weight: ${theme.font_weight.medium};
        font-size: ${theme.font_sizes.sm};
        cursor: default;
      }
    }

    .ant-breadcrumb-separator {
      color: ${theme.colors.fontTertiary};
      margin: 0 ${theme.spacing.sm};
      display: flex;
      align-items: center;
    }

    svg {
      transition: transform ${theme.transitions.fast};
    }

    .breadcrumb-link-active:hover svg {
      transform: scale(1.1);
    }
  `}
`;
