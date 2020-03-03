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

  const styles = StyleSheet.create({
    formFields: {
        paddingTop: 30,
        borderBottomColor: '#517CA4', 
        borderBottomWidth: 0.5,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 5
    },
    form: {
        paddingTop: 10, 
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
        alignSelf: 'center'
    }
  })

class AddDestinationForm extends React.Component {

    state = {
        showResults: false, 
        formInput: {
            name: this.props.schedule.name,
            location: this.props.schedule.location, 
            category: "",
            mustSee: "", 
            date: this.props.schedule.date
        }
    }

    formHandler = () => {
        let inputObj = this.state.formInput
        this.props.addDestinationInputHandler(inputObj)
        this.setState({showResults: true})
        
    }

    showSearchResults = () => {
        this.setState({showResults: false}, this.props.closeEditForm)
    }

    render() {
        return (
            <View>
                {
                this.state.showResults 
                ?
                <ScheduleResults createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} showSchedule={this.props.showSchedule} showSearchResults={this.showSearchResults} results={this.props.results} />
                :
                <View style={styles.form}>
                    <Text style={{fontSize: 25, fontFamily: 'Damascus'}}>
                        {this.state.formInput.name}
                    </Text>
                    <Text style={{fontSize: 18, fontFamily: 'DamascusLight'}}>
                        {this.state.formInput.location}
                    </Text>
                    <Text style={{fontSize: 18, fontFamily: 'DamascusLight'}}>
                        {`${this.state.formInput.date.slice(5, 7)}/${this.state.formInput.date.slice(8, 10)}/${this.state.formInput.date.slice(0, 4)}`}
                    </Text> 
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
                        <Button title="Create New Search" onPress={this.formHandler} color='white'/>
                    </TouchableHighlight>
                </View>
                }
            </View>
        )
    }
}

export default AddDestinationForm