import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { tokenize, TOKEN_CLASS } from "../lib/luau";
import { StatusDot } from "./ui";

export function Code({ code, className = "" }) {
  return (
    <pre className={`overflow-x-auto font-mono text-[12.5px] leading-6 sm:text-[13px] sm:leading-7 ${className}`}>
      {code.split("\n").map((line, i) => (
        <div key={i} className="flex gap-4">
          <span aria-hidden="true" className="w-5 shrink-0 select-none text-right text-[#6F6F78]">{i + 1}</span>
          <code className="whitespace-pre">
            {tokenize(line).map(([t, v], j) => (
              <span key={j} className={TOKEN_CLASS[t]}>{v}</span>
            ))}
            {line === "" && " "}
          </code>
        </div>
      ))}
    </pre>
  );
}

export default function CodeBlock({ tabs }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const current = tabs[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(current.code);
    } catch {
      const t = document.createElement("textarea");
      t.value = current.code;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel">
      <div className="flex items-center justify-between gap-2 border-b border-line pl-2 pr-2">
        <div role="tablist" className="flex min-w-0 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              type="button"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative flex min-h-11 shrink-0 items-center gap-2 px-3 font-mono text-xs transition ${i === active ? "text-white" : "text-muted hover:text-white"}`}
            >
              {i === active && <StatusDot />}
              {t.label}
              <span className={`absolute inset-x-2 bottom-0 h-px transition ${i === active ? "bg-white" : "bg-transparent"}`} />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 text-xs text-[#D4D4D8] transition hover:border-accent/60 hover:text-white active:scale-95"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div role="tabpanel" key={active} className="fade-in px-4 py-4">
        <Code code={current.code} />
      </div>
    </div>
  );
}