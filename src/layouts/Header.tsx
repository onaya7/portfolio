import Link from "next/link";
import { site } from "@/content/contact";
import { navLinks } from "./nav";

const Header = () => (
  <header className="border-b border-rule">
    <div className="mx-auto flex max-w-ledger items-baseline justify-between gap-r3 px-r2 py-r3 md:px-r4">
      <Link href="/" className="font-serif text-section">
        {site.name}
      </Link>
      <nav aria-label="Primary">
        <ul className="flex gap-r2 font-mono text-micro md:gap-r3">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-void underline-offset-4 transition-colors duration-150 ease-mark hover:text-ink hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
