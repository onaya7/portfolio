import type { SkillGroup } from "./types";

/** Verbatim from the resume's SKILLS section. Order preserved. */
export const skillGroups: SkillGroup[] = [
  {
    id: "mobile",
    label: "Mobile development",
    items: ["Flutter (Dart)", "Android (Kotlin, Java)", "iOS (Swift, SwiftUI)"],
  },
  {
    id: "ai",
    label: "AI-assisted development",
    items: ["GitHub Copilot", "Claude AI", "ChatGPT"],
  },
  {
    id: "architecture",
    label: "Architecture",
    items: ["Clean Architecture", "MVVM", "Bloc/Cubit", "Provider", "Riverpod", "GetX"],
  },
  {
    id: "state",
    label: "State management",
    items: ["Bloc (preferred)", "Riverpod", "Provider", "GetX"],
  },
  {
    id: "backend",
    label: "Backend integration",
    items: ["REST APIs", "GraphQL", "Firebase", "Supabase", "WebSocket"],
  },
  {
    id: "storage",
    label: "Databases and storage",
    items: ["Firebase (Firestore, Auth, Cloud Functions)", "SQLite", "Hive", "Isar"],
  },
  {
    id: "cicd",
    label: "CI/CD and DevOps",
    items: ["GitHub Actions", "Bitrise", "Codemagic", "Fastlane", "App Center", "SonarQube"],
  },
  {
    id: "testing",
    label: "Testing",
    items: ["Unit, widget, integration and golden tests (Flutter)", "XCTest (iOS)", "Espresso and JUnit (Android)"],
  },
  {
    id: "analytics",
    label: "Analytics and monitoring",
    items: ["Firebase Analytics", "Crashlytics", "Sentry", "Mixpanel"],
  },
  {
    id: "payments",
    label: "Payments and security",
    items: [
      "PAPSS",
      "GhIPSS Instant Pay",
      "MobileMoney (MTN, Vodafone, AirtelTigo)",
      "Paystack",
      "Flutterwave",
      "Stripe",
      "RevenueCat",
      "Biometrics",
      "EncryptedSharedPreferences",
    ],
    sourceNote:
      "The resume writes this entry as 'MoneyMoney (MTN, Vodafone, AirtelTigo)', which is almost certainly a typo for MobileMoney. Corrected here; confirm before publishing.",
  },
  {
    id: "maps",
    label: "Maps and location",
    items: ["Google Maps SDK", "Mapbox", "GeoFlutterFire"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Android Studio", "Xcode", "VS Code", "Postman", "Figma", "Jira", "Slack", "Notion"],
  },
  {
    id: "vcs",
    label: "Version control",
    items: ["Git (GitHub, GitLab, Bitbucket)"],
  },
];
