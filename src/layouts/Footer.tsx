import { contact, profiles, site } from "@/content/contact";

const Footer = () => (
  <footer className="mt-r6 border-t border-rule">
    <div className="mx-auto flex max-w-ledger flex-col gap-r2 px-r2 py-r4 font-mono text-micro text-void md:flex-row md:justify-between md:px-r4">
      <p>
        {site.name}, {contact.location}
      </p>
      <ul className="flex flex-wrap gap-r2">
        <li>
          <a href={`mailto:${contact.email}`} className="underline-offset-4 hover:text-ink hover:underline">
            {contact.email}
          </a>
        </li>
        <li>
          <a href={`tel:${contact.phoneHref}`} className="underline-offset-4 hover:text-ink hover:underline">
            {contact.phone}
          </a>
        </li>
        {profiles.linkedin ? (
          <li>
            <a
              href={profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:text-ink hover:underline"
            >
              linkedin
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  </footer>
);

export default Footer;
