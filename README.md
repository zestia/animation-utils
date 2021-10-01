# @zestia/animation-utils

Utils for working with animations and transitions.

## waitForAnimation

Accepts an `element`, and optionally an `animationName`.
Returns a promise that will resolve when the animation ends.

### Examples

```javascript
// Wait for the next animation to end
await waitForAnimation(myElement);

// Wait for a specific animation to end
await waitForAnimation(myElement, 'fade-in');
```

## waitForTransition

Accepts an `element`, and optionally a `propertyName`.
Returns a promise that will resolve when the transition ends.

### Examples

```javascript
// Wait for the next transition to end
await waitForTransition(myElement);

// Wait for a specific transition to end
await waitForTransition(myElement, 'margin-left');
```

## waitForFrame

Returns a promise that resolves after the next paint.

### Examples

```javascript
// Ensure that changing the styles triggers a transition
element.style.maxHeight = 100;
await waitForFrame();
element.style.maxHeight = 0;
```
