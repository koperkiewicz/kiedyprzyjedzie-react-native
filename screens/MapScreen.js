import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';
import KiedyPrzyjedzie from '../kp_api/index';
import Carriers from '../kp_api/Carriers';

export default class MapScreen extends React.Component {
  async componentDidMount() {
    const carriers = await Carriers.getCarriers();
    const carrier = carriers.find(carrier => {
      return carrier.name === 'MZK Sp. z o.o. Opole';
    });

    this.KP = new KiedyPrzyjedzie(carrier);
    const busStops = await this.KP.getBusStops();
    this.setState({
      busStops
    });
  }

  state = {
    busStops: []
  };

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount;
    // debugger;
    const coordinate = cluster.coordinate;
    const clusterId = cluster.clusterId;

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    const clusteringEngine = this.map.getClusteringEngine();
    const clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View>
          <Text>{pointCount}</Text>
        </View>
      </Marker>
    );
  };

  renderMarker = data => {
    return <Marker key={data.id || Math.random()} coordinate={data.location} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <ClusteredMapView
          style={{ flex: 1 }}
          data={this.state.busStops}
          initialRegion={{
            latitude: 50.668596,
            longitude: 17.928808,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          ref={r => {
            this.map = r;
          }}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
        /> */}
        <MapView
          initialRegion={{
            latitude: 50.668596,
            longitude: 17.928808,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          clustering={true}
          style={styles.map}
        >
          {this.state.busStops.map(busStop => {
            // console.log(busStop);
            return (
              <Marker
                coordinate={{
                  latitude: busStop.latitude,
                  longitude: busStop.longitude
                }}
                title={busStop.name}
                description={busStop.number.toString()}
                key={busStop.id}
                style={styles.marker}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: 400,
    width: 400
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  marker: {
    width: 60,
    height: 75
  }
});
