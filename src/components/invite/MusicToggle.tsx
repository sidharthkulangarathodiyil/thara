import { useEffect, useRef, useState } from "react";
import { SpeakerOnIcon, SpeakerOffIcon } from "./Icons";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio("/assets/music/mehendi-theme.mp3");
    a.loop = true;
    a.volume = 0.5;
    a.preload = "auto";
    const onReady = () => setAvailable(true);
    const onErr = () => setAvailable(false);
    a.addEventListener("canplaythrough", onReady, { once: true });
    a.addEventListener("error", onErr, { once: true });
    audioRef.current = a;
    return () => {
      a.pause();
      a.removeEventListener("canplaythrough", onReady);
      a.removeEventListener("error", onErr);
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setAvailable(false);
      }
    }
  };

  if (!available) return null;
  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-[90] h-12 w-12 rounded-full gold-btn flex items-center justify-center"
    >
      {playing ? <SpeakerOnIcon size={22} /> : <SpeakerOffIcon size={22} />}
    </button>
  );
}
