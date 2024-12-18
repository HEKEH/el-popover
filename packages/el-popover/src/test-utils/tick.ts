import { nextTick } from 'vue';

async function tick(times: number) {
  while (times--) {
    await nextTick();
  }
}

export default tick;

// in order to test transitions, we need to use
// await rAF() after firing transition events.
export async function rAF() {
  return new Promise(res => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
}
