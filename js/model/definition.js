const definition = {
  TypeTask: {
    ONE_IMG: `tinder-like`,
    TWO_IMG: `two-of-two`,
    THREE_IMG: `one-of-three`,
  },

  TypeAnswer: {
    WRONG: `wrong`,
    FAST: `fast`,
    NORMAL: `correct`,
    SLOW: `slow`,
    UNKNOWN: `unknown`
  },

  TypeImage: {
    PHOTO: `photo`,
    PAINTING: `painting`,
    UNKNOWN: `unknown`
  },

  Points: {
    RIGHT: 100,
    FAST: 50,
    SLOW: 50,
    LIFE: 50
  },

  MAX_LIVES: 3,

  NUMBER_OF_REQUIRED_ANSWERS: 10,

  MAX_TIME_FOR_ANSWER: 30, // секунды

  RangeTimeNormalAnswer: {
    MIN: 10,
    MAX: 20
  },

  TIME_BLINK_TIMER: 5 // секунды
};

export default definition;
