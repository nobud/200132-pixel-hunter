import assert from 'assert';
import getCounter from './counter';

describe(`counter`, () => {
  it(`counter value decreased to 29 after one tick with seed 30`, () => {
    const counter = getCounter(30);
    assert.equal(counter.tick().getValue(), 29);
  });
  it(`counter equal null after it expires`, () => {
    let counter = getCounter(1);
    counter = counter.tick();
    assert.equal(counter, null);
  });
  it(`counter is not created with 0 time value`, () => {
    const counter = getCounter(0);
    assert.equal(counter, null);
  });
  it(`counter is not created with negative time value`, () => {
    const counter = getCounter(-1);
    assert.equal(counter, null);
  });
});
