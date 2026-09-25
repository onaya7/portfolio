import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="page flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="label">404</p>
      <h1 className="mt-4 max-w-[16ch] text-display font-normal">This page is not in the record.</h1>
      <div className="mt-10">
        <Button href="/">Back to the home page</Button>
      </div>
    </section>
  );
}
