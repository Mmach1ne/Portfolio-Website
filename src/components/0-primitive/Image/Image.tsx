import type { ImgHTMLAttributes } from 'react';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  width: number;
  height: number;
};

export function Image({ width, height, alt, loading = 'lazy', ...props }: ImageProps) {
  // biome-ignore lint/performance/noImgElement: thin primitive wrapper; callers may migrate to next/image per route
  return <img width={width} height={height} alt={alt} loading={loading} {...props} />;
}
