import React from 'react'
import {
    View,
    Text,
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
                {this.props.newScheduleInput.category && <Text>{this.props.newScheduleInput.category.charAt(0).toUpperCase() + this.props.newScheduleInput.category.slice(1).split('_').join(' ')} results based on {this.props.newScheduleInput.mustSee}</Text>}
                <Button title="Done" onPress={this.props.showSchedule? this.props.showSearchResults : this.props.renderResults}/>
                {this.props.results[0] ? this.props.results.map(result => <DestinationResultsCard key={result.id} {...result} createDestination={this.props.createDestination} category={this.props.newScheduleInput.category} selectedSchedule={this.props.selectedSchedule}/>) : <Text>Please wait while results load...</Text>}
            </View>
        )
    }
}

export default ScheduleResults