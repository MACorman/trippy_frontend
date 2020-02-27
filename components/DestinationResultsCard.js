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
import DateTimePickerModal from "react-native-modal-datetime-picker"


class DestinationResultsCard extends React.Component {

    state = {
        isTimePickerVisible: false,
        time: ""
    }

    addDestinationHandler = () => {
        let name = this.props.name
        let address = this.props.vicinity
        let category = this.props.category.split('_').join(' ')
        let time = this.state.time.toISOString()
        let newDestObj = {name, address, category, time}
        this.props.createDestination(newDestObj)
    }

    showTimePicker = () => {
        this.setState({isTimePickerVisible: true}) 
    }
 
    hideTimePicker = () => {
         this.setState({isTimePickerVisible: false}) 
    }
 
    handleConfirm = (time) => {
         // debugger
         this.setState({time})
         this.setState({isTimePickerVisible: false})
    }
    
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{this.props.opening_hours && this.props.opening_hours.open_now ? "Open" : "Closed" }</Text>
                <Text>{this.props.vicinity}</Text>
                <Text>Rating: {this.props.rating} based on {this.props.user_ratings_total} user ratings</Text>
                <Button title="Show Time Picker" onPress={this.showTimePicker} />
                <DateTimePickerModal
                    isVisible={this.state.isTimePickerVisible}
                    mode="time"
                    locale="en_GB"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideTimePicker}
                />
                <Button title="Add To Schedule" onPress={this.addDestinationHandler}/>
            </View>
        )
    }
}

export default DestinationResultsCard