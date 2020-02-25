import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button
  } from 'react-native';

class LoginSignUp extends React.Component {

    state = {
        showSignUp: false,
        formInput: {
            username: "",
            password: "",
            passwordConfirmation: ""
        }
    }

    loginHandler = () => {
        let userObj = this.state.formInput
        this.props.loginUser(userObj)
        // this.props.navigation.navigate("User Container")
    }

    signupHandler = () => {
        this.setState({showSignUp: true})
    }

    createAccountHandler = () => {
        let userObj = this.state.formInput
        this.props.createUser(userObj)
        // this.props.navigation.navigate("User Container")
    }

    render() {
        return (
            <View>
                <TextInput placeholder="Username" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, username: text}})}
                    value={this.state.formInput.username}/>
                <TextInput placeholder="Password" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, password: text}})}
                    value={this.state.formInput.password}/>
                {this.state.showSignUp && <TextInput placeholder="Password Confirmation" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, passwordConfirmation: text}})}
                    value={this.state.formInput.passwordConfirmation}/>}
                {!this.state.showSignUp && <Button title="Login" onPress={this.loginHandler} />}
                {this.state.showSignUp ? <Button title="Create Account" onPress={this.createAccountHandler} /> : <Button title="Signup" onPress={this.signupHandler} />}
            </View>
        )
    }
}

export default LoginSignUp