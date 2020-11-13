import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView,ScrollView , Image} from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase'

const Result = (props) => {
    {console.log(props.navigation);}
    return(
        <View>
            
        <View style={{justifyContent : "center" , alignItems : "center" , marginTop : 80, backgroundColor : 'white' , marginHorizontal : 30, paddingVertical : 30, shadowColor : 'black' , elevation : 10 }}>
            <Image source={require('./test.png')} resizeMode='center' style={{height: 90}} />
            <Text style={{fontSize : 26 , marginVertical : 25, color : 'green'}}> Corrects : {props.corrects.length} </Text>
            <Text style={{fontSize : 26 , marginBottom: 25 ,color : 'red'}}> Wrongs : {props.wrongs.length} </Text>

            <View style={{flexDirection : 'row'}}>
                <Button icon="home" mode="contained" color='#f1d4d4' onPress={() => props.navigation.navigate('LandingPage')}>
                    Go Home
                </Button>
                <Button style={{marginLeft : 7}} mode="contained" color = '#ea2c62' onPress={() => {firebase.auth().signOut().then(function() {
                        // Sign-out successful.
                        }).catch(function(error) {
                        // An error happened.
                        });  props.navigation.navigate('SignUp')}}>
                    Sign Out
                </Button>
            </View>
            
        </View>
        
        <ScrollView style={{marginTop : 20 , marginBottom : 20}}>
            <View>
                <Text style={{fontSize : 24 , paddingLeft : 10}}>Explainations</Text>
                {props.wrongs.map((wrong) => {
                    return(
                        <View style={{paddingHorizontal : 20 , paddingVertical : 10 , backgroundColor : 'white' , marginVertical : 10 , shadowColor : 'black' , elevation : 8}}>
                            <Text style={{fontSize : 16 , paddingBottom : 10 , fontStyle :'italic'}}>Q)   {wrong.question} </Text>
                            <Text style={{fontSize : 16}}> {wrong.explanation} </Text>
                        </View>
                    )
                })}
            </View>

            
        </ScrollView>

        
        </View>
    )
}

export default Result;