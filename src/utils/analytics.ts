export const GA_TRACKING_ID = 'G-0FKHKFQHQ2';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined') {
    // Check if gtag is already loaded
    if (window.gtag) {
      return;
    }

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

    // Wait for script to load before initializing
    script.onload = () => {
      // Initialize gtag with proper type checking
      if (window.gtag) {
        window.gtag('js', new Date());
        window.gtag('config', GA_TRACKING_ID, {
          send_page_view: false // We'll manually send page views
        });
        console.log('GA4 initialized');
      }
    };
  }
};

// Track page views (GA4 style)
export const trackPageView = (page_path: string, page_title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', 'page_view', {
        page_title: page_title || document.title,
        page_location: window.location.href,
        page_path: page_path,
      });
      console.log('GA4 Page view tracked:', page_path);
    } catch (error) {
      console.error('GA4 page view tracking failed:', error);
    }
  } else {
    console.log('GA4 not ready, page view not tracked:', page_path);
  }
};

// Track custom events (GA4 style)
export const trackEvent = (
  action: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', action, parameters);
      console.log('GA4 Event tracked:', { action, parameters });
    } catch (error) {
      console.error('GA4 event tracking failed:', error);
    }
  } else {
    console.log('GA4 not ready, event not tracked:', action);
  }
};

// Helper function to check if GA is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.gtag;
};