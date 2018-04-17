import definition from './definition';
import {TypeImage} from '../game/option';

const tasks = [
  {
    type: definition.TypeTask.ONE_IMG,
    text: `Угадай, фото или рисунок?`,
    options: [
      {
        srcImage: `https://k42.kn3.net/CF42609C8.jpg`,
        refType: TypeImage.PAINTING,
      }
    ]
  },
  {
    type: definition.TypeTask.ONE_IMG,
    text: `Угадай, фото или рисунок?`,
    options: [
      {
        srcImage: `https://i.imgur.com/DiHM5Zb.jpg`,
        refType: TypeImage.PHOTO,
      },
    ]
  },
  {
    type: definition.TypeTask.TWO_IMG,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        srcImage: `https://k32.kn3.net/5C7060EC5.jpg`,
        refType: TypeImage.PAINTING,
      },
      {
        srcImage: `http://i.imgur.com/1KegWPz.jpg`,
        refType: TypeImage.PHOTO,
      }
    ]
  },
  {
    type: definition.TypeTask.THREE_IMG,
    text: `Найдите рисунок среди изображений`,
    options: [
      {
        srcImage: `https://k42.kn3.net/D2F0370D6.jpg`,
        refType: TypeImage.PAINTING,
      },
      {
        srcImage: `http://i.imgur.com/1KegWPz.jpg`,
        refType: TypeImage.PHOTO,
      },
      {
        srcImage: `https://i.imgur.com/DiHM5Zb.jpg`,
        refType: TypeImage.PHOTO,
      }
    ]
  },
  {
    type: definition.TypeTask.ONE_IMG,
    text: `Угадай, фото или рисунок?`,
    options: [
      {
        srcImage: `http://i.imgur.com/DKR1HtB.jpg`,
        refType: TypeImage.PHOTO,
      }
    ]
  },
  {
    type: definition.TypeTask.ONE_IMG,
    text: `Угадай, фото или рисунок?`,
    options: [
      {
        srcImage: `https://i.imgur.com/DiHM5Zb.jpg`,
        refType: TypeImage.PHOTO,
      },
    ]
  },
  {
    type: definition.TypeTask.TWO_IMG,
    text: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        srcImage: `https://k32.kn3.net/5C7060EC5.jpg`,
        refType: TypeImage.PAINTING,
      },
      {
        srcImage: `http://i.imgur.com/DKR1HtB.jpg`,
        refType: TypeImage.PHOTO,
      }
    ]
  },
  {
    type: definition.TypeTask.THREE_IMG,
    text: `Найдите рисунок среди изображений`,
    options: [
      {
        srcImage: `https://k42.kn3.net/CF42609C8.jpg`,
        refType: TypeImage.PAINTING,
      },
      {
        srcImage: `http://i.imgur.com/DKR1HtB.jpg`,
        refType: TypeImage.PHOTO,
      },
      {
        srcImage: `https://i.imgur.com/DiHM5Zb.jpg`,
        refType: TypeImage.PHOTO,
      }
    ]
  },
  {
    type: definition.TypeTask.ONE_IMG,
    text: `Угадай, фото или рисунок?`,
    options: [
      {
        srcImage: `https://k42.kn3.net/CF42609C8.jpg`,
        refType: TypeImage.PAINTING,
      }
    ]
  },
  {
    type: definition.TypeTask.ONE_IMG,
    text: `Угадай, фото или рисунок?`,
    options: [
      {
        srcImage: `https://k42.kn3.net/D2F0370D6.jpg`,
        refType: TypeImage.PAINTING,
      },
    ]
  }
];

export {tasks};
