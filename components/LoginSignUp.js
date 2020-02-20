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
        formInput: {
            username: "",
            password: ""
        },
        loggedIn: false
    }

    loginHandler = () => {
        let userObj = this.state.formInput
        this.props.loginUser(userObj)
        this.setState({ loggedIn: !this.state.loggedIn})
    }

    render() {
        return (
            <View>
                <Text>Login/Sign-up</Text>
                {
                    this.state.loggedIn
                    ?
                    null
                    :
                    <View>
                        <TextInput placeholder="Username" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, username: text}})}
                            value={this.state.formInput.username}/>
                        <TextInput placeholder="Password" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, password: text}})}
                            value={this.state.formInput.password}/>
                        <Button title="login" onPress={this.loginHandler} />
                    </View>

                }
            </View>
        )
    }
}

export default LoginSignUp