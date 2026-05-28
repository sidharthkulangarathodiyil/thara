import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/hero-bg.jpg";
import floralCorner from "@/assets/floral-corner.png";
import dividerImg from "@/assets/divider.png";
import {
  PinIcon,
  CalendarIcon,
  FloralIcon,
  NavIcon,
  HeartIcon,
  WhatsAppIcon,
  ScrollIcon,
  SparkleIcon,
} from "@/components/invite/Icons";
import { Lantern, GoldDivider, FloatingPetals, GoldParticles } from "@/components/invite/Decor";
import { CalendarSheet } from "@/components/invite/CalendarSheet";
import { MusicToggle } from "@/components/invite/MusicToggle";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WHATSAPP_NUMBER = "REPLACE_WITH_WHATSAPP_NUMBER";
const WHATSAPP_MSG = encodeURIComponent(
  "Hi, I would like to confirm my RSVP for Thara's Mehendi Night on 27th June 2026 at 5:30 PM."
);
const VENUE_QUERY = encodeURIComponent("Manjal Restaurant & Hotels, Colombo 13");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thara's Mehendi Night — 27 June 2026" },
      {
        name: "description",
        content:
          "An evening of vibrant colours, music and dance. Join us at Manjal Restaurant & Hotels, Colombo 13 on 27 June 2026.",
      },
      { property: "og:title", content: "Thara's Mehendi Night" },
      { property: "og:description", content: "Colours of Love — 27 June 2026, Colombo 13" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Invite,
});

