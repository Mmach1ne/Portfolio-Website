'use client';

import type { ReactNode } from 'react';
import { Box, Text } from '@/components/0-primitive';
import { Slider as VendorSlider, type SliderProps as VendorSliderProps } from '@/vendor';

type SliderProps = VendorSliderProps & {
  label?: string;
  valueLabel?: ReactNode;
};

export function Slider({ label, valueLabel, sx, ...props }: SliderProps) {
  return (
    <Box sx={{ display: 'grid', gap: 0.75 }}>
      {label ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="caption">{label}</Text>
          {valueLabel ? <Text variant="caption">{valueLabel}</Text> : null}
        </Box>
      ) : null}
      <VendorSlider sx={sx} {...props} />
    </Box>
  );
}
