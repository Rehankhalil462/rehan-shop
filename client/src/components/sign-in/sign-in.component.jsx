import React, { useState } from 'react';
import { connect } from 'react-redux';
import './sign-in.styles.scss';
import logo from '../../assests/GitHub.png';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import {auth, signinWithGoogle} from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart, facebookSignInStart,githubSignInStart } from '../../redux/user/users.actions';

const SignIn = ({ emailSignInStart, googleSignInStart, facebookSignInStart,githubSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });

    const { email, password } = userCredentials;


    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
        // try {
        //     await auth.signInWithEmailAndPassword(email,password);
        //     this.setState({email:'', password:''})

        // } catch (error) {
        //     // Error handles here. love it xD;.
        //     if (error.code === 'auth/wrong-password'){
        //         alert(error.message);
        //         this.state={
        //             email: '',
        //             password: ''
        //         };

        //     }
        //     else if (error.code === 'auth/user-not-found'){
        //         alert(error.message);
        //         this.state={
        //             email: '',
        //             password: ''
        //         };
        //     }

        // }
    };


    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value })
    }

    return (
        <div className='Sign-In'>
            <h2>I already have an Account.</h2>
            <span>Sign In with your Email and Password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handleChange}
                    label='Email'
                    required />
                <FormInput
                    name='password'
                    type='password'
                    label='Password'
                    value={password}
                    handleChange={handleChange}
                    required />
                <span className='note'>Note: Please Sign In with only that Provider (Google/Facebook/GitHub) with which you are going to Sign In in the Future!</span>
                <div className='buttons'>
                    <CustomButton type='submit' >Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignin >{' '}Sign In with Google{' '}</CustomButton>
                    <CustomButton type='button' onClick={facebookSignInStart} isGoogleSignin>{' '}Sign In with Facebook{' '}</CustomButton>
                    <CustomButton type='button' onClick={githubSignInStart} isGitHubSignin>{' '}Sign In with GitHub<img className='logo' src={logo} alt='github_logo'></img>{' '}</CustomButton>

                </div>
            </form>
        </div>
    );
}



const mapDispatchToProps = dispatch => ({
    facebookSignInStart: () => dispatch(facebookSignInStart()),
    githubSignInStart:()=>dispatch(githubSignInStart()),
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn); 