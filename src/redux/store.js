import {applyMiddleware, createStore} from 'redux';
    //middleware is just a function or piece of code that catches an action when it is fired, and then display them. it is a piece of code in middle of action and root reducer.  
 import logger from 'redux-logger';

//  import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import {fetchCollectionsStart} from './shop/shop.sagas';
import rootSaga from './root-sagas';

import rootReducer from './root-reducer';
// it allows our browser to actually cache our store now depending on certain configuration.
import {persistStore} from 'redux-persist';


const sagaMiddleware=createSagaMiddleware();
// const middleware= [thunk];
const middleware=[sagaMiddleware];

// if we are in development mode then it will logged the current state , prev state, after state in the console otherwise we dont want it.
if (process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));
//followin, we are creating a persisted version of our store right!.
export  const persistor=persistStore(store);

// sagaMiddleware.run(fetchCollectionsStart);
sagaMiddleware.run(rootSaga);