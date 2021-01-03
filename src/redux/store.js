import {applyMiddleware, createStore} from 'redux';
    //middleware is just a function or piece of code that catches an action when it is fired, and then display them. it is a piece of code in middle of action and root reducer.  
 import logger from 'redux-logger';
import rootReducer from './root-reducer';
// it allows our browser to actually cache our store now depending on certain configuration.
import {persistStore} from 'redux-persist';


const middleware= [logger];
export const store = createStore(rootReducer, applyMiddleware(...middleware));
//followin, we are creating a persisted version of our store right!.
export  const persistor=persistStore(store);