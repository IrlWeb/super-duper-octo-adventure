import { useState } from "react";
import { Play, FileCode } from "lucide-react";
import { Code } from "./CodeBlock";
import { StatusDot } from "./ui";

const FILES = {
  "Welcome.luau": {
    group: "Scripts",
    code: `-- Welcome to Graviy\nlocal Players = game:GetService("Players")\nlocal player = Players.LocalPlayer\nlocal function greet(name)\n  print("Hello, " .. name)\nend\ngreet(player.Name)`,
    out: ["Hello, Player1"],
  },
  "autoexec.luau": {
    group: "Autoexec",
    code: `-- Runs on every injection\nlocal RunService = game:GetService("RunService")\nRunService.Heartbeat:Connect(function(dt)\n  -- keep this light\nend)\nprint("autoexec ready")`,
    out: ["autoexec ready"],
  },
  "fps-counter.luau": {
    group: "Scripts",
    code: `-- Loaded from Script Hub\nlocal url = "https://example.com/fps-counter.lua"\nloadstring(game:HttpGet(url))()`,
    out: ["Fetched fps-counter (2.1 KB)", "FPS counter started"],
  },
};

export default function Showcase() {
  const [tabs, setTabs] = useState(["Welcome.luau", "autoexec.luau"]);
  const [active, setActive] = useState("Welcome.luau");
  const [logs, setLogs] = useState(["Attached to Roblox. Ready."]);

  const openFile = (name) => {
    setTabs((t) => (t.includes(name) ? t : [...t, name]));
    setActive(name);
  };

  const run = () => {
    const f = FILES[active];
    setLogs((l) => [...l, `> ${active} executed in 0.8 ms`, ...f.out].slice(-7));
  };

  const groups = ["Scripts", "Autoexec"];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#2A2A2F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2A2A2F]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2A2A2F]" />
        </div>
        <span className="text-xs text-muted">Graviy</span>
        <span className="ml-auto inline-flex items-center gap-2 text-xs text-[#D4D4D8]"><StatusDot /> Attached</span>
      </div>
      <div className="flex">
        <aside className="hidden w-44 shrink-0 border-r border-line p-3 sm:block">
          {groups.map((g) => (
            <div key={g} className="mb-4">
              <p className="px-2 pb-1.5 text-[11px] uppercase tracking-wider text-muted">{g}</p>
              <ul>
                {Object.entries(FILES).filter(([, f]) => f.group === g).map(([name]) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => openFile(name)}
                      className={`flex min-h-9 w-full items-center gap-2 rounded-md px-2 text-left font-mono text-xs transition ${active === name ? "bg-white/[0.06] text-white" : "text-[#B4B4BC] hover:bg-white/[0.04] hover:text-white"}`}
                    >
                      <FileCode className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1">
          <div role="tablist" className="flex overflow-x-auto border-b border-line">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={t === active}
                onClick={() => setActive(t)}
                className={`relative flex min-h-11 shrink-0 items-center gap-2 border-r border-line px-4 font-mono text-xs transition ${t === active ? "bg-card text-white" : "text-muted hover:text-white"}`}
              >
                {t === active && <StatusDot />}
                {t}
              </button>
            ))}
          </div>
          <div key={active} className="fade-in min-h-[220px] px-4 py-4">
            <Code code={FILES[active].code} />
          </div>
          <div className="border-t border-line">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-[11px] uppercase tracking-wider text-muted">Console</span>
              <button
                type="button"
                onClick={run}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-4 text-xs font-medium text-black transition hover:bg-[#E4E4E7] active:scale-95"
              >
                <Play className="h-3 w-3" fill="currentColor" /> Execute
              </button>
            </div>
            <div aria-live="polite" className="h-32 overflow-y-auto px-4 pb-3 font-mono text-xs leading-6 text-[#B4B4BC]">
              {logs.map((l, i) => (
                <p key={i} className={l.startsWith(">") ? "text-white" : ""}>{l}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}