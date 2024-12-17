import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import * as process from 'node:process';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {
  type AliasOptions,
  defineConfig,
  type PluginOption,
  type UserConfig,
} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { themeConfigPlugin } from '../theme-chalk/constants/vite-plugins';

export default defineConfig(() => {
  const pkg = JSON.parse(
    readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
  );

  const alias: AliasOptions = {
    '@el-popover': resolve(__dirname, '../'),
    'el-popover': resolve(__dirname, 'src/'),
  };
  const plugins = [
    vue() as PluginOption,
    vueJsx() as PluginOption,
    cssInjectedByJsPlugin({
      styleId: 'heheh-el-popover-style',
      relativeCSSInjection: true, // for multiple format
    }),
    themeConfigPlugin(),
  ];
  if (process.env.ENABLE_DTS !== 'false') {
    plugins.push(
      dts({
        outDir: './dist/temp-types',
        tsconfigPath: './tsconfig.build.json',
        copyDtsFiles: true,
        // entryRoot: __dirname,
        // rollupTypes: true,  // Adding '@popperjs/core' to bundledPackages causes an error, so rollupTypes can only be done using rollup-plugin-dts with rollup.dts.config.mjs
        // bundledPackages: ['@vue/reactivity', '@popperjs/core'],
      }),
    );
  }

  const config: UserConfig = {
    plugins,
    build: {
      minify: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ElPopover',
        formats: ['es', 'cjs'],
        fileName: format => `index.${format}.js`,
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
        treeshake: true,
      },
      sourcemap: false,
    },
    resolve: {
      alias,
    },
    // define: {
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    // },
  };
  return config;
});
