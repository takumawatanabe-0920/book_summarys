import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCsEcJGVCXkAS8WbGJznB71iY7r_Ca8B20',
  authDomain: 'share-note-0920.firebaseapp.com',
  databaseURL: 'https://share-note-0920-default-rtdb.firebaseio.com',
  projectId: 'share-note-0920',
  storageBucket: 'share-note-0920.appspot.com',
  messagingSenderId:
    'AAAA4PYc0_A:APA91bGGxWGn-W6GpYeci1rLFH-Gc_ugapom60DmWw12sOUpkIMKDBjyxyh_dytwGzHySSrUpgMpXA-uCENdJcRYJqrx3H2JMOwfOxmF2G3gzw0jw91mFrh9zxm0zHQRphl_1JdG00YN',
  // appId: '1:366733885061:web:abd1767f95da2514a0f3ec',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { firebase, storage };
