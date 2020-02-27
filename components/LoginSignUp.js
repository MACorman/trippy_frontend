import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Button
  } from 'react-native';

  const styles = StyleSheet.create({
    formFields: {
        paddingTop: 30,
        borderBottomColor: 'black', 
        borderBottomWidth: 0.5,
        marginLeft: 30,
        marginRight: 30,
        paddingBottom: 10
    },
    form: {
        paddingTop: 30
    }
  })

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
            <View style={styles.form}>
                <TextInput style={styles.formFields} placeholder="Username" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, username: text}})}
                    value={this.state.formInput.username}/>
                <TextInput style={styles.formFields} placeholder="Password" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, password: text}})}
                    value={this.state.formInput.password}/>
                {this.state.showSignUp && <TextInput style={styles.formFields} placeholder="Password Confirmation" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, passwordConfirmation: text}})}
                    value={this.state.formInput.passwordConfirmation}/>}
                {!this.state.showSignUp && <Button title="Login" onPress={this.loginHandler} />}
                {this.state.showSignUp ? <Button title="Create Account" onPress={this.createAccountHandler} /> : <Button title="Signup" onPress={this.signupHandler} />}
            </View>
        )
    }
}

export default LoginSignUp