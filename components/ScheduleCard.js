import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
  } from 'react-native';

class ScheduleCard extends React.Component {
    state = {
        viewScheduleButton: true
    }

    buttonHandler = () => {
        this.setState({viewScheduleButton: !this.state.viewScheduleButton})
        this.props.viewSchedule(this.props.id)
        this.props.showSchedule()

    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 15 }}>{this.props.name}</Text>
                <Text>{`Location: ${this.props.location}`}</Text>
                <Button title={this.state.viewScheduleButton ? "View Schedule" : "Hide Schedule" } onPress={this.buttonHandler}/>

            </View>
        )
    }
}

export default ScheduleCard