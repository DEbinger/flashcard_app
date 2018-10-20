import React from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Image, ImageBackground} from 'react-native';
import { purple, white, red, orange, green } from '../utility/colors';
import { SubmitButton } from './SubmitButton';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import {Info} from './Info.js'

class Quiz extends React.Component {

    state= {
        questionNumber: 0,
        showQuestion: false,
        correct: 0,
        incorrect: 0
    }

showAnswer = () => (
    !this.state.showQuestion ? this.setState({ showQuestion: true })
    : this.setState({ showQuestion: false})
)

submitAnswer = (answer) => {

    const { questionNumber } = this.state
    const deck = this.props.navigation.state.params.entryId
    const decks = this.props.decks
    const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()

    if (answer.trim() === correct.trim()){
        this.setState({ correct: this.state.correct + 1 })
    } else {
        this.setState({ incorrect: this.state.incorrect +1 })
    }
    this.setState({ questionNumber: this.state.questionNumber +1, showQuestion: false })
}

    render(){
        const questionNumber = this.state.questionNumber
        const decks = this.props.decks
        const deck = this.props.navigation.state.params.entryId
        const number = this.state.questionNumber + 1

        if(questionNumber === decks[deck].questions.length){
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        {this.state.correct > this.state.incorrect ?
                        <ImageBackground
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            width: 150,
                            height:150}}
                        source={require("../assets/images/two_pug.gif")}
                        style={styles.container}>
                        <View>
                            <Text style={{color:white, textAlign:'center'}}>You got {this.state.correct} out of {decks[deck].questions.length}! You did a great job! </Text>
                        </View>    
                        </ImageBackground>
                        :<ImageBackground
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            width: '100%',
                            height:'100%'}}
                        source={require("../assets/images/homer.gif")}
                        style={styles.container}>
                    <View>
                        <Text style={{color:white, textAlign:'center'}}>You got {this.state.correct} out of {decks[deck].questions.length}!{'\n'}D'OH!!! </Text>
                    </View>    
                    </ImageBackground>}
                        
                        <ActionButton styles={styles} text={'Try Again'} color={red} onPress={() => this.props.navigation.navigate('DeckView',  {entryId: deck})} 
                        title='Deck Info'/>
                        <ActionButton styles={styles} text={'Back'} color={green} onPress={() => this.props.navigation.navigate('DeckList', { entryId: deck })}/>   

                    </View>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.questions}>{number} / {decks[deck].questions.length}</Text>
                    
                    {!this.state.showQuestion ? <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>
                     : <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>}
                    
                    {!this.state.showQuestion ? <Info style={styles.answer} text={'Show Answer'} onPress={this.showAnswer}></Info> :
                    <Info style={styles.answer}text={'Show Question'} onPress={this.showAnswer}></Info>}

                    <ActionButton styles={styles} text={'Correct'} color={green} onPress={() => this.submitAnswer('true')}/>
                    <ActionButton styles={styles} text={'Incorrect'} color={red} onPress={() => this.submitAnswer('false')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    iosBtn: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        margin: 5,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: orange,
        margin: 10,
        height: 3,
        width: '100%', 
        borderRadius: 10,
        shadowColor: 'rgba(255,255,255,255)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 4,
        shadowOpacity: 1
    },
    submitBtnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    mainText:{
        fontSize: 40,
        color: white,
        marginTop: 40,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    questions: {
        top: 0,
        alignSelf: 'flex-start',
        left: 0,
        top: 0,
        color: white,
        fontSize: 20,
        margin: 5,
        position: 'absolute'
    },
    answer: {
        color: white,
        fontSize: 20,
        margin: 20
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
    }
})

function mapStateToProps(decks){
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)