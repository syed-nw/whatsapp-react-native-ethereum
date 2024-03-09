/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  BackHandler,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import * as RNFS from 'react-native-fs';
import {AppContext} from './src/context/Context';
import LoggedOut from './src/screens/LoggedOut';
import AllAppTabs from './src/screens/AllAppTabs';
import Loading from './src/screens/Loading';
import ImportKey from './src/screens/ImportKey';
import ChatScreen from './src/screens/ChatScreen';

const App = () => {
  // const [infoState, setInfoState] = useState('');

  const [viewState, setViewState] = useState('Opening');    // global state
  const [privKey, setPrivKey] = useState(''); // my own private key  // global
  const [pubKey, setPubKey] = useState(''); // my own public key    // global
  const [balance, setBalance] = useState(''); // balance   // global


  const [appWeb3Provider, setAppWeb3Provider] = useState();
  const [appWallet, setAppWallet] = useState();

  // states when chatting 1 - 1
  const [adressOfUserChattingWith, setAddressOfUserChattingWith] = useState('');
  const [nameOfUserChattingWith, setnameOfUserChattingWith] = useState('');
  const [chatterImage, setChatterImage] = useState('');

  const value = {
    viewState,
    setViewState,
    // infoState,
    // setInfoState,
    appWeb3Provider,
    setAppWeb3Provider,
    appWallet,
    setAppWallet,
    privKey,
    setPrivKey,
    pubKey,
    setPubKey,
    adressOfUserChattingWith,
    setAddressOfUserChattingWith,
    nameOfUserChattingWith,
    setnameOfUserChattingWith,
    chatterImage, 
    setChatterImage,
    balance,
    setBalance
  };

  const backAction = () => {
    if (viewState === 'ChatScreen') {
      setViewState('AllTabs');
      // return true;
    }

    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const checkLogIn = async () => {
    const KeyFilePath = RNFS.DocumentDirectoryPath + '/key.json';
    try {
      let res = await RNFS.readFile(KeyFilePath, 'ascii');
      console.log(res);
    } catch (err) {
      setViewState('LoggedOut');
      // try {
      //   (async () => {
      //     await generateKey();
      //     await RNFS.writeFile(KeyFilePath, privateKey, 'ascii');
      //   })();
      // } catch (err) {}
    }
    // return keyPair;
  };

  useEffect(() => {
    checkLogIn();
  }, []);

  return (
    <>
      <AppContext.Provider value={value}>
        {viewState === 'Loading' ? <Loading /> : <></>}
        {viewState === 'Import' ? <ImportKey /> : <></>}
        {viewState === 'LoggedOut' ? <LoggedOut /> : <></>}
        {viewState === 'AllTabs' ? <AllAppTabs /> : <></>}
        {viewState === 'ChatScreen' ? <ChatScreen /> : <></>}
      </AppContext.Provider>
    </>
  );
};

export default App;
