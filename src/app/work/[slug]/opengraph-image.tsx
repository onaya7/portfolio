import { roles } from "@/content/roles";
import { ogImage, ogSize } from "@/lib/og";
import { displayName, formatYears, roleBySlug } from "@/lib/work";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return roles.map(role => ({ slug: role.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const role = roleBySlug((await params).slug);
  if (!role) return ogImage({ kicker: "Work", title: "Not found", footnote: "" });
  return ogImage({
    kicker: `${role.title}, ${formatYears(role)}`,
    title: displayName(role),
    footnote: role.metric ? `${role.metric.value} ${role.metric.label}` : role.tags.join(" / "),
  });
}
