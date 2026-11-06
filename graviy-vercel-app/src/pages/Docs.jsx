import { useState } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import CodeBlock from "../components/CodeBlock";
import { PageHead, StatusDot, card } from "../components/ui";

const SECTIONS = [
  { id: "start", label: "Getting Started" },
  { id: "inject", label: "Injection Setup" },
  { id: "api", label: "API Reference" },
  { id: "hub", label: "Script Hub" },
  { id: "trouble", label: "Troubleshooting" },
];

const p = "text-base leading-relaxed text-muted";
const h2 = "text-2xl font-semibold tracking-[-0.03em] text-white";
const h3 = "mt-10 mb-3 text-lg font-medium text-white";

function Steps({ items }) {
  return (
    <ol className="mt-5 grid gap-3">
      {items.map((t, i) => (
        <li key={t} className="flex gap-4 text-sm leading-relaxed text-[#D4D4D8]">
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line font-mono text-xs text-muted">{i + 1}</span>
          {t}
        </li>
      ))}
    </ol>
  );
}

function Start() {
  return (
    <>
      <h2 className={h2}>Getting Started</h2>
      <p className={`${p} mt-3`}>Go from download to your first script in a few minutes.</p>
      <Steps items={["Download the Windows installer and run it.", "Open Graviy and sign in with Discord.", "Paste your key, or claim a free one when asked.", "Open Roblox, then press Attach in Graviy."]} />
      <h3 className={h3}>Your first script</h3>
      <CodeBlock tabs={[
        { label: "Welcome.luau", code: `local Players = game:GetService("Players")\nlocal player = Players.LocalPlayer\n\nprint("Hello, " .. player.Name)` },
        { label: "Loop.luau", code: `for i = 1, 3 do\n  print("Run #" .. i)\n  task.wait(1)\nend` },
      ]} />
    </>
  );
}

function Inject() {
  return (
    <>
      <h2 className={h2}>Injection Setup</h2>
      <p className={`${p} mt-3`}>Attach Graviy once per Roblox session. Autoexec scripts run for you as soon as it connects.</p>
      <Steps items={["Start Roblox and join any game.", "Press Attach in the Graviy toolbar.", "Wait for the status to read Attached.", "Press Execute to run the open tab."]} />
      <h3 className={h3}>Run a script on every injection</h3>
      <CodeBlock tabs={[{ label: "autoexec.luau", code: `-- Saved in the Autoexec group\nprint("autoexec ready")\n\ngame.Players.PlayerAdded:Connect(function(plr)\n  print(plr.Name .. " joined")\nend)` }]} />
    </>
  );
}

const API = [
  ["Closures", "Create, wrap and inspect functions.", ["hookfunction", "hookmetamethod", "newcclosure", "iscclosure", "islclosure", "checkcaller", "clonefunction", "isexecutorclosure", "loadstring"]],
  ["Environment", "Read and share script state.", ["getgenv", "getrenv", "getreg", "getgc", "getinstances", "getnilinstances", "getloadedmodules", "getrunningscripts", "getscripts"]],
  ["Metatables", "Work past read-only limits.", ["getrawmetatable", "setrawmetatable", "setreadonly", "isreadonly", "getnamecallmethod", "setnamecallmethod"]],
  ["Instances", "Reach hidden properties and events.", ["gethui", "fireclickdetector", "firetouchinterest", "fireproximityprompt", "getconnections", "gethiddenproperty", "sethiddenproperty", "getcallbackvalue", "cloneref", "compareinstances"]],
  ["Scripts", "Inspect and rebuild game scripts.", ["getsenv", "getscriptbytecode", "getscripthash", "decompile", "getcallingscript"]],
  ["Debug", "Look inside running functions.", ["debug.getconstants", "debug.getconstant", "debug.setconstant", "debug.getupvalues", "debug.getupvalue", "debug.setupvalue", "debug.getprotos", "debug.getproto", "debug.getstack", "debug.setstack", "debug.getinfo"]],
  ["Filesystem", "Save and load files in your workspace.", ["readfile", "writefile", "appendfile", "listfiles", "isfile", "isfolder", "makefolder", "delfolder", "delfile", "loadfile", "dofile"]],
  ["Crypt", "Encoding, hashing and encryption.", ["crypt.base64encode", "crypt.base64decode", "crypt.encrypt", "crypt.decrypt", "crypt.generatebytes", "crypt.generatekey", "crypt.hash"]],
  ["Drawing", "Draw shapes and text on screen.", ["Drawing.new", "Drawing.Fonts", "cleardrawcache", "isrenderobj", "getrenderproperty", "setrenderproperty"]],
  ["Input", "Simulate keyboard and mouse.", ["isrbxactive", "mouse1click", "mouse1press", "mouse1release", "mousemoveabs", "mousemoverel", "mousescroll", "keypress", "keyrelease"]],
  ["Web", "Network requests and sockets.", ["request", "game:HttpGet", "WebSocket.connect", "queue_on_teleport"]],
  ["Misc", "Everyday helpers.", ["identifyexecutor", "setclipboard", "getthreadidentity", "setthreadidentity", "setfpscap", "getfpscap", "lz4compress", "lz4decompress", "messagebox", "setrbxclipboard"]],
];

