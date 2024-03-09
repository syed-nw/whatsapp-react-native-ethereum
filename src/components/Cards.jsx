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

export default function Cards(props) {
  return (
    <View style={styles.componentContainer}>
        <Text style={styles.heading}>{props.CategoryName}</Text>
        <ScrollView horizontal>
            {
                props.list.map((item) => 
                    {return (
                        <View key={item} style={styles.cardItem}>
                            <Image 
                                source={item}
                            />
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>VIEW</Text>

                            </TouchableOpacity>

                        </View>
                    )}
                
                )
            }

        </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
    componentContainer: {
        marginVertical: 7
    },
    heading: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 17
    },
    cardItem: {
        backgroundColor: 'lightgrey',
        marginRight: 10
    },
    button: {
        backgroundColor: 'tomato',
        borderRadius: 10,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'

    }

});
