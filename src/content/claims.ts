import type { Claim } from "./types";

/**
 * The argument the site makes.
 *
 * Every section, every role entry and every number on the site exists to support one of
 * these three. A piece of content that supports none of them is decoration, and should be
 * cut rather than kept for completeness.
 */
export const positioning =
  "Samuel Ayano builds mobile money and identity software for African networks that cannot be relied on.";

export const claims: Claim[] = [
  {
    id: "regulated",
    statement: "He ships regulated financial software, not prototypes.",
    support:
      "Banking modules at Mintyn, a Ghana banking app built to Bank of Ghana cybersecurity guidelines, NDPR and PCI-DSS, payment processing at MyAza, and a HIPAA-compliant health app at Cornie Health.",
  },
  {
    id: "offline",
    statement: "He designs for the network failing, because it does.",
    support:
      "An offline-capable soft token that replaced hardware tokens outright, offline-first transaction queuing with retry and reconciliation, encrypted local storage, certificate pinning and root detection.",
  },
  {
    id: "rails",
    statement: "He knows African payment and identity rails most engineers have never touched.",
    support:
      "The first live PAPSS integration in the FirstBank Ghana app, GhIPSS Instant Pay, mobile money across MTN, Vodafone and AirtelTigo, Paystack and Flutterwave, and KYC against more than 200 million identities.",
  },
];
