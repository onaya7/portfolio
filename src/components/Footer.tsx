import Link from "next/link";
import { contact, profiles, site } from "@/content/profile";
import { navLinks } from "@/lib/nav";

export default function Footer() {
  const linked = profiles.filter((profile): profile is { label: string; href: string } => Boolean(profile.href));

  return (
    <footer className="border-t border-line">
      <div className="page grid gap-10 py-12 md:grid-cols-12 md:py-14">
        <div className="md:col-span-5">
          <p className="text-small font-medium">{site.name}</p>
          <p className="mt-1 text-small text-muted">
            {site.title}, {contact.location}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-small">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
            {linked.map(profile => (
              <li key={profile.label}>
                <a href={profile.href} rel="me noopener" className="text-muted transition-colors hover:text-fg">
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-small md:col-span-3 md:text-right">
          <a href={`mailto:${contact.email}`} className="text-muted transition-colors hover:text-fg">
            {contact.email}
          </a>
          <p className="mt-1 text-subtle">&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
