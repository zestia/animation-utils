export async function waitForAnimation(element, options = {}) {
  await waitForFrame();

  await Promise.all(
    element
      .getAnimations({
        subtree: options.subtree
      })
      .filter((animation) => {
        if (options.transitionProperty) {
          return animation.transitionProperty === options.transitionProperty;
        } else if (options.animationName) {
          return animation.animationName === options.animationName;
        } else {
          return true;
        }
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
