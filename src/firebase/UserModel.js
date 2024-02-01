import firestore from '@react-native-firebase/firestore';

export const addUser = (user, profile, success, unsuccess)=>{
    console.log(`addUser in UserModel user id: ${user.uid}`)

    categories = [
        {
            category: "รายได้จากการทำงาน",
            subCategory: "เงินเดือน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285442662412369/cashIcon2.png?ex=65cce692&is=65ba7192&hm=c5ca97ec3ece03777f03104da0986ac21524e2b8295c08e25e696d24286e0c9b&",
        },
        {
            category: "รายได้จากการทำงาน",
            subCategory: "ค่าจ้าง",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285491974574190/cashIcon1.png?ex=65cce69e&is=65ba719e&hm=dccf06d1d6aa56da900737652683b442e4d95279d41a743352e70975a0daa84e&",
        },
        {
            category: "รายได้จากการทำงาน",
            subCategory: "โบนัส",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285517266505800/coinIcon.png?ex=65cce6a4&is=65ba71a4&hm=9a806b21dc42d9cb74290e7495e411ddc05969c648796f8ae7c54fcfd7cf1953&",
        },
        {
            category: "รายได้จากการทำงาน",
            subCategory: "คอมมิชชัน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285536837120000/moneyBagIcon.png?ex=65cce6a9&is=65ba71a9&hm=341087710d064155bbb00b1bd78c50a7246b87616c9e8e1e71804006b85ab279&",
        },
        {
            category: "เพิ่ม",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&",
        },
    ]
    
    firestore()
    .collection('users')
    .doc(user.uid)
    .set({
            email: user.email,
            phoneNumber: profile.phoneNumber,
            categories: categories
        },
    )
    .then(()=>{
        success(user)
    })
    .catch((error)=>{
      console.error(`addUser in users collection error: ${error}`)
      console.error(msg)
      unsuccess(msg)
    })
}

/*export const showUser = (user, profile, success, unsuccess)=>{
  
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

export const filterAge = ()=>{
    firestore()
    .collection('users')
    .where('age', '>=', 18)
    .get()
    .then((querySnapshot )=>{
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(doc => {
            console.log('User Email: ', doc.data().email);
        });
    })
}

export const limitingData = ()=>{
    firestore()
    .collection('users')
    .where('age', '>=', 18)
    .limit(20)
    .get()
    .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach(doc => {
            console.log('User Email: ', doc.data().email);
        });
    });
}*/

export const retrieveCategory = (userUID) => {
    return firestore()
        .collection('users')
        .doc(userUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const category = doc.data().categories;
                return category;
            } else {
                // กรณีไม่พบเอกสาร
                console.log("No such document!");
                return null;
            }
        })
        .catch((error) => {
            // กรณีเกิดข้อผิดพลาดในการดึงข้อมูล
            console.error("Error getting document:", error);
            throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
        });
}


/*const snapshot = await firestore()
  .collection('Users')
  .where(Filter.and(Filter('user', '==', 'Tim'), Filter('email', '==', 'tim@example.com')))
  .get();*/

/*const snapshot2 = await firestore()
  .collection('Users')
  .where(
    Filter.or(
      Filter.and(Filter('user', '==', 'Tim'), Filter('email', '==', 'tim@example.com')),
      Filter.and(Filter('user', '==', 'Dave'), Filter('email', '==', 'dave@example.com')),
    ),
  )
  .get();*/