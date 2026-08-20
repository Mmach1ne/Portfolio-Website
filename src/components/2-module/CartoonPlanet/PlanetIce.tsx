import styles from './CartoonPlanet.module.css';

export function PlanetIce() {
  return (
    <svg className={styles.art} viewBox="0 0 200 200" data-testid="cartoon-planet-ice" aria-hidden>
      <defs>
        <clipPath id="ice-disc">
          <circle cx="100" cy="100" r="70" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="96" fill="#38bdf8" opacity="0.28" />
      <circle cx="100" cy="100" r="84" fill="#38bdf8" opacity="0.12" />
      <circle cx="100" cy="100" r="74" fill="#020617" />
      <g clipPath="url(#ice-disc)">
        <circle cx="100" cy="100" r="70" fill="#1d4ed8" />
        <ellipse cx="78" cy="76" rx="46" ry="40" fill="#3b82f6" opacity="0.7" />
        <g className={styles.spin}>
          <path fill="#38bdf8" d="M58 86c6 22 28 36 46 28 14-6 10-28-4-38-16-12-38-8-42 10z" />
          <path fill="#7dd3fc" d="M118 64c16-4 36 10 34 28-2 16-20 22-32 14-12-8-14-28-2-42z" />
          <ellipse cx="100" cy="38" rx="26" ry="16" fill="#e0f2fe" />
          <ellipse cx="102" cy="160" rx="24" ry="14" fill="#f8fafc" />
        </g>
        <ellipse cx="130" cy="130" rx="44" ry="36" fill="#1e3a8a" opacity="0.28" />
      </g>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#020617" strokeWidth="6" />
    </svg>
  );
}
