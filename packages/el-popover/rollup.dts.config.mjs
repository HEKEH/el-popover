import dts from 'rollup-plugin-dts';

export default {
  input: './temp-types/packages/el-popover/src/index.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  external: ['vue', '@vue/reactivity'],
  plugins: [
    dts({
      respectExternal: true,
    }),
  ],
};
