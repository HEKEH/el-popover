import path from 'path';
import { fileURLToPath } from 'url';
import { compileString } from 'sass';

export async function compileSass(content: string, loadPaths: string[]) {
  const result = compileString(content, {
    loadPaths,
  });
  return result;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.resolve(__dirname, '../../src');

export async function testSassString(sassContent: string) {
  const debugMessages: string[] = [];
  const compileResult = await compileString(sassContent, {
    loadPaths: [srcPath],
    logger: {
      debug: message => {
        debugMessages.push(message);
      },
    },
  });
  return { compileResult, debugMessages };
}
