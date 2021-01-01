import {applyMiddleware, createStore} from 'redux';
    //middleware is just a function or piece of code that catches an action when it is fired, and then display them. it is a piece of code in middle of action and root reducer.  
 import logger from 'redux-logger';
import rootReducer from './root-reducer';


const middleware= [logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;   