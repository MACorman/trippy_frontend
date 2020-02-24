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

    addDestinationHandler = () => {
        let name = this.props.name
        let address = this.props.vicinity
        let category = this.props.category.split('_').join(' ')
        let newDestObj = {name, address, category}
        this.props.createDestination(newDestObj)
    }
    
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{this.props.opening_hours && this.props.opening_hours.open_now ? "Open" : "Closed" }</Text>
                <Text>{this.props.vicinity}</Text>
                <Text>Rating: {this.props.rating} based on {this.props.user_ratings_total} user ratings</Text>
                <Button title="Add To Schedule" onPress={this.addDestinationHandler}/>
            </View>
        )
    }
}

export default DestinationResultsCard