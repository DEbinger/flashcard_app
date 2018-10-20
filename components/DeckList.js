import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert, AsyncStorage, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, getData } from '../utility/api';
import { receiveDecks, removeDeck } from '../actions';
import { orange, white } from '../utility/colors';
import { getCardsLength } from '../utility/helper';
import Swipeout from 'react-native-swipeout';

class DeckList extends React.Component {
  
  componentDidMount() {
      getDecks()
      .then(decks => this.props.receiveAllDecks(decks));
  }

  render() {
    const { decks } = this.props;
    console.log(decks)

let swipeBtns = (deck) => {
      
  return [
  {
    text: 'Delete All',
    autoClose:true,
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {
      Alert.alert(
      'Alert',
      'Are you sure you want to delete?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'),style: 'cancel'},
        {text: 'Yes', onPress: () => {
          AsyncStorage.getAllKeys().then(console.log)
          AsyncStorage.removeItem('flashcards: decks').then(
            () => {
              this.props.deleteSingleDeck(deck)
              console.log('resolved')
            },
            () => {
              console.log('rejected')
            }
          )
          
        }
      },
      ],
      { cancelable: true }
    )
  },
  text: 'Delete', type: 'delete', underlayColor:'#3a3a3a',color:'white'
  }]
}

    return (
        <ScrollView style={styles.container}>
            {Object.keys(decks).map((deck) => {
              const { title, questions } = decks[deck]
              return (
                <Swipeout right={swipeBtns(deck)}>
                  <TouchableHighlight underlayColor="#ffffff00" onPress={() => this.props.navigation.navigate('DeckView',  {entryId: deck})}>
                      <View key={deck} style={styles.card}>
                        <Text style={styles.cardText}>{title}</Text>
                        {/*<Text style={styles.cardText}>{questions ? getCardsLength(questions) : null}</Text>
                        <Button color="333" onPress={() => this.props.navigation.navigate('DeckView',  {entryId: deck})} title='view deck'>
              </Button>*/}
                      </View>
                  </TouchableHighlight>
                </Swipeout>  
                )
            })}    
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 5
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: orange,
    margin: 8,
    height: 200, 
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.34)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  cardText: {
    fontSize: 30,
    color: white
  },
  cardBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
})

function mapStateToProps(decks){
  return {
    decks
  }
}

function mapDispatchToProps( dispatch ){
    return {
        receiveAllDecks: (decks) => dispatch(receiveDecks(decks)),
        deleteSingleDeck : (deck) => dispatch(removeDeck(deck))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)