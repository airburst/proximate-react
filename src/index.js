import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

// Setup Firebase
const config = {
    apiKey: "AIzaSyDGe_FmSZBr74_Eo9rbe-Ld9r264Ay47hE",
    authDomain: "proximo-55720.firebaseapp.com",
    databaseURL: "https://proximo-55720.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

// Touch Tap Plugin
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));