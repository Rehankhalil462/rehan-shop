import { takeLatest, all, put, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInFailure, signInSuccess, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './users.actions';

import { auth, createUserProfileDocument, googleProvider, facebookProvider , getCurrentUser, githubProvider } from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapShot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
};


export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    if (error.code === 'auth/account-exists-with-different-credential'){
        alert('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
    }
    else if (error.code === 'auth/popup-closed-by-user'){
        alert('The popup has been closed by the user before finalizing the operation.');
    }
    //     const userRef = yield call(createUserProfileDocument, user);
    //     const userSnapShot = yield userRef.get();
    //     yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
    // } catch (error) {
    //     yield put(signInFailure(error));
    // }

}
};

export function* signinWithGitHub(){
    try {
        const {user} =yield auth.signInWithPopup(githubProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
        if (error.code === 'auth/account-exists-with-different-credential'){
            alert('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
        }else if (error.code === 'auth/popup-closed-by-user'){
            alert('The popup has been closed by the user before finalizing the operation.');
        }
    }
};
export function* signinWithFacebook() {
    try {
        const { user } = yield auth.signInWithPopup(facebookProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
        if (error.code === 'auth/account-exists-with-different-credential'){
            alert('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
        }else if (error.code === 'auth/popup-closed-by-user'){
            alert('The popup has been closed by the user before finalizing the operation.');
        }
    }
};


export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));

    } catch (error) {
        yield put(signUpFailure(error));
        if (error.code === 'auth/email-already-in-use') {
            alert('User with this Email already Exists.');
            // this.setState({
            //     displayName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: ''
            //  });

        }
        else if (error.code === 'auth/weak-password') {
            alert('The Password is too Weak.');
        }
            else if (error.code === 'auth/invalid-email'){
                alert('The email address is badly formatted.');
            }
            // this.setState({
            //     displayName: '',
            //     email: '',
            //     password: '',
            //     confirmPassword: ''
            //  });
        }
    };

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
};



export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
        // const userRef = yield call(createUserProfileDocument, user);
        // const userSnapShot = yield userRef.get();
        // yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));

    } catch (error) {
        yield put(signInFailure(error));
        if (error.code === 'auth/wrong-password') {
            alert(error.message);
        }
        else if (error.code === 'auth/user-not-found') {
            alert(error.message);

        }
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
};

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
};


export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};
export function* onFacebookSignInStart(){
    yield takeLatest(UserActionTypes.FACEBOOK_SIGN_IN_START,signinWithFacebook)
};
export function* onGitHubSignInStart(){
    yield takeLatest(UserActionTypes.GITHUB_SIGN_IN_START,signinWithGitHub);
}
export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
};
export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_UP_START, signUp);
};

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
};

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onFacebookSignInStart),
        call(onGitHubSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
};