import { useEffect, useState } from "react";
import { PageHead, StatusDot, Badge, card } from "../components/ui";

const SERVICES = [
  ["Injection service", "Testing"],
  ["Key system", "Testing"],
  ["Script hub", "Testing"],
  ["Discord sign-in", "Testing"],
  ["Downloads", "Not open yet"],
];

const HISTORY = [
  ["Nov 6, 2026", "Roblox updated", "Roblox for Windows updated to version-f0ea5da9412f4e35. Graviy is being tested against this build."],
  ["Oct 28, 2026", "Roblox updated", "Roblox for Windows updated to version-5a21b87bbc2641cf. Graviy is being tested against this build."],
  ["Oct 22, 2026", "Roblox build tracked", "Previous build: version-9ac8595712b447a7."],
  ["Ongoing", "Development phase", "Graviy has not been released yet. Features and key options may still change before launch."],
];

const FALLBACK = { build: "version-f0ea5da9412f4e35", number: "0.746.0.7461267", released: "11/6/2026, 12:14:16 AM UTC" };
const FEED = "https://weao.xyz/api/versions/current";

function useRobloxBuild() {
  const [info, setInfo] = useState(FALLBACK);
  const [state, setState] = useState("loading");
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    let alive = true;
    let ctrl;
    async function load() {
      ctrl = new AbortController();
      try {
        const res = await fetch(FEED, { signal: ctrl.signal });
        if (!res.ok) throw new Error("bad");
        const d = await res.json();
        const build = d.Windows || d.WindowsResponse?.clientVersionUpload;
        if (!build) throw new Error("empty");
        if (!alive) return;
        setInfo({ build, number: d.WindowsResponse?.version || "", released: d.WindowsDate || "" });
        setState("live");
        setChecked(new Date());
      } catch (e) {
        if (alive && e.name !== "AbortError") setState("offline");
      }
    }
    load();
    const t = setInterval(load, 24 * 60 * 60 * 1000);
    return () => { alive = false; clearInterval(t); ctrl?.abort(); };
  }, []);

  return { info, state, checked };
}

function fmt(d) {
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function Status() {
  const { info, state, checked } = useRobloxBuild();
  return (
    <>
      <PageHead tag="Status" title="Status" text="Where Graviy is today, and the Roblox version it is built against." />
      <div className="mx-auto max-w-3xl px-5 pb-28">
        <div className={`p-6 ${card}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-3 text-base font-medium text-white"><StatusDot /> In development</p>
            <Badge>Not released yet</Badge>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The Graviy executor is still being built and has not been released. Downloads are not open yet, so nothing you see here can be installed today. Join the Discord to hear first when it launches.
          </p>
        </div>
        <h2 className="mb-4 mt-12 text-lg font-semibold tracking-tight text-white">Latest Roblox build</h2>
        <div className={`p-6 ${card}`}>
          <p className="text-sm text-muted">Roblox for Windows</p>
          <p className="mt-2 break-all font-mono text-2xl font-medium tracking-tight text-white">{info.build}</p>
          <dl className="mt-4 grid gap-1 text-sm">
            {info.number && <div className="flex flex-wrap gap-x-2"><dt className="text-muted">Version number</dt><dd className="font-mono text-[#D4D4D8]">{info.number}</dd></div>}
            {info.released && <div className="flex flex-wrap gap-x-2"><dt className="text-muted">Released</dt><dd className="text-[#D4D4D8]">{info.released}</dd></div>}
            <div className="flex flex-wrap gap-x-2"><dt className="text-muted">Checked</dt><dd className="text-[#D4D4D8]">{state === "live" ? fmt(checked) : state === "loading" ? "Checking now" : "Could not refresh just now"}</dd></div>
          </dl>
          <p className="mt-4 text-xs text-muted" aria-live="polite">
            {state === "live" ? "Updates by itself. It re-checks about once a day." : state === "loading" ? "Fetching the newest build." : "Showing the last build we know of. It will try again soon."}
          </p>
        </div>
        <h2 className="mb-4 mt-12 text-lg font-semibold tracking-tight text-white">Services</h2>
        <ul className="divide-y divide-line rounded-xl border border-line bg-card">
          {SERVICES.map(([n, s]) => (
            <li key={n} className="flex min-h-14 items-center justify-between gap-4 px-5 text-sm">
              <span className="font-medium text-white">{n}</span>
              <span className="text-[#D4D4D8]">{s}</span>
            </li>
          ))}
        </ul>
        <h2 className="mb-4 mt-12 text-lg font-semibold tracking-tight text-white">Recent updates</h2>
        <ul className="divide-y divide-line rounded-xl border border-line bg-card">
          {HISTORY.map(([d, t, x]) => (
            <li key={`${d}-${t}`} className="p-5">
              <p className="font-mono text-xs text-muted">{d}</p>
              <p className="mt-1 text-sm font-medium text-white">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{x}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}