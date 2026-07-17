"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Armchair,
  Boxes,
  Layers3,
  Menu,
  X,
} from "lucide-react";

import { LogoutButton } from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { AutomotiveHeroIllustration } from "@/components/welcome/AutomotiveHeroIllustration";

import styles from "./welcome.module.css";

const navItems = [
  { name: "ScrapIQ", href: "/scrap" },
  { name: "CostPILOT", href: "/workflows" },
  { name: "Executive Horizon", href: "/executive-horizon" },
  { name: "GlobalOps", href: "/global-ops" },
];

const capabilities = [
  {
    label: "Interior trim",
    detail: "Material visibility",
    Icon: Layers3,
  },
  {
    label: "Seating",
    detail: "Component quality",
    Icon: Armchair,
  },
  {
    label: "Assemblies",
    detail: "End-to-end control",
    Icon: Boxes,
  },
];

export default function WelcomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className={styles.page}>
      <header className={`relative z-50 ${styles.header}`}>
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-[82px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          <Link
            aria-label="Vizora dashboard home"
            className="group inline-flex h-12 items-center rounded-xl px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#071630]"
            href="/"
          >
            <span className="relative block h-10 w-[132px] overflow-hidden">
              <Image
                alt="Vizora"
                className="absolute left-1/2 top-1/2 h-[132px] w-[132px] max-w-none -translate-x-1/2 -translate-y-1/2 brightness-0 invert transition-transform duration-300 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:scale-[1.02]"
                height={132}
                priority
                src="/logo.png"
                width={132}
              />
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-4 xl:flex">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-blue-100/80 transition duration-200 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <LogoutButton
              className="h-11 rounded-xl border-white/20 bg-white/[0.08] px-5 font-semibold text-white shadow-none hover:border-cyan-200/40 hover:bg-white/[0.14] hover:text-white"
              label="Sign out"
            />
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] text-white transition hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 xl:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            type="button"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div
            className={`absolute left-4 right-4 top-[70px] rounded-3xl border border-white/15 p-3 sm:left-auto sm:right-8 sm:w-[390px] xl:hidden ${styles.mobileMenu}`}
            id="mobile-navigation"
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  className="flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  href={item.href}
                  key={item.name}
                  onClick={closeMobileMenu}
                >
                  {item.name}
                  <ArrowRight className="h-4 w-4 text-cyan-200/70" />
                </Link>
              ))}
            </div>

            <div className="mt-3 border-t border-white/10 pt-3">
              <LogoutButton
                className="h-11 w-full rounded-xl border-white/15 bg-white/[0.08] font-semibold text-white hover:bg-white/[0.14] hover:text-white"
                label="Sign out"
              />
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          aria-labelledby="hero-title"
          className={`mx-auto grid w-full max-w-[1440px] items-center gap-10 px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:grid-cols-[minmax(0,0.86fr)_minmax(520px,1.14fr)] lg:gap-8 lg:px-12 lg:py-10 xl:gap-12 ${styles.heroGrid}`}
        >
          <div className={`relative z-10 max-w-[650px] ${styles.copyReveal}`}>
            <div className="mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-200/20 bg-cyan-100/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100 sm:text-xs sm:tracking-[0.2em]">
              <span className={`h-2 w-2 rounded-full bg-cyan-300 ${styles.eyebrowDot}`} />
              <span className="xs:hidden">Automotive intelligence</span>
              <span className="hidden xs:inline">Automotive interiors intelligence</span>
            </div>

            <h1
              className="text-[clamp(2.55rem,12.5vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.055em] text-white sm:text-[4.25rem] lg:text-[clamp(3.65rem,5.15vw,5.65rem)]"
              id="hero-title"
            >
              <span className="block">One view.</span>
              <span className="block whitespace-nowrap bg-gradient-to-r from-white via-blue-50 to-cyan-200 bg-clip-text text-transparent">
                Total control.
              </span>
            </h1>

            <p className="mt-6 max-w-[610px] text-base leading-7 text-blue-100/78 sm:mt-7 sm:text-lg sm:leading-8 lg:text-xl">
              Connect scrap, cost, executive, and global operations reporting across interior trim, seating components, and complete vehicle assemblies.
            </p>

            <div className="mt-8 flex flex-col gap-3 xs:flex-row sm:mt-9">
              <Button
                asChild
                className={`h-[54px] w-full rounded-2xl border-0 px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 xs:w-auto sm:px-7 ${styles.primaryCta}`}
              >
                <Link href="/executive-horizon">
                  Open executive view
                  <ArrowRight className="ml-1 h-[18px] w-[18px]" />
                </Link>
              </Button>
              <Button
                asChild
                className={`h-[54px] w-full rounded-2xl border border-white/15 px-6 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/35 hover:bg-white/[0.1] hover:text-white xs:w-auto ${styles.secondaryCta}`}
                variant="outline"
              >
                <Link href="/global-ops">Explore global operations</Link>
              </Button>
            </div>

            <div aria-label="Core manufacturing capabilities" className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
              {capabilities.map(({ label, detail, Icon }) => (
                <div
                  className={`group rounded-2xl border border-white/[0.11] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/25 sm:p-4 ${styles.capability}`}
                  key={label}
                >
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/15 text-cyan-200 ring-1 ring-inset ring-cyan-100/10 transition group-hover:bg-blue-400/25">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="block text-[11px] font-bold leading-4 text-white sm:text-xs">{label}</span>
                  <span className="mt-1 hidden text-[10px] leading-4 text-blue-100/55 sm:block">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative mx-auto w-full max-w-[760px] lg:-mr-3 ${styles.visualReveal}`}>
            <div className={styles.visualHalo} />
            <div className={styles.visualFloat}>
              <AutomotiveHeroIllustration />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
