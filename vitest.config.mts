import type { AliasOptions } from 'vite';
import { resolve } from 'node:path';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';
import { defineConfig } from 'vitest/config';
import { themeConfigPlugin } from './packages/theme-chalk/constants/vite-plugins';

const alias: AliasOptions = {
  '@el-popover': resolve(__dirname, 'packages/'),
  'el-popover': resolve(__dirname, 'packages/el-popover/src'),
};

export default defineConfig({
  plugins: [
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }),
    themeConfigPlugin(),
  ],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
    testTransformMode: {
      web: ['*.{ts,tsx}'],
    },
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: [],
    },
  },
  resolve: {
    alias,
  },
});
