import InputAntd from 'antd/lib/input';
import { ComponentContainer } from './component-container';
import type { InputHTMLAttributes } from 'react';

interface InputProps {
  value?: string;
  required?: boolean;
  hidden?: boolean;
  error?: boolean;
  label?: string;
  variant?: 'outlined' | 'filled';
  disabled?: boolean;
  animation?: boolean;
  helperText?: string;
  props: InputHTMLAttributes<HTMLInputElement>;
}

export const Input = ({
  value,
  required = false,
  hidden = false,
  error,
  label,
  variant = 'filled',
  disabled,
  animation,
  helperText,
  ...props
}: InputProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      hidden={hidden}
      error={error}
      label={label}
      disabled={disabled}
      helperText={helperText}
      animation={animation}
    >
      <InputAntd
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        disabled={disabled}
        allowClear={!disabled}
        style={{ width: '100%' }}
        {...props}
      />
    </Container>
  );
};
