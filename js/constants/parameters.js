import { Dimensions, Platform, StatusBar } from 'react-native';
import hexRgb from 'hex-rgb';

const { width, height } = Dimensions.get('window');

function rgba(hex, a = null) {
  const {
    red, green, blue, alpha,
  } = hexRgb(hex);
  return `rgba(${red}, ${green}, ${blue}, ${a !== null ? a : alpha})`;
}

const plain = {
  primary: '#fa507b',
  white: '#fff',
  black: '#000',
  grey: '#BCB9B9',
};

export const colors = {
  ...plain,
  whiteTransparent: rgba(plain.white, 0.8),
};

export const sizes = {
  height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
  width,
  headerHeight: 56,
  drawerWidth: 304,
};
