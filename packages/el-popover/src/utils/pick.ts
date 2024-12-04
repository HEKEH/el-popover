export function pick<T extends object, K extends keyof T>(
  obj: T,
  paths: K[],
): Pick<T, K> {
  return paths.reduce(
    (result, key) => {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
      return result;
    },
    {} as Pick<T, K>,
  );
}
