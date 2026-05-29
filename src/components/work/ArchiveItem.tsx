import { useTranslation } from "react-i18next";
import type { Project } from "../../data/projects";
import { ArrowUpRight } from "../icons/ArrowUpRight";

type Props = { project: Project };

export const ArchiveItem = ({ project }: Props) => {
  const { t } = useTranslation();
  const content = (
    <div className="group grid grid-cols-12 items-center gap-4 border-b border-border/60 py-5 font-mono text-sm">
      <span className="col-span-2 text-text-tertiary">{project.year}</span>
      <span className="col-span-4 text-text-primary">{project.client}</span>
      <span className="col-span-4 truncate text-text-secondary">{project.stack.join(" · ")}</span>
      <span className="col-span-2 flex items-center justify-end gap-2 text-text-tertiary group-hover:text-aurora-violet">
        {project.liveUrl ? (
          <>
            {t("archive.viewLabel")} <ArrowUpRight className="h-3.5 w-3.5" />
          </>
        ) : null}
      </span>
    </div>
  );
  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.client} — open live site`}
      >
        {content}
      </a>
    );
  }
  return content;
};
