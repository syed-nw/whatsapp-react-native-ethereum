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
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

import {AppContext} from '../context/Context';
import Colors from '../constants/Colors';

import {REACT_APP_API, REACT_APP_KEY} from '@env';

import {wappContract} from '../contract/contract';

const ImportKey = () => {
  const [text, onChangeText] = useState('');
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
    setBalance
  } = useContext(AppContext);

  const importAndSetKeys = async () => {
    setViewState('Loading');
    if (text.length !== 64 && text.length !== 66) {
      alert('Private key invalid');
      // LoggedOut
      setViewState('LoggedOut');
      return;
    }


    // set private key into global context
    // text contains the privatekey tped by the user
    setPrivKey(text);


    // const url = 'http://127.0.0.1:8545';
    // const provider = new ethers.providers.JsonRpcProvider('HTTP://192.168.43.183:7545')
    const provider = new ethers.providers.JsonRpcProvider(REACT_APP_API);

    const contract = new ethers.Contract(
      '0x895BA5691CD46D8Bc723FDEbF2E2e50DA20f36ea',
      wappContract.abi,
      provider,
    );

    // const test = await contract.getstring()             // working
    // console.log("aaaaaaaa" + test);      // working

    /** Writing working */
    // const wallet = new ethers.Wallet(REACT_APP_KEY, provider);
    const wallet = new ethers.Wallet(text, provider);
    setPubKey(wallet.address);
    const walletbalance = await provider.getBalance(wallet.address);

    setBalance(ethers.utils.formatEther(walletbalance).substring(0,7));

    setAppWeb3Provider(provider);
    setAppWallet(wallet);

    // const contractWithWallet = contract.connect(wallet);
    // await contractWithWallet.setteststring('reactnative');
    // console.log("written to BC")

    setViewState('AllTabs');

    // Very old useless experimental code
    // const provider = new ethers.providers.JsonRpcProvider(url, 3777);
    // const balance = await provider.getBalance('0xf1DbA6919548027759bA74DC316f65633F9C371a')
    // Getting the accounts
    // const signer0 = provider.getSigner(0);
    // const signer1 = provider.getSigner(1);
    // console.log(signer0)

    // console.log( ethers.utils.formatEther(balance) )   // for real
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>Import Key</Text>

      <TextInput
        style={styles.input}
        multiline={true}
        placeholder={'Paste your key here prefixed with 0x ....'}
        onChangeText={onChangeText}
        value={text}
      />
      <TouchableOpacity style={styles.button} onPress={importAndSetKeys}>
        <Text style={styles.buttonText}>IMPORT</Text>
      </TouchableOpacity>

      {/* <Text style={styles.mainHeading}>Opening ...</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    height: '40%',
    width: '100%',
    marginVertical: '10%',
    borderWidth: 4,
    borderColor: Colors.light.tint,
    padding: 10,
    borderRadius: 20,
    color: 'grey',
  },
  mainHeading: {
    color: Colors.light.tint,
    // fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.light.tint,
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 13,
  },
});

export default ImportKey;
