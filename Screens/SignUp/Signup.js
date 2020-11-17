import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView,ScrollView, Text , Image, Platform} from 'react-native';
import { TextInput, Button  } from 'react-native-paper';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'

class SignUp extends Component{

    constructor(){
        super();
        this.state = {
          email : '',
          password : ''
        }
    }

    componentDidMount(){
        this.checkIfUserLoggedIn();
    }

    checkIfUserLoggedIn = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('LandingPage')
        }
      })
    }


      siginUpUser = (email , password) => {
        try {
          if(this.state.email == '' || this.state.password == ''){
            alert("Please enter your credentials");
            return;
          }
          
          firebase.auth().createUserWithEmailAndPassword(email , password);
        } catch(error) {
            alert(error.message) 
        }
      }

      loginUser = (email , password) => {
        try {
          firebase.auth().signInWithEmailAndPassword(email , password).then((user) => {this.props.navigation.navigate('LandingPage') ; console.log(user);})
        } catch (error) {
          console.log("errorrrrrrrrr: " , error.code);
        }
      }
    render(){
        return(
            <View style={{flex : 1 , justifyContent : "center" }}>
                
                <Image source={require('./choose.png')} resizeMode='center' style={{width : 230 , flex : 1 , marginLeft : 75}}/>
                <ScrollView style={{marginHorizontal : 20 , flex : 1 }}>
                  <TextInput
                  mode = "outlined"
                    label="Email"
                    value={this.state.email}
                    onChangeText={text => this.setState({email : text})}
                    style={{marginBottom : 50}}
                  />
                  <TextInput
                    mode = "outlined"
                    label="Password"
                    value={this.state.password}
                    onChangeText={text => this.setState({password : text})}
                    style={{marginBottom : 50}}
                    textContentType = 'password'
                    secureTextEntry = {true}
                  />

                  <Button color='#f1d4d4' mode="contained" style={{marginBottom : 20 , marginHorizontal : 50}} onPress={() => this.loginUser(this.state.email , this.state.password)}>
                    Login
                  </Button>
                  <Text style={{paddingBottom : 10 , color : 'blue'}}> Not yet a user?</Text>
                  <Button color = '#ea2c62' style = {{marginHorizontal : 70}}mode="contained" onPress={() => this.siginUpUser(this.state.email , this.state.password)}>
                    Sign Up
                  </Button>
                </ScrollView>

            </View>
        );
    }
}

export default SignUp