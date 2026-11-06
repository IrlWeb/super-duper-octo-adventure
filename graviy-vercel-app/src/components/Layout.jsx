import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import Waves from "./Waves";
import { Modal, StatusDot, DiscordIcon, DiscordButton } from "./ui";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/features", label: "Features" },
  { to: "/docs", label: "Docs" },
  { to: "/pricing", label: "Keys" },
  { to: "/status", label: "Status" },
];
const DISCORD = "https://discord.gg/wJUyzdS6vW";

function Logo() {
  return (
    <Link to="/" className="flex min-h-11 items-center gap-2.5">
      <StatusDot className="!h-2 !w-2" />
      <span className="text-[17px] font-semibold tracking-tight text-white">Graviy</span>
    </Link>
  );
}

function Nav({ onLogin }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 glass-nav border-b border-line bg-black/40 backdrop-blur-2xl">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `relative flex min-h-11 items-center px-3 text-sm transition ${isActive ? "text-white" : "text-muted hover:text-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span aria-hidden="true" className="absolute inset-x-3 bottom-0 flex justify-center"><span className="h-px w-full bg-accent" /></span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onLogin} className="hidden min-h-11 items-center px-3 text-sm text-muted transition hover:text-white sm:flex">Log in</button>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="hidden min-h-11 items-center gap-2 rounded-md px-3 text-sm text-muted transition hover:text-white sm:flex">
            <DiscordIcon className="h-[18px] w-[18px]" />
            Discord
          </a>
          <Link to="/pricing#download" className="ml-1 inline-flex min-h-9 items-center rounded-full bg-white px-4 text-sm font-medium text-black transition hover:bg-[#E4E4E7] active:scale-95">
            Download
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="ml-1 grid h-11 w-11 place-items-center rounded-md text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="fade-in border-t border-line bg-black px-5 pb-4 lg:hidden">
          <ul className="grid pt-2">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `flex min-h-11 items-center gap-2 text-base ${isActive ? "text-white" : "text-muted"}`}
                >
                  {({ isActive }) => (<>{isActive && <StatusDot />}{l.label}</>)}
                </NavLink>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => { setOpen(false); onLogin(); }} className="flex min-h-11 items-center text-base text-muted">Log in</button>
            </li>
            <li>
              <a href={DISCORD} target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-2 text-base text-muted"><DiscordIcon className="h-4 w-4" />Discord</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const link = "inline-flex min-h-11 items-center px-3 text-muted transition hover:text-white";
  return (
    <footer className="relative border-t border-line bg-black/40 px-5 py-6 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
        <p className="text-sm text-muted">© 2026 Graviy. All rights reserved.</p>
        <ul className="flex flex-wrap items-center justify-center text-sm">
          <li><Link to="/terms" className={link}>TOS</Link></li>
          <li><Link to="/privacy" className={link}>Privacy Policy</Link></li>
          <li><Link to="/status" className={link}>Status</Link></li>
          <li><a href={DISCORD} target="_blank" rel="noreferrer" className={link + " gap-2"}><DiscordIcon className="h-4 w-4" />Discord</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [login, setLogin] = useState(false);
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
      <Waves />
      <Nav onLogin={() => setLogin(true)} />
      <main id="main" key={pathname} className="page-in relative pt-14">
        <Outlet />
      </main>
      <Footer />
      <Modal open={login} onClose={() => setLogin(false)} title="Log in with Discord">
        <p className="text-sm leading-relaxed text-muted">
          Graviy signs you in with your Discord account inside the app, so there is no password to remember. Download Graviy and your key follows your account.
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link to="/pricing#download" onClick={() => setLogin(false)} className="btn-gloss inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black">Download</Link>
          <DiscordButton>Open Discord</DiscordButton>
        </div>
      </Modal>
    </div>
  );
}