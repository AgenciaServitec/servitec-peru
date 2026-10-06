import { capitalize } from "lodash";
import { Breadcrumb } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

export const BreadcrumbLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);

  const breadcrumbItems = [
    {
      title: (
        <BreadcrumbLink onClick={() => navigate("/home")}>
          <FontAwesomeIcon icon={faHome} className="home-icon" />
        </BreadcrumbLink>
      ),
    },
    ...pathnames.map((path, index) => {
      const isLast = index === pathnames.length - 1;
      const url = `/${pathnames.slice(0, index + 1).join("/")}`;

      return {
        title: isLast ? (
          <CurrentBreadcrumbItem>
            {capitalize(path.replace(/-/g, " "))}
          </CurrentBreadcrumbItem>
        ) : (
          <BreadcrumbLink onClick={() => navigate(url)}>
            {capitalize(path.replace(/-/g, " "))}
          </BreadcrumbLink>
        ),
      };
    }),
  ];

  return (
    <BreadcrumbContainer
      items={breadcrumbItems}
      separator={<SeparatorIcon icon={faChevronRight} />}
    />
  );
};

const BreadcrumbContainer = styled(Breadcrumb)`
  margin: ${({ theme }) => theme.spacing.xs} 0
    ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
`;

const BreadcrumbLink = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: color ${({ theme }) => theme.transitions.fast};

  .home-icon {
    font-size: 13px;
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    .home-icon {
      transform: scale(1.1);
    }
  }
`;

const CurrentBreadcrumbItem = styled.span`
  font-weight: ${({ theme }) => theme.font_weight.medium};
  cursor: default;
  display: flex;
  align-items: center;
`;

const SeparatorIcon = styled(FontAwesomeIcon)`
  font-size: 10px;
  display: flex;
  align-items: center;
`;
