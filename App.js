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
    this.getCurrentUser()
  }

  async getCurrentUser() {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      this.setState({currentUser: JSON.parse(currentUser), loggedIn: true});
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
    this.setState({currentUser})
  }

  logout = () => {
    this.setState({currentUser: {}, loggedIn: false})
  }

  createUser = (userObj) => {
    let username = userObj.username
    let password = userObj.password
    let image = "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
    let newUser = {username, password, image}

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(resp => resp.json())
    .then(user => {
      let currentUser = user
      let updatedUsersArr = [...this.state.users, user]
      this.setState({users: updatedUsersArr})
      this.setState({loggedIn: !this.state.loggedIn})
      this.setCurrentUser(currentUser)
    })
  }

  editCurrentUser = (editedUserObj) => {
    fetch(`http://localhost:3000/users/${this.state.currentUser.id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username: editedUserObj.username, image: editedUserObj.image})
    })
    .then(resp => resp.json())
    .then(user => {
      let updatedUsers = this.state.users.map(u => {
        if(u.id === user.id) {
          return user
        }
        return u
      })
      this.setState({users: updatedUsers, currentUser: user})
    })
  }


  render() {
    console.log("test")
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView>
            <View>
              {!this.state.loggedIn && <LoginSignUp loginUser={this.loginUser} loggedIn={this.state.loggedIn} createUser={this.createUser} />}
              {this.state.loggedIn && <NavBar logout={this.logout} />}
              {this.state.currentUser ? <UserContainer currentUser={this.state.currentUser} cuschedules={this.state.currentUser.schedules} editCurrentUser={this.editCurrentUser} /> : <Text>No user logged in</Text>}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );

  }
  
}

export default App;
