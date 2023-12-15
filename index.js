export async function waitForAnimation(element, options = {}) {
  if (typeof element.getAnimations !== 'function') {
    return;
  }

  if (getAnimations().length < 1 && options.maybe !== true) {
    await waitForStart();
  } else {
    await waitForFrame();
  }

  return Promise.allSettled(
    getAnimations().map((animation) => animation.finished)
  );

  function waitForStart() {
    return new Promise((resolve) => {
      element.addEventListener('animationstart', resolve, { once: true });
      element.addEventListener('transitionstart', resolve, { once: true });
    });
  }

  function waitForFrame() {
    return new Promise(window.requestAnimationFrame);
  }

  function getAnimations() {
    return element
      .getAnimations({ subtree: options.subtree })
      .filter((animation) => {
        return options.transitionProperty
          ? animation.transitionProperty === options.transitionProperty
          : options.animationName
            ? animation.animationName === options.animationName
            : true;
      });
  }
}
