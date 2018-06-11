import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isIOS = (Platform.OS === 'ios');
const statusBarHeight = 24;
const deviceHeight = isIOS ? height : height - statusBarHeight;

// Guideline sizes are based on standard ~5.7" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;
const scale = size => Math.floor((width / guidelineBaseWidth) * size);
const verticalScale = size => Math.floor((height / guidelineBaseHeight) * size);
const moderateScale = (size, factor = 0.5) => size + ((scale(size) - size) * factor);

const shadow = {
  shadowOffset: { width: 2, height: 2 },
  shadowColor: 'black',
  shadowOpacity: 0.5,
};

export default {
  deviceWidth: width,
  deviceHeight,
  isIOS,
  horizontalScale: scale,
  verticalScale,
  moderateScale,
  shadow,
};
