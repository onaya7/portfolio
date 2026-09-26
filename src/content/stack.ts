/**
 * The resume's SKILLS section, grouped for scanning. `primary` marks the tools the resume
 * names first or calls preferred; the renderer gives them more weight. Order matters: the
 * Stack section lays the groups out in rows of 5/7, 6/6, 7/5, 4/4/4 and 6/6.
 *
 * Sources: the resume, plus from Samuel directly (September 2026) the backend languages (Go,
 * Python, Django, Flask, C), PostgreSQL, Prisma, and "core backend skills, security, databases,
 * ORMs etc". The ORMs matching his stated frameworks (Django ORM, SQLAlchemy for Flask, GORM for
 * Go), Redis and the backend auth items (JWT, OAuth 2.0, role-based access) were filled in from
 * that "etc" for him to confirm.
 *
 * Security is split in two at Samuel's request (September 2026): mobile (flutter_secure_storage
 * named by him; the rest from the FirstBank Ghana role and the resume's skills list, with
 * Keychain and Keystore as what secure storage sits on) and backend (encryption and decryption
 * and Redis named by him; hashing, TLS, rate limiting and secrets management filled in from his
 * "etc"; PCI-DSS and NDPR from the resume).
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
    name: "Mobile security",
    items: [
      { label: "flutter_secure_storage", primary: true },
      { label: "iOS Keychain" },
      { label: "Android Keystore" },
      { label: "EncryptedSharedPreferences" },
      { label: "Encrypted Hive storage" },
      { label: "Certificate pinning", primary: true },
      { label: "Root & jailbreak detection" },
      { label: "Biometrics (Face ID, fingerprint)" },
      { label: "TOTP soft-token 2FA" },
    ],
  },
  {
    name: "Backend security",
    items: [
      { label: "AES encryption & decryption", primary: true },
      { label: "Password hashing (bcrypt)" },
      { label: "JWT", primary: true },
      { label: "OAuth 2.0" },
      { label: "Role-based access" },
      { label: "TLS everywhere" },
      { label: "Rate limiting with Redis" },
      { label: "Sessions & caching with Redis" },
      { label: "Secrets management" },
      { label: "PCI-DSS & NDPR" },
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
