type TagsProps = {
  tags?: string[];
  className?: string;
};

export function Tags({ tags, className = "" }: TagsProps) {
  if (!tags?.length) return null;

  return (
    <div className={`mt-4 flex flex-wrap gap-2 ${className}`}>
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-white/10 dark:text-zinc-300"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
