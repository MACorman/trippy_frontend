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
    }

    signupHandler = () => {
        this.setState({showSignUp: true})
    }

    createAccountHandler = () => {
        let userObj = this.state.formInput
        this.props.createUser(userObj)
    }

    render() {
        return (
            <View>
                <Text>Login/Sign-up</Text>
                {
                    this.props.loggedIn
                    ?
                    null
                    :
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

                }
            </View>
        )
    }
}

export default LoginSignUp