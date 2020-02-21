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
import CreateScheduleForm from '../components/CreateScheduleForm'
import ScheduleResults from './ScheduleResults'
import { API_KEY } from 'react-native-dotenv'


class UserContainer extends React.Component {

    state = {
        showSchedule: false,
        schedules: [],
        selectedSchedule: {},
        addScheduleForm: false,
        lat: "",
        long: "", 
        apiResults: [],

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

    addScheduleForm = () => {
        this.setState({addScheduleForm: !this.state.addScheduleForm})
    }

    formInputHandler = (inputObj) => {
        let attractionName = inputObj.mustSee
        attractionName = attractionName.toLowerCase().split(' ').join('%20')
        let category = inputObj.category
        this.getDestinationCoords(attractionName, category)
    }

    getDestinationCoords = (attractionName, category) => {
        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${attractionName}&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`)
        .then(resp => resp.json())
        .then(data => {
            let lat = data.candidates[0].geometry.location.lat
            let long = data.candidates[0].geometry.location.lng
            this.setState({lat, long}, () => this.getDestinationResults(category))  
        })
        .catch(err => console.error(err))
        
    }

    getDestinationResults = (category) => {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.lat},${this.state.long}&radius=1600&type=${category}&key=${API_KEY}`)
        .then(resp => resp.json())
        .then(data => this.setState({apiResults: data.results}))
        .catch(err => console.error(err))
    }


    render() {
        return (
            <View>
                <Text style={{ fontSize: 25 }} >{this.props.currentUser.username}</Text>
                <Image style={{height: 100, width: 100 }} source={{uri: this.props.currentUser.image}}/>
                <Button title={this.state.addScheduleForm ? "Close Form" : "Add Schedule"} onPress={this.addScheduleForm} />
                {this.state.addScheduleForm && <CreateScheduleForm formInputHandler={this.formInputHandler} />}
                <SchedulesContainer schedules={this.props.currentUser.schedules} viewSchedule={this.viewSchedule} />
                {this.state.showSchedule && <ScheduleShow schedule={this.state.selectedSchedule} />}
                {this.state.apiResults && <ScheduleResults results={this.state.apiResults} />}
            </View>
        )
    }
}

export default UserContainer
