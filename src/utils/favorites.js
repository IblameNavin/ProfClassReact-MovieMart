import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'contacts';
const FAVORITES_FIELD = 'favorites';

// Get user's favorites from Firestore
export const getUserFavorites = async (userId) => {
  try {
    if (!userId) return [];
    
    const userDoc = await getDoc(doc(db, COLLECTION_NAME, userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData[FAVORITES_FIELD] || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Add movie to favorites
export const addToFavorites = async (movie, userId) => {
  try {
    if (!userId) return null;
    
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userDoc = await getDoc(userDocRef);
    
    let favorites = [];
    if (userDoc.exists()) {
      favorites = userDoc.data()[FAVORITES_FIELD] || [];
    }
    
    // Check if movie already exists
    const movieExists = favorites.find(item => item.id === movie.id);
    if (movieExists) {
      return null; // Movie already in favorites
    }
    
    // Add movie to favorites
    favorites.push(movie);
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        [FAVORITES_FIELD]: favorites
      });
    } else {
      await setDoc(userDocRef, {
        [FAVORITES_FIELD]: favorites
      });
    }
    
    return `${movie.title || movie.original_title} added to favorites!`;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return null;
  }
};

// Remove movie from favorites
export const removeFromFavorites = async (movieId, userId) => {
  try {
    if (!userId) return false;
    
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return false;
    }
    
    let favorites = userDoc.data()[FAVORITES_FIELD] || [];
    favorites = favorites.filter(item => item.id !== movieId);
    
    await updateDoc(userDocRef, {
      [FAVORITES_FIELD]: favorites
    });
    
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

// Update favorites array
export const updateFavorites = async (favorites, userId) => {
  try {
    if (!userId) return false;
    
    const userDocRef = doc(db, COLLECTION_NAME, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        [FAVORITES_FIELD]: favorites
      });
    } else {
      await setDoc(userDocRef, {
        [FAVORITES_FIELD]: favorites
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error updating favorites:', error);
    return false;
  }
};
