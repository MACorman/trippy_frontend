<script src="http://localhost:8097"></script>
import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native'
import UserContainer from './containers/UserContainer'
import NavBar from './containers/NavBar'
import LoginSignUp from './components/LoginSignUp'
import AsyncStorage from '@react-native-community/async-storage'

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


  render() {
    console.log("test")
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView>
            <View>
              {!this.state.loggedIn && <LoginSignUp loginUser={this.loginUser} loggedIn={this.state.loggedIn} />}
              <NavBar />
              {this.state.currentUser ? <UserContainer currentUser={this.state.currentUser} /> : <Text>No user logged in</Text>}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );

  }
  
}

export default App;
