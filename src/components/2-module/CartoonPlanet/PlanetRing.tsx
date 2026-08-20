import styles from './CartoonPlanet.module.css';

export function PlanetRing() {
  return (
    <svg className={styles.art} viewBox="0 0 280 200" data-testid="cartoon-planet-ring" aria-hidden>
      <defs>
        <clipPath id="ring-back">
          <rect x="0" y="0" width="280" height="100" />
        </clipPath>
        <clipPath id="ring-front">
          <rect x="0" y="100" width="280" height="100" />
        </clipPath>
        <clipPath id="ring-body">
          <circle cx="140" cy="100" r="52" />
        </clipPath>
      </defs>
      <circle cx="140" cy="100" r="72" fill="#ffe082" opacity="0.18" />
      <g clipPath="url(#ring-back)">
        <ellipse cx="140" cy="108" rx="124" ry="38" fill="none" stroke="#c98914" strokeWidth="22" />
        <ellipse cx="140" cy="108" rx="124" ry="38" fill="none" stroke="#ffe58a" strokeWidth="10" />
      </g>
      <circle cx="140" cy="100" r="56" fill="#1a1204" />
      <g clipPath="url(#ring-body)">
        <circle cx="140" cy="100" r="52" fill="#f2c14e" />
        <ellipse cx="124" cy="84" rx="34" ry="28" fill="#fff0b3" opacity="0.55" />
        <g className={styles.spin}>
          <ellipse cx="128" cy="92" rx="18" ry="10" fill="#e09112" />
          <ellipse cx="158" cy="118" rx="14" ry="8" fill="#d97706" />
          <ellipse cx="150" cy="78" rx="10" ry="6" fill="#fff3c4" />
        </g>
        <ellipse cx="158" cy="122" rx="32" ry="24" fill="#b45309" opacity="0.2" />
      </g>
      <circle cx="140" cy="100" r="52" fill="none" stroke="#1a1204" strokeWidth="5" />
      <g clipPath="url(#ring-front)">
        <ellipse cx="140" cy="108" rx="124" ry="38" fill="none" stroke="#c98914" strokeWidth="22" />
        <ellipse cx="140" cy="108" rx="124" ry="38" fill="none" stroke="#ffd54f" strokeWidth="10" />
      </g>
    </svg>
  );
}
