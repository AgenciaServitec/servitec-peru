import styled, { css } from "styled-components";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";

interface ShortcutItem {
  title: string;
  icon: any;
  color: string;
}

interface ShortcutCardProps {
  item: ShortcutItem;
  onList: () => void;
  onCreate: () => void;
}

const ShortcutCard = ({ item, onList, onCreate }: ShortcutCardProps) => {
  return (
    <ModernCard $color={item.color}>
      <CardBody>
        <IconContainer $color={item.color}>
          <FontAwesomeIcon icon={item.icon} />
        </IconContainer>
        <div className="info">
          <h3>{item.title}</h3>
          <p>Módulo de gestión</p>
        </div>
      </CardBody>

      <LightningActions $color={item.color}>
        <button className="list-action" onClick={onList}>
          <FontAwesomeIcon icon={faListUl} />
          <span>Lista</span>
        </button>
        <button className="create-action" onClick={onCreate}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Crear</span>
        </button>
      </LightningActions>
    </ModernCard>
  );
};

export default ShortcutCard;

const ModernCard = styled(Card)<{ $color: string }>`
  ${({ theme, $color }) => css`
    position: relative;
    overflow: hidden;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    transition: all ${theme.transitions.normal};

    .ant-card-body {
      padding: 0;
    }

    &:hover {
      border-color: ${$color}80;
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  `}
`;

const CardBody = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};

    .info {
      h3 {
        margin: 0;
        font-size: ${theme.font_sizes.md};
        font-weight: ${theme.font_weight.large};
        color: ${theme.colors.fontPrimary};
        line-height: 1.2;
      }
      p {
        font-size: ${theme.font_sizes.xs};
        margin: ${theme.spacing.xs} 0 0 0;
        font-weight: ${theme.font_weight.small};
        color: ${theme.colors.fontSecondary};
      }
    }
  `}
`;

const IconContainer = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    width: 48px;
    height: 48px;
    border-radius: ${theme.border_radius.md};
    background: ${$color}15; /* 15% opacidad */
    color: ${$color};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font_sizes.xl};
    border: 1px solid ${$color}25;
  `}
`;

const LightningActions = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 52px;
    background: ${theme.colors.bgTertiary};
    border-top: 1px solid ${theme.colors.border};

    button {
      border: none;
      cursor: pointer;
      background: transparent;
      font-weight: ${theme.font_weight.medium};
      font-size: ${theme.font_sizes.sm};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacing.sm};
      transition: all ${theme.transitions.fast};
      color: ${theme.colors.fontSecondary};
    }

    .list-action {
      clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
      border-right: 1px solid ${theme.colors.border};
      &:hover {
        background: ${$color}15;
        color: ${$color};
      }
    }

    .create-action {
      clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
      margin-left: -10%;
      &:hover {
        background: ${theme.colors.bgHover};
        color: ${theme.colors.fontPrimary};
      }
    }

    @media (max-width: 767px) {
      height: 48px;
    }
  `}
`;
