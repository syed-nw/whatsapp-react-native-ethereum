import React, {useContext, useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ImageBackground,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionic from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BoxingIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {wappContract} from '../contract/contract';
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import Colors from '../constants/Colors';

import ChatListItem from '../components/ChatListItem';
import User1 from '../assets/user1.png';
import User2 from '../assets/user2.png';
import User3 from '../assets/user3.png';
import {AppContext} from '../context/Context';
import {REACT_APP_API, REACT_APP_KEY} from '@env';

export default function ChatScreen() {
  const [msgsFromOthersToMe, setMsgsFromOthersToMe] = useState([]);
  const [currentChatMsgs, setCurrentChatMsgs] = useState([]); // all chat with current user
  const [tempMsgTyped, settempMsgTyped] = useState(''); // The msg user just typed

  const [latestPollMsg, setlatestPollMsg] = useState('');

  
  const {
    viewState,
    setViewState,
    privKey,
    setPrivKey,
    pubKey,
    setPubKey,
    appWeb3Provider,
    setAppWeb3Provider,
    appWallet,
    setAppWallet,
    adressOfUserChattingWith,
    setAddressOfUserChattingWith,
    nameOfUserChattingWith,
    setnameOfUserChattingWith,
    chatterImage,
  } = useContext(AppContext);
  
  const contract = new ethers.Contract(
    '0x895BA5691CD46D8Bc723FDEbF2E2e50DA20f36ea',
    wappContract.abi,
    appWeb3Provider,
  );

  const wallet = new ethers.Wallet(privKey, appWeb3Provider);

  const resolveSetIntervalProblem = async () => {
    let tempJson = {};
    tempJson['content'] = latestPollMsg;
    tempJson['timestamp'] = new Date(Date.now());
    tempJson['isMine'] = false;
    // tempJsonArray.push(tempJson);
    // setCurrentChatMsgs(tempJsonArray);
    // settempMsgTyped('');

    setCurrentChatMsgs(
      // Replace the state
      [
        // with a new array
        ...currentChatMsgs, // that contains all the old items
        tempJson, // and one new item at the end
      ],
    );
  };


  useEffect(() => {
    setInterval(() => {
    
      if (pubKey !== '' && pubKey !== null && pubKey !== undefined) {
        getMessagesFromOthers();
      }
    }, 2000);
  }, [])


  useEffect(() => {
    
    if (
      latestPollMsg !== '' ||
      latestPollMsg !== ' ' ||
      latestPollMsg.length > 3
    ) {
      resolveSetIntervalProblem();
    }
  }, [latestPollMsg]);

  const getMessagesFromOthers = async () => {
    // const contract = new ethers.Contract(
    //   '0x895BA5691CD46D8Bc723FDEbF2E2e50DA20f36ea',
    //   wappContract.abi,
    //   appWeb3Provider,
    // );

    const test = await contract.getLatestMessageSentToUser1();
    setlatestPollMsg(test);
  };

  // setInterval(() => {
    
  //   if (pubKey !== '' && pubKey !== null && pubKey !== undefined) {
  //     getMessagesFromOthers();
  //   }
  // }, 2000);

  const goToAllTabs = () => {
    setViewState('AllTabs');
  };

  const sendMessage = async () => {


    let tempJsonArray = currentChatMsgs;
    let tempJson = {};
    tempJson['content'] = tempMsgTyped.toString();
    tempJson['timestamp'] = new Date(Date.now());
    tempJson['isMine'] = true;
    tempJsonArray.push(tempJson);
    
    setCurrentChatMsgs(tempJsonArray);
    settempMsgTyped('');

    const contract2 = new ethers.Contract(
      '0x895BA5691CD46D8Bc723FDEbF2E2e50DA20f36ea',
      wappContract.abi,
      appWeb3Provider,
    );

    

    const wallet2 = new ethers.Wallet(privKey, appWeb3Provider);
    const contractWithWallet2 = contract2.connect(wallet2);
    
    // console.log(appWeb3Provider)
    // console.log(privKey)
    
    await contractWithWallet2.sendMessageToUser2(tempJson['content']); 
    



    // const contractWithWallet = contract.connect(appWallet);

    // await contractWithWallet.sendMessageDummy(
    //   tempJson['content'],
    //   tempJson['timestamp'],
    //   adressOfUserChattingWith,
    // );
  };

  return (
    <>
      <View style={styles.mainHeader}>
        <TouchableOpacity onPress={goToAllTabs}>
          <Ionic
            name="arrow-back"
            color={'white'}
            size={30}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Image style={styles.image} source={chatterImage} />
        <Text style={styles.whatsapp}>{nameOfUserChattingWith}</Text>

        <View style={styles.headerSubContainer}>
          {/* <FontAwesome
            name="video-camera"
            color={'white'}
            size={20}
            style={styles.headerIcon}
          />
          <FontAwesome
            name="phone"
            color={'white'}
            size={22}
            style={styles.headerIcon}
          /> */}
          <Entypo
            name="dots-three-vertical"
            color={'white'}
            size={20}
            style={styles.headerIcon}
          />
        </View>
      </View>

      <View style={styles.chatContent}>
        {currentChatMsgs.map(item => {
          return (
            <View key={item.timestamp}>
              {item.isMine ? (
                <>
                  {item.content !== '' && item.content !== ' ' ? (
                    <View style={styles.chattextMine}>
                      {/* <Text>{item.content}</Text> */}
                      <Text style={styles.msgTextMine}>{item.content}</Text>
                      <Text style={styles.timestampMine}>
                      {item.timestamp.toString().substring(0,24)}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  {item.content !== '' && item.content !== ' ' ? (
                    <View style={styles.chattextOther}>
                      <Text style={styles.msgTextOther}>{item.content}</Text>
                      <Text style={styles.timestampOther}>
                        {item.timestamp.toString().substring(0,24)}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        {/* <Text>asdasd</Text> */}

        <TextInput
          style={styles.msginput1}
          onChangeText={() => {}}
          value={() => {}}
          placeholder="   😀"
          //   keyboardType="numeric"
        />

        <TextInput
          style={styles.msginput}
          onChangeText={settempMsgTyped}
          value={tempMsgTyped}
          placeholder="Message                              📎  📷"
          //   keyboardType="numeric"
        />
        <View style={styles.microphone}>
          {tempMsgTyped === '' ? (
            <FontAwesome
              name="microphone"
              color={'white'}
              size={20}
              style={styles.headerIcon}
            />
          ) : (
            <TouchableOpacity onPress={sendMessage}>
              <Ionic
                name="send"
                color={'white'}
                size={20}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainHeader: {
    height: '10%',
    backgroundColor: Colors.light.tint,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chattextMine: {
    backgroundColor: Colors.light.chaMessageBG,
    width: '60%',
    margin: 5,
    padding: 10,
    fontWeight: 'bold',
    marginLeft: '39%',
    borderRadius: 15,
  },
  chattextOther: {
    backgroundColor: 'white',
    width: '60%',
    margin: 5,
    padding: 10,
    fontWeight: 'bold',
    // marginLeft: '39%',
    borderRadius: 15,
  },
  msgTextMine: {
    fontWeight: 'bold',
    textAlign: 'right'
  },
  msgTextOther: {
    fontWeight: 'bold',
  },
  timestampOther: {
    color: 'grey',
    fontSize: 10,
  },
  timestampMine: {
    color: 'grey',
    fontSize: 10,
    textAlign: 'right'
  },
  chatContent: {
    // height: '81%',
    flex: 1,
    backgroundColor: '#E3DDD4',
  },
  footer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#E3DDD4',
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  microphone: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msginput1: {
    backgroundColor: 'white',
    height: '67%',
    width: '14%',
    marginLeft: 2,
    marginVertical: 2,
    // borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
  },
  msginput: {
    backgroundColor: 'white',
    height: '67%',
    width: '70%',
    marginRight: 2,
    marginVertical: 2,
    // borderRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerSubContainer: {
    flexDirection: 'row',
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  whatsapp: {
    color: 'white',
    fontSize: 18,
    flex: 1,
    // backgroundColor: 'yellow'
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 4,
  },
  backArrow: {},
});
