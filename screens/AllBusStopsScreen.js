import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  StatusBar
} from 'react-native';
import { Divider } from 'react-native-paper';
import KiedyPrzyjedzie from '../kp_api/index';
import Carriers from '../kp_api/Carriers';
import BusStopElement from '../components/BusStopElement';

export default class AllBusStopsScreen extends React.Component {
  static navigationOptions = {
    title: 'Lista przystanków'
  };

  state = {
    BusStops: [],
    refreshing: true
  };

  KP = {};

  async componentDidMount() {
    this.getBusStops();
  }

  _onRefresh = () => {
    this.getBusStops();
  };

  async getBusStops() {
    const carriers = await Carriers.getCarriers();
    const carrier = carriers.find(carrier => {
      return carrier.name === 'MZK Sp. z o.o. Opole';
    });

    this.KP = new KiedyPrzyjedzie(carrier);
    const busStops = await this.KP.getBusStops();

    this.setState({
      BusStops: busStops,
      refreshing: false
    });
  }

  _onBusStopPress = (screen, currentBusStop) => {
    this.props.navigation.navigate(screen, { KP: this.KP, currentBusStop });
  };

  render() {
    console.log('render');

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.state.BusStops.map(busStop => {
            return (
              <View key={busStop.number}>
                <BusStopElement
                  busStop={busStop}
                  onPress={this._onBusStopPress}
                />
                <Divider />
              </View>
            );
          })}
          {/* <FlatList
          data={this.state.BusStops}
          renderItem={({ item }) => <BusStop busStop={item} />}
          keyExtractor={item => item.number.toString()}
        /> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10
    // paddingBottom: 10
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
