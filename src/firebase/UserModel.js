import firestore from '@react-native-firebase/firestore';

export const addUser = (user, profile, success, unsuccess)=>{
    console.log(`addUser in UserModel user id: ${user.uid}`)

    categories = [
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "เงินเดือน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285442662412369/cashIcon2.png?ex=65cce692&is=65ba7192&hm=c5ca97ec3ece03777f03104da0986ac21524e2b8295c08e25e696d24286e0c9b&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "ค่าจ้าง",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285491974574190/cashIcon1.png?ex=65cce69e&is=65ba719e&hm=dccf06d1d6aa56da900737652683b442e4d95279d41a743352e70975a0daa84e&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "โบนัส",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285517266505800/coinIcon.png?ex=65cce6a4&is=65ba71a4&hm=9a806b21dc42d9cb74290e7495e411ddc05969c648796f8ae7c54fcfd7cf1953&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "คอมมิชชัน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285536837120000/moneyBagIcon.png?ex=65cce6a9&is=65ba71a9&hm=341087710d064155bbb00b1bd78c50a7246b87616c9e8e1e71804006b85ab279&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากการทำงาน",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "ดอกเบี้ย",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579229234040882/cashTimeIcon.png?ex=65cdf82f&is=65bb832f&hm=72ce112b5ec39c60cd125d93d39b57bb691374791ba26ccafc77ffd5c376891f&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "เงินปันผล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579253250498630/cashPerson.png?ex=65cdf834&is=65bb8334&hm=303320eceb5498c6b79b75d0c839d08350499fc75d317439bf0fdbd374f6e609&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "ค่าเช่า",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579280140177410/cashCoinIcon.png?ex=65cdf83b&is=65bb833b&hm=aac682e5805c23a4e737d2f20b44fa8252936d6e8ebdf191a46d2f8166313236&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "ค่าขายสินทรัพย์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579304937029715/moneyBagIcon2.png?ex=65cdf841&is=65bb8341&hm=53cf8b2c21891aff78c744655abed808c8c98d91f70b2da12ab1d8b01b5c1b24&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้จากสินทรัพย์",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้อื่นๆ",
            subCategory: "เงินรางวัล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202579330262376488/cashGift.png?ex=65cdf847&is=65bb8347&hm=8fcae151cf1bd20770083613acc950edc8d345f382cbdcddb70d480021ce2fe7&",
        },
        {
            transactionType:"รายได้",
            category: "รายได้อื่นๆ",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&",
        },
        // Expensese
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "อาหาร",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433686733398036/pajamas_food.png?ex=65d4b748&is=65c24248&hm=dbe58d3297445bbe1e8ea433dea80ab5eae95b78a7483011a13cff9fc6f542c1&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "สาธารณูป\n      โภค",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433688264183808/tdesign_bill.png?ex=65d4b748&is=65c24248&hm=345382473e90edbd9ac57ab316c1d483b73b31af50a92d246921d78369f7600e&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ค่าเดินทาง",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433688033501274/mdi_oil.png?ex=65d4b748&is=65c24248&hm=5385b40eaa6ff3ef399210c5a046799b0856f9473bd9650c4dd872d56e42b5d5&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "เสริมสวย",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433687832166491/mingcute_hair-2-line.png?ex=65d4b748&is=65c24248&hm=7b093bb8405872a00092166eafe208353ce5d9f540588458e1417af928751e04&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ค่ารักษาพยาบาล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433687630970921/mdi_hospital.png?ex=65d4b748&is=65c24248&hm=2792be563323ff9058a12cd8395d5f4111232f7678e227fccac25161fa6dcefc&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ชำระหนี้",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433687421386763/iconoir_hand-cash.png?ex=65d4b748&is=65c24248&hm=e9574c992de862ad7c9d1f5e9880797f1c2465317d959e93f0c9a3213fff4c24&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ภาษี",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433687186509854/memory_cash.png?ex=65d4b748&is=65c24248&hm=3445ef97bb8e3eddcefa380c2656965939c3d5285a87ea9ffb3815f0a60c7be6&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "ของใช้ในบ้าน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433686972604436/Mask_group.png?ex=65d4b748&is=65c24248&hm=9f0cd365a71b9acd27f3f42e5f176b60e09571753fd5aba03fd54e32f4d76846&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายผันแปร",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าผ่อน/\nเช่าบ้าน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433758506459166/mdi_cash-plus.png?ex=65d4b759&is=65c24259&hm=03a60133bfc4cb50a639e225539af4557b5c7dd2650b08d7e593c4f2a91c165e&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าผ่อนรถ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433758506459166/mdi_cash-plus.png?ex=65d4b759&is=65c24259&hm=03a60133bfc4cb50a639e225539af4557b5c7dd2650b08d7e593c4f2a91c165e&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าผ่อนสินค้า",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433758128967740/mdi_cash-clock.png?ex=65d4b759&is=65c24259&hm=5b9a8ae719df1b21a4eb9e98a2cc9c3d5de51ced3d1bf51a1990f4c2bbeb55d4&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "    ค่าผ่อน\nหนี้นอกระบบ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433757881376768/mdi_cash-remove.png?ex=65d4b759&is=65c24259&hm=de1ac939e335084ea57035bd68f3b9878f7747c8cc2d335aad5b4a241f03ad82&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "  ค่าผ่อน\n   สินเชื้อ\nส่วนบุคคล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433757579509860/mdi_cash-fast.png?ex=65d4b759&is=65c24259&hm=3d4e0f10efbbb7d285f25f3de49bbc990010b31de407a196215502390d57cf4e&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "   ค่าผ่อน\nหนี้กยศ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433757323403294/mdi_cash-lock.png?ex=65d4b759&is=65c24259&hm=d0952ae3fb64a13d98c048516f9e78ff757ea4ad4656aaca4cc80a458f703039&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "    ค่าผ่อน\nหนี้สหกรณ์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433757097033748/mdi_cash-refund.png?ex=65d4b758&is=65c24258&hm=4a935f444c51d5231c50eca4f1809280c41ae878fd815ce1dedd9f390d9e5466&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "ค่าเบี้ยประกัน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433758506459166/mdi_cash-plus.png?ex=65d4b759&is=65c24259&hm=03a60133bfc4cb50a639e225539af4557b5c7dd2650b08d7e593c4f2a91c165e&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายคงที่",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน",
            subCategory: "ประกันสังคม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433815829741578/streamline_insurance-hand-solid.png?ex=65d4b766&is=65c24266&hm=ea2f2d5f60f2870b787e1d8f89532f2ed83c08e55c477abb8d3ead9e38d59b31&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน",
            subCategory: "สวัสดิการ\n การออม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433815490273310/streamline_give-gift-solid.png?ex=65d4b766&is=65c24266&hm=db0247e222caf1735bafcbb895512f568843be4be15c3eef5ba93da09006e380&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน",
            subCategory: "เงินออม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433815284490250/tdesign_saving-pot.png?ex=65d4b766&is=65c24266&hm=e8e265bd5d90a8eb205b4e21b6b25f096bae4a3c2572b40c0a7001452686a799&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน",
            subCategory: "เงินลงทุน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204433815032954880/streamline_investment-selection-solid.png?ex=65d4b766&is=65c24266&hm=c4f2a8a5180c7cd11405f8d1e162384ce88831450107895477a0835f4a32b4ab&"
        },
        {
            transactionType:"ค่าใช้จ่าย",
            category: "ค่าใช้จ่ายออมและลงทุน",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        //Asset
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "เงินสด",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435332683137035/mdi_cash.png?ex=65d4b8d0&is=65c243d0&hm=9eb5de5f54ff2be9653c6809411e60d81d772fdf5666b2e664b4fa95bfb7a3af&",
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "  เงินฝาก\nออมทรัพย์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435332439740456/tabler_cash.png?ex=65d4b8d0&is=65c243d0&hm=03ace3c90240752d7692e5d018962e9b9fdb17dd90dad7cdfe39a4e3a77f01fe&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "      เงิน\nฝากประจำ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435332146143322/tdesign_money.png?ex=65d4b8d0&is=65c243d0&hm=3a7e0437b26fd94039ee446e9905138416252d722022a039714fea4645af610d&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "    เงินฝาก\nกระแสรายวัน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435331940884500/bi_cash-coin.png?ex=65d4b8d0&is=65c243d0&hm=780234dd2fc5a70d6e7d6751637e3fbd6b011967fd06c2db7ba293cfada8dbd7&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์สภาพคล่อง",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "สลากออม\n    ทรัพย์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435375917891624/mdi_cash-100.png?ex=65d4b8da&is=65c243da&hm=e4dfb78aa18f5641893d7f09d64bfa5a6551104b883be2da1c92c24c8c1173f1&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "หุ้นสหกรณ์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435375452459088/Vector.png?ex=65d4b8da&is=65c243da&hm=1b0190d5bf60412ded15f483d1c6cb7155ddfac93051c92d028577a4bea5b956&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "กองทุนออม\n   เพื่อการ\n   เกษียณ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435375175761930/streamline_investment-selection-solid.png?ex=65d4b8da&is=65c243da&hm=458eba1bdaff2b8a2e28c5f5d0991432a63ea22262d1e6021a6fc7d58b5dee5f&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "ตราสารหนี้",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435374533902448/mdi_cash-edit.png?ex=65d4b8da&is=65c243da&hm=077a95ef525f4a8f750676188edaa2afac2443585fc9981d94df966c7906404b&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "กองทุนรวม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435375452459088/Vector.png?ex=65d4b8da&is=65c243da&hm=1b0190d5bf60412ded15f483d1c6cb7155ddfac93051c92d028577a4bea5b956&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "หุ้นสามัญ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435374265344040/mingcute_stock-line.png?ex=65d4b8da&is=65c243da&hm=fa89ddd4ae9b6d6473881d3548755b4ec8763cb517fc2df3b54fc77a9fd295f9&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "  อสังหาฯ\n(ขาย/เช่า)",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435373606969344/mdi_house-city-outline.png?ex=65d4b8da&is=65c243da&hm=67d56b57ff0f09fc338ef64c4ebc97b5d232f4c123c34c2732ad8abe8518ab68&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: " กรมธรรม์\nประกันชีวิต",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435373363826688/LifeInsurance.png?ex=65d4b8da&is=65c243da&hm=f4ab29aac1415a4b367204e46aa5c4a910240380cf9d26dd9170743e90bd7ee2&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ลงทุน",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "  อสังหาฯ\n(อยู่อาศัย)",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435410042888202/mdi_house-city-outline.png?ex=65d4b8e3&is=65c243e3&hm=9887b716de3a7e663dd299a0226e2e2f5fe4bfd613050800da0900ad16956b1c&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "รถ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435409787158599/maki_car.png?ex=65d4b8e3&is=65c243e3&hm=a797a669ac76ba800c877fdf265d15fd0be5e50c2547bf6afb211d33836b6d33&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "เครื่องประดับ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435409505878016/map_jewelry-store.png?ex=65d4b8e2&is=65c243e2&hm=1708923ae17086f96f617bfe9153730f5639a615d91dc845f90838b37f88bd3c&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "เครื่องใช้ใน\n      บ้าน",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204435409145434143/Mask_group.png?ex=65d4b8e2&is=65c243e2&hm=83df901fab3e6ce0982cbc0214e7feaa8cdc84864a33aa3257d4846606762061&"
        },
        {
            transactionType:"สินทรัพย์",
            category: "สินทรัพย์ส่วนตัว",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        //Liability
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "      หนี้\nนอกระบบ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437111718150205/Group.png?ex=65d4ba78&is=65c24578&hm=271ec956bb8f39be8580012b569ac6e479b24f05be4336c6b62600e68ce4ff72&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "       หนี้\nบัตรเครดิต",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437111479210124/bytesize_creditcard.png?ex=65d4ba78&is=65c24578&hm=b166e1f2f5b81dd0a801533ce66b6d4309794c1c85e2a1fa351bd31fe0fb25a6&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "        หนี้\nผ่อนซื้อสินค้า",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437111269236776/ProductInstallmentDebt.png?ex=65d4ba78&is=65c24578&hm=c9a52c0f736b8351763fe22454fe9aaef4a99bc5ace250a63131aa4a45fa7416&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "หนี้สินจาก\n สินทรัพย์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437111059513384/LiabilitiesFromAssets.png?ex=65d4ba78&is=65c24578&hm=fc9c3953721344584f2307a8824a17cf44ed1d754e3a958695eacbd731faa2e8&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะสั้น",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้ที่อยู่อาศัย",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437146405175436/HousingDebt.png?ex=65d4ba81&is=65c24581&hm=0a736b439ac7c5b262a35874cdbce4eb4acd340514edbebd3e3fb7183e9004bd&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้รถ",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437146065174579/CarDebt.png?ex=65d4ba80&is=65c24580&hm=b726113bf5583a5f175601f68e91c81c30990c483c77c4eeed933c1aa7b91ddd&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้สินเชื่อ\nส่วนบุคคล",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437145801072670/PersonalLoanDebt.png?ex=65d4ba80&is=65c24580&hm=4b7922bdac4c790c8b1794c2f0978237a2ff760dc05e32fae1ef36f600549a01&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้กยศ.",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437145440489553/StudentLLoanFundDebt.png?ex=65d4ba80&is=65c24580&hm=466e56c1ef7ec4b62525bd4878988687cdaaff980959bfb11283458dc67cc2de&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้สหกรณ์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437145180307526/CooperativeDebt.png?ex=65d4ba80&is=65c24580&hm=540be0f6034037411939a8f9bea2fe38f4b236a44019907e1ad2bca545fabbda&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "หนี้สินจากสินทรัพย์",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1204437144907816980/LiabilitiesFromAssets.png?ex=65d4ba80&is=65c24580&hm=3ee4571cf4540a3f7a0930af2efb55a76b17f4108f3e201eeb6801bf04a43042&"
        },
        {
            transactionType: "หนี้สิน",
            category: "หนี้สินระยะยาว",
            subCategory: "เพิ่ม",
            photoURL: "https://cdn.discordapp.com/attachments/1202281623585034250/1202285553274605638/addIcon.png?ex=65cce6ad&is=65ba71ad&hm=63a2934e36100b8820891cc93759bea72d3219514dfe2379ad59b88b56ae7116&"
        }
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
//ดึงหัวข้อ Icon
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

