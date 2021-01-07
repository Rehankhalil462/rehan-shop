import React from 'react'
import './App.css';
import { connect } from 'react-redux';
import Homepage from './pages/homepage/homepage.component';
import { Route, Redirect, Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Contact from './pages/contact/contact.component';
import Header from './components/header/header.component';
import SignInandSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/users.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

class App extends React.Component {
  //replacing setstate code to setcurrentuser action code. 
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser, collectionArray } = this.props;
    
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //.onSnapshot will give snapShot object which we will use to change the currentUser state to those paramaters (like .exits property) that are retrieved .
        // .data() allows us to have access to the properties of that snapShot Object. it comes with an object with the properties stored in the database like displayName, createdAt, email etc.
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      else {
        setCurrentUser(userAuth);
        // addCollectionAndDocuments('collections', collectionArray.map(({title,items})=>({title,items})));
      }
    });

  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  // we are using currentUser state in the header to tell the app that if the user is signed In(it will return as object) or Signed Out(it will return as null).
  // using Redirect component to redirect the user to main page whenever he signs in.   
  render() {
    return (
      <div >
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/contact-us' component={Contact} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInandSignUp />)} />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }

}
// const mapStateToProps = ({user})=>({
//   currentUser: user.currentUser 
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionArray:selectCollectionsForPreview
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
