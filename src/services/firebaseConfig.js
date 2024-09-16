import {initializeApp} from 'firebase/app'
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
    apiKey: "AIzaSyAiqRMyT99sLt176nPiulm6K0brORBDtRE",
    authDomain: "day-training-app.firebaseapp.com",
    projectId: "day-training-app",
    storageBucket: "day-training-app.appspot.com",
    messagingSenderId: "674885575974",
    appId: "1:674885575974:web:299bbe01a06ef290888de7",
    measurementId: "G-L6NX3QPN6R"
}

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {persistence: getReactNativePersistence(ReactNativeAsyncStorage)})

export {app, auth}