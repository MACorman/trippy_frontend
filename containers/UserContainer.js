import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image
  } from 'react-native';
import SchedulesContainer from './SchedulesContainer'
import ScheduleShow from './ScheduleShow'


class UserContainer extends React.Component {

    state = {
        showSchedule: false,
        schedules: [],
        selectedSchedule: {} 

    }

    componentDidMount() {
        fetch("http://localhost:3000/schedules")
        .then(resp => resp.json())
        .then(schedules => this.setState({ schedules }))
    }

    viewSchedule = (id) => {
        let selectedSchedule = this.state.schedules.find(schedule => schedule.id === parseInt(id))
        this.setState({ selectedSchedule })
        this.setState({showSchedule: !this.state.showSchedule})

    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 25 }} >{this.props.currentUser.username}</Text>
                <Image style={{height: 100, width: 100 }} source={{uri: this.props.currentUser.image}}/>
                <SchedulesContainer schedules={this.props.currentUser.schedules} viewSchedule={this.viewSchedule} />
                {this.state.showSchedule && <ScheduleShow schedule={this.state.selectedSchedule} />}
            </View>
        )
    }
}

export default UserContainer