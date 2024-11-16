import { compileString, StringOptions } from 'sass';

export function getVariablesFromScss(
  filePath: string,
  options?: StringOptions<'sync'>,
) {
  const result = compileString(
    `@use "sass:meta";
@use "sass:map";
@use "${filePath}" as module;

$vars: ();
@each $var, $value in meta.module-variables("module") {
  $vars: map.merge($vars, ($var: $value));
}

:export {
  @each $name, $value in $vars {
    #{$name}: #{$value};
  }
}`,
    options,
  );
  return result.css
    .toString()
    .match(/:export\s*{([^}]+)}/)?.[1]
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)
    .reduce((acc, curr) => {
      const [key, value] = curr
        .trim()
        .split(':')
        .map(item => item.trim());
      return { ...acc, [key]: value };
    }, {});
}
