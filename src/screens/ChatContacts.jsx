import React, {useContext, useState} from 'react';

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
} from 'react-native';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import { wappContract } from '../contract/contract';

import ChatListItem from '../components/ChatListItem';
import User1 from '../assets/user1.png';
import User2 from '../assets/user2.png';
import User3 from '../assets/user3.png';
import {AppContext} from '../context/Context';

let contacts = [
  {
    pic: User1,
    name: 'Einstein',
    userAddress: '0x98696E6613072BD248984bdA3Ca056E21635C303'
  },
  {
    pic: User2,
    name: 'Neils Bohr',
    userAddress: '0x98696E6613072BD248984bdA3Ca056E21635C303'
  },
  // {
  //   pic: User3,
  //   name: 'Newton',
  //   userAddress: '0x98696E6613072BD248984bdA3Ca056E21635C303'
  // },
];

export default function ChatContacts() {
  const [msgsFromOthersToMe, setMsgsFromOthersToMe] = useState([]);

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
  } = useContext(AppContext);

  const getMessagesFromOthers = async () => {
    console.log("Inside chat screen contract invocation function");
    const contract = new ethers.Contract(
      '0x40CbD271A6E1d1c386320e1f571A9F198BAba32f',
      wappContract.abi,
      appWeb3Provider,
    );

    
    const test = await contract.getstring();
    console.log(test);
  };

  setInterval(() => {
    // console.log(pubKey);
    if (pubKey !== '' && pubKey !== null && pubKey !== undefined) {
      // getMessagesFromOthers();
    }
  }, 2000);

  return (
    <View style={styles.outermostContainer}>
      {/* <Text style={styles.publicKey}>{pubKey}</Text> */}
      {/* <ChatListItem dp={User1} userName={'Einstein'} />
      <ChatListItem dp={User2} userName={'Neils Bohr'}  />
      <ChatListItem dp={User3} userName={'Newton'}  /> */}

      {contacts.map(item => {
        return <ChatListItem key={item.name} dp={item.pic} userName={item.name} userPubKey={item.userAddress} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  outermostContainer: {
    flex: 1,
    backgroundColor: 'white',
    // margin: 10
  },
  publicKey: {
    fontSize: 12,
    // backgroundColor: 'yellow',
    textAlign: 'center',
  },
});
