import { useState } from "react";
import Check from "icon:check";
import Monitor from "icon:monitor";
import { Badge, Modal, PageHead, DiscordButton, btnWhite, btnDark, card } from "../components/ui";

const DISCORD = "https://discord.gg/wJUyzdS6vW";

function Points({ items }) {
  return (
    <ul className="mt-6 grid gap-2.5 text-sm text-[#D4D4D8]">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-2.5"><Check className="h-4 w-4 shrink-0 text-muted" />{t}</li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const [keyOpen, setKeyOpen] = useState(false);

  return (
    <>
      <PageHead tag="Free & keys" title="Free, with a key" text="Graviy is free to use. A quick key system keeps it that way, and every key unlocks the full app." />

      <section className="mx-auto grid max-w-4xl gap-3 px-5 md:grid-cols-2">
        <article className={`flex flex-col p-7 ${card}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted">Free with a key</h2>
            <Badge dot>Free</Badge>
          </div>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">$0</p>
          <p className="mt-2 text-sm text-muted">No payment and no subscription. Ever.</p>
          <Points items={["Key-system based access", "Instant key generation", "Full feature set", "Community support on Discord"]} />
          <button type="button" onClick={() => setKeyOpen(true)} className={`${btnWhite} mt-8 w-full md:mt-auto`}>Get a free key</button>
        </article>

        <article className={`flex flex-col p-7 ${card}`}>
          <h2 className="text-sm font-medium text-muted">How the key system works</h2>
          <ol className="mt-5 grid gap-5 text-sm">
            {[["Get a key", "Open the key page and finish the short steps."], ["Paste it in", "Enter the key in Graviy when it asks."], ["Run scripts", "Your key unlocks everything. Claim a new one when it expires."]].map(([t, x], i) => (
              <li key={t} className="flex gap-4">
                <span className="font-mono text-muted">{i + 1}</span>
                <span><span className="block font-medium text-white">{t}</span><span className="mt-0.5 block text-muted">{x}</span></span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section id="download" className="mx-auto max-w-4xl scroll-mt-24 px-5 pb-28 pt-24">
        <div className={`flex flex-col items-start gap-6 p-7 md:flex-row md:items-center md:justify-between ${card}`}>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">Download for Windows</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">A small installer sets everything up in under a minute. Sign in with Discord the first time you open Graviy, and then claim your free key.</p>
            <p className="mt-3 text-xs text-muted">Windows 10 and 11. Graviy is still in development and not released yet. Join the Discord to hear first when it is.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <a href={DISCORD} target="_blank" rel="noreferrer" className={btnWhite}><Monitor className="h-4 w-4" /> Download</a>
            <DiscordButton>Join Discord</DiscordButton>
          </div>
        </div>
      </section>

      <Modal open={keyOpen} onClose={() => setKeyOpen(false)} title="Get your free key">
        <p className="text-sm leading-relaxed text-muted">You'll be sent to our key provider in a new tab. It takes about a minute.</p>
        <ol className="mt-4 grid gap-2 text-sm text-[#D4D4D8]">
          {["Finish the short steps on the key page.", "Copy the key it gives you.", "Paste it into Graviy when asked."].map((s, i) => (
            <li key={s} className="flex gap-3"><span className="font-mono text-muted">{i + 1}</span>{s}</li>
          ))}
        </ol>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <a href={DISCORD} target="_blank" rel="noreferrer" onClick={() => setKeyOpen(false)} className={btnWhite}>Continue to key page</a>
          <button type="button" onClick={() => setKeyOpen(false)} className={btnDark}>Not now</button>
        </div>
      </Modal>
    </>
  );
}
