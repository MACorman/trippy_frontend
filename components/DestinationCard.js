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
                <Text>{this.props.dest.name}</Text>
            </View>
        )
    }
}

export default DestinationCard