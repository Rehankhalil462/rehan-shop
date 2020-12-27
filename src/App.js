import React from 'react'
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInandSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends React.Component {
  constructor(){
    super();
    this.state= {
      currentUser:null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
     this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
      if (userAuth){
        const userRef= await createUserProfileDocument(userAuth);
    
        //.onSnapshot will give snapShot object which we will use to change the currentUser state to those paramaters (like .exits property) that are retrieved .
        // .data() allows us to have access to the properties of that snapShot Object. it comes with an object with the properties stored in the database like displayName, createdAt, email etc.
        userRef.onSnapshot(snapShot=>{
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }});
            
    });
    }
    else{
      this.setState({currentUser: userAuth});
    }
    });
    
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
// we are using currentUser state in the header to tell the app that if the user is signed In(it will return as object) or Signed Out(it will return as null).
  render(){
    return (
      <div >
        <Header currentUser={this.state.currentUser}/>
       
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/signin' component={SignInandSignUp}/>
      </div>
    );
  }
  
}

export default App;
