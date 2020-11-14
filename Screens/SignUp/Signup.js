import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView,ScrollView, Text , Image} from 'react-native';
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
          this.props.navigation.navigate('DemoQuestions')
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
        } catch(signUpError) {
            if(signUpError.code == 'ERROR_EMAIL_ALREADY_IN_USE') {
              alert("This email is already in use")
            }  
        }
      }

      loginUser = (email , password) => {
        try {
          if(this.state.email == '' || this.state.password == ''){
            alert("Please enter your credentials");
            return;
          }
          firebase.auth().signInWithEmailAndPassword(email , password).then((user) => {this.props.navigation.navigate('DemoQuestions') ; console.log(user);})
        } catch (error) {
          console.log(error.toString());
          if(email == '' || password == ''){
            alert("Please enter your credentials");
            return;
          }
          else{
            alert("Error : " , error.toString())
          }
        }
      }
    render(){
        return(
            <View style={{flex : 1 , justifyContent : "center" }}>
                

                <ScrollView style={{marginHorizontal : 20 , marginTop : 200}}>
                  <TextInput
                    label="Email"
                    value={this.state.email}
                    onChangeText={text => this.setState({email : text})}
                    style={{marginBottom : 50}}
                  />
                  <TextInput
                    label="Password"
                    value={this.state.password}
                    onChangeText={text => this.setState({password : text})}
                    style={{marginBottom : 50}}
                    textContentType = 'password'
                    secureTextEntry = {true}
                  />

                  <Button icon="camera" color='#f1d4d4' mode="contained" style={{marginBottom : 20 , marginHorizontal : 50}} onPress={() => this.loginUser(this.state.email , this.state.password)}>
                    Login In
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