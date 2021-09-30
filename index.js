export function waitForTransition(element, propertyName) {
  return new Promise((resolve) => {
    function handler(event) {
      if (element !== event.target) {
        return;
      }

      if (propertyName && propertyName !== event.propertyName) {
        return;
      }

      element.removeEventListener('transitionend', handler);
      resolve();
    }

    element.addEventListener('transitionend', handler);
  });
}

export function waitForAnimation(element, animationName) {
  return new Promise((resolve) => {
    function handler(event) {
      if (element !== event.target) {
        return;
      }

      if (animationName && animationName !== event.animationName) {
        return;
      }

      element.removeEventListener('animationend', handler);
      resolve();
    }

    element.addEventListener('animationend', handler);
  });
}

export function waitForFrame() {
  return new Promise(window.requestAnimationFrame);
}
