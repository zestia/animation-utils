export function waitForAnimation(element, options = {}) {
  if (!element.getAnimations) {
    return;
  }

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
