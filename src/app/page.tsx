import { portrait } from "@/content/portrait";
import { contact, education, profiles, site } from "@/content/profile";
import { current } from "@/lib/work";
import Contact from "@/components/Contact";
import Approach from "./_sections/Approach";
import Credentials from "./_sections/Credentials";
import Experience from "./_sections/Experience";
import Figures from "./_sections/Figures";
import Hero from "./_sections/Hero";
import Stack from "./_sections/Stack";
import Work from "./_sections/Work";

/** schema.org Person, so search engines can tie the name, role and employer together. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  image: new URL(portrait.image.src, site.url).toString(),
  email: `mailto:${contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
  sameAs: profiles.flatMap(profile => (profile.href ? [profile.href] : [])),
  knowsAbout: ["Flutter", "Swift", "SwiftUI", "Kotlin", "Mobile banking", "Identity verification", "PAPSS"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Hero />
      <Figures />
      <Work />
      <Approach />
      <Experience />
      <Stack />
      <Credentials />
      <Contact />
    </>
  );
}
