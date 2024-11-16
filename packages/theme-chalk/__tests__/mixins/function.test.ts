import { debugSassString } from '../utils';
import { describe, expect, it } from 'vitest';
import config from '../../constants/config';

describe('mixins/function', () => {
  describe('selectorToString', () => {
    const testCases = [
      {
        name: 'basic selector',
        input: '.el-button',
        expected: '.el-button',
      },
      {
        name: 'complex selector',
        input: '.el-button__inner--primary',
        expected: '.el-button__inner--primary',
      },
      {
        name: 'selector with pseudo-class',
        input: '.el-button:hover',
        expected: '.el-button:hover',
      },
    ];

    it.each(testCases)(
      'should handle $name',
      async ({ input, expected }: (typeof testCases)[0]) => {
        const { debugMessages } = await debugSassString(`
        @use 'mixins/function' as *;
        $test: '${input}';
        $result: selectorToString($test);
        @debug $result;
      `);
        expect(debugMessages[0]).toBe(expected);
      },
    );
  });

  describe('containsModifier', () => {
    const testCases = [
      {
        name: 'selector with modifier',
        input: '.el-button--primary',
        expected: true,
      },
      {
        name: 'selector without modifier',
        input: '.el-button',
        expected: false,
      },
    ];

    it.each(testCases)(
      'should return $expected for $name',
      async ({ input, expected }: (typeof testCases)[0]) => {
        const { debugMessages } = await debugSassString(`
        @use 'mixins/function' as *;
        $result: containsModifier('${input}');
        @debug $result;
      `);
        expect(debugMessages[0]).toBe(expected.toString());
      },
    );
  });

  describe('bem', () => {
    const testCases = [
      {
        name: 'block only',
        args: ['button'],
        expected: `${config.namespace}-button`,
      },
      {
        name: 'block with element',
        args: ['button', 'inner'],
        expected: `${config.namespace}-button__inner`,
      },
      {
        name: 'block with element and modifier',
        args: ['button', 'inner', 'primary'],
        expected: `${config.namespace}-button__inner--primary`,
      },
    ];

    it.each(testCases)(
      'should generate $name',
      async ({ args, expected }: (typeof testCases)[0]) => {
        const argsString = args.map(arg => `'${arg}'`).join(', ');
        const { debugMessages } = await debugSassString(`
        @use 'mixins/function' as *;
        $result: bem(${argsString});
        @debug $result;
      `);
        expect(debugMessages[0]).toBe(expected);
      },
    );
  });

  describe('getCssVar', () => {
    const testCases = [
      {
        name: 'single argument',
        args: ['button'],
        expected: `var(--${config.namespace}-button)`,
      },
      {
        name: 'multiple arguments',
        args: ['button', 'text-color'],
        expected: `var(--${config.namespace}-button-text-color)`,
      },
    ];

    it.each(testCases)(
      'should generate CSS variable with $name',
      async ({ args, expected }: (typeof testCases)[0]) => {
        const argsString = args.map(arg => `'${arg}'`).join(', ');
        const { debugMessages } = await debugSassString(`
        @use 'mixins/function' as *;
        $result: getCssVar(${argsString});
        @debug $result;
      `);
        expect(debugMessages[0]).toBe(expected);
      },
    );
  });

  describe('getCssVarWithDefault', () => {
    it('should generate CSS variable with default value', async () => {
      const { debugMessages } = await debugSassString(`
        @use 'mixins/function' as *;
        $result: getCssVarWithDefault(('button', 'text-color'), #fff);
        @debug $result;
      `);
      expect(debugMessages[0]).toBe(
        `var(--${config.namespace}-button-text-color, #fff)`,
      );
    });
  });

  describe('containWhenFlag', () => {
    const testCases = [
      {
        name: 'selector with when flag',
        input: '.el-button.is-active',
        expected: true,
      },
      {
        name: 'selector without when flag',
        input: '.el-button',
        expected: false,
      },
    ];

    it.each(testCases)(
      'should return $expected for $name',
      async ({ input, expected }: (typeof testCases)[0]) => {
        const { debugMessages } = await debugSassString(`
        @use 'mixins/function' as *;
        $result: containWhenFlag('${input}');
        @debug $result;
      `);
        expect(debugMessages[0]).toBe(expected.toString());
      },
    );
  });
});