function Api() {
  return (
    <>
      <h2 className={h2}>API Reference</h2>
      <p className={`${p} mt-3`}>Graviy is being built to match the UNC and sUNC standards, the shared checklists of functions that scripts expect from an executor. The goal is 100% UNC and 97% sUNC, with getscriptclosure the one function not expected to be supported.</p>
      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {[["100%", "UNC coverage goal"], ["97%", "sUNC coverage goal"], [String(API.reduce((n, c) => n + c[2].length, 0)), "Functions listed below"]].map(([v, l]) => (
          <div key={l} className="bg-black p-5">
            <p className="text-3xl font-semibold tracking-[-0.03em] text-white">{v}</p>
            <p className="mt-1 text-sm text-muted">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-muted"><StatusDot className="mt-1.5 shrink-0" /> Graviy is still in development. These are launch targets, and the list can shift until release.</p>
      <div className="mt-8 grid gap-4">
        {API.map(([name, desc, fns]) => (
          <section key={name} aria-label={name} className="rounded-xl border border-line bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-medium text-white">{name}</h3>
              <p className="text-sm text-muted">{desc}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {fns.map((fn) => <li key={fn} className="rounded-md border border-line bg-black/40 px-2.5 py-1 font-mono text-xs text-[#D4D4D8]">{fn}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <h3 className={h3}>Examples</h3>
      <CodeBlock tabs={[
        { label: "identifyexecutor", code: `local name, version = identifyexecutor()\nprint(name, version)` },
        { label: "hookfunction", code: `local old\nold = hookfunction(print, function(...)\n  return old("[hooked]", ...)\nend)\n\nprint("hello")` },
        { label: "filesystem", code: `writefile("notes.txt", "Hello from Graviy")\n\nif isfile("notes.txt") then\n  print(readfile("notes.txt"))\nend` },
        { label: "getgenv", code: `getgenv().MyOption = true\n\nif getgenv().MyOption then\n  print("Option is on")\nend` },
        { label: "request", code: `local res = request({ Url = "https://example.com/data.txt", Method = "GET" })\nprint(res.StatusCode, #res.Body)` },
      ]} />
    </>
  );
}

const SCRIPTS = [
  ["Player ESP", "Highlights other players through walls.", `local url = "https://example.com/player-esp.lua"\nloadstring(game:HttpGet(url))()`],
  ["Box & name ESP", "Draws a box, name and distance on every player.", `local url = "https://example.com/box-esp.lua"\nloadstring(game:HttpGet(url))()`],
  ["Tracers", "Draws lines from your screen to other players.", `local url = "https://example.com/tracers.lua"\nloadstring(game:HttpGet(url))()`],
  ["Chams / highlight", "Fills players with a see-through color.", `local url = "https://example.com/chams.lua"\nloadstring(game:HttpGet(url))()`],
  ["Fullbright", "Removes darkness and fog so you can see everywhere.", `local url = "https://example.com/fullbright.lua"\nloadstring(game:HttpGet(url))()`],
  ["Aimbot", "Locks your aim onto the nearest target.", `local url = "https://example.com/aimbot.lua"\nloadstring(game:HttpGet(url))()`],
  ["Silent aim", "Redirects your shots without moving the camera.", `local url = "https://example.com/silent-aim.lua"\nloadstring(game:HttpGet(url))()`],
  ["Hitbox expander", "Makes other players easier to hit.", `local url = "https://example.com/hitbox.lua"\nloadstring(game:HttpGet(url))()`],
  ["Triggerbot", "Fires automatically when a target is under your crosshair.", `local url = "https://example.com/triggerbot.lua"\nloadstring(game:HttpGet(url))()`],
  ["Fly", "Lets you fly around the map.", `local url = "https://example.com/fly.lua"\nloadstring(game:HttpGet(url))()`],
  ["Noclip", "Walk through walls and objects.", `local url = "https://example.com/noclip.lua"\nloadstring(game:HttpGet(url))()`],
  ["Speed & jump", "Change your walk speed and jump power.", `local url = "https://example.com/speed-jump.lua"\nloadstring(game:HttpGet(url))()`],
  ["Infinite jump", "Jump again in mid-air.", `local url = "https://example.com/infinite-jump.lua"\nloadstring(game:HttpGet(url))()`],
  ["Click teleport", "Teleport to wherever you click.", `local url = "https://example.com/click-tp.lua"\nloadstring(game:HttpGet(url))()`],
  ["Auto farm", "Repeats a game's grind for you.", `local url = "https://example.com/auto-farm.lua"\nloadstring(game:HttpGet(url))()`],
  ["FPS counter", "Shows your frame rate in a corner.", `local url = "https://example.com/fps-counter.lua"\nloadstring(game:HttpGet(url))()`],
  ["Chat logger", "Keeps a scrollback of chat messages.", `local url = "https://example.com/chat-logger.lua"\nloadstring(game:HttpGet(url))()`],
  ["Mini map", "Adds a small overhead map.", `local url = "https://example.com/mini-map.lua"\nloadstring(game:HttpGet(url))()`],
];

function Hub() {
  const [q, setQ] = useState("");
  const list = SCRIPTS.filter(([n, d]) => `${n} ${d}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <h2 className={h2}>Script Hub</h2>
      <p className={`${p} mt-3`}>A preview of what you will find inside the app, from ESP and aimbot to fly and noclip. These are example entries with placeholder links, shown while Graviy is in development.</p>
      <label htmlFor="docs-hub" className="sr-only">Search scripts</label>
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input id="docs-hub" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search scripts" className="min-h-11 w-full rounded-lg border border-line bg-panel pl-10 pr-3 text-sm text-white placeholder:text-muted focus:border-accent focus:outline-hidden" />
      </div>
      <ul className="mt-4 grid gap-3" aria-live="polite">
        {list.length === 0 && <li className="text-sm text-muted">No scripts match.</li>}
        {list.map(([n, d, c]) => (
          <li key={n}>
            <details className={`group p-1 ${card}`}>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-4 [&::-webkit-details-marker]:hidden">
                <span><span className="block text-sm font-medium text-white">{n}</span><span className="block text-sm text-muted">{d}</span></span>
                <span className="text-xs text-[#D4D4D8] group-open:hidden">View</span>
                <span className="hidden text-xs text-[#D4D4D8] group-open:inline">Hide</span>
              </summary>
              <div className="p-3"><CodeBlock tabs={[{ label: `${n.toLowerCase().replace(/ /g, "-")}.luau`, code: c }]} /></div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}

const FIXES = [
  ["Graviy won't attach", "Close Roblox completely, reopen Graviy, then start Roblox again and press Attach. If your antivirus blocked the installer, allow Graviy and retry."],
  ["My key is rejected", "Check there are no spaces at the start or end of the key. Free keys expire, so claim a new one if yours is old."],
  ["A script does nothing", "Open the console in Graviy and look for an error line. Most failures come from a script written for a different game."],
  ["Roblox just updated", "Check the Status page. Updates usually land within hours and Graviy prompts you to install them."],
];

function Trouble() {
  return (
    <>
      <h2 className={h2}>Troubleshooting</h2>
      <p className={`${p} mt-3`}>Quick fixes for the most common problems.</p>
      <div className="mt-6 grid gap-2">
        {FIXES.map(([q, a]) => (
          <details key={q} className={`group px-5 ${card}`}>
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden="true" className="text-lg text-muted transition group-open:rotate-45">+</span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted">{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}

const VIEWS = { start: Start, inject: Inject, api: Api, hub: Hub, trouble: Trouble };

export default function Docs() {
  const [params, setParams] = useSearchParams();
  const id = VIEWS[params.get("s")] ? params.get("s") : "start";
  const View = VIEWS[id];
  const go = (s) => setParams({ s }, { replace: false });
  return (
    <>
      <PageHead tag="Documentation" title="Docs & scripts" text="Set up Graviy, learn the API and browse a preview of the script hub." />
      <div className="mx-auto grid max-w-5xl gap-8 px-5 pb-28 lg:grid-cols-[220px_1fr] lg:gap-12">
        <nav aria-label="Documentation" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="-mx-5 flex gap-1 overflow-x-auto px-5 lg:mx-0 lg:grid lg:overflow-visible lg:px-0">
            {SECTIONS.map((s) => (
              <li key={s.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => go(s.id)}
                  aria-current={id === s.id ? "page" : undefined}
                  className={`flex min-h-11 w-full items-center gap-2 rounded-lg border px-3 text-sm transition ${id === s.id ? "border-line bg-card text-white" : "border-transparent text-muted hover:text-white"}`}
                >
                  {id === s.id ? <StatusDot /> : <span className="w-1.5" />}
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <article key={id} className="fade-in min-w-0">
          <View />
        </article>
      </div>
    </>
  );
}