function Invite() {
  const [calOpen, setCalOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Hero intro
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-bg", { opacity: 0, scale: 1.05, duration: 1.6 })
        .from(".hero-lantern", { y: -40, opacity: 0, duration: 1.2, stagger: 0.15 }, "-=1.2")
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, "-=0.7")
        .from(".hero-title", { scale: 0.9, opacity: 0, duration: 1.1, ease: "expo.out" }, "-=0.4")
        .from(".hero-divider", { scaleX: 0, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero-date", { y: 24, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-scroll", { y: -10, opacity: 0, duration: 0.6 }, "-=0.3");

      if (!reduce) {
        gsap.to(".hero-scroll", { y: 8, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-divider").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          transformOrigin: "center",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".floral-left").forEach((el) => {
        gsap.from(el, {
          x: -40,
          opacity: 0,
          duration: 1.1,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".floral-right").forEach((el) => {
        gsap.from(el, {
          x: 40,
          opacity: 0,
          duration: 1.1,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Card stagger
      gsap.from(".detail-card", {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: { trigger: ".details-section", start: "top 75%" },
      });

      // Parallax florals
      if (!reduce) {
        gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
          gsap.to(el, {
            y: -60,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen text-[color:var(--gold-soft)]">
      <FloatingPetals count={16} />

      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center px-6 text-center">
        <img
          src={heroBg}
          alt=""
          className="hero-bg absolute inset-0 h-full w-full object-cover"
          width={1024}
          height={1536}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.12_0.06_10_/_0.7)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.07_12_/_0.4)] via-transparent to-[oklch(0.12_0.06_10_/_0.85)]" />

        {/* Lanterns */}
        <Lantern className="hero-lantern top-0 left-[8%]" delay={0} />
        <Lantern className="hero-lantern top-0 left-1/2 -translate-x-1/2" delay={0.6} />
        <Lantern className="hero-lantern top-0 right-[8%]" delay={1.1} />

        <GoldParticles count={36} />

        <div className="relative z-10 max-w-xl">
          <p className="hero-eyebrow font-serif tracking-[0.45em] text-xs md:text-sm uppercase text-[color:var(--gold)]/90 mb-6">
            Save The Date
          </p>
          <h1 className="hero-title font-script text-7xl md:text-9xl leading-none text-gold-gradient text-glow">
            Thara
          </h1>
          <p className="hero-eyebrow font-serif text-sm md:text-base text-[color:var(--gold-soft)]/85 mt-3 tracking-[0.3em] uppercase">
            invites you to her
          </p>
          <p className="hero-title font-script text-5xl md:text-7xl text-gold-gradient text-glow mt-2">
            Mehendi Night
          </p>

          <div className="hero-divider mt-8">
            <GoldDivider />
          </div>

          <div className="hero-date mt-8 flex items-center justify-center gap-4 font-serif">
            <span className="text-3xl md:text-5xl text-gold-gradient">27</span>
            <span className="text-[color:var(--gold)]/60 text-2xl">/</span>
            <span className="text-3xl md:text-5xl text-gold-gradient">06</span>
            <span className="text-[color:var(--gold)]/60 text-2xl">/</span>
            <span className="text-3xl md:text-5xl text-gold-gradient">2026</span>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-[color:var(--gold)]/80 flex flex-col items-center gap-2">
          <ScrollIcon size={28} />
          <span className="font-serif text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ============ SECTION 2: REVEAL ============ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden text-center">
        <img src={floralCorner} alt="" className="floral-left parallax-slow absolute -top-10 -left-10 w-56 md:w-80 opacity-70 pointer-events-none" />
        <img src={floralCorner} alt="" className="floral-right parallax-slow absolute -bottom-10 -right-10 w-56 md:w-80 opacity-70 pointer-events-none rotate-180" />

        <div className="relative max-w-2xl mx-auto">
          <p className="reveal font-serif tracking-[0.4em] uppercase text-xs md:text-sm text-[color:var(--gold)]/85">
            You Are Invited To
          </p>
          <h2 className="reveal font-script text-6xl md:text-8xl text-gold-gradient text-glow mt-6 leading-tight">
            Thara's<br />Mehendi Night
          </h2>
          <div className="reveal-divider mt-8 mx-auto">
            <img src={dividerImg} alt="" className="mx-auto w-72 md:w-96 opacity-90" />
          </div>
          <p className="reveal font-script text-3xl md:text-5xl text-[color:var(--amber)] mt-6">
            Colours of Love
          </p>
        </div>
      </section>

      {/* ============ SECTION 3: VIBE ============ */}
      <section className="relative py-24 md:py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.28_0.12_18_/_0.4),transparent_70%)]" />
        <div className="relative max-w-2xl mx-auto">
          <div className="reveal flex justify-center gap-6 text-[color:var(--gold)]/80 mb-8">
            <FloralIcon size={28} />
            <SparkleIcon size={28} />
            <FloralIcon size={28} />
          </div>
          <p className="reveal font-serif text-xl md:text-3xl leading-relaxed text-[color:var(--gold-soft)]/95 italic">
            An evening filled with vibrant colours, music, dance, laughter and endless memories.
          </p>
          <div className="reveal-divider mt-10 mx-auto">
            <GoldDivider />
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: DETAILS ============ */}
      <section className="details-section relative py-24 md:py-32 px-6">
        <div className="max-w-md md:max-w-5xl mx-auto">
          <h3 className="reveal text-center font-script text-5xl md:text-6xl text-gold-gradient text-glow mb-3">
            The Details
          </h3>
          <div className="reveal-divider mx-auto mb-12"><GoldDivider /></div>

          <div className="grid md:grid-cols-3 gap-6">
            <DetailCard icon={<PinIcon size={28} />} title="Venue" lines={["Manjal Restaurant & Hotels", "Colombo 13"]} />
            <DetailCard icon={<CalendarIcon size={28} />} title="When" lines={["27th June 2026", "5:30 PM onwards"]} />
            <DetailCard icon={<FloralIcon size={28} />} title="Dress Code" lines={["Colourful", "and Festive"]} />
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: MAP ============ */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="reveal font-script text-5xl md:text-6xl text-gold-gradient text-glow mb-3">Venue Location</h3>
          <p className="reveal font-serif text-base md:text-lg text-[color:var(--gold-soft)]/85 mb-3">
            Manjal Restaurant & Hotels, Colombo 13
          </p>
          <div className="reveal-divider mx-auto mb-10"><GoldDivider /></div>

          <div className="reveal relative rounded-3xl overflow-hidden gold-border p-1.5 bg-[color:var(--wine)]/40">
            <div className="rounded-2xl overflow-hidden">
              <iframe
                title="Venue map"
                src={`https://www.google.com/maps?q=${VENUE_QUERY}&output=embed`}
                className="w-full h-[320px] md:h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal mt-8 inline-flex items-center gap-2.5 gold-btn px-7 py-3.5 rounded-full font-serif text-base"
          >
            <NavIcon size={18} /> Open Location
          </a>
        </div>
      </section>

      {/* ============ SECTION 6: CLOSING ============ */}
      <section className="relative py-28 md:py-36 px-6 text-center overflow-hidden">
        <Lantern className="top-4 left-[10%]" delay={0.2} />
        <Lantern className="top-4 right-[10%]" delay={0.9} />
        <img src={floralCorner} alt="" className="floral-left parallax-slow absolute bottom-0 -left-12 w-56 md:w-80 opacity-60 pointer-events-none" />
        <img src={floralCorner} alt="" className="floral-right parallax-slow absolute bottom-0 -right-12 w-56 md:w-80 opacity-60 pointer-events-none rotate-180" />

        <div className="relative max-w-2xl mx-auto pt-16">
          <div className="reveal text-[color:var(--gold)] flex justify-center mb-6">
            <HeartIcon size={32} />
          </div>
          <p className="reveal font-serif text-xl md:text-2xl leading-relaxed text-[color:var(--gold-soft)]/95 italic">
            Come celebrate love, joy, and togetherness with us in your brightest festive vibes.
          </p>
          <div className="reveal-divider mt-10 mx-auto"><GoldDivider /></div>

<a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ghost-btn rounded-full px-7 py-3.5 font-serif text-base inline-flex items-center justify-center gap-2.5"
            >
              <WhatsAppIcon size={18} /> Confirm on WhatsApp
            </a>
            <button onClick={() => setCalOpen(true)} className="ghost-btn rounded-full px-7 py-3.5 font-serif text-base inline-flex items-center justify-center gap-2.5">
              <CalendarIcon size={18} /> Add to Calendar
            </button>
          </div>

          <p className="reveal mt-14 font-script text-4xl md:text-5xl text-gold-gradient text-glow">With Love, Thara</p>
        </div>
      </section>

      <footer className="relative py-6 text-center text-[color:var(--gold)]/40 font-serif text-xs tracking-[0.3em] uppercase">
        Thara · 27 · 06 · 2026
      </footer>

      <CalendarSheet open={calOpen} onClose={() => setCalOpen(false)} />
      <MusicToggle />
    </div>
  );
}

function DetailCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="detail-card glass-card gold-border rounded-3xl p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.82_0.13_85_/_0.08),transparent_70%)] pointer-events-none" />
      <div className="relative">
        <div className="mx-auto h-14 w-14 rounded-full flex items-center justify-center gold-border text-[color:var(--gold)] mb-4 bg-[color:var(--wine)]/40">
          {icon}
        </div>
        <p className="font-script text-3xl text-gold-gradient">{title}</p>
        <div className="mt-3 space-y-1 font-serif text-base md:text-lg text-[color:var(--gold-soft)]/90">
          {lines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
