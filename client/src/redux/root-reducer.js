// it is actual base reducer object that represents all the state of our application. So it is a base Root. 

import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
// importing persistReducer to persist Reducer.
import {persistReducer} from 'redux-persist';
// here is the actual local storage object on our window browser. so this is telling to reduxpersist that i want to use local storage by default storage. alternatively you can also import sessionStorage which is a different package link. 
import storage from 'redux-persist/lib/storage';

// we have to define a new persist config. this is pretty much just the json object which represents the possible configuration that we want for redux persist. 
//  key tells that at what point we want to storing everything and we want to store from root . 
// storage will say storage key goes to whatever the storage object from  redux persist we're trying  to use this.
// finally we want to pass this whitelist property and this property is an array containing the string names of any of the reducer  we want to store . so here we have two: user and cart. but user is handled by the firebase authentication, so there is no reason for us to actually perist that. instead all we want to persist the cart.  so we just want to pass it string says it is 'cart' which lets redux persist know that the only thing we want to whitelist i.e only the reducer that we actually want to persist is the cart. 
const persistConfig = {
  key:'root',
  storage,
  whitelist:['cart']
}

const rootReducer=combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory:directoryReducer,
  shop:shopReducer
});
//so it is now modified version of our rootReducer , now with the persistance capabilities. Thanks to this persistReducer function  that we got from redux-persistor. 
export default  persistReducer(persistConfig,rootReducer); 