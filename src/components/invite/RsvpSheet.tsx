import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CloseIcon, WhatsAppIcon } from "./Icons";

const WHATSAPP_NUMBER = "REPLACE_WITH_WHATSAPP_NUMBER";

export function RsvpSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        sheetRef.current,
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );
      gsap.fromTo(
        sheetRef.current?.querySelectorAll("[data-stagger]") ?? [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, delay: 0.2, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `RSVP for Thara's Mehendi Night (27 June 2026, 5:30 PM)`,
      `Name: ${name || "—"}`,
      `Attending: ${attending === "yes" ? "Yes" : "No"}`,
      attending === "yes" ? `Guests: ${guests}` : null,
      message ? `Message: ${message}` : null,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center" role="dialog" aria-modal="true">
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        ref={sheetRef}
        className="relative w-full max-w-md glass-card gold-border rounded-t-3xl md:rounded-3xl p-6 md:p-8 mx-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[color:var(--gold)] hover:text-[color:var(--gold-soft)]"
        >
          <CloseIcon size={22} />
        </button>
        <div data-stagger className="text-center mb-5">
          <p className="font-script text-3xl text-gold-gradient">RSVP</p>
          <p className="font-serif text-sm text-[color:var(--gold-soft)]/80 mt-1">
            Please share your kind response
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div data-stagger>
            <label className="block text-xs uppercase tracking-widest text-[color:var(--gold)]/80 mb-1.5">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[color:var(--input)] gold-border rounded-xl px-4 py-3 text-[color:var(--gold-soft)] outline-none focus:ring-2 focus:ring-[color:var(--gold)]/60"
              placeholder="Your full name"
            />
          </div>
          <div data-stagger>
            <label className="block text-xs uppercase tracking-widest text-[color:var(--gold)]/80 mb-1.5">Attendance</label>
            <div className="grid grid-cols-2 gap-2">
              {(["yes", "no"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAttending(v)}
                  className={`rounded-xl py-3 font-serif text-sm transition ${
                    attending === v
                      ? "gold-btn"
                      : "ghost-btn"
                  }`}
                >
                  {v === "yes" ? "Joyfully Attending" : "Regretfully Declining"}
                </button>
              ))}
            </div>
          </div>
          {attending === "yes" && (
            <div data-stagger>
              <label className="block text-xs uppercase tracking-widest text-[color:var(--gold)]/80 mb-1.5">Number of guests</label>
              <input
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                className="w-full bg-[color:var(--input)] gold-border rounded-xl px-4 py-3 text-[color:var(--gold-soft)] outline-none focus:ring-2 focus:ring-[color:var(--gold)]/60"
              />
            </div>
          )}
          <div data-stagger>
            <label className="block text-xs uppercase tracking-widest text-[color:var(--gold)]/80 mb-1.5">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-[color:var(--input)] gold-border rounded-xl px-4 py-3 text-[color:var(--gold-soft)] outline-none focus:ring-2 focus:ring-[color:var(--gold)]/60 resize-none"
              placeholder="A warm note for the bride"
            />
          </div>
          <button
            data-stagger
            type="submit"
            className="gold-btn w-full rounded-xl py-3.5 font-serif text-base flex items-center justify-center gap-2"
          >
            <WhatsAppIcon size={18} /> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
