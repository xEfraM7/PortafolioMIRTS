import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { GlassCard } from "../primitives/GlassCard";
import { ArrowUpRight } from "../icons/ArrowUpRight";
import { fadeUp } from "../../lib/motion";

type Props = { project: Project };

export const ProjectCard = ({ project }: Props) => {
  const { t } = useTranslation();
  const inner = (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="aspect-[16/10] overflow-hidden rounded-card border border-border">
        <img
          src={project.imgUrl}
          alt={`${project.client} — ${project.sector} interface`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-6 flex flex-1 flex-col gap-3">
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
          <span>{project.sector}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tighter text-text-primary">
          {project.client}
          {project.liveUrl ? (
            <ArrowUpRight className="ml-2 inline h-4 w-4 text-text-tertiary transition-colors group-hover:text-aurora-violet" />
          ) : null}
        </h3>
        <p className="text-text-secondary">{t(project.outcomeKey)}</p>
        <p className="mt-auto font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
          {project.stack.join(" · ")}
        </p>
      </div>
    </GlassCard>
  );

  return (
    <motion.article variants={fadeUp} className="h-full">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.client} — open live site`}
          className="block h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.article>
  );
};
