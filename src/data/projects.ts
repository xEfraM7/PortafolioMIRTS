import perfectBook from "../assets/img/projects/perfect-book.webp";
import madbox from "../assets/img/projects/madbox.webp";
import mediclarity from "../assets/img/projects/mediclarity.webp";
import stockflow from "../assets/img/projects/stockflow.webp";
import damasco from "../assets/img/projects/damasco.webp";
import biocurePrime from "../assets/img/projects/biocure-prime.webp";
import primefx from "../assets/img/projects/primefx.webp";
import contractor from "../assets/img/projects/contractor.webp";
import librarianCollectorCapture from "../assets/img/projects/librarianCollectorCaptura.webp";
import billGenerator from "../assets/img/projects/billGenerator.webp";

export type Tier = 1 | 2;

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
  caseStudyUrl?: string;
  tier: Tier;
};

export const projects: Project[] = [
  {
    id: "perfect-book",
    client: "Perfect Book",
    year: "2025",
    sector: "Marketplace / Beauty",
    roleKey: "projects.perfectBook.role",
    problemKey: "projects.perfectBook.problem",
    solutionKey: "projects.perfectBook.solution",
    outcomeKey: "projects.perfectBook.outcome",
    stack: ["React Native", "Expo", "Supabase", "Stripe Connect"],
    imgUrl: perfectBook,
    liveUrl: "https://www.teamperfectbook.com",
    tier: 1,
  },
  {
    id: "madbox",
    client: "Madbox",
    year: "2024–2026",
    sector: "Gym management",
    roleKey: "projects.madbox.role",
    problemKey: "projects.madbox.problem",
    solutionKey: "projects.madbox.solution",
    outcomeKey: "projects.madbox.outcome",
    stack: ["Next.js", "Supabase", "RBAC"],
    imgUrl: madbox,
    liveUrl: "https://madboxfit.com",
    tier: 1,
  },
  {
    id: "mediclarity",
    client: "MediClarity",
    year: "2025",
    sector: "Healthcare",
    roleKey: "projects.mediclarity.role",
    problemKey: "projects.mediclarity.problem",
    solutionKey: "projects.mediclarity.solution",
    outcomeKey: "projects.mediclarity.outcome",
    stack: ["Next.js", "Supabase", "LlamaIndex", "PWA"],
    imgUrl: mediclarity,
    liveUrl: "https://dashboard.mediclarity.ai",
    tier: 1,
  },
  {
    id: "stockflow",
    client: "StockFlow",
    year: "2025",
    sector: "Inventory SaaS",
    roleKey: "projects.stockflow.role",
    problemKey: "projects.stockflow.problem",
    solutionKey: "projects.stockflow.solution",
    outcomeKey: "projects.stockflow.outcome",
    stack: ["Next.js 16", "React 19", "Supabase", "RLS"],
    imgUrl: stockflow,
    liveUrl: "https://stock-flow-silk.vercel.app",
    tier: 2,
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
    tier: 2,
  },
  {
    id: "biocure-prime",
    client: "bioCure Prime",
    year: "2025",
    sector: "Wellness",
    roleKey: "projects.biocure.role",
    problemKey: "projects.biocure.problem",
    solutionKey: "projects.biocure.solution",
    outcomeKey: "projects.biocure.outcome",
    stack: ["Next.js", "Tailwind"],
    imgUrl: biocurePrime,
    liveUrl: "https://prime.biocurewellness.com/",
    tier: 2,
  },
  {
    id: "primefx",
    client: "Prime FX",
    year: "2024",
    sector: "Crypto",
    roleKey: "projects.primefx.role",
    problemKey: "projects.primefx.problem",
    solutionKey: "projects.primefx.solution",
    outcomeKey: "projects.primefx.outcome",
    stack: ["Laravel", "PHP", "MySQL"],
    imgUrl: primefx,
    liveUrl: "https://backfxprimeglobal.net",
    tier: 2,
  },
  {
    id: "contractor",
    client: "Contractor Supplai",
    year: "2024",
    sector: "Construction ops",
    roleKey: "projects.contractor.role",
    problemKey: "projects.contractor.problem",
    solutionKey: "projects.contractor.solution",
    outcomeKey: "projects.contractor.outcome",
    stack: ["Next.js", "Supabase", "OpenAI", "Retell"],
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
    stack: ["Next.js", "Supabase"],
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
    stack: ["Next.js", "Zustand"],
    imgUrl: billGenerator,
    liveUrl: "https://billgenerator-xefram7s-projects.vercel.app/",
    tier: 2,
  },
];

export const projectsByTier = (tier: Tier): Project[] =>
  projects.filter((p) => p.tier === tier);
