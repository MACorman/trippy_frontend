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
            <View style={styles.form}>
                <TextInput style={styles.formFields} placeholder={this.props.currentUser.username} onChangeText={(text) => this.setState({username: text})}
                    value={this.state.username}/>
                <TextInput style={styles.formFields} placeholder={this.props.currentUser.image} onChangeText={(text) => this.setState({image: text})}
                    value={this.state.image}/>
                <Button title="Save Changes" onPress={this.editHandler} />
            </View>

        )
    }
}

export default EditProfileForm