// Google Analytics utility functions
// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track custom events in Google Analytics
 * @param eventName - Name of the event (e.g., 'button_click', 'scroll_to_section')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else {
    console.log('Analytics event:', eventName, eventParams);
  }
};

/**
 * Track page views (useful for SPAs)
 * @param path - Path of the page
 * @param title - Title of the page
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-JCFJKHV706', {
      page_path: path,
      page_title: title,
    });
  }
};

/**
 * Track outbound link clicks
 * @param url - URL of the outbound link
 * @param label - Optional label for the link
 */
export const trackOutboundLink = (url: string, label?: string) => {
  trackEvent('outbound_click', {
    link_url: url,
    link_label: label,
  });
};

