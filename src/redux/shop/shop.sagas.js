import {all, call, put, takeLatest} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess,fetchCollectionsFailure } from './shop.actions';



//Async API request is now SAGAFIED.
export function* fetchCollectionsAsync(){
    yield console.log('i am fired');

    try{
        const collectionRef = firestore.collection('collections');
        const snapshot= yield collectionRef.get();
    const collectionsMap= yield call(convertCollectionsSnapshotToMap,snapshot);
yield put(fetchCollectionsSuccess(collectionsMap));
    }catch(error){
        yield put(fetchCollectionsFailure(error.message));
    }

};

export function* fetchCollectionsStart(){
    // yield takeEvery( ShopActionTypes.FETCH_COLLECTIONS_START,  fetchCollectionsAsync);
    yield takeLatest (ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
};

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
};