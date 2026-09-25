/**
 * How the work is done, stated as habits, each backed by roles where the resume shows it.
 * `evidence` holds role slugs; the renderer links them. A principle with no evidence on the
 * resume does not belong here.
 */
export type Principle = { title: string; body: string; evidence: string[] };

export const approachStatement =
  "Most of my work sits where a failed request costs someone money or locks them out. So the apps keep working offline, guard what they store, and prove their speed with a number.";

export const principles: Principle[] = [
  {
    title: "Offline first",
    body: "Transactions queue on the device and settle when the network returns. The FirstBank Ghana soft token generates codes with no connection at all.",
    evidence: ["firstbank-ghana"],
  },
  {
    title: "Security lives in the client too",
    body: "Certificate pinning, jailbreak and root detection, encrypted storage and biometrics, checked against Bank of Ghana, NDPR and PCI-DSS requirements.",
    evidence: ["firstbank-ghana", "mintyn"],
  },
  {
    title: "Measure, then optimise",
    body: "Driver matching, transaction speed and load time each improved with a figure to show for it: 20%, 15% and 30%.",
    evidence: ["citigo", "myaza", "david-consult"],
  },
  {
    title: "Leave the team stronger",
    body: "Code review, mentoring and knowledge-sharing sessions, from Flutter teams to a SwiftUI migration.",
    evidence: ["uobis", "mintyn"],
  },
];
