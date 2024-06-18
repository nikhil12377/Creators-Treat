import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry } from '@serwist/precaching';
import { registerRoute } from '@serwist/routing';
import { CacheFirst } from '@serwist/strategies';
import { Serwist } from '@serwist/sw';

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

// Define custom caching strategies for MP4 files and images
const cacheName = 'media-cache'; // Name of the cache for MP4 and images
const matchCallback = ({ url, request }: { url: URL; request: Request }) => {
  return request.destination === 'image' || url.pathname.endsWith('.mp4');
};

// Use a CacheFirst strategy as an example; you can choose other strategies as needed
const cachingStrategy = new CacheFirst({
  cacheName,
  plugins: [
    // You can add plugins here for more functionality, like expiration
  ],
});

// Register the route with the matching callback and caching strategy
registerRoute(matchCallback, cachingStrategy);

new Serwist().install({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    // Add any additional runtime caching rules here
  ],
});
