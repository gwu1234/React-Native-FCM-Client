import * as React  from 'react';
//import { Platform, StyleSheet, View } from 'react-native';
//import firebase from 'firebase';
import * as firebase from 'firebase';
import messaging from '@react-native-firebase/messaging';
//import '@firebase/messaging';
import { View, StyleSheet, Dimensions } from 'react-native';
//import {Container,Header,Body,Title,Left,Right,Content,Button,Text } from 'native-base'
import {Header, Button, Icon} from 'react-native-elements';
//import firebase from 'firebase';
//import "./App.css"
import { initializeFirebase, askForPermissionToReceiveNotifications } from './push-notification';
//import { initializeFirebase } from './push-notification';

//initializeFirebase();

//const instructions = Platform.select({
//  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
//});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
       message: null 
    };
    //initializeFirebase();
    //this.messaging = firebase.messaging();
}

//const messaging = firebase.messaging();
componentDidMount() {
  //initializeFirebase();
  //const messaging = firebase.messaging(async remoteMessage => {
  //  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //});;
  //const unsubscribe = messaging().onMessage(async remoteMessage => {
  //  Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //});
  //this.messaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //     this.setState ({message: payload})
  //});
  //this.requestUserPermission();

  //const settings = await messaging().requestPermission();

  //if (settings) {
  //    console.log('Permission settings:', settings);
  //}
   this.requestUserPermission();
}

async requestUserPermission() {
  const settings = await messaging().requestPermission();

  if (settings) {
    console.log('Permission settings:', settings);
  }
}

  //handleClick = () => {
  //    console.log ('Button clicked!');
  //}

  render () {
    return (
      <View style={styles.container}>
          <Header
            containerStyle={{
              height: 0.08 * Dimensions.get('window').height
            }}
            centerComponent={{ text: 'FCM Client', style: { color: 'white', textAlign: 'center'}}}
          />
          <View style={styles.view}>
             <Button
                color="white"
                title="Request FCM Token"
                icon={<Icon size={22} color="orange" type="ionicon" name="md-photos" style={{ marginRight: 10 }}/>}
                titleStyle={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                }}
                buttonStyle={{
                  borderWidth: 3,
                  borderRadius: 10,
                  paddingLeft: 10,
                  borderColor: 'black',
                  backgroundColor: 'blue',
                  elevation: 3,
                }}
                containerStyle={{
                  marginBottom: 0,
                  marginRight: 0,
                  padding: 0,
                  width: 200,
                }}
                onPress={askForPermissionToReceiveNotifications} 
                />
        </View>
    </View>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  }
});
