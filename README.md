# @zestia/animation-utils

Utils for working with animations and transitions.

## waitForAnimation

```javascript
// Wait for animations to finish
await waitForAnimation(element);

// Wait for animations to finish, including children
await waitForAnimation(element, { subtree: true });

// Wait for a specific animation to end
await waitForAnimation(myElement, { animationName: 'fade-out' });

// Wait for a specific transition to end
await waitForAnimation(myElement, { transitionProperty: 'margin-left' });

// Wait for a specific animation to finish including children
await waitForAnimation(element, { subtree: true, animationName: 'move' });
```

## waitForFrame

```javascript
// Ensure the styles are changed in the next paint
element.style.maxHeight = 100;
await waitForFrame();
element.style.maxHeight = 0;
```
