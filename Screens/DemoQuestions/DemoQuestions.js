import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView,ScrollView , Image} from 'react-native';
import firebase from 'firebase';
import Questions from '../DisplayQuestion/Questions';
import Result from '../DisplayResult/Result';

class DemoQuestions extends Component {
    constructor(){
        super();
        this.state = {
            demo : [],
            index : 0,
            corrects : [],
            wrongs : []
        }
    }
    
    componentDidMount(){
        firebase.database().ref().child('Demo').on('value' , snapshot => {
            if (snapshot.val() != null) {
                this.setState({demo : snapshot.val()});
            }
            else{
                console.log("no data found");
            }
        })
    }
    next = (correctAnswer) => {
        this.setState({index : this.state.index + 1});
        {var DemoQuestionsArray = Object.values(this.state.demo)}
            const question = DemoQuestionsArray[this.state.index];
            console.log("Checking if : " ,correctAnswer , question.answer);
                if (correctAnswer == question.answer) { 
                        console.log("this is correct");
                        const corrects = this.state.corrects
                        corrects.push(question)
                        this.setState({corrects})
                }
                else{
                    const wrongs = this.state.wrongs
                    wrongs.push(question)
                    this.setState({wrongs})
                }
    }
    render(){

        {var DemoQuestionsArray = Object.values(this.state.demo)}
        

        const question = DemoQuestionsArray[this.state.index];
        

        if(this.state.index < DemoQuestionsArray.length)
        {

            return(
                
                question ? <Questions next={(correctAnswer) => this.next(correctAnswer)} question={question.question} optionA = {question.a} optionB = {question.b} optionC = {question.c} optionD = {question.d} />
                : <View>

        </View>
            )}
            else{
                return(
                    <View >

                        <Result corrects = {this.state.corrects} wrongs = {this.state.wrongs} navigation={this.props.navigation} />
                        
                    </View> 
                ) 
        }
    }
}


export default DemoQuestions;