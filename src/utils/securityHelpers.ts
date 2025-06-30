// Additional Security Helpers
// Lightweight utilities for enhanced security

export class SecurityHelpers {
  // Detect if running in suspicious environment
  static detectSuspiciousEnvironment(): boolean {
    const suspiciousIndicators = [
      // Check for common automation tools
      () => !!(window as any).webdriver,
      () => !!(window as any).callPhantom,
      () => !!(window as any)._phantom,
      () => !!(window as any).phantom,
      () => !!(window as any).__nightmare,
      () => !!(document as any).__webdriver_evaluate,
      () => !!(document as any).__selenium_evaluate,
      () => !!(document as any).__webdriver_script_function,
      () => !!(document as any).__webdriver_script_func,
      () => !!(document as any).__webdriver_script_fn,
      () => !!(document as any).__fxdriver_evaluate,
      () => !!(document as any).__driver_unwrapped,
      () => !!(document as any).__webdriver_unwrapped,
      () => !!(document as any).__driver_evaluate,
      () => !!(document as any).__selenium_unwrapped,
      () => !!(document as any).__fxdriver_unwrapped,
    ];

    return suspiciousIndicators.some(check => {
      try {
        return check();
      } catch {
        return false;
      }
    });
  }

  // Basic obfuscation for sensitive strings
  static obfuscate(str: string): string {
    return btoa(str).split('').reverse().join('');
  }

  static deobfuscate(str: string): string {
    try {
      return atob(str.split('').reverse().join(''));
    } catch {
      return '';
    }
  }

  // Simple integrity check for critical functions
  static checkIntegrity(): boolean {
    try {
      // Check if critical objects are intact
      const checks = [
        typeof console === 'object',
        typeof document === 'object',
        typeof window === 'object',
        typeof localStorage === 'object',
        typeof sessionStorage === 'object',
      ];

      return checks.every(check => check === true);
    } catch {
      return false;
    }
  }

  // Detect if page is loaded in iframe (potential clickjacking)
  static isInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch {
      return true; // Assume iframe if we can't check
    }
  }

  // Basic timing attack protection
  static constantTimeCompare(a: string, b: string): boolean {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }

  // Generate secure random string
  static generateSecureRandom(length: number = 16): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    if (window.crypto && window.crypto.getRandomValues) {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        result += chars[array[i] % chars.length];
      }
    } else {
      // Fallback for older browsers
      for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    return result;
  }

  // Simple rate limiting
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests: number[] = [];
    
    return function(): boolean {
      const now = Date.now();
      
      // Remove old requests outside the window
      while (requests.length > 0 && requests[0] <= now - windowMs) {
        requests.shift();
      }
      
      // Check if we're under the limit
      if (requests.length < maxRequests) {
        requests.push(now);
        return true;
      }
      
      return false;
    };
  }

  // Sanitize user input (basic)
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  // Check if current domain is legitimate
  static validateDomain(): boolean {
    const allowedDomains = [
      'localhost',
      '127.0.0.1',
      'massage-corner.se',
      'www.massage-corner.se',
      'massage-corner-sverige-ab.netlify.app',
      'massage-corner.netlify.app',
      'webcontainer-api.io'
    ];

    const currentDomain = window.location.hostname.toLowerCase();
    return allowedDomains.some(domain => 
      currentDomain === domain || currentDomain.endsWith('.' + domain)
    );
  }
}

// Initialize basic security checks
export function initializeSecurity() {
  // Check if running in suspicious environment
  if (SecurityHelpers.detectSuspiciousEnvironment()) {
    console.warn('Suspicious environment detected');
  }

  // Check domain validity
  if (!SecurityHelpers.validateDomain()) {
    console.warn('Invalid domain detected');
  }

  // Check if in iframe (potential clickjacking)
  if (SecurityHelpers.isInIframe()) {
    console.info('Page loaded in iframe - this may be intentional');
  }

  // Basic integrity check
  if (!SecurityHelpers.checkIntegrity()) {
    console.warn('Integrity check failed');
  }
}

// Auto-initialize on import
initializeSecurity();