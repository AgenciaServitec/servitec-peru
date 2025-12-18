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
        <Icon icon={faPlus} fontSize="1.5rem" margin="0 .8rem 0 0" />
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
    margin: ${$margin || "0 0 1.5rem 0"};
    padding: ${theme.paddings.medium} ${theme.paddings.large};
    text-transform: uppercase;
    background: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: ${theme.colors.primary}dd;
      border-color: ${theme.colors.primary}dd;
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}
`;

const ContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap: ${theme.paddings.small};

    .icon-item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${theme.colors.black};

      svg {
        margin: 0;
      }
    }
  `}
`;

const TextWrapper = styled.div`
  ${({ theme }) => css`
    white-space: normal;
    font-size: ${theme.font_sizes.small};
    font-weight: ${theme.font_weight.medium};
    text-transform: uppercase;
    text-shadow: none;
    color: ${theme.colors.black};
    letter-spacing: 0.5px;

    span {
      display: block;
      line-height: 1.2;
    }
  `}
`;
