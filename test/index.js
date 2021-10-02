import { waitForAnimation, waitForFrame } from '../index.js';

const {
  QUnit: { module, test }
} = window;

module('waitForAnimation', function (hooks) {
  hooks.beforeEach(async function () {
    this.element = document.getElementById('test-element');
    this.child = document.getElementById('test-child');
    this.element.className = '';
    this.child.className = '';

    await waitForFrame();
  });

  test('css animations', async function (assert) {
    assert.expect(1);

    this.element.classList.add('animate');

    const animations = await waitForAnimation(this.element);

    assert.animated(animations, [
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('a specific css animation', async function (assert) {
    assert.expect(1);

    this.element.classList.add('animate');

    const animations = await waitForAnimation(this.element, {
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-element → move-down']);
  });

  test('css transitions', async function (assert) {
    assert.expect(1);

    this.element.classList.add('transition');

    const animations = await waitForAnimation(this.element);

    assert.animated(animations, [
      '#test-element → margin-left',
      '#test-element → transform'
    ]);
  });

  test('a specific css transition', async function (assert) {
    assert.expect(1);

    this.element.classList.add('transition');

    const animations = await waitForAnimation(this.element, {
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-element → transform']);
  });

  test('js animations', async function (assert) {
    assert.expect(1);

    this.element.animate(
      [
        { marginLeft: 0, transform: 'translateY(0px)' },
        { marginLeft: '100px', transform: 'translateY(100px)' }
      ],
      {
        duration: 500
      }
    );

    const animations = await waitForAnimation(this.element);

    assert.animated(animations, ['#test-element']);
  });

  test('child animations are ignored', async function (assert) {
    assert.expect(1);

    this.child.classList.add('animate');

    const animations = await waitForAnimation(this.element);

    assert.animated(animations, []);
  });

  test('child animations are waited on', async function (assert) {
    assert.expect(1);

    this.child.classList.add('animate');

    const animations = await waitForAnimation(this.element, {
      subtree: true
    });

    assert.animated(animations, [
      '#test-child → move-right',
      '#test-child → move-down'
    ]);
  });

  test('a specific animation (including children)', async function (assert) {
    assert.expect(1);

    this.child.classList.add('animate');

    const animations = await waitForAnimation(this.element, {
      subtree: true,
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-child → move-down']);
  });

  test('a specific transition (including children)', async function (assert) {
    assert.expect(1);

    this.child.classList.add('transition');

    const animations = await waitForAnimation(this.element, {
      subtree: true,
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-child → transform']);
  });

  test('multiple elements', async function (assert) {
    assert.expect(1);

    this.element.classList.add('animate');
    this.child.classList.add('transition');

    const animations = await waitForAnimation(this.element, {
      subtree: true
    });

    assert.animated(animations, [
      '#test-child → margin-left',
      '#test-child → transform',
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('aborted transitions', async function (assert) {
    assert.expect(0);

    this.element.classList.add('transition');

    const promise = waitForAnimation(this.element);

    await waitForFrame();

    this.element.classList.remove('transition');

    await promise;
  });

  test('animation not started yet', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(this.element);

    this.element.classList.add('animate');

    const animations = await promise;

    assert.animated(animations, [
      '#test-element → move-right',
      '#test-element → move-down'
    ]);
  });

  test('animation not started yet (does not use events system)', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(this.element);

    setTimeout(() => {
      this.element.classList.add('animate');
    }, 100);

    const animations = await promise;

    assert.animated(animations, []);
  });

  test('no animation does not result in a never ending promise', async function (assert) {
    assert.expect(1);
    assert.timeout(1000);

    const animations = await waitForAnimation(this.element);

    assert.animated(animations, []);
  });

  test('thenable', function (assert) {
    assert.expect(1);

    this.element.classList.add('animate');

    return waitForAnimation(this.element).then((animations) => {
      assert.animated(animations, [
        '#test-element → move-right',
        '#test-element → move-down'
      ]);
    });
  });
});
