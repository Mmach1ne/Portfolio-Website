import { tokens } from '@/theme';

type SparklineProps = {
  values: number[];
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
};

function buildPath(values: number[], width: number, height: number): string {
  if (values.length === 0) return '';

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function Sparkline({
  values,
  width = 160,
  height = 40,
  stroke = tokens.palette.accent,
  fill = 'rgba(100,255,218,0.12)',
}: SparklineProps) {
  const path = buildPath(values, width, height);
  const areaPath = path ? `${path} L ${width} ${height} L 0 ${height} Z` : '';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{ width: '100%', height, display: 'block' }}
      aria-hidden
    >
      {areaPath ? <path d={areaPath} fill={fill} stroke="none" /> : null}
      {path ? (
        <path d={path} fill="none" stroke={stroke} strokeWidth={1.5} strokeLinejoin="round" />
      ) : null}
    </svg>
  );
}
