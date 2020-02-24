<script src="http://localhost:8097"></script>
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native'
import UserContainer from './containers/UserContainer'
import NavBar from './containers/NavBar'
import LoginSignUp from './components/LoginSignUp'
import AsyncStorage from '@react-native-community/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Logout from './components/Logout'

const Stack = createStackNavigator()

class App extends React.Component {

  state = {
    users: [],
    currentUser: {},
    loggedIn: false
  }

  componentDidMount() {
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(users => this.setState({ users }))

    // AsyncStorage.getItem('currentUser')
    // .then((currentUser) => this.setState({currentUser: JSON.parse(currentUser)}))
    this.getCurrentUser()
  }

  async getCurrentUser() {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      this.setState({currentUser: JSON.parse(currentUser), loggedIn: true});
      // if asyncstorage can be null, can't hardcode true
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  loginUser = (userObj) => {
    let currentUser = this.state.users.find(user => user.username === userObj.username)
    this.setState({loggedIn: !this.state.loggedIn})
    this.setCurrentUser(currentUser)
  }

  async setCurrentUser(currentUser) {
    try {
      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
    } catch (error) {
      console.log("Error saving data" + error);
    }
    // AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
    // this.setState({currentUser})
    this.setState({currentUser})
  }

  logout = () => {
    this.setState({currentUser: {}, loggedIn: false})
  }

  // might just do away with nav bar and put the logout as a button in the profile header

  render() {
    console.log("test")
    return (
      <NavigationContainer>
        <Stack.Navigator>  
                {!this.state.loggedIn && 
                <Stack.Screen name="Login or Signup"
                  component={props => <LoginSignUp {...props} loginUser={this.loginUser} loggedIn={this.state.loggedIn}/>}
                />}
                {this.state.loggedIn && 
                <Stack.Screen name="User Profile"
                  component={props => <UserContainer {...props} currentUser={this.state.currentUser} cuschedules={this.state.currentUser.schedules} />}
                  options={{headerRight:
                      () => (
                        <Button title="logout" onPress={() => this.logout()}/> 
                      )
                    }}
                />}    
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
  
}

export default App;

{/* {!this.state.loggedIn && 
                <Stack.Screen name="Login or Signup">
                  {props => <LoginSignUp {...props} loginUser={this.loginUser} loggedIn={this.state.loggedIn} />}
                </Stack.Screen>} */}


{/* {this.state.currentUser ? 
  <Stack.Screen name="User Container">
    {props => <UserContainer {...props} currentUser={this.state.currentUser} cuschedules={this.state.currentUser.schedules} />}
  </Stack.Screen>
  :
  <Stack.Screen name="No user logged in">
    <Text>No user logged in</Text>
  </Stack.Screen>} */}

