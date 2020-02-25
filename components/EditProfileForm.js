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

class EditProfileForm extends React.Component {

    state = {
        username: this.props.username,
        image: this.props.image,
        
    }

    editHandler = () => {
        let editedUserObj = this.state
        this.props.editUser(editedUserObj)
    }

    render() {
        return (
            <View>
                <TextInput placeholder={this.props.currentUser.username} onChangeText={(text) => this.setState({username: text})}
                    value={this.state.username}/>
                <TextInput placeholder={this.props.currentUser.image} onChangeText={(text) => this.setState({image: text})}
                    value={this.state.image}/>
                <Button title="Save Changes" onPress={this.editHandler} />
            </View>

        )
    }
}

export default EditProfileForm