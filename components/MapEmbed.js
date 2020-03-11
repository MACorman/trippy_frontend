import React from 'react'
import {
    StyleSheet,
    View
  } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      top: 65,
      left: 0,
      right: 0,
      bottom: 60,
      alignItems: 'center',
      flexDirection: 'column',
      flex: 1, 
      
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: 300,
      flexDirection: 'column',
      flex: 1,
      borderRadius: 10,
      borderWidth: 3,
      borderColor: "#517CA4",
      
    }
})

class MapEmbed extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              zoomEnabled={true}
              region={{
              latitude: this.props.lat,
              longitude: this.props.long,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
              }}>
                {this.props.markers.map(marker => {
                    return <Marker 
                    coordinate={marker.coordinates}
                    title={marker.title}
                  />
                })}
            </MapView>
      </View>
    )
  }
}

export default MapEmbed

// latitudeDelta: 0.015,
// longitudeDelta: 0.0121,







