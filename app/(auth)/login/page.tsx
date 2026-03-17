"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";

type Mode = "sign-in" | "sign-up";

const COLORS = {
  burgundy: "#631621",
  gold: "#D4AF37",
  cream: "#FAF7F2",
  ink: "#1A1A1A",
  muted: "#6B6B6B",
};

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const heading = useMemo(
    () => (mode === "sign-in" ? "Sign in" : "Create account"),
    [mode],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return setError("Email is required.");
    if (!password) return setError("Password is required.");

    setIsSubmitting(true);
    try {
      if (mode === "sign-in") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (signInError) throw signInError;
        setMessage("Welcome back.");
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        });
        if (signUpError) throw signUpError;
        setMessage("Account created. Check your email to confirm.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen px-6 py-16"
      style={{ background: COLORS.cream, color: COLORS.ink }}
    >
      <div className="mx-auto w-full max-w-md">
        <div className="mb-10 text-center">
          <p
            className="text-[11px] uppercase tracking-[0.35em]"
            style={{ color: COLORS.gold }}
          >
            LadyVerse
          </p>
          <h1
            className="mt-3 text-4xl leading-tight"
            style={{
              color: COLORS.burgundy,
              fontFamily:
                "'Playfair Display', ui-serif, Georgia, 'Times New Roman', serif",
              letterSpacing: "0.02em",
            }}
          >
            {heading}
          </h1>
          <p className="mt-3 text-sm" style={{ color: COLORS.muted }}>
            Private access for luxury brand investors.
          </p>
        </div>

        <div
          className="rounded-[28px] border bg-white/70 p-7 shadow-xl backdrop-blur"
          style={{ borderColor: COLORS.gold }}
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <ModeButton active={mode === "sign-in"} onClick={() => setMode("sign-in")}>
              Sign In
            </ModeButton>
            <ModeButton active={mode === "sign-up"} onClick={() => setMode("sign-up")}>
              Create Account
            </ModeButton>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[12px] tracking-wide"
                style={{ color: COLORS.muted }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm outline-none"
                style={{ borderColor: "rgba(26,26,26,0.12)" }}
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[12px] tracking-wide"
                style={{ color: COLORS.muted }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm outline-none"
                style={{ borderColor: "rgba(26,26,26,0.12)" }}
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <div
                className="rounded-2xl border px-4 py-3 text-sm"
                style={{
                  borderColor: "rgba(99,22,33,0.25)",
                  background: "rgba(99,22,33,0.06)",
                  color: COLORS.burgundy,
                }}
              >
                {error}
              </div>
            ) : null}

            {message ? (
              <div
                className="rounded-2xl border px-4 py-3 text-sm"
                style={{
                  borderColor: "rgba(212,175,55,0.35)",
                  background: "rgba(212,175,55,0.10)",
                  color: COLORS.ink,
                }}
              >
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-full px-6 py-3 text-sm tracking-wide disabled:opacity-60"
              style={{
                background: COLORS.burgundy,
                color: COLORS.cream,
                border: `1px solid ${COLORS.burgundy}`,
              }}
            >
              {isSubmitting ? "Please wait…" : mode === "sign-in" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[11px]" style={{ color: COLORS.muted }}>
          Gold accents are intentional. Luxury is restraint.
        </p>
      </div>
    </div>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
      }}
      className="rounded-full px-4 py-2 text-[12px] tracking-wide transition"
      style={{
        background: active ? COLORS.burgundy : "transparent",
        color: active ? COLORS.cream : COLORS.burgundy,
        border: `1px solid ${active ? COLORS.burgundy : COLORS.gold}`,
      }}
    >
      {children}
    </button>
  );
}

