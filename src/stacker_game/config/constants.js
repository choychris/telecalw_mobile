import { Dimensions } from 'react-native';
import { shadow } from '../../banana_game/utils/config';

const { width, height } = Dimensions.get('window');

// size of playground;
// iPhone 8 Plus:
// width: 414
// height: 736
export const rowNum = 12;
export const boxNum = 8;
export const borderWidth = 3;
const playWidth = width * 0.88;
const boxSize = ((playWidth - (borderWidth * 2)) / boxNum) - 2;
const playHeight = ((boxSize + 2) * rowNum) + (borderWidth * 2);
const margin = (width - playWidth - borderWidth);

// reward details:
export const rewards = {
  mini: 15,
  major: 2000,
};

export default {
  width,
  height,
  playWidth,
  playHeight,
  boxSize,
  margin,
  shadow,
};
