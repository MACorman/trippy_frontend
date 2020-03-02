import React from 'react'
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    TouchableHighlight
  } from 'react-native';

  const styles = StyleSheet.create({
    formFields: {
        paddingTop: 30,
        borderBottomColor: '#e32c52', 
        borderBottomWidth: 0.5,
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 5
    },
    form: {
        paddingTop: 300,
        paddingBottom: 20 
    },
    button: {
        backgroundColor: '#e23c52',
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
    }
  })

class EditProfileForm extends React.Component {

    state = {
        username: this.props.username,
        image: this.props.image,
        
    }

    editHandler = () => {
        let editedUserObj = this.state
        this.props.editUser(editedUserObj)
        this.props.navigation.navigate("Profile")
    }

    render() {
        return (
            <View>
                <View style={styles.form}>
                    <TextInput style={styles.formFields} placeholder={this.props.currentUser.username} onChangeText={(text) => this.setState({username: text})}
                        value={this.state.username}/>
                    <TextInput style={styles.formFields} placeholder="Your Profile Picture" onChangeText={(text) => this.setState({image: text})}
                        value={this.state.image}/>
                </View>
                <TouchableHighlight style={styles.button}>
                    <Button title="Save Changes" onPress={this.editHandler} color='white'/>
                </TouchableHighlight>
            </View>

        )
    }
}

export default EditProfileForm