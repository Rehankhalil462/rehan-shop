import React from 'react';
import { Link } from 'react-router-dom';
//connect is a higher order component that lets us modify our component to have access to things related to redux.
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assests/crown.svg';

import './header.styles.scss';
// destructring the currentUser property in following
// we are using ternary operator for sign in and sign out. when the currentUser is an object , it acts as true and then first condition will execute which tells the header to change text as SIGN OUT and then if we click that then onClick is called which will in turn signOut the user by calling the auth.signOut() function. and if currentUser is a null then else part of the ternary operator will apply which will set the header option text to SIGN In which is a link that in return take us to the /signIn page. 


const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/contact-us'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);
//state is the root reducer. we are going to get currentuser from root reducer then user reducer then currentuser value.
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);