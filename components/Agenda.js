import React from 'react'
import {
    StyleSheet,
    View,
    Text
  } from 'react-native';
import DestinationCard from './DestinationCard';

  const styles = StyleSheet.create({
        agendaContainer: {
            flex: 1,
            backgroundColor: '#e0e0e0',
            width: 350,
            alignSelf: 'center', 
            borderRadius: 10,
        
        }, 
        agendaText: {
            flex: 1,
            width: 300,
            alignSelf: 'center',
            paddingTop: 10,
            
        }
    })

class Agenda extends React.Component {

    monthHandler = () => {
        switch(this.props.date.slice(5, 7)) {
            case '01':
                return <Text style={{ fontSize: 25 }}>January </Text>
            case '02':
                return <Text style={{ fontSize: 25 }}>February </Text>
            case '03':
                return <Text style={{ fontSize: 25 }}>March </Text>
            case '04':
                return <Text style={{ fontSize: 25 }}>April </Text>
            case '05':
                return <Text style={{ fontSize: 25 }}>May </Text>
            case '06':
                return <Text style={{ fontSize: 25 }}>June </Text>
            case '07':
                return <Text style={{ fontSize: 25 }}>July </Text>
            case '08':
                return <Text style={{ fontSize: 25 }}>August </Text>
            case '09':
                return <Text style={{ fontSize: 25 }}>September </Text>
            case '10':
                return <Text style={{ fontSize: 25 }}>October </Text>
            case '11':
                return <Text style={{ fontSize: 25 }}>November </Text>
            case '12':
                return <Text style={{ fontSize: 25 }}>December </Text>
        }
    }

    dateHandler = () => {
        if (this.props.date.slice(8, 9) === '0') {
            return <Text style={{ fontSize: 25 }}>{`${this.props.date.slice(9,10)}, ${this.props.date.slice(0, 4)}`}</Text>
        }
        else {
            return <Text style={{ fontSize: 25 }}>{`${this.props.date.slice(8, 10)}, ${this.props.date.slice(0, 4)}`}</Text>
        }
    }

    destinationSort = (lhs, rhs) => {
        let results = parseInt(lhs.time.slice(11, 13)) > parseInt(rhs.time.slice(11, 13)) ? 1: parseInt(lhs.time.slice(11, 13)) < parseInt(rhs.time.slice(11, 13)) ? -1 : 0
        if (results === 0) {
            results = parseInt(lhs.time.slice(14, 16)) > parseInt(rhs.time.slice(14, 16)) ? 1 : parseInt(lhs.time.slice(14, 16)) < parseInt(rhs.time.slice(14, 16)) ? -1 : 0;
        }
        return results
    }


    render() {
        let sortedDestinations = this.props.destinations.sort(this.destinationSort)
        return (
            <View style={styles.agendaContainer}>
                <View style={styles.agendaText}>
                    <View style={{flexDirection:'row', paddingBottom: 20}}>
                        {this.monthHandler()}{this.dateHandler()} 
                    </View>
                    {sortedDestinations.map(destination => (
                        <DestinationCard key={destination.id} {...destination} scheduleId={this.props.scheduleId} deleteDestinationSchedule={this.props.deleteDestinationSchedule}/> 
                    ))}
                </View>
            </View>
        )
    }
}

export default Agenda