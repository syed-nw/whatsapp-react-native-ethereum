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
import Entypo from 'react-native-vector-icons/Entypo';
import Ionic from 'react-native-vector-icons/Ionicons';

export default function Category(props) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <Entypo name={props.icon} color={'white'} size={30} />
      </View>
      <Text style={styles.description}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    margin: 10,
    marginVertical: 14
  },
  iconContainer: {
    // backgroundColor: 'lightsalmon',
    backgroundColor: 'grey',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  description: {
    fontSize: 10,
    textAlign: 'center',
  },
});
