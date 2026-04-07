import AntSelect from "antd/lib/select";
import { ComponentContainer } from "./component-container";
import styled, { createGlobalStyle, css } from "styled-components";

type Option = { code?: string; label?: string; value?: string };

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
  options?: Option[] | undefined;
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
  onChange = (value) => value,
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
      {/* Inyectamos estilos para el portal del dropdown */}
      <DropdownStyles />

      {isMobile ? (
        <StyledSelectMobile
          key={value}
          disabled={disabled}
          $error={error}
          onChange={(event) => onChange && onChange(event.target.value)}
          value={value}
          defaultValue={value}
        >
          {placeholder && (
            <option value="" hidden>
              {placeholder}
            </option>
          )}
          {!value && <option value="" hidden />}
          {options.map((option) => (
            <option key={option.code} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelectMobile>
      ) : (
        <StyledAntSelect
          // Usamos una clase específica para no afectar otros selects si no queremos
          popupClassName="servitec-select-popup"
          allowClear={disabled ? false : allowClear}
          variant="borderless"
          disabled={disabled}
          value={value}
          defaultValue={value}
          onChange={onChange}
          filterOption={(inputValue, option) =>
            filterOption(inputValue, option?.label ?? "")
          }
          showSearch
          size="large"
          placeholder=""
          options={options}
          {...props}
        />
      )}
    </Container>
  );
};

/**
 * ESTILOS GLOBALES PARA EL PORTAL
 * Esto soluciona el fondo blanco y los textos invisibles en el dropdown
 */
const DropdownStyles = createGlobalStyle`
  ${({ theme }) => css`
    .servitec-select-popup {
      background-color: ${theme.colors.bgSecondary} !important;
      border: 1px solid ${theme.colors.border} !important;
      border-radius: ${theme.border_radius.md} !important;
      box-shadow: ${theme.shadows.lg} !important;
      padding: 4px 0 !important;

      .ant-select-item {
        color: ${theme.colors.fontSecondary} !important;
        margin: 2px 4px !important;
        border-radius: ${theme.border_radius.sm} !important;
        transition: all ${theme.transitions.fast};

        &-option-content {
          font-size: ${theme.font_sizes.sm} !important;
        }

        /* Hover */
        &-option-active {
          background-color: ${theme.colors.bgHover} !important;
          color: ${theme.colors.primary} !important;
        }

        /* Seleccionado */
        &-option-selected {
          background-color: ${theme.colors.primaryAlpha} !important;
          color: ${theme.colors.primary} !important;
          font-weight: ${theme.font_weight.large} !important;
        }
      }

      /* Scrollbar para el dropdown */
      .rc-virtual-list-scrollbar-thumb {
        background: ${theme.colors.border} !important;
      }

      /* Texto de 'No data' */
      .ant-select-item-empty {
        color: ${theme.colors.fontTertiary} !important;
      }
    }
  `}
`;

/* Estilos para Desktop (AntDesign Select) */
const StyledAntSelect = styled(AntSelect)`
  ${({ theme }) => css`
    width: 100%;

    /* ESTO CORRIGE EL COLOR DEL TEXTO AL ESCRIBIR */
    .ant-select-selection-search-input {
      color: ${theme.colors.fontPrimary} !important;
      font-size: ${theme.font_sizes.sm} !important;
    }

    .ant-select-selection-item,
    .ant-select-selection-placeholder {
      font-size: ${theme.font_sizes.sm} !important;
      color: ${theme.colors.fontPrimary} !important;
      font-weight: ${theme.font_weight.medium};
    }

    /* Color de la flecha de AntD */
    .ant-select-arrow {
      color: ${theme.colors.primary} !important;
      font-size: 12px;
    }

    /* Estilo para el botón de limpiar */
    .ant-select-clear {
      background: transparent;
      color: ${theme.colors.fontTertiary};
      padding-right: 4px;
      &:hover {
        color: ${theme.colors.primary};
      }
    }
  `}
`;

/* Estilos para Mobile (Native Select) */
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

    /* Reset de apariencia nativa */
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
