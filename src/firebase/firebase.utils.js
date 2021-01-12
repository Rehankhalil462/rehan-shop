// as i am not using whole code of firebase project in this react's html.index file. thats why i have to import what i want to do or want to have access to the firebase function.
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// integrating firebase with our project. firebase will make a one gigantic json object which we will use to access its firestore database and authentication service too.

const config = {
    apiKey: "AIzaSyBaui2opNGCFWnerhrsQrPxYyOfPUi2Y4Q",
    authDomain: "rehan-db.firebaseapp.com",
    projectId: "rehan-db",
    storageBucket: "rehan-db.appspot.com",
    messagingSenderId: "448334784536",
    appId: "1:448334784536:web:99153f7853bdae5aba7b6d",
    measurementId: "G-L9BSNF56BN"
  };

// following line is used to connect this react project to the project on firebase
firebase.initializeApp(config);

// firebase is a global namespace from which all Firebase services are accessed
export const auth = firebase.auth();   
export const firestore= firebase.firestore();

// following line is telling us that which provider we will be using to sign in like through google, facebook, twitter etc. here we are using google auth provider.
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// following line is telling through which option we can use sign in . like list of accounts.
googleProvider.setCustomParameters({prompt: 'select_account'}); 

// signInWithPopup is a object on auth library. following function is used to popup a specific googleProvider whenever this function is called.
export const signinWithGoogle = () => auth.signInWithPopup(googleProvider);

// way to store properties and data of authenticated user in our firestore dabatase 
export const createUserProfileDocument = async (userAuth, additionalData) => {
//  if there is no user signed in , and object is coming as null, then it will return back...
  if(!userAuth) return;
  const userRef= firestore.doc(`users/${userAuth.uid}`);
// this snapshot reference of signed in user matches with the data of firestore and tells us that if user exits or not by "exist" property.
const snapShot= await userRef.get();

// console.log(snapShot);
if(!snapShot.exists){
  //if user does not exist in our firestore database then we will get his email and displayname from the documentSnapshot and will create or set that user to our database.
  const {displayName, email}= userAuth;
  const createdAt= new Date();
  try{
   // snapshot simply represent the data of existence , we have to use userRef to add data to firestore.
  //  .set being the create method.
  // async and await is used as it is a potential API request to Firestore Database that takes some time. 
  //  ...additionalData is used if we want to use other properties of userReference.
  await userRef.set({
      displayName, email, createdAt, ...additionalData
    });

  } catch(error){
    console.log("error creating user" , error.message); 
  }
}
// there's  a chance that we might use userRef object for other purposes.
return userRef;
}


// this is for just to add shop data in the firestore. we can also do  it manually but we are doing that in this way to minimize the time.

// export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
//   const collectionRef=firestore.collection(collectionKey);
// console.log('CollectionRef',collectionRef);
// const batch=firestore.batch();
// objectsToAdd.forEach(obj => {
//   const newDocRef=collectionRef.doc();
//   console.log('newDocRef',newDocRef);
//   batch.set(newDocRef,obj);
  
// });
// return await batch.commit();

// };

export const convertCollectionsSnapshotToMap= collections=>{
  const transformedCollection=collections.docs.map(doc=>{
    const {title,items}=doc.data();
    return { routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
   }; });
   console.log(transformedCollection);
   return transformedCollection.reduce((accumulator,collection)=>{
     accumulator[collection.title.toLowerCase()]=collection;
     return accumulator;
   },{})
};



export default firebase;