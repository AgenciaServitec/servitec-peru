import { Select as AntSelect } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import styled, { css } from "styled-components";
import { ComponentContainer } from "./component-container";

export type Option = { code?: string; label?: string; value?: string };

interface SelectProps {
  value?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  animation?: boolean;
  isMobile?: boolean;
  label?: string;
  variant?: "outlined" | "filled";
  allowClear?: boolean;
  filterOption?: (inputValue: string, optionLabel: string) => boolean;
  options?: Option[];
  placeholder?: string;
  helperText?: string;
  onChange?: (value?: string) => void;
}

const defaultFilterOption = (inputValue: string, optionLabel: string) => {
  const labelParts = optionLabel.toLowerCase().split(" - ");
  return labelParts.some((part) => part.includes(inputValue.toLowerCase()));
};

export const Select = ({
  value = undefined,
  required = false,
  error = false,
  disabled = false,
  animation = true,
  isMobile = false,
  label,
  variant = "filled",
  allowClear,
  filterOption = (inputValue, optionLabel) =>
    defaultFilterOption(inputValue, optionLabel),
  options = [],
  placeholder = "",
  helperText,
  onChange,
  ...props
}: SelectProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      required={required}
      value={value}
      error={error}
      helperText={helperText}
      disabled={disabled}
      label={label}
      animation={animation}
    >
      {isMobile ? (
        <StyledSelectMobile
          key={value}
          disabled={disabled}
          $error={error}
          onChange={(event) => onChange && onChange(event.target.value)}
          value={value ?? ""}
          defaultValue={value ?? ""}
        >
          {placeholder && (
            <option value="" hidden>
              {placeholder}
            </option>
          )}
          {!value && <option value="" hidden />}
          {options.map((option) => (
            <option key={option.code || option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelectMobile>
      ) : (
        <StyledAntSelect
          allowClear={disabled ? false : allowClear}
          variant="borderless"
          disabled={disabled}
          value={value}
          defaultValue={value}
          onChange={onChange}
          filterOption={(inputValue, option) =>
            filterOption(
              inputValue,
              String((option as DefaultOptionType)?.label ?? "")
            )
          }
          showSearch
          size="large"
          placeholder={placeholder}
          options={options as DefaultOptionType[]}
          {...props}
        />
      )}
    </Container>
  );
};

/* --- ESTILOS LIMPIOS SIN !IMPORTANT NI CREATED GLOBAL STYLE --- */

const StyledAntSelect = styled(AntSelect)`
  width: 100%;

  .ant-select-clear {
    background: transparent;
    color: ${({ theme }) => theme.colors.fontTertiary};
    padding-right: 4px;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const StyledSelectMobile = styled.select<{ $error: boolean }>`
  ${({ theme, value }) => css`
    width: calc(100% - 22px);
    height: 38px;
    border: none;
    margin: 0 11px;
    font-size: ${theme.font_sizes.sm};
    background-color: transparent;
    cursor: pointer;
    border-radius: ${theme.border_radius.xs};
    color: ${!value ? theme.colors.fontTertiary : theme.colors.fontPrimary};
    font-weight: ${theme.font_weight.medium};
    outline: none;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    option {
      background: ${theme.colors.bgTertiary};
      color: ${theme.colors.fontPrimary};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${theme.colors.fontDisabled};
    }
  `}
`;
