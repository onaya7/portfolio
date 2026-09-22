import type { Certification, Education } from "./types";

export const education: Education = {
  degree: "B.Eng.",
  field: "Electrical and Electronics Engineering",
  institution: "University of Cross River State",
  location: "Calabar, Nigeria",
  sourceNote:
    "The resume gives no start or end year for the degree. An older CV in the same folder names the institution as Cross River University of Science and Technology; the resume spelling is used here.",
};

export const languages = ["English (Native)"];

/**
 * The resume renders each of these as a "view" link, but the underlying URLs did not survive
 * PDF extraction. `href` stays absent until the real URLs are supplied, and the renderer shows
 * plain text rather than a dead link.
 */
export const certifications: Certification[] = [
  { name: "Software Engineering", issuer: "ALX Africa", year: 2023 },
  { name: "Backend Web Development (Python)", issuer: "Side Hustle", year: 2022 },
  { name: "Back End Developer, I4GxZURI Cohort 2", issuer: "Zuri Team, Inc.", year: 2023 },
  { name: "Soft Skills", issuer: "Jobberman Nigeria", year: 2022 },
  { name: "Global Citizenship Education (GCED) for Youth", issuer: "APCEIU", year: 2022 },
];
