/**
 * Shared prototype engine. Behaviour only, no visual identity:
 * a screen stack with Back, bottom sheets, toasts, per-stage flags, and
 * "flash the hotspots" when the user taps something non-interactive.
 * Each project supplies its own theme, chrome and screens.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type Nav = {
  /** Push a screen. Unknown ids show a toast instead of crashing. */
  go: (id: string) => void;
  /** Pop one screen, or close the sheet if one is open. */
  back: () => void;
  /** Jump to the home screen, closing everything. */
  home: () => void;
  /** Replace the current screen without growing the stack. */
  replace: (id: string) => void;
  sheet: (id: string | null) => void;
  toast: (msg: string) => void;
  /** Per-stage flags, e.g. { trial: true } once the user subscribes. */
  flags: Record<string, boolean>;
  setFlag: (k: string, v: boolean) => void;
  current: string;
  depth: number;
  flash: boolean;
};

const NavCtx = createContext<Nav | null>(null);
export const useNav = () => {
  const n = useContext(NavCtx);
  if (!n) throw new Error('useNav outside <ProtoPhone>');
  return n;
};
/** Like useNav but tolerates being rendered outside a phone (returns null). */
export const useNavOptional = () => useContext(NavCtx);

/* ------------------------------------------------------------------ */
/* Tap                                                                 */
/* ------------------------------------------------------------------ */

export type TapProps = {
  onTap?: () => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  block?: boolean;
  label?: string;
  /** Ring colour used when hotspots flash. Defaults to a neutral blue. */
  ring?: string;
};

