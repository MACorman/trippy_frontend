import React from 'react'
import {
    View
  } from 'react-native';
import ScheduleCard from '../components/ScheduleCard'

class SchedulesContainer extends React.Component {

    scheduleSort = (lhs, rhs) => {  
        let results = parseInt(lhs.date.slice(0, 4)) > parseInt(rhs.date.slice(0, 4)) ? 1: parseInt(lhs.date.slice(0, 4)) < parseInt(rhs.date.slice(0, 4)) ? -1 : 0

        if (results === 0) {
            results = parseInt(lhs.date.slice(5, 7)) > parseInt(rhs.date.slice(5, 7)) ? 1 : parseInt(lhs.date.slice(5, 7)) < parseInt(rhs.date.slice(5, 7)) ? -1 : 0;
        }

        if (results === 0) {
            results = parseInt(lhs.date.slice(8, 10)) > parseInt(rhs.date.slice(8, 10)) ? 1 : parseInt(lhs.date.slice(8, 10)) < parseInt(rhs.date.slice(8, 10)) ? -1 : 0;
        }

        return results   
    }

    render() { 
        
        let currentUserUserSchedules = this.props.userSchedules.filter(us => us.user_id == this.props.currentUser.id)
        let currentUserSchedules = currentUserUserSchedules.map(cu => cu.schedule)
        let sortedCurrentUserSchedules = currentUserSchedules.sort(this.scheduleSort)
    
        return (
            <View>
                {this.props.userSchedules && sortedCurrentUserSchedules.map(schedule => <ScheduleCard key={schedule.id} {...schedule} viewSchedule={this.props.viewSchedule} showSchedule={this.props.showSchedule}/>)}
            </View>
        )
    }
}

export default SchedulesContainer