/**
 * The resume's SKILLS section, grouped for scanning. `primary` marks the tools the resume
 * names first or calls preferred; the renderer gives them more weight. Order matters: the
 * Stack section pairs Mobile with Payments & security on its first row.
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
    name: "Payments & security",
    items: [
      { label: "PAPSS", primary: true },
      { label: "GhIPSS Instant Pay" },
      { label: "Mobile Money" },
      { label: "Paystack" },
      { label: "Flutterwave" },
      { label: "Stripe" },
      { label: "RevenueCat" },
      { label: "Biometrics" },
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
    name: "Data & backend",
    items: [
      { label: "REST" },
      { label: "GraphQL" },
      { label: "WebSocket" },
      { label: "Firebase" },
      { label: "Supabase" },
      { label: "SQLite" },
      { label: "Hive" },
      { label: "Isar" },
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
