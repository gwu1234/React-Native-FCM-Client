import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';;

var firebaseConfig = {
  apiKey: "AIzaSyDUOEdYPx",
  authDomain: "push-notificati",
  databaseURL: "https://push-notif",
  projectId: "push-notif",
  storageBucket: "push-notifi",
  messagingSenderId: "47883",
  appId: "1:478834593960:w",
  measurementId: "G-LT"
};
export const initializeFirebase = () => firebase.initializeApp(firebaseConfig) ;
  

export const askForPermissionToReceiveNotifications = async () => {
  try {
      const settings = await messaging().requestPermission();
      if (settings) {
          console.log('Permission settings:', settings);
      }
  } catch (error) {
      console.log(error);
  }
}
