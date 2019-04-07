import React from 'react';
import { Provider } from 'mobx-react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import stores from './stores';
import AllBusStopsScreen from './screens/AllBusStopsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MapScreen from './screens/MapScreen';
import BusStopScheduleScreen from './screens/BusStopScheduleScreen';

const BusStopsStack = createStackNavigator({
  AllBusStops: { screen: AllBusStopsScreen },
  BusStopSchedule: { screen: BusStopScheduleScreen }
});

const MapStack = createStackNavigator({
  Map: { screen: MapScreen }
});

const BottomTabNavigator = createMaterialBottomTabNavigator(
  {
    BusStopsStack,
    MapStack,
    Favorites: { screen: FavoritesScreen }
  },
  {
    initialRouteName: 'BusStopsStack',
    activeColor: '#ffffff',
    inactiveColor: '#cfd8dc',
    barStyle: { backgroundColor: '#039be5' },
    shifting: false
  }
);

const AppContainer = createAppContainer(BottomTabNavigator);

export default class App extends React.Component {
  render() {
    debugger;
    return (
      <Provider favorites={stores.favorites}>
        <AppContainer />
      </Provider>
    );
  }
}
