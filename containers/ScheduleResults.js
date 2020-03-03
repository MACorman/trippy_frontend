import React from 'react'
import {
    View,
    Text,
    Button,
    TouchableHighlight,
    StyleSheet,
    ActivityIndicator
  } from 'react-native';
import DestinationResultsCard from '../components/DestinationResultsCard';

const styles = StyleSheet.create({
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
        width: 130,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }
})

class ScheduleResults extends React.Component {
    render() {
        return (
            <View>
                <Text style={{fontSize: 20, fontFamily: 'Damascus'}} >{this.props.newScheduleInput.name}</Text>
                <Text style={{fontSize: 18, fontFamily: 'DamascusLight'}}>Location: {this.props.newScheduleInput.location}</Text>
                {/* <Text style={{fontSize: 18, fontFamily: 'DamascusLight'}}>Must See Attraction: {this.props.newScheduleInput.mustSee}</Text> */}
                {this.props.newScheduleInput.category && <Text style={{fontSize: 18, fontFamily: 'DamascusLight'}} >{this.props.newScheduleInput.category.charAt(0).toUpperCase() + this.props.newScheduleInput.category.slice(1).split('_').join(' ')} results based on {this.props.newScheduleInput.mustSee}</Text>}
                <View style={{paddingBottom: 10, paddingTop: 2}}>
                    <TouchableHighlight style={styles.button}>
                        <Button title="Done" onPress={this.props.showSchedule? this.props.showSearchResults : this.props.renderResults} color={'white'}/>
                    </TouchableHighlight>
                </View>
                {this.props.results[0] ? this.props.results.map(result => <DestinationResultsCard key={result.id} {...result} createDestination={this.props.createDestination} category={this.props.newScheduleInput.category} scheduleName={this.props.newScheduleInput.name} selectedSchedule={this.props.selectedSchedule}/>) : <ActivityIndicator size="large" color="#517CA4"/>}
            </View>
        )
    }
}

export default ScheduleResults


{/* <Text style={{fontSize: 18, fontFamily: 'DamascusLight', marginLeft: 15}} >Please wait while results load...</Text> */}