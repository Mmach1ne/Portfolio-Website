import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import MuiTextField from '@mui/material/TextField';

export type TextFieldProps = MuiTextFieldProps;

const fieldSx: MuiTextFieldProps['sx'] = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, sans-serif',
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.35)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.55)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#64ffda',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#6b7280',
    opacity: 1,
  },
};

export function TextField({ sx, ...props }: TextFieldProps) {
  return (
    <MuiTextField
      variant="outlined"
      sx={[fieldSx, ...(Array.isArray(sx) ? sx : [sx])]}
      {...props}
    />
  );
}
