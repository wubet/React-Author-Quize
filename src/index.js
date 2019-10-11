import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { applyMiddleware, compose} from 'redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two City']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    },
    
];

function getTurnData(authors){
   const allBooks = authors.reduce(function(p, c, i){
       return p.concat(c.books);
   }, []) 

   const fourRandomBooks = shuffle(allBooks).slice(0,4);
   const  answer = sample(fourRandomBooks);

   return {
       books: fourRandomBooks,
       author: authors.find((author) => 
       author.books.some((title) => 
       title === answer))
   }
}

// function resetState(){
//     return {
//         turnData: getTurnData(authors),
//         highlight:''
//     }
// }

function reducer(
    state ={authors, turnData: getTurnData(authors), highlight:''}, action){
    switch(action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer)
            return Object.assign(
                {}, 
                state, {
                    highlight: isCorrect ? 'correct' : 'wrong'
                });
        case 'CONTINUED':
                return Object.assign(
                    {}, state, {
                        highlight:'',
                        turnData: getTurnData(state.authors)
                });
        case 'ADD_AUTHOR':
                return Object.assign(
                    {}, state, { 
                        authors: state.authors.concat([action.author])
                    });
        default:
                return state;
    }
}

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ ||   compose;


let store = Redux.createStore(
    reducer,
    composeEnhancers(applyMiddleware())
    );
// let state = resetState();

// function onAnswerSelected(answer){
//     const isCorrect = state.turnData.author.books.some((book) => book === answer);
//     state.highlight = isCorrect ? 'correct' : 'wrong';
//     render();
// }

// function App(){
//     return <ReactRedux.Provider store={store}>
//         <AuthorQuiz />
//     </ReactRedux.Provider>
// }

// const AuthorWrapper = withRouter(({ history}) =>
//     <AddAuthorForm onAddAuthor={(author) => {
//         authors.push(author);
//         history.push("/");
//     }} />
// );

ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
