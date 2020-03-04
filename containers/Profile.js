import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    Button,
    FlatList
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
            <View style={{flex: 1 }}>
                <ScrollView contentContainerStyle={{paddingBottom: 300}}>  
                    <View style={{marginLeft: 20, marginRight: 20, paddingTop: 15, flex:1}}>
                        {!this.state.showSchedule ? 
                        <View>
                            <View style={{ paddingBottom: 15, flexDirection: 'row'}}>
                                <Image style={{height: 100, width: 100 , borderRadius: 50}} source={{uri: this.props.currentUser.image}}/>
                                <Text style={{ fontSize: 23, fontFamily: 'Damascus', paddingTop: 35, paddingLeft: 15}} >{`Welcome, ${this.props.currentUser.username}!`}</Text>
                            </View>
                            <SchedulesContainer userSchedules={this.props.userSchedules} schedules={this.props.schedules} currentUser={this.props.currentUser} viewSchedule={this.props.viewSchedule} showSchedule={this.showSchedule}/>
                        </View>
                        :
                        <View>
                            <FontAwesomeIcon icon={ faHome } onPress={() => this.setState({showSchedule: false})} size={30} color={'#517CA4'}/>
                            <ScheduleShow schedule={this.props.schedule} clearApiResults={this.props.clearApiResults} afterDelete={this.afterDelete} destinations={this.props.destinations} deleteSchedule={this.props.deleteSchedule} deleteDestinationSchedule={this.props.deleteDestinationSchedule} showAddDestination={this.props.showAddDestination} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} results={this.props.results} showSchedule={this.showSchedule} selectedScheduleDestinations={this.props.selectedScheduleDestinations} lat={this.props.lat} long={this.props.long}/>
                        </View>
                        }
                    </View>
                </ScrollView>

            </View>

            
        )
    }
}

export default Profile