import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { inject, observe } from 'mobx-react';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

// @inject('favorites')
// @observe
export default class BusStopHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Departures</Text>
        <Icon name="star-o" size={20} color="#333333" />
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
