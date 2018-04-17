const getCounter = (time) => {
  if (time > 0) {
    return new Counter(time);
  }

  return null;
};

class Counter {
  constructor(time) {
    this.value = time;
  }

  getValue() {
    return this.value;
  }

  tick() {
    return getCounter(this.value - 1);
  }
}

export default getCounter;
