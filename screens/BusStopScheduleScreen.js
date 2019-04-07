import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import BusStopHeader from '../components/BusStopHeader';
import ScheduleEntry from '../components/ScheduleEntry';

export default class BusStopScheduleScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   const busStop = navigation.getParam('currentBusStop', 'Odjazdy');
  //   return {
  //     title: busStop.name
  //   };
  // };

  static navigationOptions = {
    headerTitle: <BusStopHeader />
  };

  state = {
    BusStopSchedule: []
  };

  async componentDidMount() {
    const busStop = this.props.navigation.getParam('currentBusStop', null);
    const KP = this.props.navigation.getParam('KP', null);

    const busStopSchedule = await KP.getBusStopSchedule(busStop);
    this.setState({
      BusStopSchedule: busStopSchedule
    });
  }

  render() {
    console.log('render');
    console.log(this.state.BusStopSchedule);

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.BusStopSchedule.map((schedule, index) => {
            return (
              <View key={index}>
                <ScheduleEntry scheduleData={schedule} />
                <Divider />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
    // paddingBottom: 10
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
