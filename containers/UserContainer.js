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
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileHeader from '../components/ProfileHeader';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()


class UserContainer extends React.Component {

    state = {
        schedules: [],
        addScheduleForm: false,
        lat: "",
        long: "", 
        apiResults: [],
        userSchedules: [],
        newScheduleInput: {},
        showResults: false
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

        // this.setState({currentUserSchedules: this.props.cuschedules})
    }

    // viewSchedule = (id) => {
    //     let selectedSchedule = this.state.schedules.find(schedule => schedule.id === parseInt(id))
    //     this.setState({ selectedSchedule })
    //     this.setState({showSchedule: !this.state.showSchedule})

    // }

    addScheduleForm = () => {
        this.setState({addScheduleForm: !this.state.addScheduleForm})
    }

    formInputHandler = (inputObj) => {
        // this.setState({newUserScheduleLoaded: false})
        this.setState({addScheduleForm: false})
        this.setState({newScheduleInput: inputObj})
        this.setState({showResults: true})
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
            this.setState({schedules: updatedSchedulesArr}, () => this.createUserSchedule(schedule.id))
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

    

    render() {
        return (
            // <View>
            //     <Text style={{ fontSize: 25 }} >{this.props.currentUser.username}</Text>

            //     <Image style={{height: 100, width: 100 }} source={{uri: this.props.currentUser.image}}/>

            //     <Button title={this.state.addScheduleForm ? "Close Form" : "Add Schedule"} onPress={this.addScheduleForm} />
            //     {this.state.addScheduleForm && <CreateScheduleForm formInputHandler={this.formInputHandler} />}
            //     <SchedulesContainer userSchedules={this.state.userSchedules} schedules={this.state.schedules} currentUser={this.props.currentUser} viewSchedule={this.viewSchedule} />
            //     {this.state.showSchedule && <ScheduleShow schedule={this.state.selectedSchedule} />}
            //     {/* {this.state.newScheduleInput && <ScheduleResults newScheduleInput={this.state.newScheduleInput} results={this.state.apiResults} />} */}
            // </View>
            
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={props => <ProfileHeader {...props} showResults={this.state.showResults} currentUser={this.props.currentUser} schedules={this.state.schedules} userSchedules={this.state.userSchedules} viewSchedule={this.viewSchedule} newScheduleInput={this.state.newScheduleInput} results={this.state.apiResults}/>}/>
                <Drawer.Screen name="Create Schedule" component={props => <CreateScheduleForm {...props} formInputHandler={this.formInputHandler}/>}/>
            
                

            </Drawer.Navigator>
            
        )
    }
}

export default UserContainer
