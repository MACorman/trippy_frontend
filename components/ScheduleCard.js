import React from 'react'
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const styles = StyleSheet.create({
    ScheduleCard: {
        backgroundColor: '#b4c8da',
        borderRadius: 10,
        flex: 1, 
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'space-between',
        
    }
})

class ScheduleCard extends React.Component {

    buttonHandler = () => {
        this.props.viewSchedule(this.props.id)
        this.props.showSchedule()
    }

    render() {   
        return (
            <View style={{paddingBottom: 17, marginRight: 10, marginLeft: 10}}>
                <View style={styles.ScheduleCard}>
                    <View style={{marginLeft: 10, paddingTop: 5}}>
                        <Text style={{ fontSize: 18, fontFamily:'Damascus' }}>{this.props.name}</Text>
                        <Text style={{fontFamily:'DamascusLight'}}>{this.props.location}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontFamily:'DamascusLight'}}>{`${this.props.date.slice(5, 7)}/${this.props.date.slice(8, 10)}/${this.props.date.slice(0, 4)}`}</Text>
                            <FontAwesomeIcon icon={ faEye } onPress={this.buttonHandler} size={25} style={{paddingRight: 480, bottom: 6}} color={'#517CA4'}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ScheduleCard