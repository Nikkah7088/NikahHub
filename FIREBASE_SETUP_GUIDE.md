# FIREBASE SETUP GUIDE - NIKAH HUB

## 1. FIREBASE PROJECT INITIALIZATION

### 1.1 Create Firebase Project

```bash
# Login to Firebase Console
https://console.firebase.google.com/

# Steps:
1. Click "Add Project"
2. Project Name: "nikah-hub"
3. Analytics: Enable (optional but recommended)
4. Create Project
5. Wait for initialization (2-3 minutes)
```

### 1.2 Register Web App

```bash
# In Firebase Console → Project Settings → General

1. Click "Add App" → Select "Web" (</> icon)
2. App Name: "nikah-hub-web"
3. Copy Firebase Config
4. Copy both:
   - Web API Key
   - App ID

# You'll get something like:

{
  "apiKey": "AIzaSyDxxx...",
  "authDomain": "nikah-hub-prod.firebaseapp.com",
  "projectId": "nikah-hub-prod",
  "storageBucket": "nikah-hub-prod.appspot.com",
  "messagingSenderId": "123456789",
  "appId": "1:123456789:web:abcdef123456",
  "measurementId": "G-XXXXXXXX"
}
```

### 1.3 Setup Project Structure

```bash
# Create Vite React project
npm create vite@latest nikah-hub -- --template react
cd nikah-hub

# Install dependencies
npm install

# Install Firebase
npm install firebase

# Install other dependencies
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install framer-motion
npm install react-helmet-async
npm install react-query

# Initialize Tailwind
npx tailwindcss init -p
```

---

## 2. FIREBASE CONFIGURATION

### 2.1 Environment Variables

Create `.env` file in project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyDxxx...
VITE_FIREBASE_AUTH_DOMAIN=nikah-hub-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nikah-hub-prod
VITE_FIREBASE_STORAGE_BUCKET=nikah-hub-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXX

# App Settings
VITE_APP_NAME=Nikah Hub
VITE_APP_URL=https://nikahhub.com
VITE_SUPPORT_EMAIL=HalalNikkahMatch@gmail.com
VITE_MAX_UPLOAD_SIZE=5242880 # 5MB in bytes
VITE_MAX_PHOTOS_PER_PROFILE=5
```

### 2.2 Firebase Initialization Module

**File: `src/firebase/config.js`**

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Development: Connect to Emulators
if (import.meta.env.DEV && !window.location.hostname.includes('firebase')) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (err) {
    // Emulators already connected
  }
}

export default app;
```

---

## 3. AUTHENTICATION SETUP

### 3.1 Enable Authentication Methods

```bash
# In Firebase Console → Authentication → Sign-in Method

1. Email/Password
   ✓ Enable Email/Password
   ✓ Passwordless sign-in: Disabled (for now)

2. Google
   ✓ Enable Google
   ✓ Add OAuth consent screen
   ✓ User type: External
   ✓ Add scopes: email, profile

3. Phone (Future)
   ✓ Implement in Phase 2

4. Settings
   ✓ Password policy: Enforce strong passwords
   ✓ User account linking: Disabled (for now)
```

### 3.2 OAuth Configuration (Google Sign-In)

```bash
# Steps in Firebase Console:

1. Go to: Authentication → Sign-in method → Google
2. Click "Edit configuration"
3. Support email: HalalNikkahMatch@gmail.com
4. Project support URL: https://nikahhub.com

# Create OAuth Credentials:

1. Go to: Google Cloud Console → APIs & Services
2. Create OAuth 2.0 Client ID (Web application)
3. Authorized JavaScript origins:
   - http://localhost:5173
   - http://localhost:3000
   - https://nikahhub.com
   - https://nikah-hub-prod.firebaseapp.com

4. Authorized redirect URIs:
   - http://localhost:5173/auth/callback
   - https://nikahhub.com/auth/callback

5. Copy Client ID → Use in Firebase Console
```

### 3.3 Custom Claims for Roles

**File: `src/firebase/customClaims.js`**

