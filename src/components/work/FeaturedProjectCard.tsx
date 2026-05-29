import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { GlassCard } from "../primitives/GlassCard";
import { ArrowUpRight } from "../icons/ArrowUpRight";
import { ArrowRight } from "../icons/ArrowRight";
import { fadeUp } from "../../lib/motion";

type Props = {
  project: Project;
  index: number;
};

export const FeaturedProjectCard = ({ project, index }: Props) => {
  const { t } = useTranslation();
  return (
    <motion.article variants={fadeUp}>
      <GlassCard className="grid gap-10 p-8 md:grid-cols-12 md:p-12">
        <div className="md:col-span-7 space-y-8">
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
            <span>
              {String(index + 1).padStart(2, "0")} <span className="mx-2">/</span>{" "}
              {t("work.meta")}
            </span>
            <span>{project.year}</span>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-4xl font-semibold tracking-tightest text-text-primary sm:text-5xl">
              {project.client}
            </h3>
            <p className="max-w-prose text-lg text-text-secondary">
              {t(project.problemKey)}
            </p>
            <p className="max-w-prose text-base text-text-secondary">
              {t(project.solutionKey)}
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-3 font-mono text-xs uppercase tracking-tighter sm:grid-cols-2">
            <div className="flex gap-3">
              <dt className="text-text-tertiary">{t("work.labels.role")}</dt>
              <dd className="text-text-primary">{t(project.roleKey)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-text-tertiary">{t("work.labels.sector")}</dt>
              <dd className="text-text-primary">{project.sector}</dd>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <dt className="text-text-tertiary">{t("work.labels.stack")}</dt>
              <dd className="text-text-primary">{project.stack.join(" · ")}</dd>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <dt className="text-text-tertiary">{t("work.labels.outcome")}</dt>
              <dd className="text-text-primary">{t(project.outcomeKey)}</dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-pill border border-border-strong px-4 py-2 text-sm text-text-primary transition-colors hover:border-aurora-violet hover:text-aurora-violet"
              >
                {t("work.actions.visit")} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
            {project.caseStudyUrl ? (
              <a
                href={project.caseStudyUrl}
                className="inline-flex items-center gap-2 rounded-pill border border-transparent px-4 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {t("work.actions.readCase")} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border">
            <img
              src={project.imgUrl}
              alt={`${project.client} interface`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
};
