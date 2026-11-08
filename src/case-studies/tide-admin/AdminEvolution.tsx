import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CornerUpLeft, RotateCcw } from 'lucide-react';
import { buttonStyles, buttonFontFamily } from '../../lib/button-styles';
import { TidePhone, type StageProto } from './proto';
import { PROTO_2023 } from './screens-2023';
import { PROTO_Q2_2024, PROTO_Q3_2024 } from './screens-2024';
import { PROTO_2025 } from './screens-2025';
import { PROTO_2026 } from './screens-2026';

/** Website tokens for everything outside the phone. */
const SITE = {
  ink: '#130F25',
  text: '#3F3A2F',
  tile: '#EDEAE4',
  line: '#D9D3C7',
  orange: '#FF6B35',
  head: "'Aeonik Extended', ui-sans-serif, system-ui, sans-serif",
  body: "'Aeonik', ui-sans-serif, system-ui, sans-serif",
};

/** Loads the two Google fonts used inside the phone, once. */
function useFonts() {
  useEffect(() => {
    const id = 'admin-evolution-fonts';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Stages                                                              */
/* ------------------------------------------------------------------ */

export type Stage = {
  year: string;
  title: string;
  summary: string;
  /** What to tap to see the unlock story for this year. */
  tryIt: string;
  /** Accounting sign-up rate and Accounting ARR, same series as the /growth page. */
  signUp?: string;
  arr: string;
  proto: StageProto;
};

export const STAGES: Stage[] = [
  {
    year: '2023',
    title: 'Paywalled accounting',
    summary:
      'Accounting sat behind a paywall. Admin opened on locked cards and a trial CTA, with invoices, bills and expenses as empty states.',
    tryIt: 'Tap Explore Accounting and count the steps before you see anything useful.',
    signUp: '0.95%',
    arr: '£0',
    proto: PROTO_2023,
  },
  {
    year: 'Q2 2024',
    title: 'First freemium release',
    summary:
      'A free bookkeeping score replaced the locked carousel. It shows owners what is missing and turns accounting into a short task list.',
    tryIt: 'Tap the 19 missing transactions and fix them, or Open Accounting and try to start a trial.',
    signUp: '1.6%',
    arr: '£900K',
    proto: PROTO_Q2_2024,
  },
  {
    year: 'Q3 2024',
    title: 'Insights and tax for everyone',
    summary:
      'Insights and tax estimates were decoupled and opened to all 1.5M users. Revenue and net profit moved to the top of Admin.',
    tryIt: 'Tap View all on Insights, then switch to the Self Assessment tab to see the tax estimate.',
    signUp: '3.8%',
    arr: '£2M',
    proto: PROTO_Q3_2024,
  },
  {
    year: 'Q2 2025',
    title: 'Admin IA redesign',
    summary:
      'Quick actions and live invoice and bill totals replaced the empty states. Overdue, due and paid sit side by side.',
    tryIt: 'Tap View all on Insights and drill into Net Profit. Try All actions too.',
    signUp: '22.2%',
    arr: '£8M',
    proto: PROTO_2025,
  },
  {
    year: '2026',
    title: 'One admin hub',
    summary:
      'Every product sits in one row, tasks guide setup, and connections live in one list. Admin becomes the place to run the back office.',
    tryIt: 'Tap Taxes, then Start free trial. Or tap Invoices & Bills and upgrade.',
    arr: '£12M',
    proto: PROTO_2026,
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/** Scales the phone down to fit short viewports without reflowing the content. */
function useFitScale(height = 812, reserve = 48) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - reserve) / height, (window.innerWidth - 32) / 375));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [height, reserve]);
  return scale;
}

