import { TextField, type TextFieldProps } from '@/vendor';

export type TextareaProps = TextFieldProps;

export function Textarea(props: TextareaProps) {
  return <TextField fullWidth multiline minRows={6} {...props} />;
}
