import { Link } from "react-router";
import { ArrowRight, Monitor, Layers, BookOpen, KeyRound } from "lucide-react";
import Showcase from "../components/Showcase";
import { StatusDot, DiscordButton, btnWhite, btnDark, card } from "../components/ui";

const STATS = [
  ["100%", "UNC coverage goal"],
  ["97%", "sUNC coverage goal"],
  ["Luau", "Built for Roblox scripts"],
];

const EXPLORE = [
  { to: "/features", icon: Layers, title: "Features", text: "Editor, script hub and autoexec in one window." },
  { to: "/docs", icon: BookOpen, title: "Documentation", text: "Setup guides, the API and fixes for common issues." },
  { to: "/pricing", icon: KeyRound, title: "Free keys", text: "Free to use, with a simple key system." },
];

export default function Home() {
  return (
    <>
      <section className="px-5 pb-16 pt-20 text-center sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link to="/status" className="rise group inline-flex min-h-9 items-center gap-2.5 rounded-full border border-line bg-panel px-4 text-xs text-[#D4D4D8] transition hover:border-accent/60">
            <StatusDot /> In development, not released yet
            <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </Link>
          <h1 className="rise mt-7 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.5rem]" style={{ animationDelay: "60ms" }}>
            A script executor that stays out of your way
          </h1>
          <p className="rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: "120ms" }}>
            Graviy runs Luau scripts on Roblox with a fast editor, built-in script hub, and a simple key system. Free to use.
          </p>
          <div className="rise mt-9 flex flex-col justify-center gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
            <Link to="/pricing#download" className={btnWhite}><Monitor className="h-4 w-4" /> Download for Windows</Link>
            <Link to="/docs" className={btnDark}>View Documentation</Link>
            <DiscordButton>Join Discord</DiscordButton>
          </div>
          <p className="rise mt-5 text-sm text-muted" style={{ animationDelay: "240ms" }}>Free with a key. No payment, no subscription.</p>
        </div>
      </section>
      <section className="rise mx-auto max-w-5xl px-5" style={{ animationDelay: "300ms" }}>
        <Showcase />
      </section>
      <section className="mx-auto mt-10 max-w-5xl px-5" aria-label="Graviy in numbers">
        <ul className="grid divide-y divide-line overflow-hidden rounded-xl border border-line bg-panel sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map(([v, l]) => (
            <li key={l} className="px-6 py-7 text-center sm:text-left">
              <p className="text-4xl font-semibold tracking-[-0.04em] text-white">{v}</p>
              <p className="mt-1 text-sm text-muted">{l}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-5xl px-5 pb-28 pt-20">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Where to next</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {EXPLORE.map(({ to, icon: Icon, title, text }) => (
            <li key={to}>
              <Link to={to} className={`group flex h-full flex-col p-6 hover:-translate-y-0.5 ${card}`}>
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-panel text-[#D4D4D8]"><Icon className="h-[18px] w-[18px]" /></span>
                <span className="mt-5 flex items-center justify-between text-base font-medium text-white">
                  {title}
                  <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-white" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}