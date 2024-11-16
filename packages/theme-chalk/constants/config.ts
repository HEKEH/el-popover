import { getVariablesFromScss } from '../../utils/scss';

export type ThemeConfig = {
  namespace: string;
  'common-separator': string;
  'element-separator': string;
  'modifier-separator': string;
  'state-prefix': string;
};

// Get the root path without using Node.js APIs
const rootPath = new URL('../styles', import.meta.url).pathname;

const themeConfig = getVariablesFromScss('mixins/config.scss', {
  loadPaths: [rootPath],
}) as ThemeConfig;

export default themeConfig;
