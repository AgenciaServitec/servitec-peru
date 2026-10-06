import React from "react";
import styled, { css } from "styled-components";
import { List, type LucideIcon, Plus } from "lucide-react";

interface ShortcutItem {
  title: string;
  icon: LucideIcon | React.ReactNode;
  path: string;
  newPath?: string;
  color: string;
  permission: string;
  count: string;
}

interface ShortcutCardProps {
  item: ShortcutItem;
  count?: number;
  onList?: () => void;
  onCreate?: () => void;
}

export const ShortcutCard = ({
  item,
  count,
  onList,
  onCreate,
}: ShortcutCardProps) => {
  const showList = !!onList;
  const showCreate = !!onCreate && item.newPath !== "";
  const activeButtons = [showList, showCreate].filter(Boolean).length;

  const renderIcon = () => {
    if (React.isValidElement(item.icon)) {
      return item.icon;
    }
    const IconComponent = item.icon as any;
    return <IconComponent size={20} strokeWidth={2.2} />;
  };

  return (
    <CardContainer $color={item.color}>
      <CardHeader>
        <IconSolidWrapper $color={item.color}>{renderIcon()}</IconSolidWrapper>
        <TitleGroup>
          <h4 className="module-title">{item.title}</h4>
        </TitleGroup>
      </CardHeader>

      <CounterBlock>
        <span className="count-value">{count ?? 0}</span>
        <span className="count-label">registros</span>
      </CounterBlock>

      {activeButtons > 0 && (
        <ActionsGrid $columns={activeButtons}>
          {showList && (
            <ActionButton type="button" onClick={onList}>
              <List size={15} />
              <span>Lista</span>
            </ActionButton>
          )}
          {showCreate && (
            <ActionButton
              type="button"
              onClick={onCreate}
              className="create-btn"
            >
              <Plus size={15} />
              <span>Crear</span>
            </ActionButton>
          )}
        </ActionsGrid>
      )}
    </CardContainer>
  );
};

export default ShortcutCard;

/* --- ESTILOS LIMPIOS, SÓLIDOS Y SANS FANTASÍA --- */

const CardContainer = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    position: relative;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
    transition:
      border-color ${theme.transitions.fast},
      transform ${theme.transitions.fast},
      box-shadow ${theme.transitions.fast};

    &:hover {
      border-color: ${$color};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.sm};
    }
  `}
`;

const CardHeader = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `}
`;

const IconSolidWrapper = styled.div<{ $color: string }>`
  ${({ theme, $color }) => css`
    width: 38px;
    height: 38px;
    min-width: 38px;
    border-radius: ${theme.border_radius.md};
    background: ${$color};
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  `}
`;

const TitleGroup = styled.div`
  ${({ theme }) => css`
    flex: 1;
    overflow: hidden;

    .module-title {
      margin: 0;
      font-size: ${theme.font_sizes.sm};
      font-weight: ${theme.font_weight.semibold};
      color: ${theme.colors.fontPrimary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
    }
  `}
`;

const CounterBlock = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md};
    display: flex;
    align-items: baseline;
    gap: ${theme.spacing.xs};

    .count-value {
      font-size: 28px;
      font-weight: ${theme.font_weight.large};
      color: ${theme.colors.fontPrimary};
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .count-label {
      font-size: ${theme.font_sizes.xs};
      color: ${theme.colors.fontTertiary};
      font-weight: ${theme.font_weight.medium};
    }
  `}
`;

const ActionsGrid = styled.div<{ $columns: number }>`
  ${({ theme, $columns }) => css`
    display: grid;
    grid-template-columns: repeat(${$columns}, 1fr);
    background: ${theme.colors.bgTertiary};
    border-top: 1px solid ${theme.colors.border};
  `}
`;

const ActionButton = styled.button`
  ${({ theme }) => css`
    border: none;
    background: transparent;
    height: 38px;
    padding: 0 ${theme.spacing.xs};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: ${theme.font_sizes.xs};
    font-weight: ${theme.font_weight.medium};
    color: ${theme.colors.fontSecondary};
    transition: all ${theme.transitions.fast};

    & + button {
      border-left: 1px solid ${theme.colors.border};
    }

    &:hover {
      background: ${theme.colors.bgHover};
      color: ${theme.colors.fontPrimary};
    }

    &:active {
      background: ${theme.colors.bgPrimary};
    }
  `}
`;