export const addCategories = (userUID,transactionType,category, subCategory, photoURL) => {
    const newCategory = {
        transactionType: transactionType,
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

                // เช็คว่า transactionTpe และ category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                const isDuplicate = existingCategories.some(category => 
                    category.transactionType === newCategory.transactionType && category.category === newCategory.category && category.subCategory === newCategory.subCategory
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
                    Alert.alert("มีชื่อซ้ำ ไม่สามารถบันทึกได้")
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
export const addCategoriesExpenses = (userUID,category, subCategory, photoURL) => {
    const newCategory = {
        transactionType: "ค่าใช้จ่าย",
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

                // เช็คว่า transactionTpe และ category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                const isDuplicate = existingCategories.some(category => 
                    category.transactionType === newCategory.transactionType && category.category === newCategory.category && category.subCategory === newCategory.subCategory
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
                    Alert.alert("มีชื่อซ้ำ ไม่สามารถบันทึกได้")
                    return null;
                }
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .then(() => {
            onsole.log("Category added successfully!");
        })
        //กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding category:", error);
            throw error;
        });
};
export const addCategoriesAsset = (userUID,category, subCategory, photoURL) => {
    const newCategory = {
        transactionType: "สินทรัพย์",
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

                // เช็คว่า transactionTpe และ category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                const isDuplicate = existingCategories.some(category => 
                    category.transactionType === newCategory.transactionType && category.category === newCategory.category && category.subCategory === newCategory.subCategory
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
                    Alert.alert("มีชื่อซ้ำ ไม่สามารถบันทึกได้")
                    return null;
                }
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .then(() => {
            onsole.log("Category added successfully!");
        })
        //กรณีเกิดข้อผิดพลาดในการ add ข้อมูล
        .catch((error) => {
            console.error("Error adding category:", error);
            throw error;
        });
};
export const addCategoriesLiability = (userUID,category, subCategory, photoURL) => {
    const newCategory = {
        transactionType: "หนี้สิน",
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

                // เช็คว่า transactionTpe และ category และ subCategory ที่จะเพิ่มเข้าไปมีอยู่แล้วหรือไม่
                const isDuplicate = existingCategories.some(category => 
                    category.transactionType === newCategory.transactionType && category.category === newCategory.category && category.subCategory === newCategory.subCategory
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
                    Alert.alert("มีชื่อซ้ำ ไม่สามารถบันทึกได้")
                    return null;
                }
            } else {
                console.log("No such document!");
                return null;
            }
        })
        .then(() => {
            onsole.log("Category added successfully!");
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
        transactionType: itemData.transactionType,
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
//ดึง value ทั้งหมด
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