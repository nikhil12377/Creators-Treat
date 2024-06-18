import { defineConfig } from 'father';

export default defineConfig({
  sourcemap: false,
  cjs: {
    input: './index.ts',
    output: 'dist/cjs',
  },
  esm: {
    input: './index.ts',
    output: 'dist/es',
  },
});
