import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks, getData } from '../utility/api';
import { receiveDecks } from '../actions';
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

    return (
        <ScrollView style={styles.container}>
            {Object.keys(decks).map((deck) => {
              const { title, questions } = decks[deck]
              return (
      
                    <View key={deck} style={styles.card}>
                      <Text style={styles.cardText}>{title}</Text>
                      <Text style={styles.cardText}>{questions ? getCardsLength(questions) : null}</Text>
                      <Button style={styles.cardBtn} onPress={() => this.props.navigation.navigate('DeckView',  {entryId: deck})} 
                            title='view deck'>
                      </Button>
                    </View>
                
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
        receiveAllDecks: (decks) => dispatch(receiveDecks(decks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)