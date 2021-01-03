import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
import LoadingScreen from './LoadingScreen';
import LoginScreen from './LoginScreen';
import Main from './Main'


!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default class App extends Component {

    state = {
        isLoggedIn : null,
    }
    //check if user is loggedin
    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {

            if(user){
               this.setLoggedIn();
            }
            else{
                this.unSetLoggedIn();
            }
        });
    };
    setLoggedIn = () => {
        this.setState({isLoggedIn:true})
    };
    unSetLoggedIn = () => {
        this.setState({isLoggedIn:false})
    }
    componentDidMount(){
        this.checkIfLoggedIn();
    }

    render() {

        if(this.state.isLoggedIn===true)
        {
            return (
                
                   <Main logout={this.unSetLoggedIn}/>
               
            );
        }
        if(this.state.isLoggedIn===false)
        {
            return (
                
                   <LoginScreen logIn={this.setLoggedIn} />
                
            );
        }
        return (
          
              <LoadingScreen/>
          
        );
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
  