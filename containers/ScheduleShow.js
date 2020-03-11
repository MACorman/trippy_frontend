import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableHighlight
} from 'react-native';
import AddDestinationForm from '../components/AddDestinationForm'
import Agenda from '../components/Agenda'
import MapEmbed from '../components/MapEmbed';
import {API_KEY} from 'react-native-dotenv'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#517CA4',
        borderRadius: 10,
        paddingTop: 10,
        flex: 1          
    },
    text: {
        fontSize: 20,
        flex: 1
    },
    button: {
        backgroundColor: '#517CA4',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        flex: 1
    }
})

class ScheduleShow extends React.Component {

    state = {
        showEditForm: false,
        lat: '',
        long: '',
        markers: []   
    }

    componentDidMount() {
        this.getLocationCoords()
    }

    editHandler = () => {
        this.setState({showEditForm: true})
        this.props.showAddDestination
    }

    closeEditForm = () => {
        this.setState({showEditForm: false})
        this.props.clearApiResults
    }

    deleteHandler = () => {
        let id = this.props.schedule.id
        this.props.deleteSchedule(id)
        this.props.afterDelete()
    }

    getLocationCoords = () => {
        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.props.destinations[0]?this.props.destinations[0].name:this.props.schedule.location}&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`)
        .then(resp => resp.json())
        .then(data => {
            let lat = data.candidates[0].geometry.location.lat
            let long = data.candidates[0].geometry.location.lng
            this.setState({lat, long}, () => this.getDestinationCoords())  
        })
        .catch(err => console.error(err)) 
    }

    getDestinationCoords = () => {
        this.props.destinations.map(dest => {
            fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${dest.name}&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`)
            .then(resp => resp.json())
            .then(data => {
                let lat = data.candidates[0].geometry.location.lat
                let long = data.candidates[0].geometry.location.lng
                let newMarker = {
                    title: dest.name,
                    coordinates: {
                        latitude: lat,
                        longitude: long
                    }
                }
                let updatedMarkers = [...this.state.markers, newMarker]
                this.setState({markers: updatedMarkers})
            })
        })
    }

    deleteMarkerHandler = (name) => {
        let markersCopy = [...this.state.markers]
        let updatedMarkers = markersCopy.filter(marker => marker.title !== name)
        this.setState({markers: updatedMarkers})
    }

    createMarker = (newDestObj) => {
        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${newDestObj.name}&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`)
        .then(resp => resp.json())
        .then(data => {
            let lat = data.candidates[0].geometry.location.lat
            let long = data.candidates[0].geometry.location.lng  
            let newMarker = {
                title: newDestObj.name,
                coordinates: {
                    latitude: lat,
                    longitude: long
                }
            }
            let updatedMarkers = [...this.state.markers, newMarker]
            this.setState({markers: updatedMarkers})
        })   
    }


    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.showEditForm
                ? 
                <AddDestinationForm schedule={this.props.schedule} createMarker={this.createMarker} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} showSchedule={this.props.showSchedule} results={this.props.results} closeEditForm={this.closeEditForm}/>
                :
                <View style={{justifyContent: 'space-between', flex: 1}}>
                    <Text style={{fontSize: 25, fontFamily: 'Damascus', flex: 1}}>{this.props.schedule.name}</Text>
                    <Text style={{fontSize:18, fontFamily: 'DamascusLight', flex: 1}}>{this.props.schedule.location}</Text>
                    <MapEmbed schedule={this.props.schedule} selectedScheduleDestinations={this.props.selectedScheduleDestinations} destinations={this.props.destinations} markers={this.state.markers} lat={this.state.lat} long={this.state.long}/>
                    <Agenda destinations={this.props.destinations} schedule={this.props.schedule} selectedScheduleDestinations={this.props.selectedScheduleDestinations} date={this.props.schedule.date} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule} lat={this.props.lat} long={this.props.long} deleteMarkerHandler={this.deleteMarkerHandler} />
                    <View style={{
                        position: 'relative',
                        top: 280,
                        left: 0,
                        right: 0,
                        bottom: 270,
                        flex: 1
                    }}>
                        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 70, flex: 1}}>
                            <TouchableHighlight style={styles.button}>
                                <Button color='white' title="Add Destination" onPress={this.editHandler} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.button}>
                                <Button color='white' title="Delete Trip" onPress={this.deleteHandler} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                }
            </View>        
        )
    }
}

export default ScheduleShow