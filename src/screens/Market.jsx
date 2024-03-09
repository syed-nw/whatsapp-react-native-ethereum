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
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {AppContext} from '../context/Context';
import Colors from '../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionic from 'react-native-vector-icons/Ionicons';
import Category from '../components/Category';
import {Carousel} from 'react-native-auto-carousel';
import Cards from '../components/Cards';

const Market = () => {
  const IMAGES = [
    require('../assets/market_top_carousel/4.png'),
    require('../assets/market_top_carousel/5.png'),
    require('../assets/market_top_carousel/6.png'),
  ];

  const Cards1 = [
    require('../assets/Cards1/1.png'),
    require('../assets/Cards1/2.png'),
    require('../assets/Cards1/3.png'),
    require('../assets/Cards1/4.png'),
  ];

  const Cards2 = [
    require('../assets/Cards2/1.png'),
    require('../assets/Cards2/2.png'),
    require('../assets/Cards2/3.png'),
    
  ];
  const [marketSearchText, setMarketSearchText] = useState('');

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
    balance,
  } = useContext(AppContext);

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {/** Start - menu search text input and search icon */}
        <View style={styles.marketHeader}>
          <Entypo name="menu" color={Colors.light.tint} size={40} />

          <TextInput
            style={styles.marketSearchInput}
            onChangeText={setMarketSearchText}
            value={marketSearchText}
            placeholder="Search ..."
          />
          <View style={styles.marketSearchIcon}>
            <Ionic name="search" color={'white'} size={30} />
          </View>
        </View>
        {/** End - menu search text input and search icon */}

        {/** Start - Categories horizontal menu */}
        <View>
          <ScrollView horizontal>
            <Category icon={'tv'} name={'TVs'} />
            <Category icon={'tablet'} name={'Phones'} />
            <Category icon={'laptop'} name={'Laptops'} />
            <Category icon={'game-controller'} name={'Games'} />
            <Category icon={'book'} name={'Books'} />
            <Category icon={'dribbble'} name={'Sports'} />
          </ScrollView>
        </View>
        {/** End - Categories horizontal menu */}

        {/* Wrapping with view was necessary. Carousel on market landing screen */}
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 250,
            backgroundColor: 'lightgrey',
          }}>
          <Carousel
            autoPlayTime={100}
            data={IMAGES}
            renderItem={item => (
              <View
                key={item}
                style={{width: Dimensions.get('window').width, height: 250}}>
                <Image
                  key={item}
                  // source={require('../assets/market_top_carousel/1.png')}
                  source={item}
                  style={{
                    height: 250,
                    width: Dimensions.get('window').width,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            )}
          />
        </View>
        {/** Carousel ends */}
        <Cards CategoryName={'SHOES'} list={Cards1} />
        <Cards CategoryName={'HOUSEHOLD AND KITCHEN'} list={Cards2} />
      </ScrollView>

      {/** Absolutely positioned */}
      <View style={styles.sellItem}>
        <Entypo name="add-to-list" color={'white'} size={30} />
        <Text style={styles.sellItemText}>Sell</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'yellow',
    flex: 1,
    padding: 5,
  },
  marketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marketSearchInput: {
    borderWidth: 2,
    borderColor: 'darkgrey',
    flex: 1,
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 15,
  },
  marketSearchIcon: {
    backgroundColor: Colors.light.tint,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  sellItem: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: Colors.light.tint,
    height: 70,
    width: 70,
    borderRadius: 35,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellItemText: {
    color: 'white',
    fontSize: 10,
  },
});

export default Market;
