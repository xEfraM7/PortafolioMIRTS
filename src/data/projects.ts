import journalImg from "../assets/img/projects/journal-app.png";
import hisCapture from "../assets/img/projects/hisCapture.jpg";
import damasco from "../assets/img/projects/damasco.jpg";
import librarianCollectorCapture from "../assets/img/projects/librarianCollectorCaptura.jpg";
import projectRCapture from "../assets/img/projects/projectR.jpg";
import billGenerator from "../assets/img/projects/billGenerator.png";
import concrete from "../assets/img/projects/concrete.png";
import madbox from "../assets/img/projects/madbox.png";
import contractor from "../assets/img/projects/contractor.png";

export type Tier = 1 | 2 | 3;

export type Project = {
  id: string;
  client: string;
  year: string;
  sector: string;
  roleKey: string;
  problemKey: string;
  solutionKey: string;
  outcomeKey: string;
  stack: string[];
  imgUrl: string;
  liveUrl?: string;
  tier: Tier;
};

export const projects: Project[] = [
  {
    id: "supraca",
    client: "Supraca",
    year: "2024–2025",
    sector: "Logistics",
    roleKey: "projects.supraca.role",
    problemKey: "projects.supraca.problem",
    solutionKey: "projects.supraca.solution",
    outcomeKey: "projects.supraca.outcome",
    stack: ["Next.js", "Node", "PostgreSQL"],
    imgUrl: concrete,
    liveUrl: "https://supraca.vercel.app/dashboard",
    tier: 1,
  },
  {
    id: "damasco",
    client: "Café Damasco",
    year: "2024",
    sector: "Hospitality",
    roleKey: "projects.damasco.role",
    problemKey: "projects.damasco.problem",
    solutionKey: "projects.damasco.solution",
    outcomeKey: "projects.damasco.outcome",
    stack: ["Next.js", "Tailwind"],
    imgUrl: damasco,
    liveUrl: "https://www.damascocafe.com",
    tier: 1,
  },
  {
    id: "his",
    client: "Hospital Information System",
    year: "2023",
    sector: "Healthcare",
    roleKey: "projects.his.role",
    problemKey: "projects.his.problem",
    solutionKey: "projects.his.solution",
    outcomeKey: "projects.his.outcome",
    stack: ["React", "TypeScript", "REST"],
    imgUrl: hisCapture,
    tier: 1,
  },
  {
    id: "project-r",
    client: "Project R (CodeInTheWeb)",
    year: "2024",
    sector: "Restaurant SaaS",
    roleKey: "projects.projectR.role",
    problemKey: "projects.projectR.problem",
    solutionKey: "projects.projectR.solution",
    outcomeKey: "projects.projectR.outcome",
    stack: ["Next.js", "SSR", "Node"],
    imgUrl: projectRCapture,
    liveUrl: "https://ssr-project-r.vercel.app/home",
    tier: 2,
  },
  {
    id: "madbox",
    client: "Madbox",
    year: "2024",
    sector: "Internal tools",
    roleKey: "projects.madbox.role",
    problemKey: "projects.madbox.problem",
    solutionKey: "projects.madbox.solution",
    outcomeKey: "projects.madbox.outcome",
    stack: ["React", "TypeScript"],
    imgUrl: madbox,
    liveUrl: "https://madbox-lac.vercel.app/dashboard",
    tier: 2,
  },
  {
    id: "contractor",
    client: "Contractor Supplai",
    year: "2024",
    sector: "Operations",
    roleKey: "projects.contractor.role",
    problemKey: "projects.contractor.problem",
    solutionKey: "projects.contractor.solution",
    outcomeKey: "projects.contractor.outcome",
    stack: ["React", "TypeScript"],
    imgUrl: contractor,
    liveUrl: "https://contractor-supplai.vercel.app/overview",
    tier: 2,
  },
  {
    id: "librarian",
    client: "Librarian Collector",
    year: "2023",
    sector: "Education",
    roleKey: "projects.librarian.role",
    problemKey: "projects.librarian.problem",
    solutionKey: "projects.librarian.solution",
    outcomeKey: "projects.librarian.outcome",
    stack: ["React"],
    imgUrl: librarianCollectorCapture,
    tier: 2,
  },
  {
    id: "bill-generator",
    client: "Bill Generator",
    year: "2023",
    sector: "Personal",
    roleKey: "projects.billGenerator.role",
    problemKey: "projects.billGenerator.problem",
    solutionKey: "projects.billGenerator.solution",
    outcomeKey: "projects.billGenerator.outcome",
    stack: ["React"],
    imgUrl: billGenerator,
    liveUrl: "https://billgenerator-xefram7s-projects.vercel.app/",
    tier: 3,
  },
  {
    id: "journal",
    client: "Journal App",
    year: "2022",
    sector: "Personal",
    roleKey: "projects.journal.role",
    problemKey: "projects.journal.problem",
    solutionKey: "projects.journal.solution",
    outcomeKey: "projects.journal.outcome",
    stack: ["React", "Redux", "Firebase"],
    imgUrl: journalImg,
    liveUrl: "https://journal-k9ogsanjj-xefram7.vercel.app",
    tier: 3,
  },
];

export const projectsByTier = (tier: Tier): Project[] =>
  projects.filter((p) => p.tier === tier);
