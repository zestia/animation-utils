# @zestia/animation-utils

Utils for working with animations and transitions.

## waitForAnimation

```javascript
// Wait for all current animations to finish
await waitForAnimation(element);

// Wait for all current animations to finish, including children
await waitForAnimation(element, { subtree: true });

// Wait for a specific animation to end
// (Assuming it has started already, or will start in the on frame)
await waitForAnimation(myElement, { animationName: 'fade-out' });

// Wait for a specific transition to end
// (Assuming it has started already, or will start in the on frame)
await waitForAnimation(myElement, { transitionProperty: 'margin-left' });
```

## waitForFrame

```javascript
// Ensure the styles are changed in the next paint
element.style.maxHeight = 100;
await waitForFrame();
element.style.maxHeight = 0;
```