import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Header, Button, Icon} from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';

export default class App extends Component {
  constructor(props) {
     super(props);
     this.state = { 
        token: null ,
        message: null
     };
  }

async componentDidMount() {
  this.checkPermission();
}

async checkPermission() {
  const enabled = await messaging().hasPermission();
  if (enabled) {
      this.getToken();
      messaging().onMessage((payload) => {
          console.log('Message received. ', payload);
          this.setState ({
            message: payload
          })
      });
  } else {
      this.requestPermission();
  }
}

async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  //console.log(fcmToken);
  this.setState({token:fcmToken});
  if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
          this.setState({token:fcmToken});
      }
  }
}

async requestPermission() {
  try {
      await messaging().requestPermission();
      this.getToken();
  } catch (error) {
      console.log('permission rejected');
  }
}

render() {
    const {token, message} = this.state;
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
                onPress={()=>console.log("onPress")} 
                />
                <Text h4 style={styles.text}> {token} </Text>
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
  },
  text: {
     margin: 40
  }
});
