import { certifications, education } from "@/content/profile";

export default function Credentials() {
  return (
    <section aria-labelledby="credentials" className="border-t border-line">
      <div className="page grid gap-10 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <h2 id="credentials" className="text-h3 font-normal lg:col-span-4">
          Education and certificates
        </h2>

        <div data-reveal className="lg:col-span-3">
          <p className="text-body font-medium">{education.degree}</p>
          <p className="mt-1 text-small text-muted">{education.school}</p>
        </div>

        <ul data-reveal className="grid gap-4 lg:col-span-5" style={{ "--i": 1 } as React.CSSProperties}>
          {certifications.map(cert => (
            <li key={cert.name} className="flex items-baseline justify-between gap-6">
              <span className="text-small">
                {cert.href ? (
                  <a
                    href={cert.href}
                    className="underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                  >
                    {cert.name}
                  </a>
                ) : (
                  cert.name
                )}
                <span className="text-muted">, {cert.issuer}</span>
              </span>
              <span className="font-mono text-label text-subtle">{cert.year}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
