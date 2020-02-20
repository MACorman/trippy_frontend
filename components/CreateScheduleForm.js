import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Button, 
    TextInput,
    Picker
  } from 'react-native';

class CreateScheduleForm extends React.Component {

    state = {
        name: "",
        location: "", 
        category: "",
        mustSeeAddress: ""

    }
    render() {
        return(
            <View>
                <Text>Create Schedule Form</Text>
                <TextInput placeholder="Name" onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}/>
                <TextInput placeholder="Location" onChangeText={(text) => this.setState({location: text})}
                value={this.state.location}/>
                <TextInput placeholder="Must See Destination Address" onChangeText={(text) => this.setState({mustSeeAddress: text})}
                value={this.state.mustSeeAddress}/>
                <Picker selectedValue={this.state.category} onValueChange={(itemValue) =>
                    this.setState({category: itemValue})}>
                    <Picker.Item label="restaurant" value="restaurant" />
                    <Picker.Item label="shopping" value="shopping" />
                    <Picker.Item label="museum" value="museum" />
                    <Picker.Item label="attraction" value="attraction" />
                </Picker>
                <Button title="Create Schedule" onPress={this.props.getDestinationCoords} />
            </View>
        )
    }
}

export default CreateScheduleForm