import React from 'react'
import {
    View,
    Text,
    Button
  } from 'react-native';
import AddDestinationForm from '../components/AddDestinationForm'
import Agenda from '../components/Agenda'

class ScheduleShow extends React.Component {

    date=this.props.schedule.date.slice(0, 10)

    state = {
        showEditForm: false,
    }

    editHandler = () => {
        this.setState({showEditForm: true})
        this.props.showAddDestination
    }

    closeEditForm = () => {
        this.setState({showEditForm: false})
    }

    deleteHandler = () => {
        this.props.deleteSchedule()
        this.props.afterDelete()
    }


    render() {
        return (
            <View>
                {this.state.showEditForm
                ? 
                <AddDestinationForm schedule={this.props.schedule} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} showSchedule={this.props.showSchedule} results={this.props.results} closeEditForm={this.closeEditForm}/>
                :
                <View>
                    <Text>{this.props.schedule.name}</Text>
                    <Text>{`Location: ${this.props.schedule.location}`}</Text>
                    <Agenda destinations={this.props.destinations} date={this.props.schedule.date} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule}/>
                    <Button title="Edit Schedule" onPress={this.editHandler} />
                    <Button title="Delete Schedule" onPress={this.deleteHandler}/>
                </View>
                }
            </View>
        )
    }
}

export default ScheduleShow