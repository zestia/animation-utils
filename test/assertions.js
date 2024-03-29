const { QUnit, CSSAnimation } = window;

QUnit.assert.animated = function (_actual = [], expected = []) {
  const actual = _actual.map((result) => {
    return keyForAnimation(result.value);
  });

  const result = actual.every((result, index) => {
    return result === expected[index];
  });

  this.pushResult({ actual, expected, result });
};

function keyForAnimation(animation) {
  const id = animation.effect.target.getAttribute('id');

  const prop =
    animation[
      animation instanceof CSSAnimation ? 'animationName' : 'transitionProperty'
    ];

  return prop ? `#${id} → ${prop}` : `#${id}`;
}
