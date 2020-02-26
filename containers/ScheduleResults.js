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
import DestinationResultsCard from '../components/DestinationResultsCard';

class ScheduleResults extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.newScheduleInput.name}</Text>
                <Text>Location: {this.props.newScheduleInput.location}</Text>
                <Text>Must See Attraction: {this.props.newScheduleInput.mustSee}</Text>
                {/* {this.props.newScheduleInput && <Text>{this.props.newScheduleInput.category.charAt(0).toUpperCase() + this.props.newScheduleInput.category.slice(1)} results based on {this.props.newScheduleInput.mustSee}</Text>} */}
                {this.props.results.map(result => <DestinationResultsCard key={result.id} {...result} createDestination={this.props.createDestination} category={this.props.newScheduleInput.category} />)}
            </View>
        )
    }
}

export default ScheduleResults