export type StatTile = { value: string; label: string };

/**
 * Small stat tiles for a case-study section: big number, short label. Same tile as the /growth
 * hero so the site reads as one system. Two columns on every width; four tiles make a 2×2.
 */
export function StatTiles({ stats }: { stats: StatTile[] }) {
  return (
    <dl className="grid grid-cols-2 gap-2 sm:gap-3">
      {stats.map((s) => (
        <div key={s.value + s.label} className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl px-4 py-4 sm:px-5 sm:py-5">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span
              className="block text-lg sm:text-2xl font-bold text-[#130F25] leading-tight [text-wrap:balance]"
              style={{ fontFamily: 'Aeonik Extended' }}
            >
              {s.value}
            </span>
            <span className="block text-xs sm:text-sm text-[#3F3A2F] mt-1.5 leading-snug" aria-hidden="true">
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