export function AdminEvolution({ initialStage = 0 }: { initialStage?: number }) {
  useFonts();
  const [stage, setStage] = useState(initialStage);
  const [inside, setInside] = useState({ depth: 1, sheet: false, current: 'home' });
  const [resetKey, setResetKey] = useState(0);
  const scale = useFitScale();
  const go = useCallback((n: number) => setStage(Math.max(0, Math.min(STAGES.length - 1, n))), []);
  const step = useCallback((d: number) => setStage((s) => Math.max(0, Math.min(STAGES.length - 1, s + d))), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step]);

  const onState = useCallback((s: { depth: number; sheet: boolean; current: string }) => setInside(s), []);

  const S = STAGES[stage];
  const last = stage === STAGES.length - 1;
  const pct = (stage / (STAGES.length - 1)) * 100;
  const away = inside.depth > 1 || inside.sheet;

  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-center md:gap-20" style={{ fontFamily: SITE.body }}>
      <div style={{ width: 375 * scale, height: 812 * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <TidePhone stageKey={`${stage}-${resetKey}`} proto={S.proto} onState={onState} />
        </div>
      </div>

      <div className="w-full max-w-[420px] px-4 md:px-0">
        <p className="text-sm sm:text-base" style={{ color: SITE.text }}>
          Tide · Admin, 2023 → 2026
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
          How Admin grew up
        </h2>

        {/* Timeline */}
        <div className="relative mt-8" role="tablist" aria-label="Admin iterations by year">
          <div className="absolute left-[11px] right-[11px] top-[10px] h-[2px] rounded-full" style={{ background: SITE.line }} />
          <motion.div
            className="absolute left-[11px] top-[10px] h-[2px] rounded-full"
            style={{ background: SITE.ink }}
            animate={{ width: `calc(${pct}% - ${(pct / 100) * 22}px)` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="relative flex justify-between">
            {STAGES.map((s, i) => {
              const active = i === stage;
              const done = i < stage;
              return (
                <li key={s.year} className="flex w-0 flex-col items-center">
                  <button
                    role="tab"
                    aria-selected={active}
                    onClick={() => go(i)}
                    className="flex flex-col items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                  >
                    <span
                      className="block h-[22px] w-[22px] rounded-full border-2 border-black transition-all"
                      style={{
                        background: active ? SITE.orange : done ? SITE.ink : '#fff',
                        boxShadow: active ? '2px 2px 0 0 #000' : 'none',
                      }}
                    />
                    <span className="whitespace-nowrap text-xs sm:text-sm transition-colors" style={{ color: active ? SITE.ink : SITE.text, fontWeight: active ? 700 : 400 }}>
                      {s.year}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Caption: open text with the real figures for that step */}
        <div className="mt-8 min-h-[260px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={stage} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
              <p className="text-sm" style={{ color: SITE.text }}>
                {S.year}
              </p>
              <h3 className="mt-1 text-xl font-bold leading-snug sm:text-2xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
                {S.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: SITE.text }}>
                {S.summary}
              </p>
              <dl className="mt-5 flex gap-10">
                {S.signUp && (
                  <div className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm" style={{ color: SITE.text }}>
                      accounting sign-up rate
                    </dt>
                    <dd className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
                      {S.signUp}
                    </dd>
                  </div>
                )}
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm" style={{ color: SITE.text }}>
                    Accounting ARR
                  </dt>
                  <dd className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: SITE.head, color: SITE.ink }}>
                    {S.arr}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 rounded-xl px-4 py-3 text-sm leading-relaxed" style={{ background: SITE.tile, color: SITE.text }}>
                <span className="font-bold" style={{ color: SITE.ink }}>
                  Try it:{' '}
                </span>
                {S.tryIt}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => go(stage - 1)}
            disabled={stage === 0}
            className="grid h-11 w-11 place-items-center rounded-full border-[2px] sm:border-[3px] border-black bg-white text-[#130F25] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:pointer-events-none disabled:opacity-40"
            aria-label="Previous year"
          >
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(last ? 0 : stage + 1)} className={buttonStyles.primary} style={buttonFontFamily.primary}>
            {last ? 'Start again' : 'Next iteration'}
            {last ? <RotateCcw size={16} /> : <ChevronRight size={18} />}
          </button>
          <AnimatePresence>
            {away && (
              <motion.button
                key="back-home"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setResetKey((k) => k + 1)}
                className="inline-flex h-11 items-center gap-2 rounded-full border-[2px] sm:border-[3px] border-black bg-white px-4 text-xs font-bold text-[#130F25] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:text-sm"
              >
                <CornerUpLeft size={16} /> Back to Admin
              </motion.button>
            )}
          </AnimatePresence>
          <span className="ml-auto text-sm" style={{ color: SITE.text }}>
            {stage + 1} / {STAGES.length}
          </span>
        </div>
        <p className="mt-4 hidden text-sm md:block" style={{ color: SITE.text }}>
          ← → switch years. Esc goes back a screen. Tap anywhere non-interactive to see what’s tappable.
        </p>
      </div>
    </div>
  );
}

export default AdminEvolution;
