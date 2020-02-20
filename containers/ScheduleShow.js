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
                {/* {this.props.schedule.destinations.map(dest => <DestinationCard key={dest.id} {...dest} />)} */}
            </View>
        )
    }
}

export default ScheduleShow