import { useEffect, useRef } from "react";
import lanternImg from "@/assets/lantern.png";
import petalImg from "@/assets/petal.png";
import { gsap } from "gsap";

export function Lantern({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <div className="lantern-sway origin-top" style={{ animationDelay: `${delay}s` }}>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 h-16 w-px bg-[color:var(--gold)]/40" />
        <div className="lantern-glow relative">
          <div className="absolute inset-0 -z-10 blur-2xl bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.16_75_/_0.7),transparent_70%)]" />
          <img src={lanternImg} alt="" width={120} height={180} className="w-20 md:w-28 h-auto drop-shadow-[0_0_22px_oklch(0.82_0.16_75_/_0.7)]" />
        </div>
      </div>
    </div>
  );
}

export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`gold-divider relative mx-auto h-px w-full max-w-xs ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,oklch(0.82_0.13_85_/_0.9),transparent)]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-[color:var(--gold)] shadow-[0_0_12px_oklch(0.82_0.16_75)]" />
    </div>
  );
}

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;
    const petals = ref.current.querySelectorAll<HTMLImageElement>("img");
    const ctx = gsap.context(() => {
      petals.forEach((el) => {
        const x = gsap.utils.random(-30, 30);
        const r = gsap.utils.random(-180, 180);
        const d = gsap.utils.random(12, 22);
        const delay = gsap.utils.random(0, 8);
        gsap.fromTo(
          el,
          { y: -80, x: 0, rotation: 0, opacity: 0 },
          {
            y: "110vh",
            x,
            rotation: r,
            opacity: 0.85,
            duration: d,
            delay,
            repeat: -1,
            ease: "none",
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <img
          key={i}
          src={petalImg}
          alt=""
          width={32}
          height={32}
          className="absolute h-6 w-6 md:h-8 md:w-8 opacity-0"
          style={{ left: `${(i * 100) / count}%`, top: 0 }}
        />
      ))}
    </div>
  );
}

export function GoldParticles({ count = 30 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;
    const dots = ref.current.querySelectorAll<HTMLSpanElement>("span");
    const ctx = gsap.context(() => {
      dots.forEach((el) => {
        gsap.to(el, {
          y: gsap.utils.random(-40, -120),
          opacity: gsap.utils.random(0.2, 0.9),
          duration: gsap.utils.random(3, 7),
          delay: gsap.utils.random(0, 4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block h-1 w-1 rounded-full bg-[color:var(--gold)] opacity-0 shadow-[0_0_8px_oklch(0.82_0.16_75)]"
          style={{ left: `${Math.random() * 100}%`, top: `${50 + Math.random() * 50}%` }}
        />
      ))}
    </div>
  );
}
