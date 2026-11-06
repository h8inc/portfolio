export type StatTile = { value: string; label: string };

/** Same thin orange scrollbar the screen-mock galleries use, so stat rows and mock rows read as one system. */
const scrollbarClass = `
  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar]:bg-[#F5F2ED]
  [&::-webkit-scrollbar]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#FF6B35]
  [&::-webkit-scrollbar-thumb]:rounded-full
`;

/**
 * Small stat tiles for a case-study section: big number, short label, one horizontal row.
 * Fixed-width tiles in a snap-scrolling row, like the mock galleries; the scrollbar only
 * shows when the row overflows. Same tile style as the /growth hero.
 */
export function StatTiles({ stats }: { stats: StatTile[] }) {
  return (
    <dl
      className={`flex gap-2 sm:gap-3 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 md:mx-0 md:px-0 ${scrollbarClass}`}
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#FF6B35 #F5F2ED' }}
    >
      {stats.map((s) => (
        <div
          key={s.value + s.label}
          className="snap-start shrink-0 w-[168px] sm:w-[200px] bg-[#EDEAE4] rounded-xl sm:rounded-2xl px-4 py-4 sm:px-5 sm:py-5"
        >
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
