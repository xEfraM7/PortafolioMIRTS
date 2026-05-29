type Props = {
  index: string;
  label: string;
  meta?: string;
};

export const SectionHeader = ({ index, label, meta }: Props) => (
  <div className="flex items-baseline justify-between border-b border-border/60 pb-3 font-mono text-[11px] uppercase tracking-tighter text-text-tertiary">
    <h2 className="font-normal">
      <span className="text-text-secondary">{index}</span>
      <span className="mx-2 text-text-tertiary">/</span>
      <span className="text-text-primary">{label}</span>
    </h2>
    {meta ? <span>{meta}</span> : null}
  </div>
);
