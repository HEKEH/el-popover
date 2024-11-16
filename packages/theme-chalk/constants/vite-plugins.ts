import type { Plugin } from 'vite';
import themeConfig from './config';

export function themeConstantsPlugin(): Plugin {
  const virtualModuleId = 'virtual:theme-config';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default ${JSON.stringify(themeConfig)};`;
      }
    },
  };
}
