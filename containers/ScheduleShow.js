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
import DestinationCard from '../components/DestinationCard'
import AddDestinationForm from '../components/AddDestinationForm'
import EditProfileForm from '../components/EditProfileForm';
import Agenda from '../components/Agenda'
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

// import EventCalendar from 'react-native-events-calendar'




class ScheduleShow extends React.Component {

    date=this.props.schedule.date.slice(0, 10)

    state = {
        showEditForm: false,
        // items: this.props.schedule.destinations
        // items: `${this.props.schedule.date.slice(0, 10)}: ${[{name: 'item 1'}]}`
        
    }



    editHandler = () => {
        this.setState({showEditForm: true})
        this.props.showAddDestination
    }


    render() {
        return (
            <View>
                {this.state.showEditForm
                ? 
                <AddDestinationForm schedule={this.props.schedule} addDestinationInputHandler={this.props.addDestinationInputHandler} createDestination={this.props.createDestination} newScheduleInput={this.props.newScheduleInput} results={this.props.results} />
                :
                <View>
                    <Text>{this.props.schedule.name}</Text>
                    <Text>{`Location: ${this.props.schedule.location}`}</Text>
                    {/* <Text>{`Date: ${this.props.schedule.date.slice(5, 7)}/${this.props.schedule.date.slice(8, 10)}/${this.props.schedule.date.slice(0, 4)}`}</Text> */}
                    {/* <Text>Agenda:</Text> */}
                    <Agenda destinations={this.props.schedule.destinations} date={this.props.schedule.date} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule}/>
                    {/* <Calendar
                        current={`${this.date}`}
                        minDate={'2000-02-01'}
                        maxDate={'2050-12-31'}
                        monthFormat={'MMMM yyyy'}
                        firstDay={1}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        markedDates={{
                            '2001-03-02': {selected: true, marked: true, selectedColor: 'blue'}
                        }}

                    /> */}
                    {/* <Agenda 
                        items={{date: [{name: 'item 1'}]}}
                        selected={`${this.props.schedule.date.slice(0, 10)}`}
                        renderItem={() => {return (<View>{this.state.items.map(item => <Text>{item.time}: {item.name}</Text>)}</View>);}}
                    /> */}
                    {/* <EventCalendar
                        events={this.state.events}
                        width={{ width: 100 }}
                        initDate={`${this.props.schedule.date.slice(0, 10)}`}
                    /> */}
                    {/* {this.props.destinations.map(destination => <DestinationCard key={destination.id} {...destination} scheduleId={this.props.schedule.id} deleteDestinationSchedule={this.props.deleteDestinationSchedule} />)} */}
                    <Button title="Edit Schedule" onPress={this.editHandler} />
                    <Button title="Delete Schedule" onPress={this.props.deleteSchedule}/>
                </View>
                }
            </View>
        )
    }
}

export default ScheduleShow