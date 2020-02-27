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

    deleteHandler = () => {
        let scheduleId = this.props.scheduleId
        let destinationId = this.props.id
        this.props.deleteDestinationSchedule(destinationId, scheduleId)
    }

    render() {
        return (
            <View>
                <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5, paddingBottom: 5}}>
                    <Text style={{fontSize: 18}}>{`${this.props.time.slice(11, 13) - 5}:${this.props.time.slice(14, 16)} ${this.props.name}`}</Text>
                    <Text >{this.props.address}</Text>
                    <Button title="Delete Destination" onPress={this.deleteHandler}/>
                </View>
                <View>
                    <Text>{"\n"}</Text>
                </View>
            </View>
            // <View>
            //     <Text>{this.props.name}</Text>
            //     <Text>{this.props.address}</Text>
            //     <Text>Category: {this.props.category}</Text>
            //     <Text>{`Time: ${this.props.time.slice(11, 13) - 5}:${this.props.time.slice(14, 16)}`}</Text>
            //     <Button title="Delete Destination" onPress={this.deleteHandler}/>
            // </View>
        )
    }
}

export default DestinationCard