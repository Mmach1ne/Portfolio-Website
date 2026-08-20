import type { SliderProps as MuiSliderProps } from '@mui/material/Slider';
import MuiSlider from '@mui/material/Slider';

export type SliderProps = MuiSliderProps;

const sliderSx: MuiSliderProps['sx'] = {
  color: '#64ffda',
  height: 6,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#64ffda',
  },
  '& .MuiSlider-rail': {
    opacity: 0.35,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  '& .MuiSlider-thumb': {
    width: 14,
    height: 14,
    backgroundColor: '#64ffda',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(100,255,218,0.16)',
    },
  },
};

export function Slider({ sx, ...props }: SliderProps) {
  return <MuiSlider sx={[sliderSx, ...(Array.isArray(sx) ? sx : [sx])]} {...props} />;
}
