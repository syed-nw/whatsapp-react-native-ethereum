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
  ActivityIndicator
} from 'react-native';

import {AppContext} from '../context/Context';
import Colors from '../constants/Colors';

const Loading = () => {
  const {viewState, setViewState} = useContext(AppContext);

  const proceedClicked = () => {
    setViewState('AllTabs');
  };

  return (
    <View style={styles.mainContainer}>

      <ActivityIndicator size="large" color={Colors.light.tint} />
      {/* <Text style={styles.mainHeading}>LOADING ...</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainHeading: {
    color: Colors.light.tint,
    // fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: Colors.light.lightGreen,
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

export default Loading;
