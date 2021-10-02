import { waitForAnimation, waitForFrame } from '../index.js';

const {
  QUnit: { module, test }
} = window;

module('waitForAnimation', function (hooks) {
  hooks.beforeEach(async function () {
    this.parent = document.getElementById('test-parent');
    this.child = document.getElementById('test-child');
    this.parent.className = '';
    this.child.className = '';

    await waitForFrame();
  });

  test('css animations', async function (assert) {
    assert.expect(1);

    this.parent.classList.add('animate');

    const animations = await waitForAnimation(this.parent);

    assert.animated(animations, [
      '#test-parent → move-right',
      '#test-parent → move-down'
    ]);
  });

  test('a specific css animation', async function (assert) {
    assert.expect(1);

    this.parent.classList.add('animate');

    const animations = await waitForAnimation(this.parent, {
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-parent → move-down']);
  });

  test('css transitions', async function (assert) {
    assert.expect(1);

    this.parent.classList.add('transition');

    const animations = await waitForAnimation(this.parent);

    assert.animated(animations, [
      '#test-parent → margin-left',
      '#test-parent → transform'
    ]);
  });

  test('a specific css transition', async function (assert) {
    assert.expect(1);

    this.parent.classList.add('transition');

    const animations = await waitForAnimation(this.parent, {
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-parent → transform']);
  });

  test('js animations', async function (assert) {
    assert.expect(1);

    this.parent.animate(
      [
        { marginLeft: 0, transform: 'translateY(0px)' },
        { marginLeft: '100px', transform: 'translateY(100px)' }
      ],
      {
        duration: 500
      }
    );

    const animations = await waitForAnimation(this.parent);

    assert.animated(animations, ['#test-parent']);
  });

  test('child animations', async function (assert) {
    assert.expect(1);

    this.child.classList.add('animate');

    const animations = await waitForAnimation(this.parent, {
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

    const animations = await waitForAnimation(this.parent, {
      subtree: true,
      animationName: 'move-down'
    });

    assert.animated(animations, ['#test-child → move-down']);
  });

  test('a specific transition (including children)', async function (assert) {
    assert.expect(1);

    this.child.classList.add('transition');

    const animations = await waitForAnimation(this.parent, {
      subtree: true,
      transitionProperty: 'transform'
    });

    assert.animated(animations, ['#test-child → transform']);
  });

  test('multiple animations', async function (assert) {
    assert.expect(1);

    this.parent.classList.add('animate');
    this.child.classList.add('transition');

    const animations = await waitForAnimation(this.parent, {
      subtree: true
    });

    assert.animated(animations, [
      '#test-child → margin-left',
      '#test-child → transform',
      '#test-parent → move-right',
      '#test-parent → move-down'
    ]);
  });

  test('aborted transitions', async function (assert) {
    assert.expect(0);

    this.parent.classList.add('transition');

    const promise = waitForAnimation(this.parent);

    await waitForFrame();

    this.parent.classList.remove('transition');

    await promise;
  });

  test('animation not started yet', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(this.parent);

    this.parent.classList.add('animate');

    const animations = await promise;

    assert.animated(animations, [
      '#test-parent → move-right',
      '#test-parent → move-down'
    ]);
  });

  test('animation not started yet (does not use events system)', async function (assert) {
    assert.expect(1);

    const promise = waitForAnimation(this.parent);

    setTimeout(() => {
      this.parent.classList.add('animate');
    }, 100);

    const animations = await promise;

    assert.animated(animations, []);
  });

  test('no animation does not result in a never ending promise', async function (assert) {
    assert.expect(1);
    assert.timeout(1000);

    const animations = await waitForAnimation(this.parent);

    assert.animated(animations, []);
  });

  test('thenable', function (assert) {
    assert.expect(1);

    this.parent.classList.add('animate');

    return waitForAnimation(this.parent).then((animations) => {
      assert.animated(animations, [
        '#test-parent → move-right',
        '#test-parent → move-down'
      ]);
    });
  });
});
