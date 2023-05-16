import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyAZKfljpshiOHEgtfVoOV_1_I9OU3TFLMg",
    authDomain: "apiproject-1786e.firebaseapp.com",
    projectId: "apiproject-1786e",
    storageBucket: "apiproject-1786e.appspot.com",
    messagingSenderId: "129827289409",
    appId: "1:129827289409:web:76732e2dc91f2fb9b3c9c0",
    measurementId: "G-WKWGPDRLHE"
});
 
// Firebase storage reference
const storage = getStorage(app);

export default storage;