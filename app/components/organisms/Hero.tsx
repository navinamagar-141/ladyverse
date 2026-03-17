import Link from "next/link";

const BURGUNDY = "#631621";
const GOLD = "#D4AF37";

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8"
      style={{ background: "#FAF7F2" }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-[#2b070e] to-transparent opacity-80 lg:block"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6 space-y-8">
          <p
            className="tracking-[0.35em] text-xs uppercase"
            style={{ color: GOLD, letterSpacing: "0.35em" }}
          >
            Curated Luxury Investments
          </p>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl leading-tight"
            style={{
              color: BURGUNDY,
              fontFamily: `'Playfair Display', ui-serif, Georgia, 'Times New Roman', serif`,
              letterSpacing: "0.04em",
            }}
          >
            LadyVerse
            <span className="block text-2xl sm:text-3xl font-normal mt-3 text-[#3b1019]">
              A private universe of luxury skincare and lifestyle brands.
            </span>
          </h1>

          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[#6B6B6B]">
            Discover and back category-defining brands before the rest of the
            world. A curated deal flow, white-glove diligence, and a dashboard
            designed for discerning investors.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm tracking-wide"
              style={{
                background: BURGUNDY,
                color: "#FAF7F2",
                border: `1px solid ${BURGUNDY}`,
              }}
            >
              Request Private Access
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-xs sm:text-sm tracking-wide"
              style={{
                background: "transparent",
                color: BURGUNDY,
                border: `1px solid ${GOLD}`,
              }}
            >
              Explore Portfolio Overview
            </button>
          </div>

          <div className="flex flex-wrap gap-6 pt-8 text-xs text-[#6B6B6B]">
            <div>
              <p className="font-semibold text-[#1A1A1A]">Multi-tenant secure</p>
              <p>Isolated investor dashboards, bank-grade security policies.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1A1A1A]">Curated deal flow</p>
              <p>Only a handful of opportunities are admitted each season.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-0 lg:col-span-5 lg:col-start-8">
          <div className="relative mx-auto max-w-md">
            <div
              className="absolute -inset-1 rounded-[32px] opacity-60 blur-2xl"
              style={{ background: `radial-gradient(circle, ${GOLD}, transparent)` }}
              aria-hidden="true"
            />
            <div
              className="relative rounded-[32px] border bg-white/70 p-8 shadow-xl backdrop-blur"
              style={{
                borderColor: GOLD,
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: "#6B6B6B" }}
              >
                Investor Snapshot
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B]">Committed capital</span>
                  <span className="font-semibold text-[#1A1A1A]">$2.8M</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B]">Active brands</span>
                  <span className="font-semibold text-[#1A1A1A]">7</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#6B6B6B]">Average hold</span>
                  <span className="font-semibold text-[#1A1A1A]">4.2 years</span>
                </div>
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              <p className="mt-6 text-[11px] leading-relaxed text-[#6B6B6B]">
                LadyVerse is invitation-only. Share your investment thesis and we&apos;ll
                curate a private line-up of brands aligned with your strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

