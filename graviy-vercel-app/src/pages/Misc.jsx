import { Link } from "react-router";
import { PageHead, btnWhite } from "../components/ui";

export function Legal({ title }) {
  return (
    <>
      <PageHead tag="Legal" title={title} text="Last updated October 2026." />
      <div className="mx-auto max-w-2xl space-y-4 px-5 pb-28 text-sm leading-relaxed text-muted">
        <p>This is a short placeholder. Replace it with your own wording before you share the site.</p>
        <p>By using Graviy you agree to use it responsibly and in line with the rules of the games you play.</p>
        <p>Questions about this page? Reach the team on Discord.</p>
      </div>
    </>
  );
}

export function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-32 text-center">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">This page doesn't exist</h1>
      <p className="mt-3 text-muted">The link may be old or mistyped.</p>
      <Link to="/" className={`${btnWhite} mt-8`}>Back to home</Link>
    </div>
  );
}