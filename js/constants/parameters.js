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
  secondary: '#a3a3c0',
  white: '#ffffff',
  black: '#222222',
  grey: '#BCB9B9',
};

export const colors = {
  ...plain,
  whiteTransparent: rgba(plain.white, 0.8),
  secondaryTransparent: rgba(plain.secondary, 0.8),
};

const fontFamily = 'Ubuntu';
export const fonts = {
  light: { fontFamily: `${fontFamily}-light`, fontWeight: undefined },
  lightItalic: { fontFamily: `${fontFamily}-lightItalic`, fontWeight: undefined },
  medium: { fontFamily: `${fontFamily}-Medium`, fontWeight: undefined },
  mediumItalic: { fontFamily: `${fontFamily}-MediumItalic`, fontWeight: undefined },
  regular: { fontFamily: `${fontFamily}-Regular`, fontWeight: undefined },
  regularItalic: { fontFamily: `${fontFamily}-RegularItalic`, fontWeight: undefined },
  bold: { fontFamily: `${fontFamily}-Bold`, fontWeight: undefined },
  boldItalic: { fontFamily: `${fontFamily}-BoldItalic`, fontWeight: undefined },
};

export const sizes = {
  height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
  width,
  headerHeight: 56,
  drawerWidth: 304,
};
