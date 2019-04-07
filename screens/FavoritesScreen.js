import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inject, observe } from 'mobx-react';

// @inject('favorites')
// @observe
export default class FavoritesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
