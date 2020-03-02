import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    Button
  } from 'react-native';
  import SchedulesContainer from './SchedulesContainer'
  import ScheduleShow from './ScheduleShow'
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class Profile extends React.Component {

    state = {
        showSchedule: false
    }

    showSchedule = () => {
        this.setState({showSchedule: !this.props.showSchedule})
    }

    afterDelete = () => {
        this.setState({showSchedule: false})
    }

    render() {
        return(

                <ScrollView>
                    <View style={{marginLeft: 20, marginRight: 20, paddingTop: 20}}>
                        <View style={{ paddingBottom: 10}}>
                            <Image style={{height: 100, width: 100 , borderRadius: 50}} source={{uri: this.props.currentUser.image}}/>
                            <Text style={{ fontSize: 23, fontFamily: 'Damascus'}} >{this.props.currentUser.username}</Text>
                        </View>
                        {!this.state.showSchedule ? 
                        <SchedulesContainer userSchedules={this.props.userSchedules} schedules={this.props.schedules} currentUser={this.props.currentUser} viewSchedule={this.props.viewSchedule} showSchedule={this.showSchedule}/>
                        :
                        <View>
                            <FontAwesomeIcon icon={ faHome } onPress={() => this.setState({showSchedule: false})} size={30} color={'#e23c52'}/>
                            <ScheduleShow schedule={this.props.schedule} afterDelete={this.afterDelete} destinations={this.props.destinations} deleteSchedule={this.props.deleteSchedule} deleteDestinationSchedule={this.props.deleteDestinationSchedule} showAddDestination={this.props.showAddDestination} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} results={this.props.results} showSchedule={this.showSchedule} selectedScheduleDestinations={this.props.selectedScheduleDestinations} lat={this.props.lat} long={this.props.long}/>
                        </View>
                        }
                    </View>
                </ScrollView>
        )
    }
}

export default Profile