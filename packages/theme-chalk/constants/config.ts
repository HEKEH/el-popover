import { getVariablesFromScss } from '@el-popover/utils/scss';
import path from 'path';

const srcPath = path.resolve(__dirname, '../styles');

const config = getVariablesFromScss('mixins/config.scss', {
  loadPaths: [srcPath],
}) as {
  namespace: string;
  'common-separator': string;
  'element-separator': string;
  'modifier-separator': string;
  'state-prefix': string;
};

export default config;
