import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/Theme';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
       <LinearGradient
        colors={[Colors.background, '#1a1a2e']}
        style={styles.background}
      />
      <Heart size={64} color={Colors.textSecondary} strokeWidth={1.5} />
      <Text style={styles.text}>Your Favorites is Empty</Text>
      <Text style={styles.subText}>Start adding some anime to your list!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  text: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subText: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  }
});
