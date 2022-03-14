const { QUnit, CSSAnimation } = window;

QUnit.assert.animated = function (actual = [], expected = []) {
  this.pushResult({
    expected: actual.map((result) => {
      return keyForAnimation(result.value);
    }),

    result: actual.every((result, index) => {
      return (
        result.value.playState === 'finished' &&
        keyForAnimation(result.value) === expected[index]
      );
    })
  });
};

function keyForAnimation(animation) {
  const id = animation.effect.target.getAttribute('id');

  const prop =
    animation[
      animation instanceof CSSAnimation ? 'animationName' : 'transitionProperty'
    ];

  return prop ? `#${id} → ${prop}` : `#${id}`;
}
