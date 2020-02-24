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
        userSchedules: [],
        newScheduleInput: {},
        newSchedule: {},
        destinationSchedules: [],
        selectedScheduleDestinations: []
        // selectedDestinationSchedule: {}
        // startCreateDestination: false

        // currentUserSchedules: []
        // newUserScheduleLoaded: false

    }

    componentDidMount() {
        fetch("http://localhost:3000/schedules")
        .then(resp => resp.json())
        .then(schedules => this.setState({ schedules }))

        fetch("http://localhost:3000/user_schedules")
        .then(resp => resp.json())
        .then(userSchedules => this.setState({ userSchedules }))

        fetch("http://localhost:3000/destination_schedules")
        .then(resp => resp.json())
        .then(destinationSchedules => this.setState({ destinationSchedules }))

        // this.setState({currentUserSchedules: this.props.cuschedules})
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
        // this.setState({newUserScheduleLoaded: false})
        this.setState({addScheduleForm: false})
        this.setState({newScheduleInput: inputObj})
        let attractionName = inputObj.mustSee
        attractionName = attractionName.toLowerCase().split(' ').join('%20')
        let category = inputObj.category
        this.getDestinationCoords(attractionName, category)

        fetch("http://localhost:3000/schedules", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: inputObj.name,
                location: inputObj.location
            })
        })
        .then(resp => resp.json())
        .then(schedule => {
            // this.setState({newSchedule: schedule})
            let updatedSchedulesArr = [...this.state.schedules, schedule] 
            this.setState({schedules: updatedSchedulesArr, newSchedule: schedule}, () => this.createUserSchedule(schedule.id))
        })
    }

    createUserSchedule = (id) => {
        fetch("http://localhost:3000/user_schedules", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.props.currentUser.id,
                    schedule_id: parseInt(id)
                })
            })
            .then(resp => resp.json())
            .then(userSchedule => {
                let updatedUserSchedulesArr = [...this.state.userSchedules, userSchedule]
                // let updatedSchedulesArr = [...this.state.schedules, schedule] 
                this.setState({userSchedules: updatedUserSchedulesArr})
            
            
                // this.setState({schedules: updatedSchedulesArr})
                // let updatedCurrentUserSchedulesArr = [...this.state.currentUserSchedules, schedule]
                // this.setState({currentUserSchedules: updatedCurrentUserSchedulesArr})
                
            })
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

    createDestination = (newDestObj) => {
        this.setState({startCreateDestination: true})
        fetch("http://localhost:3000/destinations", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newDestObj)
        })
        .then(resp => resp.json())
        .then(destination => {
            fetch("http://localhost:3000/destination_schedules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    destination_id: destination.id,
                    schedule_id: this.state.newSchedule.id
                })
            })
            .then(resp => resp.json())
            .then(console.log)
        })
    }

    deleteSchedule = (id) => {
        let shortenedSchedulesArr = [...this.state.schedules]
        shortenedSchedulesArr = shortenedSchedulesArr.filter(schedule => schedule.id !== parseInt(id))
        this.setState({schedules: shortenedSchedulesArr})

        let updatedUserSchedules = [...this.state.userSchedules]
        updatedUserSchedules = updatedUserSchedules.filter(us => us.id !== parseInt(id))
        this.setState({userSchedules: updatedUserSchedules, showSchedule: false})

        let userSchedulesToDelete = [...this.state.userSchedules]
        userSchedulesToDelete = userSchedulesToDelete.filter(us => us.schedule_id === parseInt(id))
        userSchedulesToDelete.map(us => {
            fetch(`http://localhost:3000/user_schedules/${us.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(console.log)
        })

        fetch(`http://localhost:3000/schedules/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(console.log)
    }

    deleteDestinationSchedule = (destinationId, scheduleId) => {
        // let updatedDestinations = [...this.state.selectedSchedule.destinations]
        // updatedDestinations = updatedDestinations.filter(d => d.id !== parseInt(destinationId))
        
        let selectedScheduleDestinationsCopy = [...this.state.selectedScheduleDestinations]
        selectedScheduleDestinationsCopy = selectedScheduleDestinationsCopy.filter(dest => dest.id !== parseInt(destinationId))
        let selectedDestinationSchedule = this.state.destinationSchedules.find(ds => ds.destination_id === parseInt(destinationId) && ds.schedule_id === parseInt(scheduleId))
        // this.setState({selectedDestinationSchedule})
        let updatedDestinationSchedules = [...this.state.destinationSchedules]
        updatedDestinationSchedules = updatedDestinationSchedules.filter(ds => ds.id !== selectedDestinationSchedule.id)
        this.setState({destinationSchedules: updatedDestinationSchedules, selectedScheduleDestinations: selectedScheduleDestinationsCopy})

        fetch(`http://localhost:3000/destination_schedules/${selectedDestinationSchedule.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(console.log)

        //delete is working on the backend but frontend does not update until you refresh
        
    }


    render() {
        return (
            <View>
                <Text style={{ fontSize: 25 }} >{this.props.currentUser.username}</Text>
                <Image style={{height: 100, width: 100 }} source={{uri: this.props.currentUser.image}}/>
                <Button title={this.state.addScheduleForm ? "Close Form" : "Add Schedule"} onPress={this.addScheduleForm} />
                {this.state.addScheduleForm && <CreateScheduleForm formInputHandler={this.formInputHandler} />}
                <SchedulesContainer userSchedules={this.state.userSchedules} schedules={this.state.schedules} currentUser={this.props.currentUser} viewSchedule={this.viewSchedule} />
                {this.state.showSchedule && <ScheduleShow schedule={this.state.selectedSchedule} deleteSchedule={this.deleteSchedule} deleteDestinationSchedule={this.deleteDestinationSchedule} />}
                {this.state.apiResults && <ScheduleResults createDestination={this.createDestination} newScheduleInput={this.state.newScheduleInput} results={this.state.apiResults} />}
            </View>
        )
    }
}

export default UserContainer
