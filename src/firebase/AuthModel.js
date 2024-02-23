import auth from '@react-native-firebase/auth';
import {addUser, addFinancials, addPetsQuest} from './UserModel';


export const signUpEmailPass = (profile, success, unsuccess)=>{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // เพิ่ม 1 เพราะเดือนใน JavaScript เริ่มนับที่ 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    console.log(`email: ${profile.email}`)
    auth().createUserWithEmailAndPassword(profile.email, profile.password)
    .then((userCredential)=>{
      const user = userCredential.user
      console.log(`User: in signUpEmailPass: ${user}`)
      addUser(user, profile, success, unsuccess)
      addFinancials(user,formattedDate)
      addPetsQuest(user)
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

export const showCurrentEmail = (success, unsuccess) => {
  const currentUser = auth().currentUser;
  if (currentUser) {
    const currentEmail = currentUser.email;
    success(currentEmail);
  } else {
    unsuccess('No user is signed in');
  }
};

export const forgetPassword = (email,success, unsuccess) => {
  auth().sendPasswordResetEmail(email)
    .then(() => {
      success()
    })
    .catch((error) => {
        const msg = `Reset password error: ${error}`
        console.error(msg)
        unsuccess(msg)
    }) 
}

export const changePassword = (email, oldPassword, newPassword, success, unsuccess) => {
  const user = auth().currentUser;

  if (!user) {
    const msg = "User is not authenticated. Please log in.";
    unsuccess(msg);
    return;
  }
  // Re-authenticate
  const credential = auth.EmailAuthProvider.credential(email, oldPassword);
  console.log("Re-authenticating user...");
  console.log(`old password: ${oldPassword}`)
  
  user.reauthenticateWithCredential(credential)
    .then(() => {
      console.log("User re-authenticated successfully.");
      // update the password
      user.updatePassword(newPassword)
        .then(() => {
          console.log("Password updated successfully.");
          console.log(`new password: ${newPassword}`)
          success();
        })
        .catch((error) => {
          const msg = `Failed to update password: ${error}`;
          unsuccess(msg);
        });
    })
    .catch((error) => {
      const msg = `Re-authentication failed: ${error}`;
      unsuccess(msg);
    });
};

export const signOut = ()=>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}
