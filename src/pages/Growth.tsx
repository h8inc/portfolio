import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Linkedin, Mail, X } from 'lucide-react';
import { typography } from '../design/typography';
import { buttonFontFamily, buttonStyles } from '../lib/button-styles';
import { trackEvent, trackOutboundLink } from '../lib/analytics';
import { Footer } from '../components/Footer';
import { ProfileCardShell } from '../components/ProfileCardShell';
import { PortfolioSection } from '../components/PortfolioSection';
import { ScreenGallery } from '../components/primitives/ScreenGallery';

const PAGE_TITLE = 'Growth design results — Nasko Terziev';
const PAGE_DESCRIPTION =
  'Growth and monetisation design results: £0 → £17M ARR from Tide’s Admin products, accounting sign-ups 0.95% → 21.2%, and +76% monthly company incorporations.';

const EMAIL_URL = 'mailto:hello@atanasterziev.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/atanas-terziev-jr/';
const HOTJAR_CASE_STUDY_URL =
  'https://www.figma.com/deck/aimHvh0b9PwMqSX9rhJ02U/Hotjar---onboarding-case-study?node-id=1-6122&viewport=-131%2C-117%2C0.61&t=kBoKTW2atWn6vELS-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1';

const eyebrowClass = 'text-xs uppercase tracking-[0.35em] text-[#5f5a4f] mb-4';
const eyebrowStyle = { fontFamily: 'Aeonik Extended' } as const;

type Stat = { value: string; label: string };

const HEADLINE_STATS: Stat[] = [
  { value: '£0 → £17M ARR', label: 'revenue from Tide’s Admin products' },
  { value: '0.95% → 21.2%', label: 'accounting sign-up rate (≈22x)' },
  { value: '+76%', label: 'monthly company incorporations, Tide’s #1 acquisition channel' }
];

type GalleryScreen = {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  noBorder?: boolean;
};

