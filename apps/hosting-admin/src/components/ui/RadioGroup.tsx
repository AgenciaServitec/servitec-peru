import React from "react";
import styled, { css } from "styled-components";
import RadioAntd from "antd/lib/radio";
import type { RadioGroupProps as AntdRadioGroupProps } from "antd";
import { ComponentContainer } from "./component-container";

export interface RadioOption {
  value: string | number | boolean;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<AntdRadioGroupProps, "options" | "onChange"> {
  name?: string;
  value?: any;
  required?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  options: RadioOption[];
  variant?: "outlined" | "filled";
  disabled?: boolean;
  animation?: boolean;
  onChange?: (value: any) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  required = false,
  error = false,
  label,
  helperText,
  options = [],
  onChange,
  animation = false,
  variant = "filled",
  disabled = false,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      required={required}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
    >
      <RadioGroupStyled
        onChange={(e) => onChange?.(e.target.value)}
        options={options}
        disabled={disabled}
        {...props}
      />
    </Container>
  );
};

const RadioGroupStyled = styled(RadioAntd.Group)`
  ${({ theme }) => css`
    padding: ${theme.paddings.medium};

    .ant-radio-wrapper {
      color: ${theme.colors.fontPrimary};
      font-size: ${theme.font_sizes.small};
      margin-right: ${theme.paddings.large};
      transition: all 0.2s ease;

      &:hover {
        .ant-radio-inner {
          border-color: ${theme.colors.primary};
        }
      }

      .ant-radio {
        .ant-radio-inner {
          background-color: ${theme.colors.bgSecondary};
          border-color: ${theme.colors.fontSecondary};
          transition: all 0.2s ease;

          &:after {
            background-color: ${theme.colors.primary};
          }
        }

        &.ant-radio-checked {
          .ant-radio-inner {
            background-color: ${theme.colors.primary};
            border-color: ${theme.colors.primary};

            &:after {
              background-color: ${theme.colors.black};
            }
          }

          &:after {
            border-color: ${theme.colors.primary};
          }
        }

        &:hover .ant-radio-inner {
          border-color: ${theme.colors.primary};
        }
      }

      &.ant-radio-wrapper-disabled {
        opacity: 0.5;
        cursor: not-allowed;

        .ant-radio-inner {
          background-color: ${theme.colors.black}40;
        }
      }

      span:not(.ant-radio) {
        padding-left: ${theme.paddings.x_small};
      }
    }

    .ant-radio-button-wrapper {
      background-color: ${theme.colors.bgSecondary};
      border-color: ${theme.colors.fontSecondary}40;
      color: ${theme.colors.fontPrimary};
      transition: all 0.2s ease;

      &:hover {
        color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
      }

      &.ant-radio-button-wrapper-checked {
        background-color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
        color: ${theme.colors.black};

        &:hover {
          background-color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          color: ${theme.colors.black};
        }

        &:before {
          background-color: ${theme.colors.primary};
        }
      }

      &.ant-radio-button-wrapper-disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: ${theme.colors.black}40;
      }
    }
  `}
`;
