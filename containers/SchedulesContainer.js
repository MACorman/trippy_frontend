import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
  } from 'react-native';
import ScheduleCard from '../components/ScheduleCard'

class SchedulesContainer extends React.Component {
    render() {
        return (
            <View>
                {this.props.schedules.map(schedule => <ScheduleCard key={schedule.id} {...schedule} viewSchedule={this.props.viewSchedule} />)}
            </View>
        )
    }
}

export default SchedulesContainer