import React from 'react';
import {
  View, StyleSheet, Image, StatusBar,
} from 'react-native';

import { colors } from '../parameters';

const logoWhite = require('../../assets/images/logo_white.jpg');

const SplashScreen = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor={colors.primary} />
    <Image
      source={logoWhite}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    width: '30%',
    height: '30%',
  },
});