```javascript
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './config';

/**
 * Set admin role via Cloud Function (server-side)
 * 
 * Call this from your backend/Cloud Function after verifying user is admin
 * 
 * Firebase CLI:
 * firebase functions:shell
 * setAdminRole('user_id')
 */

// Client-side: Get current user's role from custom claims
export const getUserRole = async (user) => {
  const idTokenResult = await user.getIdTokenResult();
  return idTokenResult.claims.role || 'user';
};

// Client-side: Check if user is admin
export const isAdmin = async (user) => {
  const role = await getUserRole(user);
  return role === 'admin';
};

// Create/Update user profile doc with default role
export const createUserProfile = async (uid, email, displayName = '') => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid,
      email,
      displayName: displayName || email.split('@')[0],
      role: 'user', // Default role
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: false,
      phoneVerified: false,
      privacySettings: {
        showEmail: false,
        allowMessages: true,
        allowProfileSharing: true,
      },
    }, { merge: false });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};
```

---

## 4. FIRESTORE CONFIGURATION

### 4.1 Create Collections

```bash
# In Firebase Console → Firestore → Create Collection

1. Collection: users
   - Document ID: Use automatic ID generation

2. Collection: profiles
   - Add document with example structure

3. Collection: interests
4. Collection: notifications
5. Collection: reviews
6. Collection: successStories
7. Collection: featuredProfiles
8. Collection: adminMessages
9. Collection: donations
10. Collection: verificationRequests
11. Collection: reports
12. Collection: analytics

# Alternative: Using Firebase CLI
firebase init firestore
# Firestore configuration: .firebaserc
```

### 4.2 Create Indexes

```bash
# Option 1: Firebase Console
# Firestore → Indexes → Create Index

# Option 2: Firebase CLI
firebase firestore:indexes

# Indexes needed (see DATABASE_SCHEMA.md for full list)

Index 1: profiles (gender, country, age, status, updatedAt)
Index 2: profiles (city, country, status, lastActivityAt)
Index 3: profiles (education, age, gender, status)
Index 4: profiles (religiousPractice, country, gender, status)
Index 5: interests (toUserId, status, createdAt)
Index 6: interests (fromUserId, status, createdAt)
Index 7: notifications (userId, read, createdAt)
Index 8: reviews (toUserId, status, createdAt)

# Indexes are auto-created on first query in production
# Monitor: Firestore → Indexes tab
```

### 4.3 Firestore Configuration JS

**File: `src/firebase/db.js`**

