import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker"

const styles=StyleSheet.create({
    button: {
        backgroundColor: '#517CA4',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        width: 180,
        alignSelf: 'center',
        paddingBottom: 8, 
        paddingTop: 8
        
    },
    resultCard: {
        backgroundColor: '#b4c8da',
        borderRadius: 10,
        flex: 1, 
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'space-between',
        width: 380,
        // height: 165, 
        alignSelf: 'center'
           
    },
    text: {
        padding: 10,

    }
})


class DestinationResultsCard extends React.Component {

    state = {
        isTimePickerVisible: false,
        time: "",
        timePicked: false,
        added: false
    }

    addDestinationHandler = () => {
        let name = this.props.name
        let address = this.props.vicinity
        let category = this.props.category.split('_').join(' ')
        let time = this.state.time.toISOString()
        let newDestObj = {name, address, category, time}
        let scheduleName = this.props.scheduleName
        this.props.createDestination(newDestObj, scheduleName)
        this.props.createMarker && this.props.createMarker(newDestObj)
        this.setState({added: true})
    }

    showTimePicker = () => {
        this.setState({isTimePickerVisible: true}) 
    }
 
    hideTimePicker = () => {
         this.setState({isTimePickerVisible: false}) 
        }
        
        handleConfirm = (time) => {
            this.setState({time})
            this.setState({isTimePickerVisible: false})
            this.setState({timePicked: true})
        }
    
    render() {
        return (
            <View style={{paddingBottom: 17 }}>
                <View style={styles.resultCard}>
                    <View style={styles.text}>
                        <Text style={{fontSize: 18, fontFamily: 'Damascus'}}>{this.props.name}</Text>
                        <Text style={{fontSize: 15, fontFamily: 'DamascusLight'}}>{this.props.opening_hours && this.props.opening_hours.open_now ? "Open" : "Closed" }</Text>
                        <Text style={{fontSize: 15, fontFamily: 'DamascusLight'}}>{this.props.vicinity}</Text>
        <Text style={{fontSize: 15, fontFamily: 'DamascusLight'}}>{this.props.rating >= 1 ?`${this.props.rating} stars based on ${this.props.user_ratings_total} user ${this.props.user_ratings_total == 1 ? 'rating' : 'ratings'}` : 'No ratings yet'}</Text>
                    </View>
                    <DateTimePickerModal
                        isVisible={this.state.isTimePickerVisible}
                        mode="time"
                        locale="en_GB"
                        onConfirm={this.handleConfirm}
                        onCancel={this.hideTimePicker}
                        minuteInterval={15}
                    />
                    <View style={{flexDirection: 'row', alignSelf: 'center', paddingBottom: 15}}>
                        <TouchableHighlight style={styles.button}>
                            <Button title={this.state.timePicked ? `${this.state.time.toISOString().slice(11, 13) - 5}:${this.state.time.toISOString().slice(14, 16)}` : "Select A Time"} onPress={this.showTimePicker} color={'white'}/>
                        </TouchableHighlight>
                        {this.state.timePicked && <TouchableHighlight disabled={true} style={styles.button}>
                            <Button title={this.state.added ? "Added" : "Add To Schedule"} onPress={this.addDestinationHandler} color={'white'}/>
                        </TouchableHighlight>}
                    </View>
                </View>
            </View>
        )
    }
}

export default DestinationResultsCard