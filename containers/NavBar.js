import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
  } from 'react-native';
import Logout from '../components/Logout';

class NavBar extends React.Component {
    render() {
        return (
            <View>
                <Text style={{fontSize: 35}}>Trippin</Text>
                <Logout logout={this.props.logout} />
            </View>
        )
    }
}

export default NavBar