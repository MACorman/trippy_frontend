import React from 'react'
import {
    View,
    Text,
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
                    <Text style={{fontSize: 18}}>{`${this.props.time.slice(11, 13) - 5}:${this.props.time.slice(14, 16)}  ${this.props.name}`}</Text>
                    <Text style={{marginLeft: 52}}>{this.props.address}</Text>
                    <Button title="Delete Destination" onPress={this.deleteHandler}/>
                </View>
                <View>
                    <Text>{"\n"}</Text>
                </View>
            </View>
        )
    }
}

export default DestinationCard