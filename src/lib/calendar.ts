export const EVENT = {
  title: "Thara's Mehendi Night",
  description:
    "An evening filled with vibrant colours, music, dance, laughter and endless memories. Dress Code: Colourful and Festive.",
  location: "Manjal Restaurant & Hotels, Colombo 13",
  // Asia/Colombo is UTC+05:30 — stored as UTC for portability
  startUTC: "20260627T120000Z", // 17:30 +05:30
  endUTC: "20260627T170000Z", // 22:30 +05:30
  startLocal: "20260627T173000",
  endLocal: "20260627T223000",
  tz: "Asia/Colombo",
};

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.title,
    dates: `${EVENT.startUTC}/${EVENT.endUTC}`,
    details: EVENT.description,
    location: EVENT.location,
    ctz: EVENT.tz,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(): string {
  const uid = `mehendi-${Date.now()}@thara.invite`;
  const dtstamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Thara Mehendi//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    `TZID:${EVENT.tz}`,
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:+0530",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=${EVENT.tz}:${EVENT.startLocal}`,
    `DTEND;TZID=${EVENT.tz}:${EVENT.endLocal}`,
    `SUMMARY:${esc(EVENT.title)}`,
    `DESCRIPTION:${esc(EVENT.description)}`,
    `LOCATION:${esc(EVENT.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(filename = "thara-mehendi-night.ics") {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
