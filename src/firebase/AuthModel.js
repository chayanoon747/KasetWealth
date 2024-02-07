import auth from '@react-native-firebase/auth';
import {addUser, addFinancials} from './UserModel';
//

export const signUpEmailPass = (profile, success, unsuccess)=>{
    console.log(`email: ${profile.email}`)
    auth().createUserWithEmailAndPassword(profile.email, profile.password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log(`User: in signUpEmailPass: ${user}`)
      addUser(user, profile, success, unsuccess)
      addFinancials(user)
    })
    .catch((error)=>{
      const msg = (`signUpEmailPass error: ${error}`)
      unsuccess(msg)
    })
}

export const signInEmailPass = (email, password, success,unsuccess) => {
    auth().signInWithEmailAndPassword(email, password)
    .then((userCredential)=>{
        const user = userCredential.user;
        console.log(`user after logged in: ${user}`)
        success(user)
    })
    .catch((error) => {
      const msg = (`signInEmailPass error: ${error}`)
      unsuccess(msg)
    });
}

export const signOut = ()=>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}