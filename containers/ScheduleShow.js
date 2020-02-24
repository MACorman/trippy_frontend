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

class ScheduleShow extends React.Component {


    render() {
        return (
            <View>
                <Text>{this.props.schedule.name}</Text>
                <Text>Location: {this.props.schedule.location}</Text>
                {this.props.schedule.destinations.map(destination => <DestinationCard key={destination.id} {...destination} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule} />)}
                <Button title="Edit Schedule"/>
                <Button title="Delete Schedule" onPress={() => this.props.deleteSchedule(this.props.schedule.id)}/>
            </View>
        )
    }
}

export default ScheduleShow