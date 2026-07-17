export function AutomotiveHeroIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full"
      focusable="false"
      viewBox="0 0 760 620"
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
        <linearGradient id="car-paint" x1="111" x2="423" y1="351" y2="539" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67E1FF" />
          <stop offset="0.38" stopColor="#3694FF" />
          <stop offset="0.72" stopColor="#336CEB" />
          <stop offset="1" stopColor="#6857EF" />
        </linearGradient>
        <linearGradient id="car-glass" x1="202" x2="335" y1="354" y2="413" gradientUnits="userSpaceOnUse">
          <stop stopColor="#153A72" />
          <stop offset="0.5" stopColor="#071D44" />
          <stop offset="1" stopColor="#102B62" />
        </linearGradient>
        <linearGradient id="headlamp" x1="129" x2="399" y1="455" y2="473" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FDFF" />
          <stop offset="0.5" stopColor="#9EEAFF" />
          <stop offset="1" stopColor="#FFFFFF" />
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

      <ellipse cx="269" cy="557" rx="172" ry="29" fill="#020A20" fillOpacity="0.42" />

      <g filter="url(#object-shadow)">
        <rect x="111" y="479" width="43" height="77" rx="18" fill="#06152E" />
        <rect x="384" y="479" width="43" height="77" rx="18" fill="#06152E" />

        <path d="M110 458C115 438 129 421 150 412L177 366C189 345 213 332 239 331H298C324 332 348 345 360 366L386 412C407 421 421 438 426 458L436 497C442 520 425 542 401 542H135C111 542 94 520 100 497L110 458Z" fill="url(#car-paint)" />
        <path d="M111 458C116 438 130 422 151 413L177 368C189 347 213 334 239 333H298C324 334 348 347 359 368L385 413C406 422 420 438 425 458" fill="none" stroke="#C8F4FF" strokeOpacity="0.55" strokeLinecap="round" strokeWidth="2" />

        <path d="M179 410L202 372C210 359 224 352 239 352H298C313 352 327 359 335 372L358 410H179Z" fill="url(#car-glass)" stroke="#9DDEFF" strokeOpacity="0.46" strokeWidth="1.5" />
        <path d="M210 369C218 360 229 356 241 356H268L253 408H184L210 369Z" fill="#7FD5FF" fillOpacity="0.08" />
        <path d="M271 356H296C308 356 320 362 327 372L350 408H286L271 356Z" fill="#FFFFFF" fillOpacity="0.05" />
        <path d="M268 354V410" stroke="#8ECFFF" strokeOpacity="0.22" strokeWidth="2" />

        <path d="M98 427C100 416 109 408 120 408H151L143 430H111C106 430 102 429 98 427Z" fill="#4A9CF3" stroke="#A8E9FF" strokeOpacity="0.42" />
        <path d="M439 427C437 416 428 408 417 408H386L394 430H426C431 430 435 429 439 427Z" fill="#5669E7" stroke="#A8E9FF" strokeOpacity="0.36" />

        <path d="M132 450C167 427 214 418 268 418C322 418 369 427 404 450L390 487H146L132 450Z" fill="#FFFFFF" fillOpacity="0.1" />
        <path d="M156 433C177 426 198 422 220 420M380 433C359 426 338 422 316 420" fill="none" stroke="#D6F7FF" strokeOpacity="0.36" strokeLinecap="round" strokeWidth="2" />

        <path d="M126 454C143 449 164 451 188 461L180 480C158 479 139 474 123 464L126 454Z" fill="url(#headlamp)" stroke="#D8FAFF" strokeOpacity="0.72" strokeWidth="1.5" filter="url(#light-glow)" />
        <path d="M410 454C393 449 372 451 348 461L356 480C378 479 397 474 413 464L410 454Z" fill="url(#headlamp)" stroke="#D8FAFF" strokeOpacity="0.72" strokeWidth="1.5" filter="url(#light-glow)" />

        <circle cx="268" cy="458" r="9" fill="#153A79" stroke="#B9ECFF" strokeOpacity="0.8" strokeWidth="2" />
        <path d="M260 458H276" stroke="#A8E8FF" strokeLinecap="round" strokeWidth="2" />

        <rect x="204" y="481" width="128" height="39" rx="18" fill="#081A39" stroke="#79CFFF" strokeOpacity="0.28" strokeWidth="1.5" />
        <path d="M222 493H314M230 501H306M240 509H296" stroke="#4B76BA" strokeLinecap="round" strokeWidth="2" />
        <rect x="128" y="500" width="59" height="23" rx="10" fill="#173B73" fillOpacity="0.86" />
        <rect x="349" y="500" width="59" height="23" rx="10" fill="#17346D" fillOpacity="0.86" />
        <path d="M149 531H387" stroke="#B5E9FF" strokeOpacity="0.3" strokeLinecap="round" strokeWidth="3" />
      </g>

      <path d="M111 575C248 599 474 594 648 557" fill="none" stroke="#76D5FF" strokeDasharray="4 10" strokeOpacity="0.2" strokeWidth="1.5" />
      <circle cx="450" cy="583" r="4" fill="#6DD6FF" fillOpacity="0.58" />
    </svg>
  );
}
