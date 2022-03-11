export function waitForAnimation(element, options = {}) {
  if (!element.getAnimations) {
    return;
  }

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
