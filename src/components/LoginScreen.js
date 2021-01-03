import React, { Component } from 'react'
import { StyleSheet, Text, View ,TextInput,Keyboard,Dimensions, TouchableWithoutFeedback,ActivityIndicator, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default class LoginScreen extends Component {

  state = {
    email : "",
    password:"",
    loading:false,
    invalidCred:false,
  }
  PropTypes = {
    logIn : PropTypes.func.isRequired,
  }

   signInUser = async (e,p) => {
     if(e!=="" && p!=="")
     {
      this.setState({loading:true});
      Keyboard.dismiss();    
      console.log(e,p);
      await firebase.auth().signInWithEmailAndPassword(e,p)
    .then((user) => {
      
        this.setState({loading:false,invalidCred:false});
        this.props.logIn();
        
    })
    .catch((error) => {
      Keyboard.dismiss();   
      this.setState({loading:false,invalidCred:true});
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + " " + errorMessage);
    });
    }
     }
   
    render() {
        return (
            <View style={styles.container}>
             <View style={styles.card}>
                <Text style={styles.title}>Todo</Text>
                <TextInput placeholder="Email" style={[styles.input,this.state.invalidCred && ({borderColor:'red',borderWidth:1})]} editable={!this.state.loading} onChangeText={(text)=>{this.setState({email:text})}} ></TextInput>
                <TextInput placeholder="Password" secureTextEntry={true} editable={!this.state.loading} style={[styles.input,this.state.invalidCred && ({borderColor:'red',borderWidth:1})]} onChangeText={(text)=>{this.setState({password:text})}}></TextInput>
                {this.state.loading &&  <ActivityIndicator size='large' style={{marginTop:20}}  color="#86c5d8"></ActivityIndicator>}
                <View style={styles.buttonsView}>
                  <TouchableOpacity style={styles.button} onPress={()=>{this.signInUser(this.state.email,this.state.password)}}>
                    <Text style={styles.buttontext}>Log in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button,{backgroundColor:'white'}]}>
                    <Text style={[styles.buttontext,{color:"black"}]}>Sign In</Text>
                  </TouchableOpacity>
                </View>
               
             </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height:'100%',
      width:'100%',
      backgroundColor: '#86c5d8',
     
    },
    card:{
      backgroundColor:'white',
      width:'100%',
      height: 5*HEIGHT/6,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius : 40,
      borderBottomRightRadius:40,
      elevation:5,
    },
    input:{

        height:50,
        width:WIDTH-60,
        paddingHorizontal:25,
        borderRadius:25,
        backgroundColor:'#f0f8ff',
        borderColor:"gray",
        elevation:2,
        color:"black",
        marginTop:20,
    },
    title:{
      fontSize:50,
      marginBottom:60,
    },
    buttonsView:{
      marginTop:30,
      flexDirection:'column',
    },
    button:{
      backgroundColor:"#6fc9e7",
      height:40,
      width:WIDTH/2,
      borderRadius:20,
      elevation:2,
      alignItems:'center',
      justifyContent:'center',
      marginTop:20,
    },
    buttontext:{
        fontSize:15,
        color:'white'
    }
  });
  