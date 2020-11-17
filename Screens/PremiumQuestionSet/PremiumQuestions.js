import React, { Component } from 'react';
import { View, Text, Image, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';

class PremiumQuestionSet extends Component{

    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <View style={{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>

                <Text style={{fontSize : 22 , paddingHorizontal : 10 , paddingVertical : 50, fontWeight : 'bold'}}>We designed 5 sets of quality questions just for you.</Text>
                <Button icon="book" mode="contained" onPress={() => console.log('Pressed')} style={{marginVertical : 15}} color = '#ea2c62'>
                    Question Set 1
                </Button>

                <Button icon="book" mode="contained" onPress={() => console.log('Pressed')} style={{marginVertical : 15}} color = '#ea2c62'>
                    Question Set 2
                </Button>
                
                <Button icon="book" mode="contained" onPress={() => console.log('Pressed')} style={{marginVertical : 15}} color = '#ea2c62'>
                    Question set 3
                </Button>

                <Button icon="book" mode="contained" onPress={() => console.log('Pressed')} style={{marginVertical : 15}} color = '#ea2c62'>
                    Question set 4
                </Button>

                <Button icon="book" mode="contained" onPress={() => console.log('Pressed')} style={{marginVertical : 15}} color = '#ea2c62'>
                    Question set 5
                </Button>

            </View>
        );
    }
}
export default PremiumQuestionSet;
