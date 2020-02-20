import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';

class ScheduleCard extends React.Component {
    render() {
        return (
            <View>
                <Text style={{ fontSize: 15 }}>{this.props.name}</Text>
                <Text>Location: {this.props.location}</Text>
                <Button title="View Schedule" onPress={() => this.props.viewSchedule(this.props.id)}/>

            </View>
        )
    }
}

export default ScheduleCard