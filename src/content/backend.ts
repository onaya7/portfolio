/**
 * Backend experience, from Samuel (September 2026): Go, Python with Django and Flask, and C.
 * There is no public backend project to show, so the section says so rather than linking one.
 * `evidence` is a role slug where the language is used in production.
 */
export const backend = {
  heading: "Mobile at the core. At home on the server.",
  body: "I don't stop at the API boundary. Today that means Go services at Astravest, where I lead both mobile and backend. I also build with Python, Django and Flask, and write C.",
  note: "There's no public backend project to link yet. Happy to walk through the work on a call.",
  languages: [
    { name: "Go", detail: "In production at Astravest, alongside the mobile apps it serves.", evidence: "astravest" },
    { name: "Python", detail: "Django and Flask for APIs and web backends." },
    { name: "C", detail: "Close to the machine: memory, pointers, performance." },
  ] satisfies { name: string; detail: string; evidence?: string }[],
};
