import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
import Cookies from 'js-cookie';
import { generateToken, setTokenCookie, removeTokenCookie, getCurrentUser } from './token';

const COLLECTION_NAME = 'contacts';

// Generate a simple token (you can use JWT or any other token generation method)
export const loginWithEmailPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, COLLECTION_NAME, user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    
    // Create user object
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || userData?.name || user.email,
      photoURL: user.photoURL || null
    };
    
    // Generate and store token
    const token = generateToken(userInfo);
    setTokenCookie(token);
    
    // Store user info in cookie
    Cookies.set('user', JSON.stringify(userInfo), { expires: 2/24 }); // 2 hours
    
    return { success: true, user: userInfo };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signupWithEmailPassword = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, { displayName: name });
    
    // Save user to Firestore collection "contacts"
    await setDoc(doc(db, COLLECTION_NAME, user.uid), {
      name,
      email,
      uid: user.uid,
      createdAt: new Date().toISOString()
    });
    
    // Create user object
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      photoURL: null
    };
    
    // Generate and store token
    const token = generateToken(userInfo);
    setTokenCookie(token);
    
    // Store user info in cookie
    Cookies.set('user', JSON.stringify(userInfo), { expires: 2/24 }); // 2 hours
    
    return { success: true, user: userInfo };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore, if not create it
    const userDoc = await getDoc(doc(db, COLLECTION_NAME, user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, COLLECTION_NAME, user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });
    }
    
    // Create user object
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email,
      photoURL: user.photoURL || null
    };
    
    // Generate and store token
    const token = generateToken(userInfo);
    setTokenCookie(token);
    
    // Store user info in cookie
    Cookies.set('user', JSON.stringify(userInfo), { expires: 2/24 }); // 2 hours
    
    return { success: true, user: userInfo };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    removeTokenCookie();
    Cookies.remove('user');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

