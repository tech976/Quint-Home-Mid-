import type { ReactNode } from "react";
import { FadeUp } from "@/components/motion/fade-up";
import { Monogram } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  chapter: string;        // "§ One" / "§ Two"
  chapterTitle: string;   // "The Range" / "The Library"
  headline: ReactNode;    // Big serif headline
  meta?: ReactNode;       // Optional right-side meta line
  align?: "left" | "split";
  tone?: "dark" | "light";
}

export function SectionHeader({
  chapter,
  chapterTitle,
  headline,
  meta,
  align = "split",
  tone = "dark",
}: SectionHeaderProps) {
  const isLight = tone === "light";
  return (
    <header className="relative">
      {/* Chapter row – small, rules running outward */}
      <FadeUp className="mb-10">
        <div
          className={cn(
            "flex items-center gap-5 text-[0.72rem] md:text-[0.95rem] uppercase tracking-[0.16em] md:tracking-[0.22em]",
            isLight
              ? "text-[color:var(--color-stardust)]/70"
              : "text-[color:var(--color-charcoal-soft)]"
          )}
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Monogram className="h-3 w-3 shrink-0" />
            {chapter.replace(/^§\s*/, "")}
          </span>
          <span
            className={cn(
              "h-px flex-1 origin-left",
              isLight ? "bg-[color:var(--color-stardust)]/30" : "bg-[color:var(--color-rule)]"
            )}
          />
          <span className="whitespace-nowrap">{chapterTitle}</span>
        </div>
      </FadeUp>

      {/* Headline + meta */}
      <FadeUp delay={0.08}>
        <div
          className={cn(
            "flex gap-x-10 gap-y-6",
            align === "split"
              ? "flex-col md:flex-row md:items-end md:justify-between"
              : "flex-col"
          )}
        >
          <h2
            className={cn("max-w-[20ch] text-balance", isLight && "text-[color:var(--color-stardust)]")}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-4xl)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            {headline}
          </h2>
          {meta && (
            <div
              className={cn(
                "text-[0.78rem] leading-[1.65] md:max-w-[28ch] md:text-right",
                isLight
                  ? "text-[color:var(--color-stardust)]/75"
                  : "text-[color:var(--color-charcoal-soft)]"
              )}
            >
              {meta}
            </div>
          )}
        </div>
      </FadeUp>
    </header>
  );
}
