import React from "react"

// Official Polydesign logo (transparent background). Its "Polydesign" wordmark is cut out with a CSS mask,
// so it takes one colour: the brand blue on white pages, white on dark ones.
const LOGO = { src: "/polydesignlogo.webp", width: 1634, height: 522 }
// Wordmark area in the logo file, in pixels
const WORDMARK = { x: 10, y: 10, width: 1224, height: 263 }

// Colours of the official logo
export const POLYDESIGN_BLUE = "#06417a"
const RULE_GREY = "#d2cfd2"
const TAGLINE_GREY = "#808080"

interface PolydesignLogoProps {
	tone?: "light" | "dark"
	// Wordmark height in pixels
	height?: number
}

export function PolydesignLogo({ tone = "light", height = 22 }: PolydesignLogoProps) {
	const scale = height / WORDMARK.height
	const isDark = tone === "dark"
	const mask = {
		maskImage: `url(${LOGO.src})`,
		WebkitMaskImage: `url(${LOGO.src})`,
		maskSize: `${LOGO.width * scale}px ${LOGO.height * scale}px`,
		WebkitMaskSize: `${LOGO.width * scale}px ${LOGO.height * scale}px`,
		maskPosition: `${-WORDMARK.x * scale}px ${-WORDMARK.y * scale}px`,
		WebkitMaskPosition: `${-WORDMARK.x * scale}px ${-WORDMARK.y * scale}px`,
		maskRepeat: "no-repeat",
		WebkitMaskRepeat: "no-repeat",
	}

	// Same layout as the official logo: wordmark, grey rule, tagline on the right
	return (
		<div role="img" aria-label="Polydesign, automotive solutions" className="flex w-max flex-col">
			<span
				className="block"
				style={{
					...mask,
					width: WORDMARK.width * scale,
					height,
					backgroundColor: isDark ? "#ffffff" : POLYDESIGN_BLUE,
				}}
			/>
			<span
				className="mt-[3px] block h-px w-full"
				style={{ backgroundColor: isDark ? "rgb(71 85 105)" : RULE_GREY }}
			/>
			<span
				className="mt-[3px] self-end whitespace-nowrap text-[10px] italic leading-none tracking-wide"
				style={{ color: isDark ? "rgb(148 163 184)" : TAGLINE_GREY }}
			>
				automotive solutions
			</span>
		</div>
	)
}
