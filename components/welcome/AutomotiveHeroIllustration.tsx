export function AutomotiveHeroIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full"
      focusable="false"
      viewBox="0 40 760 560"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="monitor-shell" x1="142" x2="676" y1="64" y2="444" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D4A91" />
          <stop offset="0.5" stopColor="#102E68" />
          <stop offset="1" stopColor="#071838" />
        </linearGradient>
        <linearGradient id="monitor-edge" x1="118" x2="690" y1="62" y2="446" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8BE3FF" stopOpacity="0.58" />
          <stop offset="0.48" stopColor="#5998FF" stopOpacity="0.2" />
          <stop offset="1" stopColor="#8B74FF" stopOpacity="0.48" />
        </linearGradient>
        <linearGradient id="screen-surface" x1="172" x2="632" y1="84" y2="390" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D8F6FF" />
          <stop offset="0.48" stopColor="#9AD9FF" />
          <stop offset="1" stopColor="#6D9DFF" />
        </linearGradient>
        <linearGradient id="screen-wash" x1="169" x2="651" y1="96" y2="384" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="0.54" stopColor="#D5EFFF" stopOpacity="0.34" />
          <stop offset="1" stopColor="#7B78FF" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id="chart-accent" x1="197" x2="466" y1="258" y2="179" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F80FF" />
          <stop offset="0.55" stopColor="#37C5FF" />
          <stop offset="1" stopColor="#655AF2" />
        </linearGradient>
        <linearGradient id="chart-area" x1="326" x2="326" y1="186" y2="274" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F91FF" stopOpacity="0.38" />
          <stop offset="1" stopColor="#2F91FF" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="stand-paint" x1="380" x2="513" y1="427" y2="521" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2857A5" />
          <stop offset="1" stopColor="#0B214E" />
        </linearGradient>
        <linearGradient id="shared-floor" x1="114" x2="644" y1="535" y2="564" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2B7CFF" stopOpacity="0" />
          <stop offset="0.28" stopColor="#39BDFF" stopOpacity="0.2" />
          <stop offset="0.58" stopColor="#4C79F6" stopOpacity="0.26" />
          <stop offset="1" stopColor="#6A58E9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gear-paint" x1="568" x2="686" y1="411" y2="545" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8EE4FF" />
          <stop offset="0.5" stopColor="#4E9DFF" />
          <stop offset="1" stopColor="#5B58EA" />
        </linearGradient>
        <radialGradient id="ambient-glow" cx="0" cy="0" r="1" gradientTransform="translate(514 266) rotate(115) scale(290 330)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#50CFFF" stopOpacity="0.34" />
          <stop offset="0.48" stopColor="#547BFF" stopOpacity="0.13" />
          <stop offset="1" stopColor="#547BFF" stopOpacity="0" />
        </radialGradient>
        <filter id="monitor-shadow" x="-25%" y="-25%" width="150%" height="175%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="28" stdDeviation="24" floodColor="#01081C" floodOpacity="0.48" />
        </filter>
        <filter id="object-shadow" x="-35%" y="-35%" width="170%" height="190%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor="#020A20" floodOpacity="0.46" />
        </filter>
        <filter id="light-glow" x="-80%" y="-150%" width="260%" height="400%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="5" result="glow" />
          <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
        <filter id="hero-car-glow" x="-10%" y="-20%" width="120%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="screen-clip">
          <rect x="148" y="82" width="514" height="313" rx="24" />
        </clipPath>
      </defs>

      <ellipse cx="491" cy="287" rx="285" ry="274" fill="url(#ambient-glow)" />
      <circle cx="681" cy="144" r="61" fill="none" stroke="#9BD9FF" strokeDasharray="3 11" strokeOpacity="0.18" strokeWidth="2" />
      <circle cx="91" cy="424" r="46" fill="none" stroke="#63D6FF" strokeDasharray="2 9" strokeOpacity="0.16" strokeWidth="2" />
      <path d="M54 164H104M79 139V189" stroke="#96E4FF" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="713" cy="357" r="5" fill="#7EDFFF" fillOpacity="0.35" />

      <g filter="url(#monitor-shadow)">
        <path d="M389 421H495L512 503H372L389 421Z" fill="url(#stand-paint)" />
        <path d="M404 438H480L489 486H394L404 438Z" fill="#4E8AE0" fillOpacity="0.22" />
        <rect x="323" y="494" width="238" height="30" rx="15" fill="#0A1D44" stroke="#75C7FF" strokeOpacity="0.26" strokeWidth="1.5" />

        <rect x="119" y="53" width="570" height="395" rx="43" fill="url(#monitor-shell)" />
        <rect x="120" y="54" width="568" height="393" rx="42" fill="none" stroke="url(#monitor-edge)" strokeWidth="2" />
        <rect x="141" y="75" width="526" height="326" rx="29" fill="#061632" stroke="#73C7FF" strokeOpacity="0.24" strokeWidth="1.5" />
        <rect x="148" y="82" width="514" height="313" rx="24" fill="url(#screen-surface)" />
      </g>

      <g clipPath="url(#screen-clip)">
        <rect x="148" y="82" width="514" height="313" fill="url(#screen-wash)" />
        <path d="M121 390C252 316 381 372 481 296C559 237 597 135 697 104" fill="none" stroke="#FFFFFF" strokeOpacity="0.13" strokeWidth="68" />
        <path d="M132 397C270 326 387 382 492 305C573 246 610 151 700 118" fill="none" stroke="#FFFFFF" strokeOpacity="0.36" strokeWidth="1.5" />

        <circle cx="175" cy="108" r="4.5" fill="#2566D9" />
        <circle cx="190" cy="108" r="4.5" fill="#3C9CF3" />
        <circle cx="205" cy="108" r="4.5" fill="#6556E9" />
        <rect x="230" y="105" width="129" height="6" rx="3" fill="#1E5EBD" fillOpacity="0.25" />
        <rect x="560" y="99" width="76" height="20" rx="10" fill="#FFFFFF" fillOpacity="0.44" />

        <rect x="170" y="134" width="468" height="237" rx="22" fill="#F5FBFF" fillOpacity="0.84" stroke="#FFFFFF" strokeOpacity="0.58" strokeWidth="1.5" />

        <rect x="195" y="158" width="109" height="7" rx="3.5" fill="#2D70C7" fillOpacity="0.26" />
        <rect x="195" y="173" width="62" height="5" rx="2.5" fill="#2D70C7" fillOpacity="0.16" />
        <path d="M196 207H474M196 238H474M196 269H474" stroke="#3476CC" strokeOpacity="0.12" strokeWidth="1.5" />
        <path d="M203 270C229 257 243 222 268 233C291 243 305 211 327 218C352 226 366 188 390 198C415 209 429 177 463 183V276H203Z" fill="url(#chart-area)" />
        <path d="M203 270C229 257 243 222 268 233C291 243 305 211 327 218C352 226 366 188 390 198C415 209 429 177 463 183" fill="none" stroke="url(#chart-accent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        <circle cx="463" cy="183" r="5" fill="#4AD6FF" filter="url(#light-glow)" />

        <rect x="499" y="157" width="112" height="47" rx="12" fill="#498CF1" fillOpacity="0.22" />
        <rect x="516" y="172" width="78" height="7" rx="3.5" fill="#2771D9" fillOpacity="0.4" />
        <rect x="530" y="185" width="50" height="5" rx="2.5" fill="#2771D9" fillOpacity="0.18" />

        <circle cx="555" cy="258" r="44" fill="none" stroke="#3777D4" strokeOpacity="0.18" strokeWidth="15" />
        <path d="M555 214A44 44 0 1 1 517 280" fill="none" stroke="url(#chart-accent)" strokeLinecap="round" strokeWidth="15" />
        <circle cx="555" cy="258" r="12" fill="#4B83E7" fillOpacity="0.15" />

        <rect x="201" y="317" width="18" height="27" rx="5" fill="#8DC8FF" />
        <rect x="228" y="303" width="18" height="41" rx="5" fill="#6FB7FF" />
        <rect x="255" y="288" width="18" height="56" rx="5" fill="#4DA0FB" />
        <rect x="282" y="312" width="18" height="32" rx="5" fill="#80C4FF" />
        <rect x="309" y="296" width="18" height="48" rx="5" fill="#458DF1" />
        <rect x="336" y="279" width="18" height="65" rx="5" fill="#566FED" />
        <rect x="378" y="316" width="92" height="6" rx="3" fill="#2D70C7" fillOpacity="0.2" />
        <rect x="378" y="332" width="70" height="6" rx="3" fill="#2D70C7" fillOpacity="0.13" />
      </g>

      <ellipse cx="372" cy="552" rx="281" ry="43" fill="url(#shared-floor)" />
      <ellipse cx="372" cy="552" rx="252" ry="31" fill="none" stroke="#78D9FF" strokeOpacity="0.16" strokeWidth="1.5" />

      <path d="M149 395H661" stroke="#C5F2FF" strokeLinecap="round" strokeOpacity="0.48" strokeWidth="2" />
      <path d="M149 399H661" stroke="#4BCBFF" strokeLinecap="round" strokeOpacity="0.18" strokeWidth="5" filter="url(#light-glow)" />

      {/* Neon car artwork (public/hero-car.png); its dark background is keyed out so it blends into the scene */}
      <image href="/hero-car.png" x="-60" y="283" width="640" height="325" filter="url(#hero-car-glow)" />

      <rect x="637" y="415" width="26" height="7" rx="3.5" fill="#72D7FF" fillOpacity="0.7" />

      <g transform="translate(625 479)" filter="url(#object-shadow)">
        <g fill="url(#gear-paint)">
          <rect x="-13" y="-91" width="26" height="38" rx="7" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(45)" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(90)" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(135)" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(180)" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(225)" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(270)" />
          <rect x="-13" y="-91" width="26" height="38" rx="7" transform="rotate(315)" />
          <circle r="65" />
        </g>
        <circle r="34" fill="#10295C" stroke="#A6ECFF" strokeOpacity="0.38" strokeWidth="2" />
        <circle r="17" fill="url(#gear-paint)" fillOpacity="0.78" />
      </g>

      <path d="M111 575C248 599 474 594 648 557" fill="none" stroke="#76D5FF" strokeDasharray="4 10" strokeOpacity="0.2" strokeWidth="1.5" />
      <circle cx="450" cy="583" r="4" fill="#6DD6FF" fillOpacity="0.58" />
    </svg>
  );
}
