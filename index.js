export async function waitForAnimation(element, options = {}) {
  await waitForFrame();

  return Promise.all(
    element
      .getAnimations({
        subtree: options.subtree
      })
      .filter((animation) => {
        if (options.transitionProperty) {
          return animation.transitionProperty === options.transitionProperty;
        }

        if (options.animationName) {
          return animation.animationName === options.animationName;
        }

        return true;
      })
      .map((animation) => {
        return animation.finished.catch(() => {
          // squelch aborted animations
        });
      })
  );
}

export function waitForFrame() {
  return new Promise(window.requestAnimationFrame);
}
