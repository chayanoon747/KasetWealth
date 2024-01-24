import firestore from '@react-native-firebase/firestore';

export const addUser = (user, profile, success, unsuccess)=>{
    console.log(`addUser in UserModel user id: ${user.uid}`)
  
    firestore()
    .collection('users')
    .add({
        email: user.email,
        phoneNumber: profile.phoneNumber
    })
    .then(()=>{
        success(user.email)
    })
    .catch((error)=>{
      console.error(`addUser in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}

export const showUser = (user, profile, success, unsuccess)=>{
  
    firestore()
    .collection('users')
    .get()
    .then(querySnapshot =>{
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(doc => {
            console.log('User Email: ', doc.data().email);
        });
    })
    .catch((error)=>{
      console.error(`addUser in users collection error: ${error}`)
      console.error(msg)
    })
}

export const updatePhoneNumber = ()=>{
    firestore()
    .collection('users')
    .doc('jlbEv9VKPhgwNT4ZJmYI')
    .update({
        phoneNumber: '123456789',
    })
    .then(() => {
        console.log('User updated!');
    })
    .catch((error)=>{
        console.error(`updatephoneNumber error: ${error}`)
        console.error(msg)
    })
}

export const delelteUser = ()=>{
    firestore()
    .collection('users')
    .doc('jlbEv9VKPhgwNT4ZJmYI')
    .delete()
    .then(() => {
        console.log('User deleted!');
    })
    .catch((error)=>{
        console.error(`delelteUser error: ${error}`)
        console.error(msg)
    })
}