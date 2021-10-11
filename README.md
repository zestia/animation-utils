# @zestia/animation-utils

Utils for working with animations and transitions.

## waitForAnimation

```javascript
// Wait for animations to finish
await waitForAnimation(element);

// Wait for animations to finish, including descendants
await waitForAnimation(element, { subtree: true });

// Wait for an animation to finish by name
await waitForAnimation(element, { animationName: 'fade-out' });

// Wait for a transition to finish by name
await waitForAnimation(element, { transitionProperty: 'margin-left' });

// Wait for an animation to finish by name, including descendants
await waitForAnimation(element, { subtree: true, animationName: 'move' });
```

## waitForFrame

```javascript
// Ensure the styles are changed in the next paint
element.style.maxHeight = 100;
await waitForFrame();
element.style.maxHeight = 0;
```
