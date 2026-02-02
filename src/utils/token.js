import Cookies from 'js-cookie';

const TOKEN_COOKIE_NAME = 'auth_token';
const TOKEN_EXPIRY_HOURS = 2;

// Generate a simple token (you can enhance this with JWT or other methods)
export const generateToken = (userInfo) => {
  const payload = {
    uid: userInfo.uid,
    email: userInfo.email,
    exp: Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000) // 2 hours from now
  };
  
  // Simple base64 encoding (for production, use proper JWT)
  return btoa(JSON.stringify(payload));
};

// Set token in cookie
export const setTokenCookie = (token) => {
  Cookies.set(TOKEN_COOKIE_NAME, token, { 
    expires: TOKEN_EXPIRY_HOURS / 24, // 2 hours
    secure: window.location.protocol === 'https:', // Only secure in HTTPS
    sameSite: 'strict'
  });
};

// Get token from cookie
export const getTokenFromCookie = () => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

// Remove token cookie
export const removeTokenCookie = () => {
  Cookies.remove(TOKEN_COOKIE_NAME);
};

// Verify token validity
export const isTokenValid = () => {
  const token = getTokenFromCookie();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token));
    const now = Date.now();
    
    // Check if token is expired
    if (payload.exp && payload.exp < now) {
      removeTokenCookie();
      return false;
    }
    
    return true;
  } catch (error) {
    removeTokenCookie();
    return false;
  }
};

// Get current user from cookie
export const getCurrentUser = () => {
  const userCookie = Cookies.get('user');
  const token = getTokenFromCookie();
  
  if (!userCookie || !token) {
    return null;
  }
  
  // Verify token is still valid
  if (!isTokenValid()) {
    return null;
  }
  
  try {
    return JSON.parse(userCookie);
  } catch (error) {
    return null;
  }
};
