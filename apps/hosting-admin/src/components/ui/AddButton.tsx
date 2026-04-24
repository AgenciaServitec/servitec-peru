import React, { type MouseEvent } from "react";
import styled, { css } from "styled-components";
import { Icon } from "./Icon";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./index";

export interface AddButtonProps {
  title: string;
  margin?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
}

interface ContainerProps {
  $margin?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({
  title,
  margin,
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <Container
      type="primary"
      $margin={margin}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      <ContentWrapper>
        <Icon icon={faPlus} fontSize="1.1rem" margin="0" />
        <TextWrapper>
          <span>Agregar {title}</span>
        </TextWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled(Button)<ContainerProps>`
  ${({ theme, $margin }) => css`
    min-width: 120px;
    width: auto;
    height: auto;
    margin: ${$margin || `0 0 ${theme.spacing.lg} 0`};
    padding: ${theme.spacing.sm} ${theme.spacing.lg};

    text-transform: none;
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    border-radius: ${theme.border_radius.md};
    box-shadow: ${theme.shadows.sm};
    transition: all ${theme.transitions.fast};

    &:hover:not(:disabled) {
      background: ${theme.colors.primaryDark};
      border-color: ${theme.colors.primaryDark};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: none;
    }

    &:disabled {
      background: ${theme.colors.bgTertiary};
      border-color: ${theme.colors.border};
      color: ${theme.colors.fontDisabled};
      opacity: 1;
      cursor: not-allowed;
    }
  `}
`;

const ContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: ${theme.spacing.sm};

    .icon-item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      svg {
        margin: 0;
      }
    }
  `}
`;

const TextWrapper = styled.div`
  ${({ theme }) => css`
    white-space: nowrap;
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    text-transform: none;
    text-shadow: none;
    color: #000000;
    letter-spacing: -0.01em;

    span {
      display: block;
      line-height: 1.5;
    }
  `}
`;
