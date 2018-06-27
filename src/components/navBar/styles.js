import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1EB4C8',
    // opacity: 0.8,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginHorizontal: 5,
    minHeight: 32,
  },
  image: {
    width: 22,
    height: 22,
    marginHorizontal: 5,
    opacity: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontFamily: (Platform.OS === 'ios') ? 'Silom' : 'PixelOperator-Bold',
    marginHorizontal: 5,
    opacity: 1,
  },
  icon: {
    marginHorizontal: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 1,
  },
});

