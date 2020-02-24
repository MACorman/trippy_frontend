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
        mustSee: ""

    }

    formHandler = () => {
        let inputObj = this.state
        this.props.formInputHandler(inputObj)
    }

    render() {
        return(
            <View>
                <TextInput placeholder="Schedule Name" onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}/>
                <TextInput placeholder="Vaction Location" onChangeText={(text) => this.setState({location: text})}
                value={this.state.location}/>
                <TextInput placeholder="Must See Destination" onChangeText={(text) => this.setState({mustSee: text})}
                value={this.state.mustSee}/>
                <Picker selectedValue={this.state.category} onValueChange={(itemValue) =>
                    this.setState({category: itemValue})}>
                    <Picker.Item label="Aquarium" value="aquarium" />
                    <Picker.Item label="Art Gallery" value="art_gallery" />
                    <Picker.Item label="Bakery" value="bakery" />
                    <Picker.Item label="Book Store" value="book_store" />
                    <Picker.Item label="Cafe" value="cafe" />
                    <Picker.Item label="Church" value="church" />
                    <Picker.Item label="Clothing Store" value="clothing_store" />
                    <Picker.Item label="Library" value="library" />
                    <Picker.Item label="Movie Theater" value="movie_theater" />
                    <Picker.Item label="Museum" value="museum" />
                    <Picker.Item label="Night Club" value="night_club" />
                    <Picker.Item label="Park" value="park" />
                    <Picker.Item label="Restaurant" value="restaurant" />
                    <Picker.Item label="Shoe Store" value="shoe_store" />
                    <Picker.Item label="Shopping Mall" value="shopping_mall" />
                    <Picker.Item label="Stadium" value="stadium" />
                    <Picker.Item label="Supermarket" value="supermarket" />
                    <Picker.Item label="Tourist Attraction" value="tourist_attraction" />
                    <Picker.Item label="University" value="university" />
                    <Picker.Item label="Zoo" value="zoo" /> 
                </Picker>
                <Button title="Create Schedule" onPress={this.formHandler} />
            </View>
        )
    }
}

export default CreateScheduleForm



//on button press navigate to schedule results
