import { waitForAnimation, waitForFrame } from '../index.js';

const {
  QUnit: { module, test }
} = window;

module('waitForAnimation', function (hooks) {
  let element;
  let child;

  hooks.beforeEach(async function () {
    element = document.getElementById('test-element');
    child = document.getElementById('test-child');

    await waitForFrame();
  });

  test('waits for css animations', async function (assert) {
    assert.expect(1);

    element.classList.add('animate');

    const animations = await waitForAnimation(element);

    assert.animated(animations, [
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('waits for a specific css animation', async function (assert) {
    assert.expect(1);

    element.classList.add('animate');

    const animations = await waitForAnimation(element, {
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-element → move-down']);
  });

  test('waits for css transitions', async function (assert) {
    assert.expect(1);

    element.classList.add('transition');

    const animations = await waitForAnimation(element);

    assert.animated(animations, [
      '#test-element → margin-left',
      '#test-element → transform'
    ]);
  });

  test('waits for a specific css transition', async function (assert) {
    assert.expect(1);

    element.classList.add('transition');

    const animations = await waitForAnimation(element, {
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-element → transform']);
  });

  test('waits for js animations', async function (assert) {
    assert.expect(1);

    element.animate(
      [
        { marginLeft: 0, transform: 'translateY(0px)' },
        { marginLeft: '100px', transform: 'translateY(100px)' }
      ],
      {
        duration: 500
      }
    );

    const animations = await waitForAnimation(element);

    assert.animated(animations, ['#test-element']);
  });

  test('does not wait for animations of descendants', async function (assert) {
    assert.expect(1);

    child.classList.add('animate');

    const animations = await waitForAnimation(element);

    assert.animated(animations, []);
  });

  test('waits for animations of descendants', async function (assert) {
    assert.expect(1);

    child.classList.add('animate');

    const animations = await waitForAnimation(element, {
      subtree: true
    });

    assert.animated(animations, [
      '#test-child → move-right',
      '#test-child → move-down'
    ]);
  });

  test('waits a specific animation (including descendants)', async function (assert) {
    assert.expect(1);

    child.classList.add('animate');

    const animations = await waitForAnimation(element, {
      subtree: true,
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-child → move-down']);
  });

  test('waits for a specific transition (including descendants)', async function (assert) {
    assert.expect(1);

    child.classList.add('transition');

    const animations = await waitForAnimation(element, {
      subtree: true,
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-child → transform']);
  });

  test('waits for animations of multiple elements', async function (assert) {
    assert.expect(1);

    element.classList.add('animate');
    child.classList.add('transition');

    const animations = await waitForAnimation(element, {
      subtree: true
    });

    assert.animated(animations, [
      '#test-child → margin-left',
      '#test-child → transform',
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('waits for specific animations of multiple elements', async function (assert) {
    assert.expect(1);

    element.classList.add('animate');
    child.classList.add('animate');

    const animations = await waitForAnimation(element, {
      subtree: true,
      animationName: 'move-down'
    });

    assert.animated(animations, [
      '#test-element → move-down',
      '#test-child → move-down'
    ]);
  });

  test('waits for animation frame before waiting for animations', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(element);

    element.classList.add('animate');

    const animations = await promise;

    assert.animated(animations, [
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('does not wait indefinitely if the element does not animate', async function (assert) {
    assert.expect(1);
    assert.timeout(1000);

    const animations = await waitForAnimation(element);

    assert.animated(animations, []);
  });

  test('squelches aborted transitions', async function (assert) {
    assert.expect(0);

    element.classList.add('transition');

    const promise = waitForAnimation(element);

    await waitForFrame();

    element.classList.remove('transition');

    await promise;
  });

  test('squelches no web animation api support', async function (assert) {
    assert.expect(1);

    element.getAnimations = null;

    const animations = await waitForAnimation(element);

    assert.animated(animations, []);
  });
});
