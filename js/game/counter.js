const Counter = function (time) {
  this.value = time;
};

const getCounter = (time) => {
  if (time > 0) {
    return new Counter(time);
  }

  return null;
};

Counter.prototype = {
  getValue() {
    return this.value;
  },
  tick() {
    return getCounter(this.value - 1);
  }
};

export default getCounter;
