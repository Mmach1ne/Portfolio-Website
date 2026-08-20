import { Stack, Text, VisuallyHidden } from '@/components/0-primitive';
import { Input } from '@/components/0-primitive/Input';
import { Textarea } from '@/components/0-primitive/Textarea';
import { tokens } from '@/theme';

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

export function FormField({
  label,
  name,
  value,
  onChange,
  multiline,
  required,
  error,
  disabled,
  placeholder,
}: FormFieldProps) {
  const Field = multiline ? Textarea : Input;

  return (
    <Stack spacing={0.5}>
      <VisuallyHidden>
        <label htmlFor={name}>{label}</label>
      </VisuallyHidden>
      <Field
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={placeholder ?? label}
        error={Boolean(error)}
        helperText={error}
        inputProps={{ 'aria-label': label }}
      />
      {error ? (
        <Text variant="caption" sx={{ color: tokens.palette.error }}>
          {error}
        </Text>
      ) : null}
    </Stack>
  );
}
