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
    Picker, 
    TouchableHighlight
  } from 'react-native';
  import ScheduleResults from '../containers/ScheduleResults'
  import DateTimePickerModal from "react-native-modal-datetime-picker"

  const styles = StyleSheet.create({
    formFields: {
        paddingTop: 30,
        borderBottomColor: '#517CA4', 
        borderBottomWidth: 0.5,
        marginLeft: 40,
        marginRight: 40,
        paddingBottom: 5
    },
    form: {
        padding: 15
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
    }
  })

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
    }

    showDatePicker = () => {
       this.setState({isDatePickerVisible: true}) 
    }

    hideDatePicker = () => {
        this.setState({isDatePickerVisible: false}) 
    }

    handleConfirm = (date) => {
        this.setState({formInput: {...this.state.formInput, date: date}})
        this.setState({isDatePickerVisible: false})
    }

    renderResults = () => {
        this.setState({showResults: false}, () => this.props.navigation.navigate("Profile"))
    }

    render() {
        return(
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.form}>
                        {
                        this.state.showResults 
                        ?
                        <ScheduleResults createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} renderResults={this.renderResults} results={this.props.results} selectedSchedule={this.props.selectedSchedule} />
                        :
                        <View>
                            <TextInput style={styles.formFields} placeholder="Trip Name" onChangeText={(text) => this.setState({formInput: {...this.state.formInput, name: text}})}
                            value={this.state.formInput.name}/>
                            <TextInput style={styles.formFields} placeholder="Vaction City" onChangeText={(text) => this.setState({formInput: {...this.state.formInput, location: text}})}
                            value={this.state.formInput.location}/>
                            <TextInput style={styles.formFields} placeholder="Must See Destination" onChangeText={(text) => this.setState({formInput: {...this.state.formInput, mustSee: text}})}
                            value={this.state.formInput.mustSee}/>
                            <Picker itemStyle={{ color: "#517CA4", fontSize: 18}} selectedValue={this.state.formInput.category} onValueChange={(itemValue) =>
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
                            <TouchableHighlight style={styles.button}>
                                <Button title="Select a Date" onPress={this.showDatePicker} color='white'/>
                            </TouchableHighlight>
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirm}
                                onCancel={this.hideDatePicker}
                            />
                            <TouchableHighlight style={styles.button}>
                                <Button title="Create Schedule" onPress={this.formHandler} color='white'/>
                            </TouchableHighlight>
                        </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default CreateScheduleForm