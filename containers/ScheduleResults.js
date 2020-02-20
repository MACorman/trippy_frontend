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
                <Text>Schedule Results</Text>
                {this.props.results.map(result => <DestinationResultsCard key={result.id} {...result} />)}
            </View>
        )
    }
}

export default ScheduleResults