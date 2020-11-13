import React, { Component } from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import { ceil } from 'react-native-reanimated';


const {width , height} = Dimensions.get('window');

class LandingPage extends Component{

    constructor(){
        super();

        this.state = {

        }
    }

    render(){
        
        return(
            <View>
                

                <View style={{flex : 1 ,  justifyContent : "center" , alignItems : "center" , marginTop : 270}}>
                    <Image source={require('./logo.jpg')} style={{resizeMode: 'center'}} />
                </View>

                <View style={{marginVertical : 100 , marginHorizontal : 50}}>

                    <Text style={{fontSize : 26 , fontWeight : "bold" , alignItems: "center" , textAlign : "center" }}>The Quiz App</Text>
                    <Text style={{fontSize : 14 , alignItems: "center" , textAlign : "center" , paddingVertical : 10, paddingBottom : 20}}>with love : Wayne Managment Institue</Text>

                    <View style={{paddingVertical : 30}}>
                        <Button mode="contained" theme={{ colors: { text: "white" } }} color='#f1d4d4' onPress={() => this.props.navigation.navigate('SignUp')}>
                            Try the demo quiz
                        </Button>
                    </View>
                    

                    <Button icon="crown" mode="contained" color='#f1d4d4' onPress={() => this.props.navigation.navigate('SignUp')}>
                        get the best questions
                    </Button>
                </View>
                

                
            </View>
        );
    }
}

export default LandingPage;
