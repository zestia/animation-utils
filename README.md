# @zestia/animation-utils

Utils for working with animations and transitions.

## waitForAnimation

```javascript
// Wait for animations to start and finish
await waitForAnimation(element);

// Wait for animations to finish, if there are any
await waitForAnimation(element, { maybe: true });

// Wait for animations to start and finish, including descendants
await waitForAnimation(element, { subtree: true });

// Wait for an animation to start and finish by name
await waitForAnimation(element, { animationName: 'fade-out' });

// Wait for a transition to start and finish by name
await waitForAnimation(element, { transitionProperty: 'margin-left' });

// Wait for an animation to start and finish by name, including descendants
await waitForAnimation(element, { subtree: true, animationName: 'move' });
```