```javascript
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  startAt,
  endAt,
  Timestamp,
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment,
  onSnapshot,
} from 'firebase/firestore';
import { db } from './config';

// ==================== USER OPERATIONS ====================

export const createUser = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      uid,
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (uid, updates) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// ==================== PROFILE OPERATIONS ====================

export const createProfile = async (profileData) => {
  try {
    const profileRef = doc(collection(db, 'profiles'));
    await setDoc(profileRef, {
      id: profileRef.id,
      ...profileData,
      status: 'incomplete',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return profileRef.id;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};

export const getProfile = async (profileId) => {
  try {
    const docSnap = await getDoc(doc(db, 'profiles', profileId));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (profileId, updates) => {
  try {
    await updateDoc(doc(db, 'profiles', profileId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const q = query(
      collection(db, 'profiles'),
      where('userId', '==', userId),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0]?.data() || null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// ==================== SEARCH OPERATIONS ====================

/**
 * Search profiles with multiple filters
 * @param {Object} filters - { gender, country, city, minAge, maxAge, education, etc }
 * @param {number} pageSize - Results per page
 * @param {DocumentSnapshot} lastDoc - For pagination
 */
export const searchProfiles = async (filters = {}, pageSize = 20, lastDoc = null) => {
  try {
    let constraints = [
      where('status', '==', 'approved'),
      orderBy('engagement.lastActivityAt', 'desc'),
    ];

    // Add filter constraints
    if (filters.gender) constraints.push(where('basicInfo.gender', '==', filters.gender));
    if (filters.country) constraints.push(where('basicInfo.country', '==', filters.country));
    if (filters.city) constraints.push(where('basicInfo.city', '==', filters.city));

    if (filters.minAge || filters.maxAge) {
      if (filters.minAge) constraints.push(where('basicInfo.age', '>=', filters.minAge));
      if (filters.maxAge) constraints.push(where('basicInfo.age', '<=', filters.maxAge));
    }

    if (filters.education) {
      constraints.push(where('professional.education', '==', filters.education));
    }

    constraints.push(limit(pageSize + 1)); // +1 to check if more results

    if (lastDoc) constraints.push(startAfter(lastDoc));

    const q = query(collection(db, 'profiles'), ...constraints);
    const querySnapshot = await getDocs(q);

    const profiles = querySnapshot.docs.slice(0, pageSize).map(doc => doc.data());
    const hasMore = querySnapshot.docs.length > pageSize;

    return {
      profiles,
      hasMore,
      lastDoc: querySnapshot.docs[pageSize - 1] || null,
    };
  } catch (error) {
    console.error('Error searching profiles:', error);
    throw error;
  }
};

// ==================== INTEREST OPERATIONS ====================

export const sendInterest = async (interestData) => {
  try {
    const interestRef = doc(collection(db, 'interests'));
    await setDoc(interestRef, {
      id: interestRef.id,
      ...interestData,
      status: 'sent',
      createdAt: Timestamp.now(),
    });

    // Create notification for recipient
    await createNotification({
      userId: interestData.toUserId,
      type: 'interest_received',
      title: 'New Interest Received',
      message: `${interestData.fromUserName} is interested in connecting with you`,
      relatedUserId: interestData.fromUserId,
      actionUrl: `/profile/${interestData.fromUserName.toLowerCase().replace(/\s+/g, '')}`,
    });

    return interestRef.id;
  } catch (error) {
    console.error('Error sending interest:', error);
    throw error;
  }
};

export const getUserInterests = async (userId, type = 'received', pageSize = 20, lastDoc = null) => {
  try {
    let q;
    if (type === 'received') {
      q = query(
        collection(db, 'interests'),
        where('toUserId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageSize + 1),
        ...(lastDoc ? [startAfter(lastDoc)] : [])
      );
    } else {
      q = query(
        collection(db, 'interests'),
        where('fromUserId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(pageSize + 1),
        ...(lastDoc ? [startAfter(lastDoc)] : [])
      );
    }

    const querySnapshot = await getDocs(q);
    const interests = querySnapshot.docs.slice(0, pageSize).map(doc => doc.data());
    const hasMore = querySnapshot.docs.length > pageSize;

    return {
      interests,
      hasMore,
      lastDoc: querySnapshot.docs[pageSize - 1] || null,
    };
  } catch (error) {
    console.error('Error fetching interests:', error);
    throw error;
  }
};

// ==================== NOTIFICATION OPERATIONS ====================

export const createNotification = async (notificationData) => {
  try {
    const notifRef = doc(collection(db, 'notifications'));
    await setDoc(notifRef, {
      id: notifRef.id,
      ...notificationData,
      read: false,
      createdAt: Timestamp.now(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

export const getUserNotifications = async (userId, onlyUnread = false) => {
  try {
    let constraints = [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50),
    ];

    if (onlyUnread) {
      constraints.push(where('read', '==', false));
    }

    const q = query(collection(db, 'notifications'), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true,
      readAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    throw error;
  }
};

// ==================== REAL-TIME LISTENERS ====================

/**
 * Listen to user's notifications in real-time
 * @returns unsubscribe function to clean up listener
 */
export const listenToUserNotifications = (userId, callback) => {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const notifications = querySnapshot.docs.map(doc => doc.data());
    callback(notifications);
  }, (error) => {
    console.error('Error listening to notifications:', error);
  });
};

// ==================== BATCH OPERATIONS ====================

/**
 * Batch update profile approval (Admin action)
 */
export const approveProfiles = async (profileIds, adminId) => {
  try {
    const batch = writeBatch(db);
    const now = Timestamp.now();

    profileIds.forEach(profileId => {
      batch.update(doc(db, 'profiles', profileId), {
        status: 'approved',
        'adminInfo.approvedAt': now,
        'adminInfo.approvedBy': adminId,
        updatedAt: now,
      });
    });

    await batch.commit();
  } catch (error) {
    console.error('Error approving profiles:', error);
    throw error;
  }
};

/**
 * Add photo to profile with validation
 */
export const addProfilePhoto = async (profileId, photoData) => {
  try {
    await updateDoc(doc(db, 'profiles', profileId), {
      photos: arrayUnion(photoData),
      photoCount: increment(1),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error adding photo:', error);
    throw error;
  }
};

export default {
  createUser,
  getUser,
  updateUser,
  createProfile,
  getProfile,
  updateProfile,
  getUserProfile,
  searchProfiles,
  sendInterest,
  getUserInterests,
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  listenToUserNotifications,
  approveProfiles,
  addProfilePhoto,
};
```

---

## 5. FIREBASE STORAGE SETUP

### 5.1 Storage Buckets