type CaseStudy = {
  id: string;
  company: string;
  title: string;
  stage: string;
  /** Role / team scope */
  team?: string;
  problem: string;
  /** One paragraph, or labelled paragraphs when the work spans funnel stages */
  solution: string | { label: string; text: string }[];
  results: Stat[];
  screens?: GalleryScreen[];
  /** Single wide desktop screenshot instead of a phone-screen gallery */
  wideScreen?: boolean;
  cta?: { label: string; href: string };
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'tide-freemium',
    company: 'Tide',
    title: 'Freemium + Admin IA',
    stage: 'Monetisation',
    team: 'Started as the only designer on my team in a 40-designer org; left with a team of 6, working across 6–7 product teams.',
    problem:
      '40K weekly Admin visits, under 1% converted to accounting; 93% of sign-up attempts failed in a 6-step third-party onboarding.',
    solution:
      'I persuaded the VP and Head of Engineering to adopt freemium and co-led decoupling insights and tax estimates from the third-party backend. Then I redesigned the Admin tab IA with free hooks, urgency surfaces and one-tap key jobs. Users now reach high-value moments earlier, such as tax estimates or cash-flow projections, while deeper insights sit behind subscription, creating a natural path to upgrade. Tested with 120 research participants before build; launched to 1.5M users.',
    results: [
      { value: '0.95% → 21.2%', label: 'sign-ups' },
      { value: '£400K → £8M', label: 'Accounting ARR' },
      { value: '£17M ARR', label: 'across Admin products' },
      { value: '10%', label: 'freemium → paid from the accounting tool' }
    ],
    screens: [
      {
        id: 'admin-os',
        eyebrow: 'Admin OS',
        title: 'All admin in one place',
        description: 'The system streamlines urgent admin tasks and has built in easy discoverability of frequently used features.',
        imageSrc: encodeURI('/assets/✅ Admin - free.png'),
        imageAlt: 'Admin OS main view'
      },
      {
        id: 'insights-free-state',
        eyebrow: 'Financial Insights',
        title: 'Free state experience',
        description: 'Surfaces the insights important to users and giving them a simpler way to spot changes.',
        imageSrc: encodeURI('/assets/Insights - free state1.png'),
        imageAlt: 'Financial insights free state'
      },
      {
        id: 'insights-subscribed',
        eyebrow: 'Financial insights',
        title: 'Subscribed state experience',
        description: 'Full access to detailed insights and analysis for subscribed members.',
        imageSrc: encodeURI('/assets/Insights-subscribed.png'),
        imageAlt: 'Financial insights subscribed state'
      },
      {
        id: 'tax-free-state',
        eyebrow: 'Tax forecasting',
        title: 'Tax estimates and reminders',
        description: 'Give users confidence about taxes. Helps users calculate, save and pay on time.',
        imageSrc: encodeURI('/assets/tax-free-state.png'),
        imageAlt: 'Tax free state'
      }
    ],
    cta: { label: 'View case study', href: '/tide' }
  },
  {
    id: 'tide-formation',
    company: 'Tide',
    title: 'Company Formation',
    stage: 'Acquisition',
    problem:
      'Tide’s #1 acquisition channel (26% of new UK companies) lost businesses at every failure point — government registries in the UK and France, legal checks, identity verification.',
    solution:
      'I took full ownership of the funnel and led a mobile-first redesign: a shorter journey, save-and-resume, and resubmission for failed incorporations. I also launched virtual office address and Company Secretary as new subscription revenue streams.',
    results: [
      { value: '+76%', label: 'monthly incorporations' },
      { value: '+20%', label: 'conversion' },
      { value: '£14–16M ARR', label: 'estimated impact' }
    ]
  },
  {
    id: 'hotjar-onboarding',
    company: 'Hotjar',
    title: 'Pricing page + personalised onboarding',
    stage: 'Acquisition + Activation',
    team: 'Freelance growth designer, 2022',
    problem:
      '51K sign-ups/month at 0.97% to paid; the onboarding forced an SDK install before showing value, but the ICP buyer (PM/designer) wasn’t the person who installs it.',
    solution: [
      {
        label: 'Acquisition',
        text: 'I ran experiments with the pricing page, which accounted for 20% of sign-ups.'
      },
      {
        label: 'Activation',
        text: 'After 20 interviews, a 500+ customer survey and funnel analysis, I tested and removed friction points in sign-up and onboarding that weren’t relevant to all personas, including an experiment removing the SDK step for products that don’t need it. Then I designed a personalised onboarding flow for our target customers, product teams in small and medium tech companies, with a white-glove sales booking for ICPs in the Get Started guide, and shipped a reusable onboarding component library.'
      }
    ],
    results: [
      { value: '7.1% → 21%', label: 'of ICPs speaking with sales (3x qualified pipeline)' },
      { value: '+10%', label: 'activation across the user base' }
    ],
    screens: [
      {
        id: 'hotjar',
        imageSrc: encodeURI('/assets/hotjar-cover.gif'),
        imageAlt: 'Hotjar pricing page redesign',
        noBorder: true
      }
    ],
    wideScreen: true,
    cta: { label: 'Case Study', href: HOTJAR_CASE_STUDY_URL }
  }
];

type Step = {
  label: string;
  period: string;
  signUpRate: number;
  signUpLabel: string;
  arr: number;
  arrLabel: string;
};

const STAIRCASE: Step[] = [
  { label: 'Baseline: paywalled accounting', period: '2023', signUpRate: 0.95, signUpLabel: '0.95%', arr: 400_000, arrLabel: '£400K' },
  { label: 'First freemium release', period: 'Q1–Q2 2024', signUpRate: 1.6, signUpLabel: '1.6%', arr: 900_000, arrLabel: '£900K' },
  { label: 'Decoupled insights + tax for all 1.5M users', period: 'Q2–Q4 2024', signUpRate: 3.8, signUpLabel: '3.8%', arr: 2_000_000, arrLabel: '£2M' },
  { label: 'Admin IA redesign', period: 'Q2 2025', signUpRate: 21.2, signUpLabel: '21.2%', arr: 8_000_000, arrLabel: '£8M' }
];

const MAX_SIGN_UP = Math.max(...STAIRCASE.map((s) => s.signUpRate));
const MAX_ARR = Math.max(...STAIRCASE.map((s) => s.arr));

