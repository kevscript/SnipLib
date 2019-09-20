import firebase from 'firebase'

// Your web app's Firebase configuration
export const initApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

export const userExistsInDatabase = (id) => { 
  return firebase.database().ref("users").once("value")
    .then(snap => snap.hasChild(id))
}

export const addUserToDatabase = (user) => {
  firebase.database().ref('users/' + user.uid).set({
    name: user.displayName,
    email: user.email
  })
}