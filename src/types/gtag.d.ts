declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void; // Add the ? to make it optional
  }
}

export {};