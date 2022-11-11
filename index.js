export async function waitForAnimation(element, options = {}) {
  if (!element.getAnimations) {
    return;
  }

  await waitForFrame();

  return Promise.allSettled(
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
      .map((animation) => animation.finished)
  );
}

export function waitForFrame() {
  return new Promise(window.requestAnimationFrame);
}
