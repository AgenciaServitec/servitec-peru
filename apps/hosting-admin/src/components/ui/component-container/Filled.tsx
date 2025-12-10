import styled, { css } from "styled-components";
import { capitalize, isEmpty, startCase, toString } from "lodash";
import { classNames, keyframes } from "../../../styles";
import Typography from "antd/lib/typography";
import { lighten } from "polished";
import type { ReactNode } from "react";

const { Text } = Typography;

export interface BaseContainerProps {
  value?: boolean;
  required?: boolean;
  error?: boolean;
  hidden?: boolean;
  label?: string;
  disabled?: boolean;
  componentId?: string;
  children?: ReactNode;
  animation?: boolean;
  helperText?: string;
}

interface FilledProps extends BaseContainerProps {}

export const Filled = ({
  value,
  required,
  error,
  hidden = false,
  label,
  children,
  componentId,
  animation = true,
  disabled = false,
  helperText,
}: FilledProps) => (
  <>
    <Container
      value={typeof value === "object" ? !isEmpty(value) : !!toString(value)}
      className={classNames({ "scroll-error-anchor": error })}
      error={error}
      disabled={disabled}
      required={required}
      hidden={hidden}
      animation={animation}
    >
      <div className="item-wrapper">{children}</div>
      <label htmlFor={componentId} className="item-label">
        {label}
      </label>
    </Container>
    {helperText && (
      <Error error={error}>{capitalize(startCase(helperText))}</Error>
    )}
  </>
);

const labelAnimate = css`
  padding: 0 5px;
  border-radius: ${({ theme }) => theme.border_radius.xx_small};
  top: -9px;
  left: 6px;
  bottom: auto;
  font-weight: 600;
  font-size: ${({ theme }) => theme.font_sizes.x_small};
  background-color: ${({ theme }) => theme.colors.bgPrimary};
`;

const Container = styled.div<
  Pick<
    FilledProps,
    "error" | "required" | "disabled" | "value" | "animation" | "hidden"
  >
>`
  ${({ theme, error, required, disabled, value, animation, hidden }) => css`
    position: relative;
    width: inherit;
    border-radius: 9px;
    background: ${disabled
      ? lighten(0.02, theme.colors.bgSecondary)
      : theme.colors.bgSecondary};
    border: 1px solid
      ${error ? theme.colors.error : lighten(0.1, theme.colors.bgSecondary)};
    animation: ${error && keyframes.shake} 340ms
      cubic-bezier(0.36, 0.07, 0.19, 0.97) both;

    &:hover,
    &:focus-within {
      border-color: ${error
        ? theme.colors.error
        : disabled
          ? lighten(0.1, theme.colors.bgSecondary)
          : theme.colors.primary};
    }

    .item-label,
    .item-label:after {
      color: ${error
        ? theme.colors.error
        : disabled
          ? theme.colors.fontDisabled
          : theme.colors.fontSecondary};
    }

    .item-label {
      position: absolute;
      top: 0;
      left: 10px;
      bottom: 0;
      z-index: 100;
      pointer-events: none;
      display: flex;
      align-items: center;
      background-color: transparent;
      color: ${error ? theme.colors.error : theme.colors.fontSecondary};
      font-size: ${theme.font_sizes.small};
      transition:
        all ease-in-out 150ms,
        opacity 150ms;

      ${hidden &&
      css`
        display: none;
      `}

      ${!animation && labelAnimate};

      ${value && labelAnimate};

      ${required &&
      css`
        ::after {
          display: inline-block;
          margin-left: 0.2rem;
          color: ${error ? theme.colors.error : theme.colors.primary};
          font-size: ${theme.font_sizes.small};
          line-height: 1;
          content: "*";
        }
      `}
    }

    .item-wrapper {
      &:hover + .item-label,
      &:hover + .item-label:after {
        color: ${error
          ? theme.colors.error
          : disabled
            ? theme.colors.fontSecondary
            : theme.colors.primary};
      }

      &:focus-within + .item-label,
      &:-webkit-autofill + .item-label {
        ${labelAnimate};

        color: ${error ? theme.colors.error : theme.colors.primary};

        ${error &&
        css`
          color: ${theme.colors.error};
        `}

        &:after {
          color: ${error ? theme.colors.error : theme.colors.primary};
        }
      }

      input:-webkit-autofill {
        -webkit-text-fill-color: ${theme.colors.fontPrimary};
        -webkit-box-shadow: 0 0 0 1000px ${theme.colors.bgSecondary} inset;
        ${value &&
        css`
          -webkit-text-fill-color: ${theme.colors.fontPrimary};
        `};

        &:focus {
          -webkit-text-fill-color: ${theme.colors.fontPrimary};
        }
      }

      //Styles default
      .ant-input-number,
      .ant-picker,
      .ant-select {
        width: 100%;
        box-shadow: none;
        outline: none;
      }

      .ant-input-affix-wrapper,
      .ant-input {
        box-shadow: none;
        background: transparent !important;
      }

      .ant-input-group-addon {
        border: 0 solid ${lighten(0.1, theme.colors.bgSecondary)};
        border-left: 1px solid ${lighten(0.1, theme.colors.bgSecondary)};
        background: ${lighten(0.05, theme.colors.bgSecondary)};
        color: ${theme.colors.fontSecondary};
      }

      .ant-input-suffix {
        svg {
          fill: ${theme.colors.fontSecondary};
        }
      }
    }
  `}
`;

const Error = styled(Text)<Pick<FilledProps, "error">>`
  ${({ theme, error }) => css`
    color: ${theme.colors.error};
    font-size: ${theme.font_sizes.x_small};
    ${error &&
    css`
      animation: ${keyframes.shake} 340ms;
    `};
  `}
`;
