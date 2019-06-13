import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';

@inject('favoritesStore')
@observer
export default class FavoritesScreen extends React.Component {
  render() {
    console.log(this.props.favoritesStore.favorites);
    const { favoritesStore } = this.props;

    if (favoritesStore.favorites.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No favorites bus stops</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
        {this.props.favorites.map(elem => {
          return <Text>{elem}</Text>;
        })}
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
