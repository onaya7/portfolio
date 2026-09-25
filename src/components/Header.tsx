import Link from "next/link";
import { contact } from "@/content/profile";
import { navLinks } from "@/lib/nav";
import Button from "./Button";
import Monogram from "./Monogram";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3">
          <Monogram />
          <span className="text-small font-medium leading-tight tracking-tight">
            Samuel
            <br />
            Ayano
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-small text-muted transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={`mailto:${contact.email}`} arrow={false} className="h-10">
            Email me
          </Button>
        </div>
      </div>
    </header>
  );
}
