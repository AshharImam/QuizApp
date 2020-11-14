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


    isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.user.id) {
            return true;
          }
        }
      }
      return false;
    }

    onSignIn = (googleUser) => {

      console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }.bind(this));
    }

    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: '946638432874-55olvq1onuh7l9p7l10cglu731tq0gb3.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            behavior: 'web',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result); 
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

      siginUpUser = (email , password) => {
        try {
          firebase.auth().createUserWithEmailAndPassword(email , password);
        } catch (error) {
          console.log(error);
        }
      }

      loginUser = (email , password) => {
        try {
          firebase.auth().signInWithEmailAndPassword(email , password).then((user) => {this.props.navigation.navigate('DemoQuestions') ; console.log(user);})
        } catch (error) {
          console.log(error);
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