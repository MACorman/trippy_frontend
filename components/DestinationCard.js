import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const styles = StyleSheet.create({
    destination: {
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#b4c8da'
    }
})

class DestinationCard extends React.Component {

    deleteHandler = () => {
        let scheduleId = this.props.scheduleId
        let destinationId = this.props.id
        this.props.deleteDestinationSchedule(destinationId, scheduleId)
        this.props.deleteMarkerHandler(this.props.name)
    }

    render() {
        return (
            <View>
                <View style={styles.destination}>
                    <Text style={{fontSize: 18, fontFamily: 'Damascus'}}>{`${this.props.time.slice(11, 13) - 5}:${this.props.time.slice(14, 16)}  ${this.props.name}`}</Text>
                    <Text style={{marginLeft: 52, fontFamily: 'DamascusLight', paddingBottom: 10}}>{this.props.address}</Text>
                    <FontAwesomeIcon icon={ faTrashAlt } onPress={this.deleteHandler} size={20} style={{left: 290, bottom: 6}} color={'#517CA4'}/>
                </View>
                <View>
                    <Text>{"\n"}</Text>
                </View>
            </View>
        )
    }
}

export default DestinationCard