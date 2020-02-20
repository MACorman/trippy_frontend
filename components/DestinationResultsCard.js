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

class DestinationResultsCard extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{this.props.opening_hours && this.props.opening_hours.open_now ? "Open" : "Closed" }</Text>
                <Text>{this.props.vicinity}</Text>
                <Text>Rating: {this.props.rating} based on {this.props.user_ratings_total} ratings</Text>
                <Button title="Add To Schedule" />
            </View>
        )
    }
}

export default DestinationResultsCard