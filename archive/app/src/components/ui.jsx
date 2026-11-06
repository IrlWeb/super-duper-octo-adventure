import { useEffect, useId, useRef } from "react";
import X from "icon:x";

export const DISCORD_URL = "https://discord.gg/wJUyzdS6vW";

export function DiscordIcon({ className = "h-4 w-4" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

export const btnWhite =
  "btn-gloss group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition duration-200 hover:bg-[#F4F4F5] hover:shadow-[0_0_26px_rgba(255,85,0,0.45)] active:scale-[0.98]";
export const btnDark =
  "glass-card group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-card px-6 text-sm font-medium text-white transition duration-200 hover:border-accent/70 active:scale-[0.98]";
export const card = "glass-card rounded-xl border border-line bg-card transition duration-200 hover:border-accent/60";

export function DiscordButton({ className = btnDark, children = "Discord", onClick }) {
  return (
    <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={onClick} className={className}>
      <DiscordIcon className="h-[18px] w-[18px]" />
      {children}
    </a>
  );
}

export function StatusDot({ className = "" }) {
  return (
    <span aria-hidden="true" className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_1px_rgba(255,85,0,0.55)] ${className}`} />
  );
}

export function Badge({ children, dot = false }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1 text-xs text-[#D4D4D8]">
      {dot && <StatusDot />}
      {children}
    </span>
  );
}

export function PageHead({ tag, title, text }) {
  return (
    <header className="mx-auto max-w-2xl px-5 pb-12 pt-16 text-center sm:pt-24">
      <div className="rise"><Badge>{tag}</Badge></div>
      <h1 className="rise mt-5 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl" style={{ animationDelay: "60ms" }}>{title}</h1>
      <p className="rise mt-4 text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "120ms" }}>{text}</p>
    </header>
  );
}

export function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={id}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="fade-in m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-line bg-card p-0 text-white backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id={id} className="text-lg font-semibold tracking-tight">{title}</h2>
          <button type="button" onClick={onClose} className="-mr-2 -mt-2 grid h-11 w-11 place-items-center rounded-md text-muted transition hover:text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </dialog>
  );
}
