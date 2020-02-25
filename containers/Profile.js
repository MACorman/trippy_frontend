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
  import SchedulesContainer from './SchedulesContainer'
  import ScheduleShow from './ScheduleShow'

class Profile extends React.Component {

    state = {
        showSchedule: false
    }

    showSchedule = () => {
        this.setState({showSchedule: true})
    }

    render() {
        return(
            <View>
                <Text style={{ fontSize: 23 }} >{this.props.currentUser.username}</Text>
                <Image style={{height: 100, width: 100 }} source={{uri: this.props.currentUser.image}}/>
                {!this.state.showSchedule ? 
                <SchedulesContainer userSchedules={this.props.userSchedules} schedules={this.props.schedules} currentUser={this.props.currentUser} viewSchedule={this.props.viewSchedule} showSchedule={this.showSchedule}/>
                :
                <View>
                    <Button title="Back" onPress={() => this.setState({showSchedule: false})}/>
                    <ScheduleShow schedule={this.props.schedule} destinations={this.props.destinations} deleteSchedule={this.props.deleteSchedule} deleteDestinationSchedule={this.props.deleteDestinationSchedule} showAddDestination={this.props.showAddDestination} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} results={this.props.results} />
                </View>
                }
            </View>
        )
    }
}

export default Profile