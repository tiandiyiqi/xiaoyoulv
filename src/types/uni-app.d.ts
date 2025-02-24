import '@dcloudio/types';

declare module '@dcloudio/types' {
  interface Uni {
    loadMapSdk(options: {
      key: string;
      platform?: 'amap' | 'google' | 'qq';
      success?: () => void;
      fail?: (error: any) => void;
      complete?: () => void;
    }): void;
  }
} 