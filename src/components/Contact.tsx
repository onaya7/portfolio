import { contact, profiles } from "@/content/profile";
import Button from "./Button";
import CopyEmail from "./CopyEmail";

/** The closing call to action. Shared by the home page and every work page. */
export default function Contact() {
  const linked = profiles.filter((profile): profile is { label: string; href: string } => Boolean(profile.href));

  return (
    <section id="contact" className="border-t border-line">
      <div className="page py-20 lg:py-32">
        <h2 data-reveal className="max-w-[18ch] text-display font-normal">
          Building an app people have to trust?
        </h2>
        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center gap-3"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <Button href={`mailto:${contact.email}`}>Email me</Button>
          <CopyEmail email={contact.email} />
        </div>
        <dl
          data-reveal
          className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div>
            <dt className="label">Email</dt>
            <dd className="mt-1.5 select-all text-small">{contact.email}</dd>
          </div>
          <div>
            <dt className="label">Phone</dt>
            <dd className="mt-1.5 text-small">
              <a href={`tel:${contact.phoneHref}`} className="transition-colors hover:text-accent">
                {contact.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="label">Based in</dt>
            <dd className="mt-1.5 text-small">{contact.location}</dd>
          </div>
          {linked.length > 0 && (
            <div>
              <dt className="label">Elsewhere</dt>
              <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-small">
                {linked.map(profile => (
                  <a
                    key={profile.label}
                    href={profile.href}
                    rel="me noopener"
                    className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {profile.label}
                  </a>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
