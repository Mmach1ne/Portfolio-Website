import styles from './CartoonPlanet.module.css';

export function PlanetGas() {
  return (
    <svg className={styles.art} viewBox="0 0 200 200" data-testid="cartoon-planet-gas" aria-hidden>
      <defs>
        <clipPath id="gas-disc">
          <circle cx="100" cy="100" r="72" />
        </clipPath>
      </defs>
      <circle cx="100" cy="100" r="94" fill="#fbbf24" opacity="0.18" />
      <circle cx="100" cy="100" r="76" fill="#1a0c04" />
      <g clipPath="url(#gas-disc)">
        <circle cx="100" cy="100" r="72" fill="#f0b429" />
        <g className={styles.spin}>
          <ellipse cx="100" cy="48" rx="80" ry="16" fill="#fff3c4" />
          <ellipse cx="100" cy="72" rx="80" ry="12" fill="#d97706" />
          <ellipse cx="100" cy="96" rx="80" ry="14" fill="#fde68a" />
          <ellipse cx="100" cy="120" rx="80" ry="12" fill="#b45309" />
          <ellipse cx="100" cy="144" rx="80" ry="16" fill="#f59e0b" />
          <ellipse cx="132" cy="108" rx="22" ry="14" fill="#dc2626" />
          <ellipse cx="128" cy="106" rx="10" ry="6" fill="#fecaca" opacity="0.7" />
        </g>
        <ellipse cx="78" cy="78" rx="42" ry="36" fill="#fff7d6" opacity="0.35" />
        <ellipse cx="130" cy="132" rx="44" ry="34" fill="#92400e" opacity="0.22" />
      </g>
      <circle cx="100" cy="100" r="72" fill="none" stroke="#1a0c04" strokeWidth="6" />
    </svg>
  );
}