export function Tap({ onTap, children, className = '', style, block, label, ring = '59,75,216' }: TapProps) {
  const nav = useNavOptional();
  const flash = nav?.flash ?? false;
  return (
    <button
      type="button"
      data-tap
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onTap?.();
      }}
      className={`${block ? 'block' : 'inline-flex items-center'} relative appearance-none rounded-lg transition-[transform,box-shadow] duration-150 active:scale-[0.985] ${className}`}
      style={{
        ...style,
        boxShadow: flash ? `0 0 0 2px rgba(${ring},0.55), 0 0 0 6px rgba(${ring},0.18)` : style?.boxShadow,
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Phone                                                               */
/* ------------------------------------------------------------------ */

export type ScreenMap = Record<string, (nav: Nav) => ReactElement>;

export type StageProto = {
  screens: ScreenMap;
  sheets?: ScreenMap;
  /** Persistent bottom chrome (tab bar). Rendered above screens, below sheets. */
  chrome?: (nav: Nav) => ReactNode;
};

export type PhoneTheme = {
  canvas: string;
  frame: string;
  fontFamily: string;
  scrim: string;
  sheet: string;
  handle: string;
  toastBg: string;
  toastFg: string;
  shadow: string;
  radius: number;
  width: number;
  height: number;
};

export const DEFAULT_THEME: PhoneTheme = {
  canvas: '#FFFFFF',
  frame: '#111111',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  scrim: 'rgba(0,0,0,0.45)',
  sheet: '#FFFFFF',
  handle: '#D4D4D8',
  toastBg: '#111111',
  toastFg: '#FFFFFF',
  shadow: '0 30px 80px -24px rgba(0,0,0,0.35)',
  radius: 52,
  width: 375,
  height: 812,
};

type ProtoState = { stack: string[]; sheet: string | null; flags: Record<string, boolean> };
const initial = (): ProtoState => ({ stack: ['home'], sheet: null, flags: {} });

/** Renders a screen function as its own component so its hooks don't leak into the phone's. */
function ScreenView({ render, nav }: { render: (nav: Nav) => ReactElement; nav: Nav }) {
  return render(nav);
}

export type ProtoPhoneProps = {
  /** Changing this resets navigation and flags. */
  stageKey: string | number;
  proto: StageProto;
  theme?: Partial<PhoneTheme>;
  /** Flags to start with when the stage mounts (e.g. an "established user" persona). */
  initialFlags?: Record<string, boolean>;
  onState?: (s: { depth: number; sheet: boolean; current: string }) => void;
};

export function ProtoPhone({ stageKey, proto, theme: themeIn, initialFlags, onState }: ProtoPhoneProps) {
  const theme = { ...DEFAULT_THEME, ...themeIn };
  const reduce = useReducedMotion();
  const [st, setSt] = useState<ProtoState>(() => ({ ...initial(), flags: initialFlags ?? {} }));
  const [dir, setDir] = useState<1 | -1>(1);
  const [toast, setToast] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    setSt({ ...initial(), flags: initialFlags ?? {} });
    setDir(1);
    setToast(null);
    // initialFlags is intentionally read only when the stage changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageKey]);

  const current = st.stack[st.stack.length - 1] ?? 'home';
  useEffect(() => {
    onState?.({ depth: st.stack.length, sheet: !!st.sheet, current });
  }, [st, current, onState]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const nav = useMemo<Nav>(
    () => ({
      go: (id) => {
        if (!proto.screens[id]) return showToast('Not in this prototype yet');
        setDir(1);
        setSt((s) => ({ ...s, sheet: null, stack: [...s.stack, id] }));
      },
      back: () => {
        setDir(-1);
        setSt((s) => (s.sheet ? { ...s, sheet: null } : s.stack.length > 1 ? { ...s, stack: s.stack.slice(0, -1) } : s));
      },
      home: () => {
        setDir(-1);
        setSt((s) => ({ ...s, sheet: null, stack: ['home'] }));
      },
      replace: (id) => {
        if (!proto.screens[id]) return;
        setDir(1);
        setSt((s) => ({ ...s, sheet: null, stack: [...s.stack.slice(0, -1), id] }));
      },
      sheet: (id) => setSt((s) => ({ ...s, sheet: id })),
      toast: showToast,
      flags: st.flags,
      setFlag: (k, v) => setSt((s) => ({ ...s, flags: { ...s.flags, [k]: v } })),
      current,
      depth: st.stack.length,
      flash,
    }),
    [proto, st.flags, current, st.stack.length, flash, showToast],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') nav.back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nav]);

  const onMiss = () => {
    setFlash(true);
    window.setTimeout(() => setFlash(false), 650);
  };

  const Screen = proto.screens[current] ?? proto.screens.home;
  const Sheet = st.sheet ? proto.sheets?.[st.sheet] : null;

  return (
    <NavCtx.Provider value={nav}>
      <div
        className="relative overflow-hidden border-[10px]"
        style={{
          width: theme.width,
          height: theme.height,
          borderRadius: theme.radius,
          borderColor: theme.frame,
          background: theme.canvas,
          fontFamily: theme.fontFamily,
          boxShadow: theme.shadow,
        }}
        onClick={onMiss}
      >
        {/* Only the current screen is mounted, with an enter animation, so a paused
            tab can never leave stale screens behind. */}
        <motion.div
          key={`${stageKey}-${current}-${st.stack.length}`}
          initial={reduce ? { opacity: 0 } : { x: dir > 0 ? 56 : -56, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div className="h-full overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" tabIndex={0} aria-label={`Screen: ${current}`}>
            <ScreenView render={Screen} nav={nav} />
          </div>
        </motion.div>

        {proto.chrome?.(nav)}

        <AnimatePresence>
          {Sheet && (
            <>
              <motion.div
                key="scrim"
                className="absolute inset-0 z-20"
                style={{ background: theme.scrim }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nav.sheet(null);
                }}
              />
              <motion.div
                key="sheet"
                className="absolute inset-x-0 bottom-0 z-30 max-h-[85%] overflow-y-auto rounded-t-[28px] pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ background: theme.sheet }}
                initial={reduce ? { opacity: 0 } : { y: '100%' }}
                animate={reduce ? { opacity: 1 } : { y: 0 }}
                exit={reduce ? { opacity: 0 } : { y: '100%' }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
              >
                <span className="mx-auto mt-2.5 mb-3 block h-1 w-10 rounded-full" style={{ background: theme.handle }} />
                <ScreenView key={st.sheet ?? 'sheet'} render={Sheet} nav={nav} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {toast && (
            <motion.div
              key="toast"
              role="status"
              className="absolute inset-x-6 bottom-28 z-40 rounded-2xl px-4 py-3 text-center text-[13px] font-medium shadow-lg"
              style={{ background: theme.toastBg, color: theme.toastFg }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NavCtx.Provider>
  );
}
