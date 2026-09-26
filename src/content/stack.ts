/**
 * The resume's SKILLS section, grouped for scanning. `primary` marks the tools the resume
 * names first or calls preferred; the renderer gives them more weight. Order matters: the
 * Stack section lays the groups out in rows of 5/7, 7/5, 4/4/4 and 4/4/4.
 *
 * Sources: the resume, plus from Samuel directly (September 2026) the backend languages (Go,
 * Python, Django, Flask, C), PostgreSQL, Prisma, and "core backend skills, security, databases,
 * ORMs etc". The ORMs matching his stated frameworks (Django ORM, SQLAlchemy for Flask, GORM for
 * Go), Redis and the backend auth items (JWT, OAuth 2.0, role-based access) were filled in from
 * that "etc" for him to confirm. The mobile security items come from the FirstBank Ghana role.
 */
export type StackGroup = { name: string; items: { label: string; primary?: boolean }[] };

export const stack: StackGroup[] = [
  {
    name: "Mobile",
    items: [
      { label: "Flutter", primary: true },
      { label: "Dart", primary: true },
      { label: "Swift", primary: true },
      { label: "SwiftUI", primary: true },
      { label: "Kotlin", primary: true },
      { label: "Java" },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Go", primary: true },
      { label: "Python", primary: true },
      { label: "Django" },
      { label: "Flask" },
      { label: "C" },
      { label: "REST" },
      { label: "GraphQL" },
      { label: "WebSocket" },
    ],
  },
  {
    name: "Databases & ORMs",
    items: [
      { label: "PostgreSQL", primary: true },
      { label: "Prisma", primary: true },
      { label: "Redis" },
      { label: "GORM" },
      { label: "Django ORM" },
      { label: "SQLAlchemy" },
      { label: "Firebase" },
      { label: "Supabase" },
      { label: "SQLite" },
      { label: "Hive" },
      { label: "Isar" },
    ],
  },
  {
    name: "Security",
    items: [
      { label: "JWT", primary: true },
      { label: "OAuth 2.0", primary: true },
      { label: "Role-based access" },
      { label: "Encryption at rest & in transit" },
      { label: "Certificate pinning" },
      { label: "Root & jailbreak detection" },
      { label: "Biometrics" },
      { label: "PCI-DSS" },
    ],
  },
  {
    name: "Payments",
    items: [
      { label: "PAPSS", primary: true },
      { label: "GhIPSS Instant Pay" },
      { label: "Mobile Money" },
      { label: "Paystack" },
      { label: "Flutterwave" },
      { label: "Stripe" },
      { label: "RevenueCat" },
    ],
  },
  {
    name: "Architecture",
    items: [
      { label: "Clean Architecture", primary: true },
      { label: "MVVM" },
      { label: "Bloc / Cubit", primary: true },
      { label: "Riverpod" },
      { label: "Provider" },
      { label: "GetX" },
    ],
  },
  {
    name: "Delivery",
    items: [
      { label: "GitHub Actions" },
      { label: "Codemagic" },
      { label: "Bitrise" },
      { label: "Fastlane" },
      { label: "SonarQube" },
    ],
  },
  {
    name: "Testing & monitoring",
    items: [
      { label: "Unit, widget & golden tests" },
      { label: "Integration tests" },
      { label: "XCTest" },
      { label: "Espresso / JUnit" },
      { label: "Crashlytics" },
      { label: "Sentry" },
      { label: "Mixpanel" },
    ],
  },
  {
    name: "Maps",
    items: [{ label: "Google Maps SDK" }, { label: "Mapbox" }, { label: "GeoFlutterFire" }],
  },
  {
    name: "AI-assisted",
    items: [{ label: "Claude" }, { label: "GitHub Copilot" }, { label: "ChatGPT" }],
  },
];