const SERIES = [
  {
    key: 'signUp',
    title: 'Sign-up rate',
    barClass: 'bg-orange-600',
    pct: (s: Step) => (s.signUpRate / MAX_SIGN_UP) * 100,
    text: (s: Step) => s.signUpLabel
  },
  {
    key: 'arr',
    title: 'Accounting ARR',
    barClass: 'bg-[#130F25]',
    pct: (s: Step) => (s.arr / MAX_ARR) * 100,
    text: (s: Step) => s.arrLabel
  }
] as const;

const HOW_I_WORK = [
  {
    title: 'Diagnose with data before designing',
    body: 'Revenue is the target, so I look across the whole funnel for the metric that moves it. At Tide: 71 days longer retention for users who downloaded statements in their first 14 days; 2.3x weekly return for insight users. Used to win buy-in for in-house infrastructure.'
  },
  {
    title: 'Ship in steps and measure each one',
    body: 'The freemium staircase above: four discrete releases, each with its own sign-up rate and ARR.'
  },
  {
    title: 'Build close to the code',
    body: 'Action surfaces shipped in 2 weeks with 1 engineer, then adopted by other teams.'
  }
];

/** Sets title + description while the page is mounted; restores the site defaults on exit. */
function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = meta?.content;
    document.title = title;
    if (meta) meta.content = description;
    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== undefined) meta.content = prevDescription;
    };
  }, [title, description]);
}

function StatTile({ value, label }: Stat) {
  return (
    <div className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl p-5 sm:p-6 flex flex-col justify-start">
      <p className="text-2xl sm:text-3xl lg:text-[1.65rem] font-bold text-[#130F25] leading-tight whitespace-nowrap" style={{ fontFamily: 'Aeonik Extended' }}>
        {value}
      </p>
      <p className="text-sm text-[#3F3A2F] mt-2 leading-snug">{label}</p>
    </div>
  );
}

