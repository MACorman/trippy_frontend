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
// import SchedulesContainer from './SchedulesContainer'
// import ScheduleShow from './ScheduleShow'
import CreateScheduleForm from '../components/CreateScheduleForm'
// import ScheduleResults from './ScheduleResults'
import { API_KEY } from 'react-native-dotenv'
// import AddDestinationForm from '../components/AddDestinationForm';
import EditProfileForm from '../components/EditProfileForm';
import Profile from './Profile'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


class UserContainer extends React.Component {

    state = {
        // showSchedule: false,
        schedules: [],
        selectedSchedule: {},
        // addScheduleForm: false,
        lat: "",
        long: "", 
        apiResults: [],
        userSchedules: [],
        newScheduleInput: {},
        newSchedule: {},
        destinationSchedules: [],
        selectedScheduleDestinations: [],
        // showAddDestinationToSchedule: false,
        // showEditProfile: false
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
    }

    viewSchedule = (id) => {
        let selectedSchedule = this.state.schedules.find(schedule => schedule.id === parseInt(id))
        let selectedScheduleDestinations = selectedSchedule.destinations
        this.setState({ selectedSchedule, selectedScheduleDestinations })
        this.setState({showSchedule: !this.state.showSchedule})

    }

    // addScheduleForm = () => {
    //     this.setState({addScheduleForm: !this.state.addScheduleForm})
    // }

    formInputHandler = (inputObj) => {
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
                location: inputObj.location,
                date: inputObj.date.toISOString()
            })
        })
        .then(resp => resp.json())
        .then(schedule => {
            let updatedSchedulesArr = [...this.state.schedules, schedule] 
            this.setState({schedules: updatedSchedulesArr, selectedSchedule: schedule}, () => this.createUserSchedule(schedule.id))
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
                this.setState({userSchedules: updatedUserSchedulesArr})
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
                    schedule_id: this.state.selectedSchedule.id
                })
            })
            .then(resp => resp.json())
            .then(console.log)
        })
    }

    deleteSchedule = () => {
        let shortenedSchedulesArr = [...this.state.schedules]
        shortenedSchedulesArr = shortenedSchedulesArr.filter(schedule => schedule.id !== this.state.selectedSchedule.id)
        // this.setState({schedules: shortenedSchedulesArr})

        let updatedUserSchedules = [...this.state.userSchedules]
        updatedUserSchedules = updatedUserSchedules.filter(us => us.id !== this.state.selectedSchedule.id)
        this.setState({userSchedules: updatedUserSchedules, schedules: shortenedSchedulesArr})
        

        let userSchedulesToDelete = [...this.state.userSchedules]
        userSchedulesToDelete = userSchedulesToDelete.filter(us => us.schedule_id === this.state.selectedSchedule.id)
        userSchedulesToDelete.map(us => {
            fetch(`http://localhost:3000/user_schedules/${us.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(console.log)
        })

        fetch(`http://localhost:3000/schedules/${this.state.selectedSchedule.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(console.log)
    }

    deleteDestinationSchedule = (destinationId, scheduleId) => {
        let selectedScheduleDestinationsCopy = [...this.state.selectedScheduleDestinations]
        selectedScheduleDestinationsCopy = selectedScheduleDestinationsCopy.filter(dest => dest.id !== parseInt(destinationId))
        this.setState({selectedScheduleDestinations: selectedScheduleDestinationsCopy})

        let selectedDestinationSchedule = this.state.destinationSchedules.find(ds => ds.destination_id === parseInt(destinationId) && ds.schedule_id === parseInt(scheduleId))
        fetch(`http://localhost:3000/destination_schedules/${selectedDestinationSchedule.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(console.log)
        
    }

    // showAddDestination = () => {
    //     this.setState({showAddDestinationToSchedule: true})
    // }

    addDestinationInputHandler = (inputObj) => {
        this.setState({showAddDestinationToSchedule: false})
        this.setState({newScheduleInput: inputObj})
        let attractionName = inputObj.mustSee
        attractionName = attractionName.toLowerCase().split(' ').join('%20')
        let category = inputObj.category
        this.getDestinationCoords(attractionName, category)

    }

    // editProfileHandler = () => {
    //     this.setState({showEditProfile: true})
    // }

    editUser = (editedUserObj) => {
        // this.setState({showEditProfile: false})
        this.props.editCurrentUser(editedUserObj)
    }

    render() {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name="Profile" >
                    {props => <Profile {...props} currentUser={this.props.currentUser} viewSchedule={this.viewSchedule} schedules={this.state.schedules} userSchedules={this.state.userSchedules} schedule={this.state.selectedSchedule} destinations={this.state.selectedScheduleDestinations} deleteSchedule={this.deleteSchedule} deleteDestinationSchedule={this.deleteDestinationSchedule} showAddDestination={this.showAddDestination} addDestinationInputHandler={this.addDestinationInputHandler} createDestination={this.createDestination} newScheduleInput={this.state.newScheduleInput} results={this.state.apiResults} />}
                </Drawer.Screen>
                <Drawer.Screen name="Edit Profile">
                    {props => <EditProfileForm {...props} currentUser={this.props.currentUser} editUser={this.editUser}/>}
                </Drawer.Screen>
                <Drawer.Screen name="Add Schedule">
                    {props => <CreateScheduleForm {...props} formInputHandler={this.formInputHandler} createDestination={this.createDestination} newScheduleInput={this.state.newScheduleInput} results={this.state.apiResults}/>}
                </Drawer.Screen>

            </Drawer.Navigator>
        )
    }
}

export default UserContainer
