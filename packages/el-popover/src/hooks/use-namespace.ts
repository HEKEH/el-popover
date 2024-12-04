import themeConfig from 'virtual:theme-config';
import { computed, getCurrentInstance, inject, ref, unref } from 'vue';
import type { InjectionKey, Ref } from 'vue';

export const defaultNamespace = themeConfig.namespace;
const statePrefix = themeConfig['state-prefix']; // is-
const commonSeparator = themeConfig['common-separator']; // -
const elementSeparator = themeConfig['element-separator']; // __
const modifierSeparator = themeConfig['modifier-separator']; // --

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string,
) => {
  let cls = `${namespace}${commonSeparator}${block}`;
  if (blockSuffix) {
    cls += `${commonSeparator}${blockSuffix}`;
  }
  if (element) {
    cls += `${elementSeparator}${element}`;
  }
  if (modifier) {
    cls += `${modifierSeparator}${modifier}`;
  }
  return cls;
};

export const namespaceContextKey: InjectionKey<Ref<string | undefined>> =
  Symbol('namespaceContextKey');

/**
 * A composable function to get and handle namespace
 * @param namespaceOverrides - Optional ref to override the default namespace
 * @returns A computed ref containing the resolved namespace
 */
export const useGetDerivedNamespace = (
  namespaceOverrides?: Ref<string | undefined>,
) => {
  // Determine the final namespace to use
  const derivedNamespace =
    // Priority 1: Use the override value if provided
    namespaceOverrides ||
    // Priority 2: If no override, then:
    (getCurrentInstance()
      ? // 2a. If within component instance, try to inject namespace with default
        inject(namespaceContextKey, ref(defaultNamespace))
      : // 2b. If not in component instance, use default namespace directly
        ref(defaultNamespace));

  // Create computed property to handle potential undefined values
  const namespace = computed(() => {
    // Unwrap ref value, fallback to default if empty
    return unref(derivedNamespace) || defaultNamespace;
  });

  return namespace;
};

export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string | undefined>,
) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides);
  const b = (blockSuffix = '') =>
    _bem(namespace.value, block, blockSuffix, '', '');
  const e = (element?: string) =>
    element ? _bem(namespace.value, block, '', element, '') : '';
  const m = (modifier?: string) =>
    modifier ? _bem(namespace.value, block, '', '', modifier) : '';
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace.value, block, blockSuffix, element, '')
      : '';
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace.value, block, '', element, modifier)
      : '';
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace.value, block, blockSuffix, '', modifier)
      : '';
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace.value, block, blockSuffix, element, modifier)
      : '';
  const is: {
    (name: string, state: boolean | undefined): string;
    (name: string): string;
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  // for css var
  // --el-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };

  const cssVarName = (name: string) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name: string) =>
    `--${namespace.value}-${block}-${name}`;
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName,
  };
};

export type UseNamespaceReturn = ReturnType<typeof useNamespace>;
