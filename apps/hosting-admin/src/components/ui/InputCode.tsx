import OTPInput, { type OTPInputProps } from 'react-otp-input';
import styled, { css } from 'styled-components';
import { keyframes, mediaQuery, theme } from '../../styles';

interface InputCodeProps
  extends Omit<
    OTPInputProps,
    | 'value'
    | 'onChange'
    | 'numInputs'
    | 'renderSeparator'
    | 'renderInput'
    | 'inputStyle'
    | 'inputType'
  > {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hidden?: boolean;
  error?: boolean;
  label?: string;
  type?: 'number' | 'text';
  numInputs?: number;
  disabled?: boolean;
  animation?: string;
  helperText?: string;
}

export const InputCode = ({
  value,
  required = false,
  hidden = false,
  error,
  label,
  type = 'number',
  numInputs = 6,
  disabled,
  animation,
  helperText,
  onChange,
  ...props
}: InputCodeProps) => {
  return (
    <Container error={error}>
      {label && (
        <div className="label">
          <label>{label}</label>
        </div>
      )}
      <OTPInput
        value={value}
        onChange={onChange}
        numInputs={numInputs}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="input-style"
        inputType={type}
        {...props}
      />
      {error && <div className="warning-message">{helperText}</div>}
    </Container>
  );
};

const Container = styled.div<{ error?: boolean }>`
  ${({ error }) => css`
    .label {
      margin-bottom: 1rem;
    }

    div {
      justify-content: center;
      ${error &&
      css`
        animation: ${keyframes.shake} 340ms;
      `};
    }

    .input-style {
      width: 2.7rem !important;
      height: 2.7rem;
      margin: 0 0.3rem;
      font-size: 1.5rem;
      border-radius: 4px;
      border: ${`1px solid ${error ? theme.colors.error : 'rgba(0, 0, 0, 0.3)'}`};

      &[type='number']::-webkit-inner-spin-button,
      &[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      ${mediaQuery.minMobile} {
        width: 3rem !important;
        height: 3rem;
        margin: 0 1rem;
        font-size: 2rem;
      }
    }
    .warning-message {
      text-align: left;
      font-size: 0.8em;
      margin-top: 1em;
      color: ${({ theme }) => theme.colors.error};
    }
  `}
`;
