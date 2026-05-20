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
  count?: number;
  onList?: () => void;
  onCreate?: () => void;
}

const ShortcutCard = ({ item, count, onList, onCreate }: ShortcutCardProps) => {
  const showList = !!onList;
  const showCreate = !!onCreate;

  const activeButtons = [showList, showCreate].filter(Boolean).length;

  return (
    <ModernCard $color={item.color}>
      <CardBody>
        <TopRow>
          <IconContainer $color={item.color}>
            <FontAwesomeIcon icon={item.icon} />
          </IconContainer>
          <div className="info">
            <h3>{item.title}</h3>
            <p>Módulo de gestión</p>
          </div>
        </TopRow>

        {count !== undefined && (
          <CounterSection>
            <span className="counter-number">{count}</span>
            <span className="counter-label">Registros totales</span>
          </CounterSection>
        )}
      </CardBody>

      {activeButtons > 0 && (
        <LightningActions $color={item.color} $columns={activeButtons}>
          {showList && (
            <button className="list-action" onClick={onList}>
              <FontAwesomeIcon icon={faListUl} />
              <span>Lista</span>
            </button>
          )}
          {showCreate && (
            <button className="create-action" onClick={onCreate}>
              <FontAwesomeIcon icon={faPlus} />
              <span>Crear</span>
            </button>
          )}
        </LightningActions>
      )}
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
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.md};

      .counter-number {
        color: ${$color};
      }
    }
  `}
`;

const CardBody = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  `}
`;

const TopRow = styled.div`
  ${({ theme }) => css`
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

const CounterSection = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xs};
    display: flex;
    flex-direction: column;
    justify-content: center;

    .counter-number {
      font-size: 32px;
      font-weight: 700;
      color: ${theme.colors.fontPrimary};
      line-height: 1;
      transition: color ${theme.transitions.fast};
    }

    .counter-label {
      font-size: ${theme.font_sizes.xs};
      color: ${theme.colors.fontSecondary};
      margin-top: 4px;
      opacity: 0.7;
    }
  `}
`;

const IconContainer = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    width: 44px;
    height: 44px;
    border-radius: ${theme.border_radius.md};
    background: ${$color}15;
    color: ${$color};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font_sizes.lg};
    border: 1px solid ${$color}25;
  `}
`;

const LightningActions = styled.div<{ $color: string; $columns: number }>`
  ${({ theme, $color, $columns }) => css`
    display: grid;
    grid-template-columns: repeat(${$columns}, 1fr);
    height: 48px;
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

    ${$columns === 2
      ? css`
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
        `
      : css`
          button {
            width: 100%;
            &:hover {
              background: ${$color}12;
              color: ${$color};
            }
          }
        `}

    @media (max-width: 767px) {
      height: 44px;
    }
  `}
`;
