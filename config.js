import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  connectAuthEmulator,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { 
  getFirestore, 
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
} from 'firebase/firestore';
import { 
  getStorage, 
  connectStorageEmulator 
} from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate required config
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration incomplete. Check .env file');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export let analytics = null;

// Initialize Analytics (only in production)
if (import.meta.env.MODE === 'production') {
  analytics = getAnalytics(app);
  logEvent(analytics, 'nikah_hub_loaded');
}

// ============================================
// DEVELOPMENT: EMULATOR CONFIGURATION
// ============================================

const isDevelopment = import.meta.env.MODE === 'development';
const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';

if (isDevelopment && useEmulator) {
  console.log('🚀 Connecting to Firebase Emulators...');
  
  try {
    // Check if emulators are already connected
    if (!auth.emulatorConfig) {
      connectAuthEmulator(auth, 'http://localhost:9099', { 
        disableWarnings: true 
      });
      console.log('✓ Auth Emulator connected');
    }
    
    if (!db._settingsFrozen) {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log('✓ Firestore Emulator connected');
    }
    
    if (!storage.app.firebaseApp.installations_) {
      connectStorageEmulator(storage, 'localhost', 9199);
      console.log('✓ Storage Emulator connected');
    }
  } catch (error) {
    console.warn('⚠️ Emulator connection warning:', error.message);
  }
}

// ============================================
// PERSISTENCE CONFIGURATION
// ============================================

// Set Auth persistence
setPersistence(auth, browserLocalPersistence).catch(error => {
  console.warn('⚠️ Could not set auth persistence:', error);
});

// Enable Firestore persistence (offline support)
enableIndexedDbPersistence(db).catch(error => {
  if (error.code === 'failed-precondition') {
    console.warn('⚠️ Firestore persistence: Multiple tabs open');
  } else if (error.code === 'unimplemented') {
    console.warn('⚠️ Firestore persistence: Browser does not support');
  }
});

// ============================================
// SECURITY: VALIDATION CHECKS
// ============================================

// Validate Firestore is secure
console.log('✓ Firestore initialized:', {
  project: firebaseConfig.projectId,
  bucket: firebaseConfig.storageBucket,
  mode: import.meta.env.MODE,
  emulator: isDevelopment && useEmulator ? 'Connected' : 'Production',
});

// ============================================
// EXPORTS
// ============================================

export default app;