```bash
# In Firebase Console → Storage

1. Default bucket: nikah-hub-prod.appspot.com (created automatically)
2. Create folder structure:
   - /profiles/photos/{userId}/
   - /profiles/avatars/{userId}/
   - /verification/selfies/{userId}/
   - /assets/

# Firebase CLI
firebase init storage
```

### 5.2 Storage Service Module

**File: `src/firebase/storage.js`**

```javascript
import {
  ref,
  uploadBytes,
  getBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from 'firebase/storage';
import { storage } from './config';

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const uploadProfilePhoto = async (userId, file, photoType = 'profile') => {
  try {
    // Validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Only JPEG, PNG, and WebP images are allowed');
    }
    if (file.size > MAX_UPLOAD_SIZE) {
      throw new Error(`File size must be less than 5MB`);
    }

    // Create file path
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filePath = `profiles/photos/${userId}/${photoType}_${timestamp}.${fileExtension}`;

    // Upload
    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file, {
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        userId,
        photoType,
      },
    });

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      path: filePath,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
    };
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw error;
  }
};

export const uploadVerificationImage = async (userId, file, imageType) => {
  try {
    // Validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Only JPEG, PNG, and WebP images are allowed');
    }

    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filePath = `verification/selfies/${userId}/${imageType}_${timestamp}.${fileExtension}`;

    const storageRef = ref(storage, filePath);
    const snapshot = await uploadBytes(storageRef, file, {
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        userId,
        verificationType: imageType,
      },
    });

    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      url: downloadURL,
      path: filePath,
      uploadedAt: new Date(),
    };
  } catch (error) {
    console.error('Error uploading verification image:', error);
    throw error;
  }
};

export const deleteStorageFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const getUserPhotos = async (userId) => {
  try {
    const photoPath = `profiles/photos/${userId}`;
    const photoRef = ref(storage, photoPath);
    const result = await listAll(photoRef);

    const photos = await Promise.all(
      result.items.map(async (itemRef) => ({
        name: itemRef.name,
        url: await getDownloadURL(itemRef),
        metadata: await getMetadata(itemRef),
      }))
    );

    return photos;
  } catch (error) {
    console.error('Error fetching user photos:', error);
    throw error;
  }
};

export default {
  uploadProfilePhoto,
  uploadVerificationImage,
  deleteStorageFile,
  getUserPhotos,
};
```

---

## 6. FIREBASE HOSTING SETUP

### 6.1 Configure Hosting

```bash
# Initialize Firebase Hosting
firebase init hosting

# Select options:
# - Use existing project: nikah-hub-prod
# - Public directory: dist
# - Single-page app: Yes
# - GitHub integration: Optional

# This creates firebase.json and .firebaserc
```

### 6.2 Firebase.json Configuration

**File: `firebase.json`**

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000"
          }
        ]
      },
      {
        "source": "**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=3600"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains"
          }
        ]
      }
    ]
  }
}
```

### 6.3 Deploy to Firebase Hosting

```bash
# Build the project
npm run build

# Deploy
firebase deploy

# Deploy only hosting
firebase deploy --only hosting

# Deploy specific version
firebase deploy --only hosting:prod

# View live site
firebase open hosting:site
```

---

## 7. EMULATOR SETUP (Development)

### 7.1 Install Firebase Emulator Suite

```bash
# Install Firebase Tools globally
npm install -g firebase-tools

# Initialize emulators
firebase init emulators

# This creates default emulator configuration
```

### 7.2 Emulator Configuration

**File: `.firebaserc`**

```json
{
  "projects": {
    "default": "nikah-hub-prod"
  }
}
```

**File: `firebase.json` (emulator section)**

```json
{
  "emulators": {
    "auth": {
      "host": "localhost",
      "port": 9099
    },
    "firestore": {
      "host": "localhost",
      "port": 8080
    },
    "storage": {
      "host": "localhost",
      "port": 9199
    },
    "pubsub": {
      "host": "localhost",
      "port": 8085
    },
    "ui": {
      "enabled": true,
      "host": "localhost",
      "port": 4000
    }
  }
}
```

### 7.3 Start Emulators

```bash
# Start all emulators
firebase emulators:start

# Start specific emulator
firebase emulators:start --only firestore,auth

# View Emulator Suite UI
# Open http://localhost:4000 in browser
```

---

## 8. SECURITY RULES SETUP

### 8.1 Deploy Security Rules

```bash
# Validate rules
firebase firestore:rules:test firestore.rules --testfile firestore.rules.test.ts

