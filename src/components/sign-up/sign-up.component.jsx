import React from 'react'
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component{
    constructor(){
        super();
        this.state={
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

handleSubmit = async event =>{
        event.preventDefault();
        const { displayName, email, password, confirmPassword} = this.state;
        if (password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        try{
            // .createUserWithEmailAndPassword is a method on auth library that allows us to create user with the provided email and password.
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
             await createUserProfileDocument(user, {displayName});
            //  this will clear our form.
             this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
             });
        
        
    } catch(error){
       // Error Handles here. I love it . xD;
            if (error.code === 'auth/email-already-in-use'){
                alert('User with this Email already Exists.');
            }
            else if (error.code === 'auth/weak-password' ){
                alert('The Password is too Weak.')
            }
    };
};

// this is used to set the entered data in the form inputs to the state of the class.
handleChange= event => {
    const {name,value}=event.target;
    this.setState({[name]:value});  
};

render(){
    const {displayName, email, password, confirmPassword}= this.state;
    return(
        <div className='sign-up'>
            <h2 className='title'> I do not have a Account</h2>
            <span>Sign Up with your Email and Password</span>
            <form  className='sign-up-form'  onSubmit={this.handleSubmit}>
                <FormInput 
                type='text'
                name='displayName'
                value={displayName}
                onChange={this.handleChange}
                label='Display Name'
                required />
                <FormInput
                type='email'
                name='email'
                value={email}
                onChange={this.handleChange}
                label='Email'
                required />
                <FormInput 
                type='password'
                name='password'
                value={password}
                onChange={this.handleChange}
                label='Password'
                required />
                <FormInput 
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={this.handleChange}
                label='Confirm Password'
                required/>
            <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
         </div>
    );
}
}

export default SignUp;