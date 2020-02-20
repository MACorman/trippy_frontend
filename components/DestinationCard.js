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

class DestinationCard extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.name}</Text>
                <Text>{this.props.address}</Text>
                <Text>Category: {this.props.category}</Text>
            </View>
        )
    }
}

export default DestinationCard