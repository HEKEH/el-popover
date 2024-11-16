import sass from 'sass';

export async function compileSass(content: string, loadPaths: string[]) {
  try {
    const result = sass.compileString(content, {
      loadPaths,
    });
    return result.css.toString().trim();
  } catch (error) {
    console.error('Sass compilation error:', error);
    throw error;
  }
}
