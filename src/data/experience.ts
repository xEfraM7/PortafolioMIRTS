export type ExperienceItem = {
  id: string;
  company: string;
  start: string; // "YYYY-MM"
  end?: string;  // omit = present
  roleKey: string;
  winsKeys: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "tbd-current",
    company: "[TBD: Current company]",
    start: "2024-01",
    roleKey: "experience.entries.tbd-current.role",
    winsKeys: [
      "experience.entries.tbd-current.wins.0",
      "experience.entries.tbd-current.wins.1",
      "experience.entries.tbd-current.wins.2",
    ],
  },
  {
    id: "tbd-previous",
    company: "[TBD: Previous company]",
    start: "2022-06",
    end: "2023-12",
    roleKey: "experience.entries.tbd-previous.role",
    winsKeys: [
      "experience.entries.tbd-previous.wins.0",
      "experience.entries.tbd-previous.wins.1",
    ],
  },
];
