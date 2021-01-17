import React from 'react';

// import { Link } from 'react-router-dom';
//connect is a higher order component that lets us modify our component to have access to things related to redux.
import { connect } from 'react-redux';

// importing selectors .
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

//importing styles from js file. css in JS!
import {HeaderContainer, LogoContainer, OptionDiv, OptionLink, OptionsContainer} from './header.styles';

import {signOutStart} from '../../redux/user/users.actions';

// import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assests/crown.svg';

import './header.styles.scss';
// destructring the currentUser property in following
// we are using ternary operator for sign in and sign out. when the currentUser is an object , it acts as true and then first condition will execute which tells the header to change text as SIGN OUT and then if we click that then onClick is called which will in turn signOut the user by calling the auth.signOut() function. and if currentUser is a null then else part of the ternary operator will apply which will set the header option text to SIGN In which is a link that in return take us to the /signIn page. 


const Header = ({ currentUser, hidden,signOutStart }) => (
  <HeaderContainer>
    <LogoContainer className='logo-container' to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/contact-us'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionDiv onClick={signOutStart}>
          SIGN OUT
        </OptionDiv>
      ) : (
          <OptionLink to='/signin'>
            SIGN IN
          </OptionLink>
        )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);
//state is the root reducer. we are going to get currentuser from root reducer then user reducer then currentuser value.
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden
// });

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps=dispatch=>({
  signOutStart:()=>dispatch(signOutStart())
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);