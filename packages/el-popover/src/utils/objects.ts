export function keysOf<T extends object>(arr: T) {
  return Object.keys(arr) as Array<keyof T>;
}
