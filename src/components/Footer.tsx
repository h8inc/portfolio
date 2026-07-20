interface FooterProps {
  /** Tailwind background class, e.g. "bg-white" — defaults to the warm off-white used across sections */
  backgroundClass?: string;
}

export function Footer({ backgroundClass = 'bg-[#FAF7F0]' }: FooterProps) {
  return (
    <footer className={`w-full ${backgroundClass} border-t border-[#3F3A2F]/10 py-8 sm:py-10`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-center text-xs sm:text-sm text-[#3F3A2F]/70 leading-relaxed"
            style={{ fontFamily: 'Aeonik' }}
          >
            © 2026 A CONSULTING EOOD. This website and all design and consulting services presented
            here are owned and operated by A CONSULTING, registered in Bulgaria.
          </p>
        </div>
      </div>
    </footer>
  );
}
