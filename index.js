/* eslint-disable */

(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define('@zestia/animation-utils', factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    global.animationUtils = factory();
  }
})(this, function () {
  'use strict';

  function waitForTransition(element, propertyName) {
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

  function waitForAnimation(element, animationName) {
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

  function waitForFrame() {
    return new Promise(requestAnimationFrame);
  }

  return {
    waitForAnimation: waitForAnimation,
    waitForTransition: waitForTransition,
    waitForFrame: waitForFrame
  };
});
