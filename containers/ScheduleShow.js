import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button
  } from 'react-native';
import DestinationCard from '../components/DestinationCard'
import AddDestinationForm from '../components/AddDestinationForm'
import EditProfileForm from '../components/EditProfileForm';

class ScheduleShow extends React.Component {

    state = {
        showEditForm: false
    }

    editHandler = () => {
        this.setState({showEditForm: true})
        this.props.showAddDestination
    }


    render() {
        return (
            <View>
                {this.state.showEditForm
                ? 
                <AddDestinationForm schedule={this.props.schedule} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} results={this.props.results} />
                :
                <View>
                    <Text>{this.props.schedule.name}</Text>
                    <Text>{`Location: ${this.props.schedule.location}`}</Text>
                    <Text>{`Date: ${this.props.schedule.date.slice(5, 7)}/${this.props.schedule.date.slice(8, 10)}/${this.props.schedule.date.slice(0, 4)}`}</Text>
                    {this.props.destinations.map(destination => <DestinationCard key={destination.id} {...destination} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule} />)}
                    <Button title="Edit Schedule" onPress={this.editHandler} />
                    <Button title="Delete Schedule" onPress={this.props.deleteSchedule}/>
                </View>
                }
            </View>
        )
    }
}

export default ScheduleShow