import { observable, computed, action } from 'mobx';
import { AsyncStorage } from 'react-native';

export default class FavoritesStore {
  @observable favorites = [];

  @action addFavoriteBusStop(busStop) {
    this.favorites.push(busStop);
  }

  @action removeFavoriteBusStop(busStop) {
    this.favorites = this.favorites.filter(elem => elem !== busStop);
  }

  async saveFavorites() {
    try {
      await AsyncStorage.setItem('@FavoritesStore:favorites', this.favorites);
    } catch (e) {
      console.error(e);
    }
  }
}
