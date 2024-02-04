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
            category: "รายได้จากการทำงาน",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&",
        },
        {
            category: "รายได้จากสินทรัพย์",
            subCategory: "ดอกเบี้ย",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579229234040882/cashTimeIcon.png?ex=65cdf82f&is=65bb832f&hm=72ce112b5ec39c60cd125d93d39b57bb691374791ba26ccafc77ffd5c376891f&",
        },
        {
            category: "รายได้จากสินทรัพย์",
            subCategory: "เงินปันผล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579253250498630/cashPerson.png?ex=65cdf834&is=65bb8334&hm=303320eceb5498c6b79b75d0c839d08350499fc75d317439bf0fdbd374f6e609&",
        },
        {
            category: "รายได้จากสินทรัพย์",
            subCategory: "ค่าเช่า",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579280140177410/cashCoinIcon.png?ex=65cdf83b&is=65bb833b&hm=aac682e5805c23a4e737d2f20b44fa8252936d6e8ebdf191a46d2f8166313236&",
        },
        {
            category: "รายได้จากสินทรัพย์",
            subCategory: "ค่าขายสินทรัพย์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579304937029715/moneyBagIcon2.png?ex=65cdf841&is=65bb8341&hm=53cf8b2c21891aff78c744655abed808c8c98d91f70b2da12ab1d8b01b5c1b24&",
        },
        {
            category: "รายได้จากสินทรัพย์",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&",
        },
        {
            category: "รายได้อื่นๆ",
            subCategory: "เงินรางวัล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579330262376488/cashGift.png?ex=65cdf847&is=65bb8347&hm=8fcae151cf1bd20770083613acc950edc8d345f382cbdcddb70d480021ce2fe7&",
        },
        {
            category: "รายได้อื่นๆ",
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

export const addFinancials = (user)=>{
    const Transactions = []
    firestore()
    .collection('financials')
    .doc(user.uid)
    .set({
        transactions: Transactions
    })
    .then(()=>{
        console.log("addFinancials success")
    })
    .catch((error) => {
        console.error("Error addFinancials:", error);
        throw error; // สามารถเลือกที่จะ throw ข้อผิดพลาดต่อหน้าไปหรือไม่ก็ได้
    });
}

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

    export const addCategories = (userUID, category, subCategory, photoURL) => {
        const newCategory = {
            category: category,
            subCategory: subCategory,
            photoURL: photoURL
        };

        return firestore()
            .collection('users')
            .doc(userUID)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const existingCategories = doc.data().categories;

                    // เช็คว่า category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                    const isDuplicate = existingCategories.some(category => 
                        category.category === newCategory.category && category.subCategory === newCategory.subCategory
                    );
                    
                    if (!isDuplicate) {
                        // ถ้าไม่มี object ที่มีชื่อซ้ำกันใน array ให้ทำการเพิ่ม
                        return firestore()
                            .collection('users')
                            .doc(userUID)
                            .update({
                                categories: firestore.FieldValue.arrayUnion(newCategory)
                            });
                    } else {
                        // ถ้ามี object ของ categories ที่มีชื่อซ้ำกันแล้วให้แจ้งเตือนว่าไม่สามารถ add ได้
                        console.log('Duplicate category and subCategory. Cannot add.');
                        Alert.alert("มีชื่อรายได้ซ้ำ ไม่สามารถบันทึกได้")
                        return null;
                    }
                } else {
                    console.log("No such document!");
                    return null;
                }
            })
            .then(() => {
                console.log("Category added successfully!");
            })
            //กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
            .catch((error) => {
                console.error("Error adding category:", error);
                throw error;
            });
    };

export const RemoveCategoryIcon = (userUID, selectedItems) => {
    return firestore()
        .collection('users')
        .doc(userUID)
        .update({
            categories: firestore.FieldValue.arrayRemove(...selectedItems)
        })
        .then(() => {
            console.log("Categories removed successfully!");
        })
        .catch((error) => {
            console.error("Error removing categories:", error);
            throw error;
        });
}

export const addTransaction = (userUID, itemData, input, selectedDate)=>{
    const newTransaction = {
        category: itemData.category,
        subCategory: itemData.subCategory,
        photoURL: itemData.photoURL,
        date: selectedDate,
        detail: input.detail,
        value: input.value
    };

    return firestore()
    .collection('financials')
    .doc(userUID)
    .update({
        transactions: firestore.FieldValue.arrayUnion(newTransaction)
    })
    .then(() => {
        console.log("Transactions added successfully!");
    })
    //กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
    .catch((error) => {
        console.error("Error adding transactions:", error);
        throw error;
    });
};

export const  retrieveDataAsset = (userUID)=>{
    const assetData = {
        liquid:[],
        invest:[],
        personal:[]
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'สินทรัพย์สภาพคล่อง'){
                    assetData.liquid.push(element)
                }
                if(element.category == 'สินทรัพย์ลงทุน'){
                    assetData.invest.push(element)
                }
                if(element.category == 'สินทรัพย์ส่วนตัว'){
                    assetData.personal.push(element)
                }
            });

            //console.log(assetData)
            return assetData
        }
    })
}

export const  retrieveDataLiability = (userUID)=>{
    const liabilityData = {
        short:[],
        long:[],
    }

    return firestore()
    .collection('financials')
    .doc(userUID)
    .get()
    .then((data)=>{
        if(data.exists){
            const allData = data.data().transactions;
            //console.log(allData);
            allData.forEach(element => {
                if(element.category == 'หนี้สินระยะสั้น'){
                    liabilityData.short.push(element)
                }
                if(element.category == 'หนี้สินระยะยาว'){
                    liabilityData.long.push(element)
                }
            });

            console.log(liabilityData)
            return liabilityData
        }
    })
}