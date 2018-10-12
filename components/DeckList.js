import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Alert, AsyncStorage } from 'react-native';
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
  
  _removeStorage() {
    console.log('removeStorage Call',this._removeStorage)
    AsyncStorage.removeItem(deck,'deck', (error) => {
      if (error) {
        this._appendMessage('AsyncStorage error: ' + error.message);
      } else {
        this._appendMessage('Selection removed from disk.');
      }
    });
  }

  async deleteDeck(){
    try {
      const decks = JSON.parse(await AsyncStorage.getItem('flashcards: decks'));
      const newDecks = decks.filter(deck => deck.title != 'Speech');
      await AsyncStorage.setItem('flashcard: decks', JSON.stringify(newDecks));
  }
  catch(e){
    console.log('caught error', e);
    // Handle exceptions
  }
}

  async deleteToken() {
    try {
      await AsyncStorage.removeItem(deck)
    } catch (err) {
      console.log(`The error is: ${err}`)
    }
  }

  render() {
    const { decks } = this.props;
    // console.log(decks)

let swipeBtns = (deck) => {
      
  return [
  {
    text: 'Delete',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {
      Alert.alert(
      'Alert',
      'Are you sure you want to delete?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'),style: 'cancel'},
        {text: 'Yes', onPress: () => {
          // this.props.deleteSingleDeck(deck),
          // this.deleteDeck(deck)
          
          // console.log(deck)
          // this._removeStorage,
          // const deleteDeck = async () => {
          //   try {
          //     await AsyncStorage.removeItem(deck,'key');
          //   } catch (error) {
          //     // Error retrieving data
          //     console.log(error.message);
          //   }
          // }
          AsyncStorage.getAllKeys().then(console.log)
          // AsyncStorage.removeItem(decks).then(
          //   () => {
          //     this.props.deleteSingleDeck(deck)
          //     console.log('resolved')
          //   },
          //   () => {
          //     console.log('rejected')
          //   }
          // )
          
        }
      },
      ],
      { cancelable: true }
    )
  },
  text: 'Delete', type: 'delete'
  }]
}

    return (
        <ScrollView style={styles.container}>
            {Object.keys(decks).map((deck) => {
              const { title, questions } = decks[deck]
              return (
                <Swipeout right={swipeBtns(deck)} onPress={this._removeStorage}>
                    <View key={deck} style={styles.card}>
                      <Text style={styles.cardText}>{title}</Text>
                      <Text style={styles.cardText}>{questions ? getCardsLength(questions) : null}</Text>
                      <Button style={styles.cardBtn} onPress={() => this.props.navigation.navigate('DeckView',  {entryId: deck})} title='view deck'>
                      </Button>
                    </View>
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
    alignItems: 'center'
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