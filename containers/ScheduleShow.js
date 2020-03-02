import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Button,
    TouchableHighlight
  } from 'react-native';
import AddDestinationForm from '../components/AddDestinationForm'
import Agenda from '../components/Agenda'
import MapEmbed from '../components/MapEmbed';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e23c52',
        borderRadius: 10,
        paddingTop: 10,
        flex: 3
                
    },
    text: {
        fontSize: 20
    },
    button: {
        backgroundColor: '#e23c52',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center'
    }
})

class ScheduleShow extends React.Component {

    date=this.props.schedule.date.slice(0, 10)

    state = {
        showEditForm: false,
    }

    editHandler = () => {
        this.setState({showEditForm: true})
        this.props.showAddDestination
    }

    closeEditForm = () => {
        this.setState({showEditForm: false})
    }

    deleteHandler = () => {
        this.props.deleteSchedule()
        this.props.afterDelete()
    }


    render() {
        return (
            <View>
                {this.state.showEditForm
                ? 
                <AddDestinationForm schedule={this.props.schedule} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} showSchedule={this.props.showSchedule} results={this.props.results} closeEditForm={this.closeEditForm}/>
                :
                <View style={{justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 20, fontFamily: 'Damascus'}}>{this.props.schedule.name}</Text>
                    <Text style={{fontSize:15, fontFamily: 'DamascusLight'}}>{this.props.schedule.location}</Text>
                    <MapEmbed schedule={this.props.schedule} selectedScheduleDestinations={this.props.selectedScheduleDestinations} destinations={this.props.destinations}/>
                    <Agenda destinations={this.props.destinations} selectedScheduleDestinations={this.props.selectedScheduleDestinations} date={this.props.schedule.date} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule} lat={this.props.lat} long={this.props.long}/>
                    <View style={{
                        position: 'relative',
                        top: 280,
                        left: 0,
                        right: 0,
                        bottom: 270,
                    }}>
                        {/* <Button title="Edit Schedule" onPress={this.editHandler} /> */}
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <TouchableHighlight style={styles.button}>
                                <Button color='white' title="Edit Schedule" onPress={this.editHandler} />
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.button}>
                                <Button color='white' title="Delete Schedule" onPress={this.deleteHandler} />
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