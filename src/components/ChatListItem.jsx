import {useLinkProps} from '@react-navigation/native';
import React, {useContext} from 'react';

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
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';

import {AppContext} from '../context/Context';

export default function ChatListItem(props) {

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
    setChatterImage,
  } = useContext(AppContext);

  return (
    <TouchableOpacity onPress={() => {
                                          setViewState('ChatScreen')
                                          setAddressOfUserChattingWith(props.userPubKey)
                                          setnameOfUserChattingWith(props.userName)
                                          setChatterImage(props.dp)
                                          }}>
      <View style={styles.outermostCOntainer}>
        {/* <Text>tttttttasdasd</Text> */}
        <Image style={styles.dpContainer} source={props.dp} />
        <View style={styles.subContainer1}>
          <Text style={styles.text1}>{props.userName}</Text>
          <Text style={styles.text2}> </Text>
        </View>
        <View style={styles.subContainer2}>
          {/* <Text style={styles.text3}>Time</Text>
          <Text style={styles.text4}>Icon</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outermostCOntainer: {
    // backgroundColor: 'yellow',
    height: 95,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dpContainer: {
    height: 72,
    width: 72,
    borderRadius: 36,
    marginHorizontal: 12,
  },
  subContainer1: {
    flex: 1,
    flexDirection: 'column',
  },
  subContainer2: {
    height: 95,
    width: 95,
    // backgroundColor: 'lightgrey',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 12,
  },
  text1: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginVertical: 3,
  },
  text2: {
    // fontWeight: 'bold',
    color: 'darkgray',
    fontSize: 16,
    marginVertical: 3,
  },
  text3: {
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 3,
  },
  text4: {
    marginVertical: 3,
  },
});
