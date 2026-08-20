import styles from './CartoonPlanet.module.css';

export function PlanetEarth() {
  return (
    <svg
      className={styles.art}
      viewBox="0 0 200 200"
      data-testid="cartoon-planet-earth"
      aria-hidden
    >
      <defs>
        <clipPath id="earth-disc">
          <circle cx="100" cy="100" r="72" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="94" fill="#6ec8ff" opacity="0.22" />
      <circle cx="100" cy="100" r="82" fill="#6ec8ff" opacity="0.12" />
      <circle cx="100" cy="100" r="76" fill="#071018" />
      <g clipPath="url(#earth-disc)">
        <circle cx="100" cy="100" r="72" fill="#1a7cc2" />
        <ellipse cx="78" cy="78" rx="50" ry="44" fill="#4aa8dc" opacity="0.55" />
        <g className={styles.spin}>
          <path
            fill="#43a047"
            d="M52 68c-8 22-4 48 14 62 14 10 32 4 30-16-2-22-16-46-32-52-8-4-10-2-12 6z"
          />
          <path
            fill="#66bb6a"
            d="M108 52c18-8 42 4 48 24 6 22-6 42-24 46-16 6-28-10-26-28 2-16 4-34 2-42z"
          />
          <path fill="#2e7d32" d="M70 118c8 10 28 18 22 32-6 10-24 8-32-4-6-10-2-22 10-28z" />
          <path fill="#9ccc65" d="M142 128c10-2 18 8 16 16-4 10-18 8-22 0-2-8 0-14 6-16z" />
          <ellipse cx="100" cy="36" rx="24" ry="14" fill="#f4fbff" />
          <ellipse cx="98" cy="164" rx="22" ry="12" fill="#eef7fb" />
        </g>
        <ellipse cx="128" cy="128" rx="48" ry="40" fill="#0d4a7a" opacity="0.22" />
      </g>
      <circle cx="100" cy="100" r="72" fill="none" stroke="#071018" strokeWidth="6" />
    </svg>
  );
}
