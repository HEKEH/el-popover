import path from 'path';
import { fileURLToPath } from 'url';
import { compileString, StringOptions } from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(__dirname, '../../styles');

export function compileSassString(
  content: string,
  options?: StringOptions<'sync'>,
) {
  const result = compileString(content, {
    ...options,
    loadPaths: options?.loadPaths ?? [srcPath],
  });
  return result;
}

export function debugSassString(sassContent: string) {
  const debugMessages: string[] = [];
  const compileResult = compileSassString(sassContent, {
    logger: {
      debug: message => {
        debugMessages.push(message);
      },
    },
  });
  return { compileResult, debugMessages };
}
