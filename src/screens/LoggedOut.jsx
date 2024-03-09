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

import {AppContext} from '../context/Context';
import Colors from '../constants/Colors';

const LoggedOut = () => {
  const {viewState, setViewState} = useContext(AppContext);

  const proceedClicked = () => {
    setViewState('AllTabs');
  };


  const importClicked = () => {
    setViewState('Import');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>BUY, SELL, CHAT ON BLOCKCHAIN</Text>
      <Image
        style={{width: '85%', height: '50%', resizeMode: 'contain'}}
        source={require('../assets/logo.jpg')}
      />
      <Text>https://www.aptodev.info</Text>
      <TouchableOpacity style={styles.button} onPress={proceedClicked}>
        <Text style={styles.buttonText}>CREATE NEW ACCOUNT</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={importClicked}>
        <Text style={styles.buttonText}>SIGN-IN USING KEY</Text>
      </TouchableOpacity>

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
    fontWeight: 'bold',
    fontSize: 30,
    width: '80%'
  },
  button: {
    backgroundColor: Colors.light.tint,
    width: Dimensions.get('window').width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 13,
  },
});

export default LoggedOut;
