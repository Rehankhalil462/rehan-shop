import {takeLatest, all,put,call} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {googleSignInFailure, googleSignInSuccess} from './users.actions';

import {auth,createUserProfileDocument,googleProvider} from  '../../firebase/firebase.utils';

export function* signInWithGoogle(){
    try {
        const {user}=yield auth.signInWithPopup(googleProvider);
        
        const userRef=yield call(createUserProfileDocument,user);
        const userSnapShot=yield userRef.get();
        yield put(googleSignInSuccess({id:userSnapShot.id, ...userSnapShot.data()}));
    } catch (error) {
        yield put(googleSignInFailure(error));
    }

}

export function* onGoogleSignInStart(){
yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle);
};

export function* userSagas(){
    yield all([call(onGoogleSignInStart)]);
};