function ResultMetric({ value, label }: Stat) {
  return (
    <div className="bg-[#EDEAE4] rounded-xl px-3 sm:px-4 py-3">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-base sm:text-xl whitespace-nowrap font-bold text-[#130F25] leading-tight" style={{ fontFamily: 'Aeonik Extended' }}>
          {value}
        </span>
        <span className="block text-sm text-[#3F3A2F] mt-1 leading-snug" aria-hidden="true">
          {label}
        </span>
      </dd>
    </div>
  );
}

/** Left-column content: numbers first, then problem and solution in the /tide "Problem / Solution" voice. */
function CaseDescription({ study, showResults = true }: { study: CaseStudy; showResults?: boolean }) {
  return (
    <div>
      {study.team && (
        <p className="text-xs text-[#3F3A2F] mb-5 leading-relaxed" style={{ fontFamily: 'Aeonik Mono' }}>
          {study.team}
        </p>
      )}
      {showResults && (
        <dl className="grid grid-cols-2 gap-2 mb-6">
          {study.results.map((r) => (
            <ResultMetric key={r.value + r.label} {...r} />
          ))}
        </dl>
      )}
      <p className="mb-4">
        <strong className="font-semibold text-[#130F25]">Problem:</strong> {study.problem}
      </p>
      {typeof study.solution === 'string' ? (
        <p>
          <strong className="font-semibold text-[#130F25]">Solution:</strong> {study.solution}
        </p>
      ) : (
        study.solution.map((part, i) => (
          <p key={part.label} className={i > 0 ? 'mt-4' : undefined}>
            <strong className="font-semibold text-[#130F25]">{part.label}:</strong> {part.text}
          </p>
        ))
      )}
    </div>
  );
}

function CaseSection({ study, background }: { study: CaseStudy; background: 'bg-white' | 'bg-section-alt' }) {
  const eyebrow = `${study.company} · ${study.stage}`;

  if (study.screens?.length) {
    return (
      <section className={`w-full ${background} py-20 sm:py-24 overflow-x-clip`}>
        <ScreenGallery
          items={study.screens}
          sectionEyebrow={eyebrow}
          sectionTitle={study.title}
          sectionDescription={<CaseDescription study={study} />}
          sectionCTA={study.cta ? { ...study.cta, show: true } : undefined}
          singleItemWider={study.wideScreen}
          hideItemText={study.wideScreen}
          mockContainerBackground={background}
        />
      </section>
    );
  }

  // No screenshots in the repo yet: numbers take the right-hand column instead
  return (
    <section className={`w-full ${background} py-20 sm:py-24 overflow-x-clip`}>
      <PortfolioSection
        eyebrow={eyebrow}
        title={study.title}
        description={<CaseDescription study={study} showResults={false} />}
        cta={study.cta ? { ...study.cta, show: true } : undefined}
      >
        <dl className="grid grid-cols-1 gap-3 sm:gap-4 max-w-md">
          {study.results.map((r) => (
            <div key={r.value + r.label} className="bg-[#EDEAE4] rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <dt className="sr-only">{r.label}</dt>
              <dd>
                <span className="block text-2xl sm:text-3xl font-bold text-[#130F25] leading-tight" style={{ fontFamily: 'Aeonik Extended' }}>
                  {r.value}
                </span>
                <span className="block text-sm text-[#3F3A2F] mt-2 leading-snug" aria-hidden="true">
                  {r.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </PortfolioSection>
    </section>
  );
}

/** Two small aligned step-bar charts (desktop). Purely visual; the table below carries the data for assistive tech. */
function StaircaseCharts() {
  return (
    <div aria-hidden="true" className="hidden md:block">
      {SERIES.map((series) => (
        <div key={series.key} className="grid grid-cols-[140px_repeat(4,minmax(0,1fr))] gap-x-4 lg:gap-x-6 mb-8">
          <p className="self-end pb-1 text-sm font-medium text-[#130F25]" style={eyebrowStyle}>
            {series.title}
          </p>
          {STAIRCASE.map((step) => (
            <div key={step.label} className="h-44 flex flex-col justify-end border-b border-[#3F3A2F]/20">
              <p className="text-lg lg:text-xl font-bold text-[#130F25] mb-1.5" style={{ fontFamily: 'Aeonik Extended' }}>
                {series.text(step)}
              </p>
              <div
                className={`${series.barClass} w-full rounded-t-md`}
                style={{ height: `max(3px, ${series.pct(step) * 0.75}%)` }}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="grid grid-cols-[140px_repeat(4,minmax(0,1fr))] gap-x-4 lg:gap-x-6">
        <div />
        {STAIRCASE.map((step, i) => (
          <div key={step.label}>
            <p className="text-xs text-[#5f5a4f]" style={{ fontFamily: 'Aeonik Mono' }}>
              Step {i + 1} · {step.period}
            </p>
            <p className="text-sm font-medium text-[#130F25] mt-1 leading-snug">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Step table with inline bars: the visible chart on mobile, screen-reader source on desktop. */
function StaircaseTable() {
  return (
    <table className="w-full text-left border-collapse md:sr-only">
      <caption className="sr-only">
        Tide accounting sign-up rate and ARR at each of four freemium releases
      </caption>
      <thead>
        <tr className="text-xs uppercase tracking-wider text-[#5f5a4f]">
          <th scope="col" className="font-medium pb-3 pr-3 w-[44%]">Step</th>
          <th scope="col" className="font-medium pb-3 pr-3">Sign-up rate</th>
          <th scope="col" className="font-medium pb-3">Accounting ARR</th>
        </tr>
      </thead>
      <tbody>
        {STAIRCASE.map((step) => (
          <tr key={step.label} className="border-t border-[#3F3A2F]/15 align-top">
            <th scope="row" className="font-normal py-3 pr-3">
              <span className="block text-sm font-medium text-[#130F25] leading-snug">{step.label}</span>
              <span className="block text-xs text-[#5f5a4f] mt-1" style={{ fontFamily: 'Aeonik Mono' }}>
                {step.period}
              </span>
            </th>
            {SERIES.map((series) => (
              <td key={series.key} className="py-3 pr-3 last:pr-0">
                <span className="block text-base font-bold text-[#130F25]" style={{ fontFamily: 'Aeonik Extended' }}>
                  {series.text(step)}
                </span>
                <span aria-hidden="true" className="block h-2 mt-1.5 rounded-full bg-[#EDEAE4] overflow-hidden">
                  <span
                    className={`block h-full rounded-full ${series.barClass}`}
                    style={{ width: `max(4px, ${series.pct(step)}%)` }}
                  />
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Growth() {
  // NOTE: GradientBackground is rendered at App level to avoid transform issues during slide animation
  const navigate = useNavigate();
  usePageMeta(PAGE_TITLE, PAGE_DESCRIPTION);

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Close and return to home"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" strokeWidth={2.5} />
      </button>

      <main>
        {/* HERO */}
        <section aria-labelledby="growth-title" className="w-full pt-12 sm:pt-20 pb-12 sm:pb-16">
          <ProfileCardShell widthClassName="max-w-2xl lg:max-w-4xl">
            <div className="relative px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 sm:pb-8">
              <h1
                id="growth-title"
                className={`${typography.h1.className} text-center mb-4 leading-tight px-2 sm:px-4`}
                style={typography.h1.style}
              >
                Growth design results
              </h1>
              <p
                className={`${typography.subheader.className} text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2`}
                style={typography.subheader.style}
              >
                Product designer and builder. I design the moments where products make money: acquisition, activation,
                freemium and monetisation.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 px-2">
                {HEADLINE_STATS.map((s) => (
                  <StatTile key={s.value} {...s} />
                ))}
              </div>
            </div>
          </ProfileCardShell>
        </section>

        {/* CASE STUDIES */}
        <CaseSection study={CASE_STUDIES[0]} background="bg-white" />
        <CaseSection study={CASE_STUDIES[1]} background="bg-section-alt" />
        <CaseSection study={CASE_STUDIES[2]} background="bg-white" />

        {/* FREEMIUM STAIRCASE */}
        <section aria-labelledby="staircase-heading" className="w-full bg-section-alt py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className={eyebrowClass} style={eyebrowStyle}>
              Tide · Freemium
            </p>
            <h2 id="staircase-heading" className={`${typography.h2.className} mb-4`} style={typography.h2.style}>
              The freemium staircase
            </h2>
            <p className={`${typography.subheader.className} max-w-3xl mb-10 sm:mb-14`} style={typography.subheader.style}>
              How Tide’s growth compounded in four discrete releases: accounting sign-up rate and ARR at each step.
            </p>
            <div className="bg-white rounded-[2rem] border-[3px] border-black p-5 sm:p-8 lg:p-10">
              <StaircaseCharts />
              <StaircaseTable />
            </div>
          </div>
        </section>

        {/* HOW I WORK */}
        <section aria-labelledby="how-heading" className="w-full bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className={eyebrowClass} style={eyebrowStyle}>
              Approach
            </p>
            <h2 id="how-heading" className={`${typography.h2.className} mb-10 sm:mb-12`} style={typography.h2.style}>
              How I work
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {HOW_I_WORK.map((item, i) => (
                <li key={item.title} className="bg-[#FAF7F0] rounded-2xl p-6 sm:p-8">
                  <p className="text-sm text-[#5f5a4f] mb-3" style={{ fontFamily: 'Aeonik Mono' }} aria-hidden="true">
                    0{i + 1}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-[#130F25] mb-3 leading-tight" style={{ fontFamily: 'Aeonik Extended' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#3F3A2F] leading-relaxed">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section aria-labelledby="cta-heading" className="w-full bg-section-alt py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="cta-heading" className={`${typography.h2.className} mb-4`} style={typography.h2.style}>
              Hiring for growth or monetisation design?
            </h2>
            <p className={`${typography.subheader.className} mb-8`} style={typography.subheader.style}>
              Read the full Tide case study or get in touch.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/tide"
                onClick={() => trackEvent('growth_cta_click', { destination: 'tide' })}
                className={buttonStyles.primary}
                style={buttonFontFamily.primary}
              >
                Tide case study
              </Link>
              <a
                href={EMAIL_URL}
                onClick={() => trackOutboundLink(EMAIL_URL, 'Email')}
                className={buttonStyles.primary}
                style={buttonFontFamily.primary}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                Email me
              </a>
              <a
                href={LINKEDIN_URL}
                onClick={() => trackOutboundLink(LINKEDIN_URL, 'LinkedIn')}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.primary}
                style={buttonFontFamily.primary}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Growth;
