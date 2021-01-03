import React, { Component } from 'react'
import { StyleSheet, Button, View } from 'react-native';
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

export default class Main extends Component {
  PropTypes = {
    logout : PropTypes.func.isRequired,
  }
  signOut = async () => {
   await firebase.auth().signOut().then(() => {
      this.props.logout();
    }).catch((error) => {
      // An error happened.
    });
  }
    render() {
        return (
            <View style={styles.container}>
               <Button title="sign out" onPress={this.signOut}/>
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
  