/**
 * Reusable button style classes for consistent button styling across the app
 */

export const buttonStyles = {
  /**
   * Primary button style - bold, orange with black border and shadow
   * Matches the style used in ProfileWidget
   */
  primary: [
    'bg-orange-500',
    'hover:bg-orange-600',
    'text-white',
    'px-4 sm:px-6 lg:px-7',
    'py-2 sm:py-3',
    'rounded-full',
    'border-[2px] sm:border-[3px]',
    'border-black',
    'font-bold',
    'text-xs sm:text-sm lg:text-base',
    'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    'transform',
    'hover:translate-x-[1px]',
    'hover:translate-y-[1px]',
    'transition-all',
    'inline-flex',
    'items-center',
    'gap-2'
  ].join(' '),

  /**
   * Secondary button style - more subtle, for less prominent actions
   */
  secondary: [
    'bg-white',
    'hover:bg-gray-50',
    'text-[#130F25]',
    'px-4 sm:px-6',
    'py-2 sm:py-3',
    'rounded-full',
    'border-[2px]',
    'border-[#130F25]',
    'font-medium',
    'text-xs sm:text-sm',
    'hover:shadow-md',
    'transition-all',
    'inline-flex',
    'items-center',
    'gap-2'
  ].join(' ')
};

/**
 * Font family style for buttons (Aeonik Extended for primary, Aeonik for secondary)
 */
export const buttonFontFamily = {
  primary: { fontFamily: 'Aeonik Extended' } as const,
  secondary: { fontFamily: 'Aeonik' } as const
};

