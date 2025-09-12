import InputAntd from 'antd/lib/input';
import { ComponentContainer } from './component-container';

interface TextAreaProps {
  value?: string | number;
  required?: boolean;
  error?: boolean;
  label?: string;
  variant?: 'outlined' | 'filled';
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
}

export const TextArea = ({
  value,
  required,
  disabled,
  error,
  label,
  placeholder,
  variant = 'filled',
  helperText,
  ...props
}: TextAreaProps) => {
  const Container = ComponentContainer[variant];

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      animation={false}
      helperText={helperText}
    >
      <InputAntd.TextArea
        bordered={false}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    </Container>
  );
};
