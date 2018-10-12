import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = 'flashcards: decks';
 
const initialData = {
    Math: {
        title: 'Math',
        questions: [
            {
                question: 'What is 4 x 2?',
                answer: '10',
                correctAnswer: 'False'
            },
            {
                question: 'What is 5 + 20?',
                answer: '25',
                correctAnswer: 'True'
            }
        ]
    },
    Reading: {
        title: 'Reading',
        questions: [
            {
                question: 'What is your favorite color?',
                answer: 'green',
                correctAnswer: 'True' 
            },
            {
                question: 'What is the name of your dog?',
                answer: 'Shoyu',
                correctAnswer: 'False'
            }
        ]
    }
};

export const getData = () => {
    return initialData;
};

export function getDecks (deck) {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
        if(results === null) {
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData));
            return initialData;
        } else {
            return JSON.parse(results);
        }
    });
}

export function saveDeckTitle (title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }));
}

export function addCardToDeck(name, card){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
        results[name].questions.push(card)
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results));
            return results;
    });
}
