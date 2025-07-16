export const GA_TRACKING_ID = 'G-0FKHKFQHQ2';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Inject gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Set up dataLayer
    window.dataLayer = window.dataLayer || [];

    // Assign global gtag function
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };

    // Initialize gtag
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID);
  }
};

// Track page views
export const trackPageView = (page_path: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path,
    });
    console.log('GA4 Page view tracked:', page_path); // Optional debug
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
    console.log('GA4 Event tracked:', { action, category, label, value }); // Optional debug
  }
};
