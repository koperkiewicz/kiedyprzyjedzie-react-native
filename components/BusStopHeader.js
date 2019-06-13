import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

@inject('favoritesStore')
@observer
export default class BusStopHeader extends Component {
  _handleClickFavorite = () => {
    console.log('_handleClickFavorite');

    const { favoritesStore, busStop } = this.props;
    const favorite = favoritesStore.isFavorite(busStop);

    if (!favorite) {
      favoritesStore.addFavoriteBusStop(busStop.id);
    } else {
      favoritesStore.removeFavoriteBusStop(busStop.id);
    }
  };

  render() {
    const { favoritesStore, busStop } = this.props;
    const favorite = favoritesStore.isFavorite(busStop);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Departures</Text>
        <TouchableWithoutFeedback onPress={this._handleClickFavorite}>
          <Icon name={favorite ? 'star' : 'star-o'} size={20} color="#333333" />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10
  },
  title: {
    fontSize: 16,
    color: '#333333'
  }
});
