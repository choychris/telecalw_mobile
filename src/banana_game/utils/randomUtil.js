import inRange from 'lodash/inRange';
import random from 'lodash/random';
import Config from './config';

const {
  // horizontalScale,
  verticalScale,
} = Config;

// ~5.7" screen
// horizontal range 0 - 270 (x position)
// vertical range 30 - 350 (y positon)
const randomPosition = () => {
  const scale = random(1, 1.3);
  const imageSize = Math.floor(verticalScale(80) * scale);
  const minLeft = 0;
  const maxLeft = 370 - imageSize;
  const minbottom = verticalScale(30);
  const maxBottom = 440 - imageSize;
  const randomLeft = random(minLeft, maxLeft);
  const randomBottom = random(minbottom, maxBottom);

  return { x: randomLeft, y: randomBottom, size: imageSize };
};

const checkImageOverlap = (currentX, randomX, currentY, randomY, size) => {
  const overlapX = inRange(randomX, currentX - size, currentX + size);
  const overlapY = inRange(randomY, currentY - size, currentY + size);
  return (overlapX && overlapY);
};

const isPositionAvailable = (positionArray, randomPos) => {
  for (let i = 0; i < positionArray.length; i += 1) {
    const current = positionArray[i];
    if (checkImageOverlap(current.x, randomPos.x, current.y, randomPos.y, current.size)) {
      return false;
    }
  }
  return true;
};

const generatePositionList = (level) => {
  const listLength = numberOfbananas(level);
  // console.warn(listLength);
  const positionList = [];
  for (let i = 0; i < listLength; i += 1) {
    if (i === 0) { positionList[0] = randomPosition(); }
    while (positionList[i] === undefined) {
      const position = randomPosition();
      if (isPositionAvailable(positionList, position)) {
        positionList[i] = position;
      }
    }
  }
  return positionList;
};

const numberOfbananas = (level) => {
  const minNumber = 3;
  const maxNumber = 6;
  const increment = level * 0.2;
  const nextNumber = Math.floor(minNumber + increment);
  if (nextNumber >= maxNumber) {
    return maxNumber;
  }
  return nextNumber;
};

const checkAvailable = (list, number) => {
  for (let i = 0; i < list.length; i += 1) {
    if (list[i] === number) {
      return false;
    }
  }
  return true;
};

const getRandomNumberList = (level, numberItem, sequenceItem) => {
  const listLength = numberOfbananas(level);
  const rangeArray = randomNumberRange(level, numberItem);
  const numberList = [];
  while (numberList.length < listLength) {
    const randomNumber = random(rangeArray[0], rangeArray[1]);
    if (checkAvailable(numberList, randomNumber)) {
      numberList.push(randomNumber);
    }
  }
  if (acsendingSequence(level, sequenceItem)) {
    return { list: numberList.sort((a, b) => (a - b)), ascend: true };
  }
  return { list: numberList.sort((a, b) => (b - a)), ascend: false };
};

const randomNumberRange = (level, item) => {
  if (level < 5) {
    return [0, 9];
  } else if (level < 8) {
    return [0, 29];
  } else if (level < 10) {
    return [item || -10, 29];
  } else if (level < 14) {
    return [item || -19, 39];
  } else if (level < 24) {
    return [item || -19, 49];
  }

  return [item || -30, 59];
};

const acsendingSequence = (level, item) => {
  if (item) { return true; }
  if (level < 8) { return true; }
  return (random(0, 1) === 1);
};

export default {
  getRandomNumberList,
  generatePositionList,
};
