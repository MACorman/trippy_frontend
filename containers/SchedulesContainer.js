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
        
        let currentUserUserSchedules = this.props.userSchedules.filter(us => us.user_id == this.props.currentUser.id)
        let currentUserSchedules = currentUserUserSchedules.map(cu => cu.schedule)
        // let sortedCurrentUserSchedules = currentUserSchedules.sort((a, b) => b.date - a.date)
        // debugger 
        return (
            <View>
                {this.props.userSchedules && currentUserSchedules.map(schedule => <ScheduleCard key={schedule.id} {...schedule} viewSchedule={this.props.viewSchedule} showSchedule={this.props.showSchedule}/>)}
            </View>
        )
    }
}

export default SchedulesContainer