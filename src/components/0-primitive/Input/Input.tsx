import { TextField, type TextFieldProps } from '@/vendor';

export type InputProps = Omit<TextFieldProps, 'multiline'>;

export function Input(props: InputProps) {
  return <TextField fullWidth {...props} />;
}
