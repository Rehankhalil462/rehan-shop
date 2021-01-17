import React, {useState} from 'react';
import './sign-up.styles.scss';
import {connect} from 'react-redux';
import {emailSignUpStart} from '../../redux/user/users.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

const SignUp=({emailSignUpStart})=>{
const [userCredentials,setUserCredentials]=useState({
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
});
const { displayName, email, password, confirmPassword} = userCredentials;


const handleSubmit = async event =>{
        event.preventDefault();
        if (password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }
        // const {emailSignUpStart}=this.props;
        emailSignUpStart({email,password,displayName});
    //     try{
    //         // .createUserWithEmailAndPassword is a method on auth library that allows us to create user with the provided email and password.
    //         const { user } = await auth.createUserWithEmailAndPassword(email, password);
    //         // console.log('this is we are getting from user',{displayName});
    //          await createUserProfileDocument(user, {displayName});
    //         //  this will clear our form.
    //          this.setState({
    //             displayName: '',
    //             email: '',
    //             password: '',
    //             confirmPassword: ''
    //          });
        
        
    // } catch(error){
    //    // Error Handles here. I love it . xD;
    //         if (error.code === 'auth/email-already-in-use'){
    //             alert('User with this Email already Exists.');
    //             this.setState({
    //                 displayName: '',
    //                 email: '',
    //                 password: '',
    //                 confirmPassword: ''
    //              });
    //         }
    //         else if (error.code === 'auth/weak-password' ){
    //             alert('The Password is too Weak.');
    //             this.setState({
    //                 displayName: '',
    //                 email: '',
    //                 password: '',
    //                 confirmPassword: ''
    //              });
    //         }
    };


// this is used to set the entered data in the form inputs to the state of the class.
const handleChange= event => {
    const {name,value}=event.target;
    setUserCredentials({...userCredentials,[name]:value});  
};


    // const {displayName, email, password, confirmPassword}= this.state;
    return(
        <div className='sign-up'>
            <h2 className='title'> I do not have a Account</h2>
            <span>Sign Up with your Email and Password</span>
            <form  className='sign-up-form'  onSubmit={handleSubmit}>
                <FormInput 
                type='text'
                name='displayName'
                value={displayName}
                onChange={handleChange}
                label='Display Name'
                required />
                <FormInput
                type='email'
                name='email'
                value={email}
                onChange={handleChange}
                label='Email'
                required />
                <FormInput 
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
                label='Password'
                required />
                <FormInput 
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                label='Confirm Password'
                required/>
            <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
         </div>
    );
};

const mapDispatchToProps=dispatch=>({
    emailSignUpStart:userCredentials=>dispatch(emailSignUpStart(userCredentials))
});

export default connect(null,mapDispatchToProps)(SignUp);