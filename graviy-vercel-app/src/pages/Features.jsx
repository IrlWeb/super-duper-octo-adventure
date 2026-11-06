import { useState } from "react";
import { Link } from "react-router";
import { Check, Minus, Search } from "lucide-react";
import { PageHead, StatusDot, btnWhite, card } from "../components/ui";
import { Code } from "../components/CodeBlock";

function EngineVisual() {
  const rows = [
    ["Graviy", "<1 ms", 5, "bg-white"],
    ["Typical executor", "18 ms", 78, "bg-[#3A3A41]"],
  ];
  return (
    <div className="p-6">
      <p className="text-xs text-muted">Time to first line of output (illustrative)</p>
      <div className="mt-5 grid gap-5">
        {rows.map(([n, t, w, c]) => (
          <div key={n}>
            <div className="mb-2 flex justify-between text-sm"><span className="text-white">{n}</span><span className="font-mono text-[#D4D4D8]">{t}</span></div>
            <div className="h-1.5 rounded-full bg-panel"><div className={`h-full rounded-full ${c}`} style={{ width: `${w}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorVisual() {
  const items = ["GetService", "GetChildren", "GetFullName"];
  return (
    <div className="p-6">
      <Code code={`local Players = game:Get`} />
      <ul className="mt-2 w-56 rounded-lg border border-line bg-panel p-1 font-mono text-xs">
        {items.map((i, n) => (
          <li key={i} className={`flex min-h-8 items-center gap-2 rounded-md px-2 ${n === 0 ? "bg-white/[0.06] text-white" : "text-[#B4B4BC]"}`}>
            {n === 0 ? <StatusDot /> : <span className="w-1.5" />}
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

const HUB = [
  ["Player ESP", "Visuals"],
  ["Box & name ESP", "Visuals"],
  ["Tracers", "Visuals"],
  ["Chams / highlight", "Visuals"],
  ["Fullbright", "Visuals"],
  ["Aimbot", "Combat"],
  ["Silent aim", "Combat"],
  ["Hitbox expander", "Combat"],
  ["Triggerbot", "Combat"],
  ["Fly", "Movement"],
  ["Noclip", "Movement"],
  ["Speed & jump", "Movement"],
  ["Infinite jump", "Movement"],
  ["Click teleport", "Movement"],
  ["Auto farm", "Game"],
  ["Obby helper", "Game"],
  ["FPS counter", "Utility"],
  ["Chat logger", "Utility"],
  ["Mini map", "UI"],
];

function HubVisual() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = HUB.filter(([n, c]) => (cat === "All" || c === cat) && n.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-6">
      <label htmlFor="hub-q" className="sr-only">Search the script hub</label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input id="hub-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search scripts" className="min-h-11 w-full rounded-lg border border-line bg-panel pl-9 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-hidden" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["All", "Visuals", "Combat", "Movement", "Game", "Utility", "UI"].map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-xs transition ${cat === c ? "border-[#3A3A41] bg-white/[0.06] text-white" : "border-line text-muted hover:text-white"}`}>
            {cat === c && <StatusDot />}{c}
          </button>
        ))}
      </div>
      <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-panel text-sm" aria-live="polite">
        {list.length === 0 && <li className="p-3 text-muted">No scripts match.</li>}
        {list.map(([n, c]) => (
          <li key={n} className="flex items-center justify-between p-3"><span className="text-white">{n}</span><span className="text-xs text-muted">{c}</span></li>
        ))}
      </ul>
    </div>
  );
}

function AutoexecVisual() {
  const [on, setOn] = useState({ "autoexec.luau": true, "esp.luau": true, "fly.luau": false });
  return (
    <div className="p-6">
      <p className="text-xs text-muted">Runs automatically on every injection</p>
      <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-panel">
        {Object.entries(on).map(([n, v]) => (
          <li key={n} className="flex items-center justify-between gap-3 px-4 py-2">
            <span className="font-mono text-xs text-white">{n}</span>
            <button type="button" role="switch" aria-checked={v} onClick={() => setOn((s) => ({ ...s, [n]: !v }))} className="grid h-11 place-items-center">
              <span className={`flex h-5 w-9 items-center rounded-full px-0.5 transition ${v ? "bg-white" : "bg-[#2A2A30]"}`}>
                <span className={`h-4 w-4 rounded-full transition ${v ? "translate-x-4 bg-black" : "bg-[#9A9AA3]"}`} />
              </span>
              <span className="sr-only">{n} runs on inject</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FEATURES = [
  { n: "01", title: "High-performance Luau engine", text: "Scripts start almost the moment you press Execute, and heavy scripts stay smooth.", points: ["Near-instant start", "Low memory footprint", "Stable across Roblox updates"], visual: <EngineVisual /> },
  { n: "02", title: "Tabbed script editor & autocomplete", text: "Work on several scripts at once with highlighting and suggestions that keep up with your typing.", points: ["Tabs and file explorer", "Syntax highlighting", "Autocomplete for Roblox services"], visual: <EditorVisual /> },
  { n: "03", title: "Integrated script hub with filters", text: "Search community scripts from top providers, from ESP and aimbot to fly, noclip and auto farm, without leaving the window.", points: ["ESP, aimbot, fly, noclip and more", "Filter by Visuals, Combat or Movement", "One click to run"], visual: <HubVisual /> },
  { n: "04", title: "Autoexec & injection management", text: "Pick the scripts that should run every session and Graviy handles the rest.", points: ["Per-script on/off switch", "Runs on every injection", "Never loses your list"], visual: <AutoexecVisual /> },
];

const ROWS = [
  ["UNC coverage", "100% goal", "Varies by tool"],
  ["sUNC coverage", "97% goal", "Varies by tool"],
  ["Closure and hooking functions", true, "Partial"],
  ["Debug and metatable functions", true, "Partial"],
  ["Filesystem, crypt and drawing", true, "Varies"],
  ["Tabbed editor with autocomplete", true, "Basic"],
  ["Built-in script hub", true, false],
  ["Autoexec management", true, "Partial"],
  ["Free key option", true, "Varies"],
  ["Everything in one window", true, false],
];

function Cell({ v }) {
  if (v === true) return <span className="inline-flex items-center gap-1.5 text-white"><Check className="h-4 w-4" /> Yes</span>;
  if (v === false) return <span className="inline-flex items-center gap-1.5"><Minus className="h-4 w-4" /> No</span>;
  return v;
}

export default function Features() {
  return (
    <>
      <PageHead tag="Features" title="Everything on one screen" text="Editor, scripts, and output live in a single window. Nothing opens a second app." />
      <div className="mx-auto grid max-w-5xl gap-16 px-5">
        {FEATURES.map((f, i) => (
          <section key={f.n} className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className={i % 2 ? "md:order-2" : ""}>
              <p className="font-mono text-xs text-muted">{f.n}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{f.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{f.text}</p>
              <ul className="mt-5 grid gap-2 text-sm text-[#D4D4D8]">
                {f.points.map((p) => <li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-muted" />{p}</li>)}
              </ul>
            </div>
            <div className={`min-w-0 overflow-hidden ${card}`}>{f.visual}</div>
          </section>
        ))}
      </div>
      <section className="mx-auto max-w-3xl px-5 pb-28 pt-24">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Graviy vs standard execution tools</h2>
        <div className="mt-10 overflow-x-auto rounded-xl border border-line bg-card">
          <table className="w-full min-w-[500px] border-collapse text-left text-sm">
            <caption className="sr-only">Feature comparison between Graviy and typical executors</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-4 font-normal text-muted">Feature</th>
                <th scope="col" className="p-4 font-medium text-white">Graviy</th>
                <th scope="col" className="p-4 font-medium text-muted">Typical tools</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([l, a, b]) => (
                <tr key={l} className="border-b border-line last:border-0">
                  <th scope="row" className="p-4 font-normal text-white">{l}</th>
                  <td className="p-4"><Cell v={a} /></td>
                  <td className="p-4 text-muted"><Cell v={b} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">Graviy is still in development, so its figures are launch goals and not test results. "Typical tools" describes the general range across executors, not any one product.</p>
        <div className="mt-10 text-center">
          <Link to="/pricing#download" className={btnWhite}>Download for Windows</Link>
        </div>
      </section>
    </>
  );
}