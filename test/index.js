import { waitForAnimation } from '../index.js'; // eslint-disable-line no-restricted-imports

const {
  QUnit: { module, test }
} = window;

module('waitForAnimation', function (hooks) {
  let element;
  let child;
  let draw;

  hooks.beforeEach(function () {
    element = document.getElementById('test-element');
    child = document.getElementById('test-child');
    draw = () => element.getBoundingClientRect();
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

  test('waits for an animation by name', async function (assert) {
    assert.expect(1);

    element.classList.add('animate');

    const animations = await waitForAnimation(element, {
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-element → move-down']);
  });

  test('waits for css transitions', async function (assert) {
    assert.expect(1);

    draw();

    element.classList.add('transition');

    const animations = await waitForAnimation(element);

    assert.animated(animations, [
      '#test-element → margin-left',
      '#test-element → transform'
    ]);
  });

  test('waits for a css transition by name', async function (assert) {
    assert.expect(1);

    draw();

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

  test('waits for animations by name, including descendants', async function (assert) {
    assert.expect(1);

    child.classList.add('animate');

    const animations = await waitForAnimation(element, {
      subtree: true,
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-child → move-down']);
  });

  test('waits for a transition by name, including descendants', async function (assert) {
    assert.expect(1);

    draw();

    child.classList.add('transition');

    const animations = await waitForAnimation(element, {
      subtree: true,
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-child → transform']);
  });

  test('waits for animation to start before waiting for animations', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(element);

    setTimeout(() => {
      element.classList.add('animate');
    }, 100);

    const animations = await promise;

    assert.animated(animations, [
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('waits 1 frame, for animations to start', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(element, { maybe: true });

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

    const animations = await waitForAnimation(element, { maybe: true });

    assert.animated(animations, []);
  });

  test('squelches aborted transitions', async function (assert) {
    assert.expect(0);

    draw();

    element.classList.add('transition');

    const promise = waitForAnimation(element);

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
