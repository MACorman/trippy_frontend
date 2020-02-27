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
  import ScheduleResults from '../containers/ScheduleResults'
  import DateTimePicker from '@react-native-community/datetimepicker'
  import DateTimePickerModal from "react-native-modal-datetime-picker"

class CreateScheduleForm extends React.Component {

    state = {
        showResults: false,
        formInput: {
            name: "",
            location: "", 
            category: "",
            mustSee: "",
            date: ""
        },
        isDatePickerVisible: false
    }

    formHandler = () => {
        let inputObj = this.state.formInput
        this.props.formInputHandler(inputObj)
        this.setState({showResults: true})
        // this.props.navigation.navigate("Profile")
    }

    showDatePicker = () => {
       this.setState({isDatePickerVisible: true}) 
    }

    hideDatePicker = () => {
        this.setState({isDatePickerVisible: false}) 
    }

    handleConfirm = (date) => {
        // debugger
        this.setState({formInput: {...this.state.formInput, date: date}})
        this.setState({isDatePickerVisible: false})
    }

    render() {
        return(
            <SafeAreaView>
                <ScrollView>
                    <View>
                        {
                        this.state.showResults 
                        ?
                        <ScheduleResults createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} results={this.props.results} />
                        :
                        <View>
                            <TextInput placeholder="Schedule Name" onChangeText={(text) => this.setState({formInput: {...this.state.formInput, name: text}})}
                            value={this.state.formInput.name}/>
                            <TextInput placeholder="Vaction Location" onChangeText={(text) => this.setState({formInput: {...this.state.formInput, location: text}})}
                            value={this.state.formInput.location}/>
                            <TextInput placeholder="Must See Destination" onChangeText={(text) => this.setState({formInput: {...this.state.formInput, mustSee: text}})}
                            value={this.state.formInput.mustSee}/>
                            <Picker selectedValue={this.state.formInput.category} onValueChange={(itemValue) =>
                                this.setState({formInput: {...this.state.formInput, category: itemValue}})}>
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
                            <Button title="Show Date Picker" onPress={this.showDatePicker} />
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                            />
                            <Button title="Create Schedule" onPress={this.formHandler} />
                    
    
                        </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default CreateScheduleForm