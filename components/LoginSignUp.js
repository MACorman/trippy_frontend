import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Image,
    TouchableHighlight,
    Alert
} from 'react-native';

const styles = StyleSheet.create({
    formFields: {
        paddingTop: 30,
        borderBottomColor: '#517CA4', 
        borderBottomWidth: 0.5,
        marginLeft: 60,
        marginRight: 60,
        paddingBottom: 10
    },
    form: {
        paddingTop: 240
    },
    button: {
        backgroundColor: '#517CA4',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        width: 200,
        alignSelf: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        marginTop: 20
    }
})

class LoginSignUp extends React.Component {

    state = {
        showSignUp: false,
        formInput: {
            username: "",
            password: "",
            passwordConfirmation: ""
        },
        passwordsDontMatch: false,
        notAUser: false
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

    passwordsDontMatch = () => {
        this.setState({passwordsDontMatch: true})
        this.setState({formInput:{...this.state.formInput, password: '', passwordConfirmation: ''}})
    }

    notAUser = () => {
        this.setState({notAUser: true})
        this.setState({formInput:{...this.state.formInput, username: '', password: ''}})
    }

    render() {
        return (
            <View style={styles.form}> 
                <Image style={{alignSelf: 'center'}} source={require('../img/BlueTrippinLogo.png')}/>
                {this.state.passwordsDontMatch && Alert.alert('Passwords do not match.', 'Please try again.', [{text: 'Ok', onPress: () => this.setState({passwordsDontMatch: false})}])} 
                {this.state.notAUser && Alert.alert('You do not appear to have an account.',  'Please create one.', [{text: 'Ok', onPress: () => this.setState({notAUser: false})}])}  
                <TextInput style={styles.formFields} placeholder="Username" onChangeText={(text) => this.setState({formInput:{...this.state.formInput, username: text.trim()}})}
                    value={this.state.formInput.username}/>
                <TextInput style={styles.formFields} placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.setState({formInput:{...this.state.formInput, password: text.trim()}})}
                    value={this.state.formInput.password}/>
                {this.state.showSignUp && <TextInput style={styles.formFields} placeholder="Password Confirmation" secureTextEntry={true} onChangeText={(text) => this.setState({formInput:{...this.state.formInput, passwordConfirmation: text.trim()}})}
                    value={this.state.formInput.passwordConfirmation}/>}
                {!this.state.showSignUp && <TouchableHighlight style={styles.button}><Button title="Login" color={'white'} onPress={this.props.users.map(u => u.username).includes(this.state.formInput.username) ? this.loginHandler : this.notAUser} /></TouchableHighlight>}
                {this.state.showSignUp ? <TouchableHighlight style={styles.button}><Button title="Create Account" color={'white'} onPress={this.state.formInput.password === this.state.formInput.passwordConfirmation ? this.createAccountHandler : this.passwordsDontMatch} /></TouchableHighlight> : <TouchableHighlight style={styles.button}><Button title="Signup" color={'white'} onPress={this.signupHandler} /></TouchableHighlight>}
            </View>
        )
    }
}

export default LoginSignUp