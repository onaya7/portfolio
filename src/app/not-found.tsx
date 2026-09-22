import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-ledger px-r2 py-r6 md:px-r4">
      <h1 className="text-title font-light">No entry at this address.</h1>
      <Link
        href="/"
        className="mt-r3 inline-block font-mono text-micro text-void underline-offset-4 hover:text-ink hover:underline"
      >
        back to the record
      </Link>
    </section>
  );
}
