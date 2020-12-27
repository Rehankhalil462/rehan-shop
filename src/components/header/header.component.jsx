import React from 'react'
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo} from '../../assests/crown.svg';
import {auth} from '../../firebase/firebase.utils';
// destructring the currentUser property in following
// we are using ternary operator for sign in and sign out. when the currentUser is an object , it acts as true and then first condition will execute which tells the header to change text as SIGN OUT and then if we click that then onClick is called which will in turn signOut the user by calling the auth.signOut() function. and if currentUser is a null then else part of the ternary operator will apply which will set the header option text to SIGN In which is a link that in return take us to the /signIn page. 

const Header = ({currentUser}) =>
(
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options-container'>
             
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/signin'>CONTACT</Link>
            {
                currentUser ?
                <div className='option' onClick={()=> auth.signOut()} > SIGN OUT </div> :
                  <Link to='/signin' className='option'>SIGN IN</Link>
            }
        </div>
    </div>
)
export default Header;