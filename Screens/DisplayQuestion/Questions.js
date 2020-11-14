import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView} from 'react-native';
import { Button ,RadioButton } from 'react-native-paper';


class Questions extends Component{

    constructor(props){
        super();
        this.state = {
            value : 'unchecked'
        }
    }

    render(){

        return(
               
            <View style={{ justifyContent : "center" , alignItems : "center", marginTop : 150 }}>
                <Text style={{fontSize : 20, paddingHorizontal : 10}}>{this.props.question}?</Text>
            
            <ScrollView >
            <View style={{ marginHorizontal : 10}}>
                <View style={styles.container}>
                        <View style={{borderBottomWidth : 2 , borderBottomColor: '#ea2c62' ,flexDirection : "row"}}>
                        <RadioButton
                            value="a"
                            status={ this.state.value === 'a' ? 'checked' : 'unchecked' }
                            onPress={() => this.setState({value : 'a'})}
                            color = '#ea2c62'
                        />
                            <Text style={styles.answer}>{this.props.optionA}</Text>
                        </View>     
                    </View>

                    <View style={styles.container}>
                        <View style={{borderBottomWidth : 2 , borderBottomColor: '#ea2c62', flexDirection : "row"}}>
                        <RadioButton
                            value="b"
                            status={ this.state.value === 'b' ? 'checked' : 'unchecked' }
                            onPress={() => this.setState({value : 'b'})}
                            color = '#ea2c62'
                        />
                            <Text style={styles.answer}>{this.props.optionB}</Text>
                        </View>     
                    </View>

                    <View style={styles.container}>
                        <View style={{borderBottomWidth : 2 , borderBottomColor: '#ea2c62', flexDirection : "row"}}>
                        <RadioButton
                            value="c"
                            status={ this.state.value === 'c' ? 'checked' : 'unchecked' }
                            onPress={() => this.setState({value : 'c'})}
                            color = '#ea2c62'
                            
                        />
                            <Text style={styles.answer}>{this.props.optionC}.</Text>
                        </View>     
                    </View>

                    <View style={styles.container}>
                        <View style={{borderBottomWidth : 2, borderBottomColor: '#ea2c62' , flexDirection : "row"}}>
                        <RadioButton
                            value="d"
                            status={ this.state.value === 'd' ? 'checked' : 'unchecked' }
                            onPress={() => this.setState({value : 'd'})}
                            color = '#ea2c62'
                        />
                            <Text style={styles.answer}>{this.props.optionD} </Text>
                        </View>     
                    </View>
                    <Button onPress={() => {this.props.next(this.state.value) ; this.setState({value : 'unchecked'})}} icon="check" mode="contained" color='#f1d4d4' style={{marginHorizontal : 100 , marginBottom : 100}}>
                            Submit
                    </Button>
            </View>
            </ScrollView>
                
                </View>
        
        )
    }
}

export default Questions;

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 30,
        marginVertical : 25,

    },
    prefix : {
        paddingRight : 20,
    },
    answer : {
        fontSize : 18,
        paddingRight : 30,
        paddingBottom : 6
    }
})





