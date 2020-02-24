import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Button
  } from 'react-native';
  import SchedulesContainer from '../containers/SchedulesContainer'
import ScheduleCard from './ScheduleCard';
import ScheduleShow from '../containers/ScheduleShow'
import ScheduleResults from '../containers/ScheduleResults'

class ProfileHeader extends React.Component {

    state = {
        selectedSchedule: {},
        showSchedule: false,
        
    }

    viewSchedule = (id) => {
        let selectedSchedule = this.props.schedules.find(schedule => schedule.id === parseInt(id))
        this.setState({ selectedSchedule })
        this.setState({showSchedule: !this.state.showSchedule})

    }

    hideSchedule = () => {
        this.setState({showSchedule: !this.state.showSchedule})   
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 25 }} >{this.props.currentUser.username}</Text>

                <Image style={{height: 100, width: 100 }} source={{uri: this.props.currentUser.image}}/>

                {this.state.showSchedule ? <ScheduleShow schedule={this.state.selectedSchedule} hideSchedule={this.hideSchedule} /> : <SchedulesContainer userSchedules={this.props.userSchedules} schedules={this.props.schedules} currentUser={this.props.currentUser} viewSchedule={this.viewSchedule} />}
                
                {this.props.showResults && <ScheduleResults newScheduleInput={this.props.newScheduleInput} results={this.props.results} />}

            </View>
        )
    }
}

export default ProfileHeader