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
    currentUser: {}
  }

  componentDidMount() {
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(users => this.setState({ users }))

    AsyncStorage.getItem('currentUser')
    .then((currentUser) => this.setState({currentUser}))
    // this.getCurrentUser()
  }

  // async getCurrentUser() {
  //   try {
  //     const currentUser = await AsyncStorage.getItem('currentUser');
  //     this.setState({currentUser});
  //   } catch (error) {
  //     console.log("Error retrieving data" + error);
  //   }
  // }

  loginUser = (userObj) => {
    let currentUser = this.state.users.find(user => user.username === userObj.username)
    this.setCurrentUser(currentUser)
  }

  setCurrentUser = (currentUser) => {
    // try {
    //   await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
    // } catch (error) {
    //   console.log("Error saving data" + error);
    // }
    AsyncStorage.setItem('currentUser', JSON.stringify(currentUser))
    this.setState({currentUser})
    // this.setState({currentUser})
  }


  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView>
            <View>
              <LoginSignUp loginUser={this.loginUser} />
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
