// Holographic supercar seen from the front three-quarter (nose pointing left). Each panel is reused for the fill, the mesh clip and the neon outline.
const CAR_PANELS = {
  face: "M58 430C56 418 58 410 66 404L178 392C184 404 186 420 184 442L90 452C76 450 62 442 58 430Z",
  hood: "M66 404L178 392C200 378 220 360 234 349L146 361C112 367 84 384 66 404Z",
  windshield: "M146 361L234 349L300 323C272 320 246 323 226 329C196 337 166 349 146 361Z",
  side: "M178 392C200 378 220 360 234 349L300 323C340 321 372 329 394 340C416 351 438 363 450 377C458 389 458 404 453 418L441 433L428 434C428 413 418 397 404 397C390 397 380 412 380 432L276 439C276 413 266 395 251 395C236 395 226 413 226 443L185 446C187 424 186 404 178 392Z",
};

const CAR_PANEL_PATHS = Object.values(CAR_PANELS);

const CAR_WHEELS = [
  { cx: 251, cy: 421, sx: 0.86, sy: 1.08 },
  { cx: 404, cy: 417, sx: 0.74, sy: 0.96 },
];

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
        <linearGradient id="car-holo-body" x1="300" x2="300" y1="322" y2="446" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9BEBFF" stopOpacity="0.62" />
          <stop offset="0.38" stopColor="#3C9BFF" stopOpacity="0.42" />
          <stop offset="1" stopColor="#1A3FC4" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="car-holo-glass" x1="230" x2="380" y1="346" y2="378" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CFF6FF" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#4FB4FF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#1E4FC8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="car-streak" x1="20" x2="660" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5FD8FF" stopOpacity="0" />
          <stop offset="0.25" stopColor="#7FE3FF" stopOpacity="0.9" />
          <stop offset="0.7" stopColor="#3D8CFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#3D8CFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="car-holo-halo" cx="0" cy="0" r="1" gradientTransform="translate(248 356) scale(236 104)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#B9EEFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#B9EEFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="car-floor-glow" cx="0" cy="0" r="1" gradientTransform="translate(262 450) scale(232 22)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7FE6FF" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#2F8BFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2F8BFF" stopOpacity="0" />
        </radialGradient>
        <pattern id="car-mesh" width="16" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 0H16M0 0L8 12L16 0M0 12H16" fill="none" stroke="#C9F4FF" strokeOpacity="0.32" strokeWidth="0.6" />
          <circle cx="0" cy="0" r="0.9" fill="#E9FBFF" />
          <circle cx="8" cy="12" r="0.9" fill="#E9FBFF" />
          <circle cx="16" cy="0" r="0.9" fill="#E9FBFF" />
        </pattern>
        <filter id="car-neon" x="-20%" y="-40%" width="140%" height="180%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="car-soft" x="-30%" y="-60%" width="160%" height="220%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <clipPath id="car-body-clip">
          {CAR_PANEL_PATHS.map((d) => (
            <path d={d} key={d} />
          ))}
        </clipPath>
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

      {/* Holographic wireframe sports car */}
      <g>
        <ellipse cx="248" cy="356" rx="236" ry="104" fill="url(#car-holo-halo)" />

        <g fill="none" stroke="url(#car-streak)" strokeLinecap="round" filter="url(#car-neon)">
          <path d="M6 486C120 462 300 448 660 420" strokeWidth="2.6" />
          <path d="M24 502C170 482 360 468 640 446" strokeWidth="1.5" strokeOpacity="0.85" />
          <path d="M60 520C220 506 400 494 600 478" strokeWidth="1.1" strokeOpacity="0.65" />
          <path d="M100 538C260 528 420 518 560 508" strokeWidth="0.9" strokeOpacity="0.5" />
          <path d="M452 392H640M456 410H668M446 428H612" strokeWidth="1.3" strokeOpacity="0.7" />
          <path d="M0 452H48M4 470H56" strokeWidth="1.2" strokeOpacity="0.55" />
        </g>

        <ellipse cx="262" cy="450" rx="232" ry="22" fill="url(#car-floor-glow)" />
        <g fill="#3FB6FF" fillOpacity="0.45" filter="url(#car-soft)">
          {CAR_PANEL_PATHS.map((d) => (
            <path d={d} key={d} />
          ))}
        </g>

        <path d={CAR_PANELS.side} fill="url(#car-holo-body)" />
        <path d={CAR_PANELS.face} fill="#2A7BFF" fillOpacity="0.42" />
        <path d={CAR_PANELS.hood} fill="#8FE4FF" fillOpacity="0.45" />
        <path d={CAR_PANELS.windshield} fill="url(#car-holo-glass)" />

        <g clipPath="url(#car-body-clip)">
          <rect x="50" y="316" width="414" height="140" fill="url(#car-mesh)" />
          <g fill="none" stroke="#BFF1FF" strokeOpacity="0.42" strokeWidth="0.9">
            <path d="M206 364C200 390 200 420 206 446M236 352C228 384 228 420 234 444M290 334C282 372 282 412 288 440M330 330C322 368 322 404 328 438M366 334C360 366 360 396 364 412M420 354C414 380 414 404 420 432" />
            <path d="M180 392C260 370 360 360 452 386M182 408C270 390 360 382 454 400M184 424C230 414 300 408 380 410M300 412C340 404 400 404 452 414" />
            <path d="M62 418L180 404M64 432L182 418M100 400L104 450M136 396L142 446" />
            <path d="M98 384L190 366M124 372L212 356M160 356L250 340M190 344L278 330" />
          </g>
          <ellipse cx="246" cy="346" rx="120" ry="18" fill="#FFFFFF" fillOpacity="0.32" filter="url(#light-glow)" />
        </g>

        <path d="M240 354L300 330C336 328 364 334 386 345L402 358C350 354 292 355 240 362Z" fill="url(#car-holo-glass)" stroke="#D6F7FF" strokeOpacity="0.75" strokeWidth="1.2" />
        <path d="M334 331L338 356" stroke="#D6F7FF" strokeOpacity="0.6" strokeWidth="1.2" />

        <g fill="none" stroke="#9EEBFF" strokeLinecap="round" strokeLinejoin="round" filter="url(#car-neon)">
          {CAR_PANEL_PATHS.map((d) => (
            <path d={d} key={d} strokeWidth="1.6" />
          ))}
          <path d="M184 384C260 362 360 352 450 380" strokeWidth="1.2" strokeOpacity="0.8" />
          <path d="M290 414C320 404 350 402 372 406" strokeWidth="1.2" strokeOpacity="0.7" />
        </g>

        <path d="M66 412L104 406L106 412L70 420Z" fill="#F2FDFF" filter="url(#car-neon)" />
        <path d="M140 400L176 395L177 402L142 407Z" fill="#F2FDFF" filter="url(#car-neon)" />
        <path d="M92 426L162 417L164 434L96 444Z" fill="#0B2A66" fillOpacity="0.6" stroke="#9EEBFF" strokeOpacity="0.7" />
        <path d="M444 376L456 388L455 402L447 396Z" fill="#7CC7FF" filter="url(#car-neon)" />

        {CAR_WHEELS.map(({ cx, cy, sx, sy }) => (
          <g key={cx} transform={`translate(${cx} ${cy}) scale(${sx} ${sy})`}>
            <circle r="30" fill="#061A44" fillOpacity="0.82" stroke="#7FDFFF" strokeOpacity="0.85" strokeWidth="2" filter="url(#car-neon)" />
            <circle r="20" fill="#0E3A8A" fillOpacity="0.55" stroke="#C9F4FF" strokeOpacity="0.8" strokeWidth="1.2" />
            <g stroke="#C9F4FF" strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round">
              <path d="M0 -6V-19" />
              <path d="M0 -6V-19" transform="rotate(72)" />
              <path d="M0 -6V-19" transform="rotate(144)" />
              <path d="M0 -6V-19" transform="rotate(216)" />
              <path d="M0 -6V-19" transform="rotate(288)" />
            </g>
            <circle r="5" fill="#E6FBFF" />
          </g>
        ))}

        <g fill="#E9FBFF">
          <circle cx="110" cy="360" r="1.6" fillOpacity="0.8" />
          <circle cx="178" cy="334" r="1.2" fillOpacity="0.7" />
          <circle cx="352" cy="310" r="1.4" fillOpacity="0.75" />
          <circle cx="430" cy="340" r="1.1" fillOpacity="0.6" />
          <circle cx="486" cy="380" r="1.5" fillOpacity="0.7" />
          <circle cx="40" cy="420" r="1.2" fillOpacity="0.6" />
          <circle cx="250" cy="312" r="1" fillOpacity="0.6" />
        </g>
      </g>

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
