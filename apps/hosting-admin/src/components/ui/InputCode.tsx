import OTPInput from "react-otp-input";
import styled, { css } from "styled-components";
import { keyframes, mediaQuery } from "../../styles";

interface InputCodeProps {
  value: string;
  required?: boolean;
  hidden?: boolean;
  error?: boolean;
  label?: string;
  type?: "number" | "text" | "password" | "tel";
  numInputs?: number;
  disabled?: boolean;
  animation?: boolean;
  helperText?: string;
  onChange: (value: string) => void;
}

export const InputCode = ({
  value,
  required = false,
  hidden = false,
  error,
  label,
  type = "number",
  numInputs = 6,
  disabled,
  animation,
  helperText,
  onChange,
  ...props
}: InputCodeProps) => {
  return (
    <Container $error={error} $hidden={hidden}>
      {label && (
        <div className="label">
          <label>{label}</label>
          {required && <span className="required-mark">*</span>}
        </div>
      )}
      <div className="otp-wrapper">
        <OTPInput
          value={value}
          onChange={onChange}
          numInputs={numInputs}
          renderSeparator={<span className="separator">-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle="input-style"
          inputType={type}
          shouldAutoFocus
          disabled={disabled}
          {...props}
        />
      </div>
      {error && helperText && (
        <div className="warning-message">{helperText}</div>
      )}
    </Container>
  );
};

const Container = styled.div<{ $error?: boolean; $hidden?: boolean }>`
  ${({ theme, $error, $hidden }) => css`
    display: ${$hidden ? "none" : "block"};
    width: 100%;

    .label {
      margin-bottom: ${theme.spacing.md};
      color: ${$error ? theme.colors.error : theme.colors.fontPrimary};
      font-weight: ${theme.font_weight.medium};
      font-size: ${theme.font_sizes.sm};
      text-align: center;

      .required-mark {
        color: ${theme.colors.error};
        margin-left: ${theme.spacing.xs};
      }
    }

    .otp-wrapper {
      display: flex;
      justify-content: center;
      ${$error &&
      css`
        animation: ${keyframes.shake} 340ms cubic-bezier(0.36, 0.07, 0.19, 0.97)
          both;
      `};
    }

    .separator {
      color: ${theme.colors.fontTertiary};
      font-weight: ${theme.font_weight.large};
      margin: 0 ${theme.spacing.xs};
    }

    .input-style {
      width: 2.5rem !important;
      height: 3rem;
      font-size: ${theme.font_sizes.xl};
      border-radius: ${theme.border_radius.sm};
      background: ${theme.colors.bgSecondary};
      color: ${theme.colors.fontPrimary};
      border: 1px solid ${$error ? theme.colors.error : theme.colors.border};
      text-align: center;
      font-weight: ${theme.font_weight.large};
      transition: all ${theme.transitions.fast};

      &:hover:not(:disabled) {
        border-color: ${$error ? theme.colors.error : theme.colors.borderHover};
      }

      &:focus {
        outline: none;
        border-color: ${$error ? theme.colors.error : theme.colors.primary};
        box-shadow: 0 0 0 3px
          ${$error ? `${theme.colors.error}26` : theme.colors.primaryAlpha};
        background: ${theme.colors.bgPrimary};
      }

      &:disabled {
        background: ${theme.colors.bgTertiary};
        color: ${theme.colors.fontDisabled};
        cursor: not-allowed;
      }

      /* Quitar flechas de input number */
      &[type="number"]::-webkit-inner-spin-button,
      &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      ${mediaQuery.minMobile} {
        width: 3.5rem !important;
        height: 4rem;
        font-size: ${theme.font_sizes.xxl};
      }
    }

    .warning-message {
      text-align: center;
      font-size: ${theme.font_sizes.xs};
      margin-top: ${theme.spacing.md};
      color: ${theme.colors.error};
      font-weight: ${theme.font_weight.medium};
    }
  `}
`;
