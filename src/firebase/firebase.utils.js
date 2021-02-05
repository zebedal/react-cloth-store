import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBAnRXipg4TCswNJ7wuMBHrHfCIMrlwIjY",
    authDomain: "react-cloth-store-f4e37.firebaseapp.com",
    projectId: "react-cloth-store-f4e37",
    storageBucket: "react-cloth-store-f4e37.appspot.com",
    messagingSenderId: "955933682226",
    appId: "1:955933682226:web:ff36127199a034d43f2a2b"
}


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    console.log(snapShot);

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log('Error creating user ', e.message);
        }
    }

    return userRef;
}


firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
