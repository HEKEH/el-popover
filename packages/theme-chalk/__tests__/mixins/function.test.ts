import { testSassString } from '../utils';
import { describe, expect, it } from 'vitest';

describe('mixins/function', () => {
  describe('selectorToString', () => {
    it('should handle basic selector', async () => {
      const { debugMessages } = await testSassString(`
        @use 'mixins/function' as *;
        $test: '.el-button';
        $result: selectorToString($test);
        @debug $result;
      `);
      expect(debugMessages[0]).toBe('.el-button');
    });

    it('should handle complex selector', async () => {
      const { debugMessages } = await testSassString(`
        @use 'mixins/function' as *;
        $test: '.el-button__inner--primary';
        $result: selectorToString($test);
        @debug $result;
      `);
      expect(debugMessages[0]).toBe('.el-button__inner--primary');
    });

    it('should handle selector with pseudo-class', async () => {
      const { debugMessages } = await testSassString(`
        @use 'mixins/function' as *;
        $test: '.el-button:hover';
        $result: selectorToString($test);
        @debug $result;
      `);
      expect(debugMessages[0]).toBe('.el-button:hover');
    });
  });
});
