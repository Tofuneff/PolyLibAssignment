import {Image, StyleSheet, Text, View} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/polylib.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 250,
    height: 250,
  },
});
