import type { Role } from "./types";

/**
 * All nine roles from `Samuel Ayano resume ME.pdf`, newest first.
 *
 * `problem` and `myRole` are restatements of what the resume's bullets say. They add no
 * business context the document does not contain. Where the resume is silent, the field
 * says so rather than filling the space.
 *
 * `concurrentWith` is NOT stored here. Several of these roles overlap in time, and hand
 * maintaining that would drift; it is computed from `start`/`end` in `@/lib/derive`.
 */
export const roles: Role[] = [
  {
    slug: "mintyn-bank",
    company: "Mintyn Bank",
    title: "Senior Mobile Engineer",
    sector: "Banking",
    start: "2026-03",
    end: null,
    dateLabel: "March 2026 - Present",
    problem:
      "The bank's iOS app carried legacy UI components that held back responsiveness and reuse, while transaction traffic put pressure on network latency.",
    myRole:
      "Senior engineer on iOS. Architected the financial modules, led the SwiftUI migration, and mentored junior engineers on Swift and SwiftUI state management.",
    constraints: [
      "New modules had to integrate with existing banking infrastructure",
      "Strict regulatory compliance on sensitive user financial data",
      "High-traffic banking transactions",
    ],
    decisions: [
      {
        decision: "Built the financial modules in Swift and SwiftUI rather than extending the legacy UI layer",
        tradeoff: null,
      },
      {
        decision:
          "Migrated legacy UI components to SwiftUI architectures, for responsiveness, maintainability and code reuse",
        tradeoff: null,
      },
      {
        decision: "Integrated biometric authentication to protect financial data and meet compliance requirements",
        tradeoff: null,
      },
      {
        decision: "Applied caching strategies to reduce network latency on high-traffic transactions",
        tradeoff: null,
      },
    ],
    outcome: { kind: "unstated" },
    stack: ["Swift", "SwiftUI", "iOS", "Biometrics"],
    claims: ["regulated"],
  },
  {
    slug: "firstbank-ghana",
    company: "FirstBank of Nigeria",
    companyNote: "Ghana subsidiary project",
    title: "Senior Mobile Engineer (Contract)",
    sector: "Banking",
    start: "2025-02",
    end: "2026-03",
    dateLabel: "Feb 2025 - March 2026",
    problem:
      "FirstBank Ghana's mobile app needed two-factor authentication that did not depend on distributing physical hardware tokens, and cross-border payments that stayed correct when the connection did not hold.",
    myRole:
      "Led feature development on the official FirstBank Ghana mobile app, working daily with the bank's .NET Core backend, Oracle database and Temenos T24 integration teams to deliver zero-downtime releases.",
    constraints: [
      "Bank of Ghana cybersecurity guidelines, NDPR and PCI-DSS",
      "An on-premise .NET Core backend and Ghanaian SMS aggregators",
      "Oracle database and Temenos T24 core banking integration",
      "Cross-border settlement requiring full reconciliation and retry",
      "Physical hardware tokens carried a real distribution cost",
    ],
    decisions: [
      {
        decision:
          "Designed an offline-capable soft-token 2FA solution (TOTP-based) to replace hardware tokens entirely",
        tradeoff: null,
      },
      {
        decision: "Built offline-first transaction queuing with retry logic so payments survive a dropped connection",
        tradeoff: null,
      },
      {
        decision:
          "Hardened the client with certificate pinning, jailbreak and root detection, and encrypted local storage (Hive with flutter_secure_storage)",
        tradeoff: null,
      },
      {
        decision:
          "Delivered the first live PAPSS integration in the app, enabling instant cross-border payments in GHS and other African currencies with full reconciliation and retry",
        tradeoff: null,
      },
      {
        decision:
          "Implemented real-time email and SMS transactional alerts through the bank's on-premise backend and Ghanaian SMS aggregators",
        tradeoff: null,
      },
      {
        decision: "Held the compliance line through code reviews, penetration testing and static analysis",
        tradeoff: null,
      },
    ],
    outcome: {
      kind: "measured",
      value: "100%",
      metric: "pilot adoption, soft token",
    },
    reach: { value: "Hundreds of thousands", metric: "of retail and corporate customers in Ghana" },
    stack: [
      "Flutter",
      "Dart",
      "TOTP",
      "PAPSS",
      "Hive",
      "flutter_secure_storage",
      "Certificate pinning",
      ".NET Core",
      "Oracle",
      "Temenos T24",
    ],
    claims: ["regulated", "offline", "rails"],
  },
  {
    slug: "ojanow",
    company: "OjaNow",
    title: "Senior Mobile Engineer",
    sector: "Q-commerce",
    start: "2025-03",
    end: "2025-09",
    dateLabel: "March 2025 - Sep 2025",
    problem:
      "OjaNow's mission is instant access to essentials in Nigeria's Q-commerce space, which puts delivery speed and 24/7 availability at the centre of the product.",
    myRole:
      "Built and maintained the cross-platform apps in Flutter, working with cross-functional teams in an agile process of sprint planning and code review.",
    constraints: ["24/7 on-demand delivery service", "A rapidly growing user base"],
    decisions: [
      {
        decision: "Optimised app performance and integrated APIs to improve delivery speed and efficiency",
        tradeoff: null,
      },
      { decision: "Incorporated optimised delivery routes to reduce carbon footprint", tradeoff: null },
      {
        decision:
          "Introduced AI-assisted development (GitHub Copilot, ChatGPT) into team workflows to improve sprint velocity and code consistency",
        tradeoff: null,
      },
    ],
    outcome: { kind: "unstated" },
    stack: ["Flutter", "Dart", "REST APIs"],
    claims: [],
    sourceNote:
      "The resume describes this role in terms of contribution rather than result. No figure is given for delivery speed, velocity or growth.",
  },
  {
    slug: "ngss",
    company: "Nester Global Solution Service",
    companyNote: "NGSS",
    title: "Senior Flutter Engineer",
    sector: "Identity",
    start: "2024-06",
    end: "2025-03",
    dateLabel: "Jun 2024 - March 2025",
    problem:
      "Businesses and institutions needed to run real-time KYC checks, and the onboarding flows around identity verification were slower than they needed to be.",
    myRole:
      "Built and maintained the Flutter-based digital identity verification products, and worked with backend teams on secure handling of sensitive data.",
    constraints: [
      "Real-time verification against a very large identity database",
      "Industry standards for handling sensitive personal information",
    ],
    decisions: [
      {
        decision: "Integrated APIs to verify against the national identity base, serving clients, vendors and partners",
        tradeoff: null,
      },
      { decision: "Reworked the UI/UX of verification workflows to reduce onboarding time", tradeoff: null },
      { decision: "Implemented secure data handling mechanisms with the backend team", tradeoff: null },
    ],
    outcome: { kind: "unstated" },
    reach: { value: "Over 200 million", metric: "identities reachable through the verification APIs" },
    stack: ["Flutter", "Dart", "KYC APIs"],
    claims: ["rails"],
    sourceNote:
      "The resume says onboarding times were reduced but gives no figure. The 200 million identities describe the size of the system, not the effect of the work, so they are recorded as reach rather than outcome.",
  },
  {
    slug: "citigo",
    company: "Citigo",
    companyNote: "Transportation, ride-hailing service",
    title: "Lead Flutter Engineer",
    sector: "Mobility",
    start: "2024-02",
    end: "2024-08",
    dateLabel: "Feb 2024 - Aug 2024",
    problem:
      "Riders were waiting too long to be matched with a driver, and the app leaned on external navigation tools instead of guiding people in-app.",
    myRole:
      "Led development of the core ride-hailing functionality: real-time location tracking, driver-rider matching and fare calculation.",
    constraints: ["Real-time location accuracy", "Secure in-app transactions"],
    decisions: [
      { decision: "Improved the driver-rider matching algorithms", tradeoff: null },
      {
        decision: "Integrated mapping APIs for accurate in-app navigation, reducing reliance on external tools",
        tradeoff: null,
      },
      { decision: "Worked with the backend team on seamless data flow and secure transactions", tradeoff: null },
    ],
    outcome: {
      kind: "measured",
      value: "20%",
      metric: "decrease in user wait times",
    },
    stack: ["Flutter", "Dart", "Google Maps SDK", "Real-time location"],
    claims: [],
  },
  {
    slug: "myaza",
    company: "MyAza",
    companyNote: "Financial technology, payment processing service",
    title: "Flutter Engineer",
    sector: "Payments",
    start: "2023-10",
    end: "2024-07",
    dateLabel: "Oct 2023 - Jul 2024",
    problem:
      "A payment processing app needed money transfer, authentication and account management to be both secure and fast enough that users trusted it.",
    myRole: "Designed and built the Flutter UI components for payment processing, and the flows around them.",
    constraints: ["Secure and efficient money transfers", "Transaction speed as a trust signal"],
    decisions: [
      { decision: "Integrated payment gateways and financial APIs for secure money transfers", tradeoff: null },
      {
        decision: "Implemented user authentication, account management and money transfer as one coherent set of flows",
        tradeoff: null,
      },
      { decision: "Optimised the code path for faster transaction processing", tradeoff: null },
    ],
    outcome: { kind: "measured", value: "15%", metric: "increase in transaction speed" },
    stack: ["Flutter", "Dart", "Payment gateways", "Financial APIs"],
    claims: ["rails"],
  },
  {
    slug: "cornie-health",
    company: "Cornie Health",
    companyNote: "Medical appointment booking mobile app",
    title: "Lead Flutter Developer",
    sector: "Healthtech",
    start: "2024-07",
    end: "2024-09",
    dateLabel: "Jul 2024 - Sep 2024",
    problem: "Booking a medical appointment was more complicated than it needed to be for patients and providers.",
    myRole:
      "Led development of the E-lerrah mobile app in Flutter, working with designers and backend developers on registration, scheduling, doctor search and payment.",
    constraints: ["HIPAA compliance on sensitive patient data", "A fixed launch date and budget"],
    decisions: [
      {
        decision: "Built registration, appointment scheduling, doctor search and secure payment as one flow",
        tradeoff: null,
      },
      { decision: "Followed security best practices for handling sensitive patient data", tradeoff: null },
      { decision: "Optimised data fetching and handling to improve load times", tradeoff: null },
    ],
    outcome: { kind: "unstated" },
    stack: ["Flutter", "Dart", "HIPAA"],
    claims: ["regulated"],
    sourceNote:
      "The resume says the app launched on time and within budget and was rapidly adopted, but gives no figure for adoption, load time or either constraint.",
  },
  {
    slug: "uobis",
    company: "Uobis",
    title: "Flutter Mobile Developer",
    sector: "Consultancy",
    start: "2022-04",
    end: "2023-10",
    dateLabel: "Apr 2022 - Oct 2023",
    problem:
      "The resume describes this role entirely in terms of code quality and team practice, and names no product.",
    myRole:
      "Ran regular code reviews, worked with QA on release quality, mentored junior developers and organised internal knowledge-sharing sessions on Flutter.",
    constraints: [],
    decisions: [
      { decision: "Established code review as a regular practice with constructive feedback", tradeoff: null },
      { decision: "Worked with QA on thorough testing ahead of releases", tradeoff: null },
      {
        decision: "Mentored junior developers on Flutter practice, coding standards and problem solving",
        tradeoff: null,
      },
    ],
    outcome: { kind: "unstated" },
    stack: ["Flutter", "Dart"],
    claims: [],
    sourceNote:
      "This is the only role in the resume with no product, no domain and no constraints described. It is included because the work history is shown in full.",
  },
  {
    slug: "david-consult",
    company: "David Consult",
    title: "Mobile Engineer, intern",
    sector: "Consultancy",
    start: "2019-03",
    end: "2021-10",
    dateLabel: "Mar 2019 - Oct 2021",
    problem: "A mobile application needed to be taken from nothing to shipped, and it was loading too slowly.",
    myRole:
      "Built the application end to end in Flutter, working with UX/UI designers to translate specifications and with backend developers on data fetching.",
    constraints: ["First professional role", "Third-party APIs outside his control"],
    decisions: [
      { decision: "Applied Flutter practices for modularity, maintainability and performance", tradeoff: null },
      { decision: "Integrated third-party APIs for additional functionality", tradeoff: null },
      {
        decision: "Ran performance analysis to find bottlenecks, then applied widget optimisations against them",
        tradeoff: null,
      },
    ],
    outcome: { kind: "measured", value: "30%", metric: "reduction in app loading times" },
    stack: ["Flutter", "Dart"],
    claims: [],
  },
];
