import path from 'path';
import { getVariablesFromScss } from '../../utils/scss';
import { fileURLToPath } from 'url';

export type ThemeConfig = {
  namespace: string;
  'common-separator': string;
  'element-separator': string;
  'modifier-separator': string;
  'state-prefix': string;
};

// Get the root path without using Node.js APIs
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPath = path.resolve(__dirname, '../styles');

const themeConfig = getVariablesFromScss('mixins/config.scss', {
  loadPaths: [rootPath],
}) as ThemeConfig;

export default themeConfig;
