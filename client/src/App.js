import React , { useEffect,lazy,Suspense } from 'react';
// import './App.css';
import {GlobalStyle} from './global.styles';
import { connect } from 'react-redux';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

// import Homepage from './pages/homepage/homepage.component';
// import CheckoutPage from './pages/checkout/checkout.component';
// import ShopPage from './pages/shop/shop.component';
// import SignInandSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import Contact from './pages/contact/contact.component';




import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// import { setCurrentUser } from './redux/user/users.actions';
import {checkUserSession} from './redux/user/users.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
// import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

//!!!!!! Converting our imports to Lazy and Suspense for optimization/performance of app!!!!.
const Homepage=lazy(()=> import('./pages/homepage/homepage.component'));
const ShopPage=lazy(()=> import('./pages/shop/shop.component'));
const SignInandSignUp=lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage=lazy(()=> import('./pages/checkout/checkout.component'));
const Contact=lazy(()=>import('./pages/contact/contact.component'));




const App =({checkUserSession,currentUser})=> {
 
  useEffect(()=>{
checkUserSession();
  },[checkUserSession]);

  // we are using currentUser state in the header to tell the app that if the user is signed In(it will return as object) or Signed Out(it will return as null).
  // using Redirect component to redirect the user to main page whenever he signs in.   

    return (
      <div >
        <GlobalStyle/>
        <Header />
        <Switch >
          <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/contact-us' component={Contact} />
          <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInandSignUp />)} />
          <Route exact path='/checkout' component={CheckoutPage} />
          </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  };
// const mapStateToProps = ({user})=>({
//   currentUser: user.currentUser 
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionArray:selectCollectionsForPreview
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