# Deploy rules
firebase deploy --only firestore:rules

# Deploy both firestore and storage rules
firebase deploy --only firestore,storage
```

### 8.2 Local Testing

**File: `firestore.rules.test.ts`**

```typescript
import {
  RulesTestEnvironment,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "nikah-hub-prod",
    firestore: {
      rules: fs.readFileSync("firestore.rules", "utf8"),
    },
  });
});

describe("Firestore Security Rules", () => {
  it("allows users to read their own profile", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await expect(
      db.collection("users").doc("user123").get()
    ).toSucceed();
  });

  it("prevents users from reading others' private data", async () => {
    const db = testEnv.authenticatedContext("user123").firestore();
    await expect(
      db.collection("users").doc("user456").get()
    ).toFail();
  });
});
```

---

## 9. MONITORING & ANALYTICS

### 9.1 Enable Firebase Analytics

```javascript
// Already initialized in src/firebase/config.js
// Auto-tracks:
// - Page views
// - User properties
// - Session duration
// - OS, Browser, Device
```

### 9.2 Custom Analytics Events

**File: `src/utils/analytics.js`**

```javascript
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase/config';

export const trackProfileView = (profileId, userId) => {
  logEvent(analytics, 'profile_viewed', {
    profile_id: profileId,
    user_id: userId,
    timestamp: new Date(),
  });
};

export const trackInterestSent = (fromUserId, toUserId) => {
  logEvent(analytics, 'interest_sent', {
    from_user: fromUserId,
    to_user: toUserId,
    timestamp: new Date(),
  });
};

export const trackVerificationStarted = (userId) => {
  logEvent(analytics, 'verification_started', {
    user_id: userId,
    timestamp: new Date(),
  });
};

export const trackProfileCreated = (userId) => {
  logEvent(analytics, 'profile_created', {
    user_id: userId,
    timestamp: new Date(),
  });
};
```

### 9.3 Firestore Insights

```bash
# In Firebase Console → Firestore → Insights

Monitor:
1. Real-time usage
2. Database traffic
3. Slowest queries
4. Top collections
5. Index suggestions
```

---

## 10. BACKUP & RECOVERY

### 10.1 Automated Backups

```bash
# Enable Firestore Backups in Firebase Console

Settings:
1. Go to: Project Settings → Backups
2. Create backup schedule:
   - Frequency: Daily
   - Time: 2:00 AM UTC
   - Retention: 90 days

3. Backup location: 
   - Multi-region: europe-west1
```

### 10.2 Manual Backup Export

```bash
# Export Firestore data
firebase firestore:export backup/

# Import Firestore data
firebase firestore:import backup/

# Export specific collections
firebase firestore:export backup/ --collection-ids=profiles,users
```

---

## 11. TROUBLESHOOTING COMMON ISSUES

### Issue: Firebase Config Not Loading

```javascript
// Debug: Check console logs
console.log('Firebase Config:', firebaseConfig);
console.log('Auth Status:', auth.currentUser);
console.log('Firestore Instance:', db);
```

### Issue: Emulator Connection Failed

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Restart emulators
firebase emulators:start
```

### Issue: Storage Uploads Failing

```javascript
// Check:
1. User is authenticated
2. File size < 5MB
3. File type is JPEG/PNG/WebP
4. Storage path is correct
5. Security rules allow write
```

### Issue: Queries Too Slow

```javascript
// Solution:
1. Create compound indexes (Firestore suggests)
2. Limit result size: query.limit(20)
3. Use pagination: startAfter(lastDoc)
4. Avoid cross-collection queries
5. Cache results in memory
```

---

## 12. PRODUCTION DEPLOYMENT CHECKLIST

```bash
☐ Firebase Project created
☐ Web app registered
☐ Environment variables set (.env)
☐ Firebase config validated
☐ Authentication methods enabled (Email, Google)
☐ Firestore collections created
☐ Compound indexes created
☐ Security rules deployed
☐ Storage bucket configured
☐ Firebase Hosting setup
☐ Custom domain configured
☐ HTTPS/SSL enabled
☐ Analytics enabled
☐ Backup schedule configured
☐ Error tracking enabled (Sentry)
☐ Performance monitoring setup
☐ Security rules tested
☐ Load tested at expected scale
☐ Disaster recovery plan documented
☐ Admin access secured (2FA)
```

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Production Ready
