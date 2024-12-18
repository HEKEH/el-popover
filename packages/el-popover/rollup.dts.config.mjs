/** rollupTypes in vite.config.mts will cause errors, so rollup-plugin-dts must be used to complete the rollupTypes task */

import { readFileSync } from 'node:fs';
import dts from 'rollup-plugin-dts';

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);

export default {
  input: './dist/temp-types/packages/el-popover/src/index.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    dts({
      respectExternal: true,
    }),
  ],
};
