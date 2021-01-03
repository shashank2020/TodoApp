import React, { Component } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends Component {
    render() {
        return (
           <View style={styles.container}>
              <ActivityIndicator color="86c5d8" size="large"/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  