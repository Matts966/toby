import {
  Dimensions, Platform, StatusBar,
} from 'react-native';
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
  secondary: '#8587A4',
  grey: '#C5C7D5',
  white: '#ffffff',
  black: '#222222',
};

export const colors = {
  ...plain,
  whiteTransparent: rgba(plain.white, 0.8),
  primaryTransparentLight: rgba(plain.primary, 0.4),
  secondaryTransparent: rgba(plain.secondary, 0.8),
  secondaryTransparentLight: rgba(plain.secondary, 0.4),
  blackTransparent: rgba(plain.black, 0.6),
  shadow: {
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      height: 2,
    },
  },
};

const fontFamily = 'Ubuntu';
export const fonts = {
  light: { fontFamily: `${fontFamily}-light`, fontWeight: undefined },
  lightItalic: { fontFamily: `${fontFamily}-lightItalic`, fontWeight: undefined },
  medium: { fontFamily: `${fontFamily}-Medium`, fontWeight: undefined },
  mediumItalic: { fontFamily: `${fontFamily}-MediumItalic`, fontWeight: undefined },
  regular: { fontFamily: `${fontFamily}`, fontWeight: undefined },
  italic: { fontFamily: `${fontFamily}-Italic`, fontWeight: undefined },
  bold: { fontFamily: `${fontFamily}-Bold`, fontWeight: undefined },
  boldItalic: { fontFamily: `${fontFamily}-BoldItalic`, fontWeight: undefined },
};

export const sizes = {
  height: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight,
  width,
  headerHeight: 56,
  drawerWidth: 304,
};
