# @zestia/animation-utils

Utils for working with animations and transitions.

## Installation

```
npm install --save-dev @zestia/animation-utils
```

Add the following to `~/.npmrc` to pull @zestia scoped packages from Github instead of NPM.

```
@zestia:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<YOUR_GH_TOKEN>
```

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

## Contributing

- `npx testem` to run the tests in-browser
- `npx testem ci` to run the tests in headless mode
