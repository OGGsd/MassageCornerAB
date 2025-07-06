// PWA Helper Utilities - Industry Leading Features

export class PWAHelpers {
  // Check if app is installed
  static isInstalled(): boolean {
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    const webkitStandalone = (window.navigator as any).standalone === true;
    return standalone || webkitStandalone;
  }

  // Check if running on iOS
  static isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  // Check if running on Android
  static isAndroid(): boolean {
    return /Android/.test(navigator.userAgent);
  }

  // Check if PWA is installable
  static async isInstallable(): Promise<boolean> {
    if ('getInstalledRelatedApps' in navigator) {
      try {
        const relatedApps = await (navigator as any).getInstalledRelatedApps();
        return relatedApps.length === 0;
      } catch (error) {
        console.log('getInstalledRelatedApps not supported');
      }
    }
    return true;
  }

  // Request notification permission
  static async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'default') {
      return await Notification.requestPermission();
    }

    return Notification.permission;
  }

  // Show notification
  static async showNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    const permission = await this.requestNotificationPermission();
    
    if (permission === 'granted' && 'serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      
      const defaultOptions: NotificationOptions = {
        icon: '/Favicon/android-icon-192x192.png',
        badge: '/Favicon/android-icon-96x96.png',
        vibrate: [100, 50, 100],
        ...options
      };

      await registration.showNotification(title, defaultOptions);
    }
  }

  // Register for push notifications
  static async registerPushNotifications(): Promise<PushSubscription | null> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push messaging is not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Check if already subscribed
      let subscription = await registration.pushManager.getSubscription();
      
      if (!subscription) {
        // Subscribe to push notifications
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(
            'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9LUdHFcqCUXjujSQ6RYaZXtzdAnXFg4dLsyGJNAkOjqOVNF6a0qA' // Replace with your VAPID public key
          )
        });
      }

      return subscription;
    } catch (error) {
      console.error('Failed to register push notifications:', error);
      return null;
    }
  }

  // Convert VAPID key
  private static urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Check network status
  static isOnline(): boolean {
    return navigator.onLine;
  }

  // Monitor network status
  static onNetworkChange(callback: (isOnline: boolean) => void): () => void {
    const handleOnline = () => callback(true);
    const handleOffline = () => callback(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }

  // Get app version from service worker
  static async getAppVersion(): Promise<string> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        return new Promise((resolve) => {
          const messageChannel = new MessageChannel();
          messageChannel.port1.onmessage = (event) => {
            resolve(event.data.version || '1.0.0');
          };
          
          registration.active?.postMessage(
            { type: 'GET_VERSION' }, 
            [messageChannel.port2]
          );
          
          // Timeout after 1 second
          setTimeout(() => resolve('1.0.0'), 1000);
        });
      } catch (error) {
        console.error('Failed to get app version:', error);
      }
    }
    return '1.0.0';
  }

  // Force service worker update
  static async updateServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      } catch (error) {
        console.error('Failed to update service worker:', error);
      }
    }
  }

  // Clear all caches
  static async clearCaches(): Promise<void> {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('All caches cleared');
      } catch (error) {
        console.error('Failed to clear caches:', error);
      }
    }
  }

  // Get cache usage
  static async getCacheUsage(): Promise<{ used: number; quota: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          quota: estimate.quota || 0
        };
      } catch (error) {
        console.error('Failed to get cache usage:', error);
      }
    }
    return { used: 0, quota: 0 };
  }

  // Share content using Web Share API
  static async share(data: ShareData): Promise<boolean> {
    if ('share' in navigator) {
      try {
        await navigator.share(data);
        return true;
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Failed to share:', error);
        }
      }
    }
    return false;
  }

  // Copy to clipboard
  static async copyToClipboard(text: string): Promise<boolean> {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
    
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (error) {
      console.error('Fallback copy failed:', error);
      return false;
    }
  }

  // Get device info
  static getDeviceInfo(): {
    userAgent: string;
    platform: string;
    language: string;
    cookieEnabled: boolean;
    onLine: boolean;
    hardwareConcurrency: number;
    maxTouchPoints: number;
  } {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      hardwareConcurrency: navigator.hardwareConcurrency || 1,
      maxTouchPoints: navigator.maxTouchPoints || 0
    };
  }

  // Performance monitoring
  static getPerformanceMetrics(): {
    loadTime: number;
    domContentLoaded: number;
    firstPaint: number;
    firstContentfulPaint: number;
  } {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
    };
  }
}

// Auto-initialize PWA features
export function initializePWA() {
  console.log('Initializing PWA features...');
  
  // Log device info
  console.log('Device Info:', PWAHelpers.getDeviceInfo());
  
  // Monitor network status
  PWAHelpers.onNetworkChange((isOnline) => {
    console.log('Network status changed:', isOnline ? 'online' : 'offline');
    
    // Show notification when back online
    if (isOnline) {
      PWAHelpers.showNotification('Anslutning återställd', {
        body: 'Du är nu online igen',
        tag: 'network-status'
      });
    }
  });

  // Log performance metrics after load
  window.addEventListener('load', () => {
    setTimeout(() => {
      console.log('Performance Metrics:', PWAHelpers.getPerformanceMetrics());
    }, 1000);
  });
}

// Initialize on import
initializePWA();