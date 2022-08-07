import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcmBaZz7R8hSBR8cwW0dw0M2zCPr1_KII",
    authDomain: "trip-planner-c9cf8.firebaseapp.com",
    projectId: "trip-planner-c9cf8",
    storageBucket: "trip-planner-c9cf8.appspot.com",
    messagingSenderId: "208922835695",
    appId: "1:208922835695:web:be221272a259ce540d391a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export const db = getFirestore(app);

export const registerUser = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user.providerData[0];
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }
}

export const signoutUser = async () => {
    try {
        await signOut(auth);
        alert('Signed out successfully!');
        return true;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }

}

export const saveUser = async (id) => {
    try {
        const userRef = doc(db, "users", id);
        const response = await getDoc(userRef);
            if (response.exists()) {
                return response.data();
            }
        else {
            try {
                await setDoc(doc(db, "users", id), {
                    // id as placeholders, will update later after edits
                    name: id,
                    location: id,
                    profession: id,
                    visited: ['placeholder'],
                    trips: {
                        upcoming: ['placeholder'],
                        completed: ['placeholde'],
                        cancelled: ['placeholder']
                    }
                })
                return true;
            }
            catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
                return null;
            }
        }  
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }
}

export const updateUser = async (id, name, location, profession) => {
    try {
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, {
            name: name,
            location: location,
            profession: profession
        })
        return true;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }
}

export const fetchTrips = async (id) => {
    try {
        const userRef = doc(db, "users", id);
        const response = await getDoc(userRef); 
        if (response.exists()) {
            return response.data();
        }
        else {
            return null;
        }
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }
}

export const updateTrips = async (id, tripsArr) => {
    try {
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, {
            trips: tripsArr
        })
        return true;
    }
    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        return null;
    }
}