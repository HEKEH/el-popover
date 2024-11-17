import { resolve } from 'path';
import { readFileSync } from 'fs';
import {
  type AliasOptions,
  defineConfig,
  type PluginOption,
  type UserConfig,
} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { themeConfigPlugin } from '../theme-chalk/constants/vite-plugins';

export default defineConfig(({ mode }) => {
  const pkg = JSON.parse(
    readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
  );

  const alias: AliasOptions = {
    '@el-popover': resolve(__dirname, '../'),
  };

  const config: UserConfig = {
    plugins: [
      vue() as PluginOption,
      vueJsx() as PluginOption,
      cssInjectedByJsPlugin(),
      dts({
        include: ['src/**/*.ts', 'src/**/*.vue'],
        outDir: 'dist',
        rollupTypes: true,
      }),
      themeConfigPlugin(),
    ],
    build: {
      minify: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ElPopover',
        formats: ['es', 'cjs'],
        fileName: format => `index.${format}.js`,
      },
      watch: {
        include: [],
      },
      rollupOptions: {
        external: [
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.peerDependencies || {}),
        ],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      sourcemap: false,
    },
    resolve: {
      alias,
    },
  };
  return config;
});
