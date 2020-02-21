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

    // state = {
    //     currentUserUserSchedules: [],
    //     currentUserSchedules: []
    // }

    // componentDidMount() {
    //     let currentUserUserSchedules = this.props.userSchedules.filter(us => (us.user.username === this.props.currentUser.username))
    //     this.setState({currentUserUserSchedules})
    //     let currentUserSchedules = currentUserUserSchedules.map(cu => cu.schedule)
    //     this.setState({currentUserSchedules})
    // }

    render() {
        let currentUserUserSchedules = this.props.userSchedules.filter(us => us.user_id == this.props.currentUser.id)
        let currentUserSchedules = currentUserUserSchedules.map(cu => cu.schedule)
        // let userSchedules = this.props.schedules.filter(s => {
        //     s.users.map(u => {
        //         u.username === this.props.currentUser.username 
        //     })
        // })
        return (
            <View>
                {this.props.userSchedules && currentUserSchedules.map(schedule => <ScheduleCard key={schedule.id} {...schedule} viewSchedule={this.props.viewSchedule} />)}
            </View>
        )
    }
}

export default SchedulesContainer