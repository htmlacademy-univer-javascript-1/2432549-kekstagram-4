import { getRandomInteger, getRandomArrayElement } from './util.js';
const PICTURES_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENTS_COUNT = 30;
const COMMENTS_IDS = 100000;
const COMMENTS_PER_BLOCK = 2;
const COMMENTS_EXAMPLES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCTIPTIONS = [
  'Это просто стул',
  'Неплохая туса',
  'Кто бы знал, что так будет',
  'Даже не знаю, что тут и сказать',
  'Феноменальная архитектура',
  'Просто пусть будет ;)',
  'Давно не было новостей - держите!'
];
const NAMES = [
  'Paul',
  'Nikita',
  'Dima',
  'Andrey',
  'Tom',
  'Vladimir',
  'Keks',
  'Sergay',
  'Tanya',
  'Liza',
  'Dasha'
];

const commentsIdCreator = () => {
  const ids = [];

  return () =>{
    let id = getRandomInteger(1, COMMENTS_IDS);
    while (ids.includes(id)){
      id = getRandomInteger(1, COMMENTS_IDS);
    }
    ids.push(id);
    return id;
  };
};

const picturesIdCreator = () => {
  let previousId = 0;

  return () => {
    previousId+=1;
    return previousId;
  };
};

const getImageUrl = () => `photos/${getRandomInteger(1, PICTURES_COUNT)}.jpg`;

const getAvatarUrl = () => `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`;

const commentsIdGenerator = commentsIdCreator();
const picturesIdGenerator = picturesIdCreator();

const createMessages = () =>
  Array.from({length: getRandomInteger(1,COMMENTS_PER_BLOCK)},
    () => getRandomArrayElement(COMMENTS_EXAMPLES)).join(' ');

const createComments = () => ({
  id: commentsIdGenerator(),
  avatar: getAvatarUrl(),
  message: createMessages(),
  name: getRandomArrayElement(NAMES)
});

const createPictureBlock = () =>({
  id: picturesIdGenerator(),
  url: getImageUrl(),
  description: getRandomArrayElement(DESCTIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_COUNT)}, createComments)
});

const createPictureBlocks = (count = PICTURES_COUNT) => Array.from({length: count}, createPictureBlock);

const picturesData = createPictureBlocks();

export {picturesData};

