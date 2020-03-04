import React from 'react'
import {
    StyleSheet,
    View,
    Text
  } from 'react-native';
  import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'
  import {API_KEY} from 'react-native-dotenv'

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

    // state = {
    //     lat: '',
    //     long: '',
    //     markers: []
    // }

    // componentDidMount() {
    //     this.getLocationCoords()
    // }

    // getLocationCoords = () => {
    //     fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.props.destinations[0].name}&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         let lat = data.candidates[0].geometry.location.lat
    //         let long = data.candidates[0].geometry.location.lng
    //         this.setState({lat, long}, () => this.getDestinationCoords())  
    //     })
    //     .catch(err => console.error(err))

        
    // }

    // getDestinationCoords = () => {
    //     this.props.destinations.map(dest => {
    //         fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${dest.name}&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             let lat = data.candidates[0].geometry.location.lat
    //             let long = data.candidates[0].geometry.location.lng
    //             // this.setState({lat, long})  
    //             let newMarker = {
    //                 title: dest.name,
    //                 coordinates: {
    //                     latitude: lat,
    //                     longitude: long
    //                 }
    //             }
    //             let updatedMarkers = [...this.state.markers, newMarker]
    //             this.setState({markers: updatedMarkers})
            
    //         })
    //     })
    // }


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
                    latitudeDelta: 0.045,
                    longitudeDelta: 0.025
                    
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







