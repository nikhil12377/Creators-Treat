import withSerwistInit from '@serwist/next';
import million from 'million/compiler';

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
};

const millionConfig = {
  auto: { rsc: true },
};

export default million.next(withSerwist(nextConfig), millionConfig);
