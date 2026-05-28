import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CloseIcon, GoogleIcon, AppleIcon, OutlookIcon } from "./Icons";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";

export function CalendarSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(sheetRef.current, { y: "100%", opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
      gsap.fromTo(
        sheetRef.current?.querySelectorAll("[data-cstag]") ?? [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.07, delay: 0.2, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  const options = [
    {
      label: "Google Calendar",
      icon: <GoogleIcon size={22} />,
      action: () => {
        window.open(googleCalendarUrl(), "_blank", "noopener");
        onClose();
      },
    },
    {
      label: "Apple Calendar",
      icon: <AppleIcon size={22} />,
      action: () => {
        downloadIcs();
        onClose();
      },
    },
    {
      label: "Outlook Calendar",
      icon: <OutlookIcon size={22} />,
      action: () => {
        downloadIcs();
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center" role="dialog" aria-modal="true">
      <div ref={overlayRef} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div ref={sheetRef} className="relative w-full max-w-md glass-card gold-border rounded-t-3xl md:rounded-3xl p-6 md:p-8 mx-auto">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 text-[color:var(--gold)] hover:text-[color:var(--gold-soft)]">
          <CloseIcon size={22} />
        </button>
        <div data-cstag className="text-center mb-5">
          <p className="font-script text-3xl text-gold-gradient">Add to Calendar</p>
          <p className="font-serif text-sm text-[color:var(--gold-soft)]/80 mt-1">Choose your preferred calendar</p>
        </div>
        <div className="space-y-3">
          {options.map((o) => (
            <button
              key={o.label}
              data-cstag
              onClick={o.action}
              className="ghost-btn w-full rounded-xl py-3.5 px-4 flex items-center gap-3 font-serif text-base"
            >
              <span className="text-[color:var(--gold)]">{o.icon}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
