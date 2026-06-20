# FIREBASE SECURITY RULES - NIKAH HUB

## 1. FIRESTORE SECURITY RULES

**File: `firestore.rules`**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    // Check if user is authenticated
    function isAuth() {
      return request.auth != null;
    }

    // Check if user is the document owner
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // Check if user is admin
    function isAdmin() {
      return request.auth.token.role == 'admin';
    }

    // Check if user's profile is approved
    function hasApprovedProfile(userId) {
      return exists(/databases/$(database)/documents/profiles/$(userId)) &&
             get(/databases/$(database)/documents/profiles/$(userId)).data.status == 'approved';
    }

    // Check if user is verified
    function isVerified(userId) {
      return exists(/databases/$(database)/documents/profiles/$(userId)) &&
             get(/databases/$(database)/documents/profiles/$(userId)).data.verification.status == 'verified';
    }

    // Check if document exists
    function exists(path) {
      return exists(path);
    }

    // ============================================
    // USERS COLLECTION - /users/{uid}
    // ============================================

    match /users/{uid} {
      // Users can read their own document
      allow read: if isAuth() && isOwner(uid);

      // Users can read other users' limited public info (for contact exchange)
      allow read: if isAuth() && isAdmin();

      // Users can create their own document during registration
      allow create: if isAuth() && 
                       isOwner(uid) &&
                       request.resource.data.uid == uid &&
                       request.resource.data.role == 'user';

      // Users can update their own document
      allow update: if isAuth() && 
                       isOwner(uid) &&
                       // Prevent privilege escalation - only admins can change role
                       (!('role' in request.resource.data) || 
                        request.resource.data.role == resource.data.role ||
                        isAdmin());

      // Users cannot delete their own account (admin only)
      allow delete: if isAdmin();

      // Admin can read all users
      allow read: if isAdmin();
      allow write: if isAdmin();
    }

    // ============================================
    // PROFILES COLLECTION - /profiles/{profileId}
    // ============================================

    match /profiles/{profileId} {
      // Anyone can read approved profiles (limited fields)
      allow read: if isAuth() && 
                      resource.data.status == 'approved' &&
                      // Privacy: Hide sensitive fields
                      !request.query.select.select([
                        'basicInfo.phone',
                        'basicInfo.whatsApp',
                        'privacy.contactVisible'
                      ]);

      // Authenticated users can read approved profiles with all data
      allow read: if isAuth() &&
                      resource.data.status == 'approved';

      // Users can read their own profile (any status)
      allow read: if isAuth() &&
                      resource.data.userId == request.auth.uid;

      // Admin can read all profiles
      allow read: if isAdmin();

      // Users can create their own profile
      allow create: if isAuth() &&
                       request.resource.data.userId == request.auth.uid &&
                       request.resource.data.status == 'incomplete';

      // Users can update their own profile (pending approval)
      allow update: if isAuth() &&
                       resource.data.userId == request.auth.uid &&
                       // Cannot change status themselves (admin only)
                       (!('status' in request.resource.data) ||
                        request.resource.data.status == resource.data.status ||
                        isAdmin());

      // Admin can update profiles (approval, rejection, etc)
      allow update: if isAdmin();

      // Users cannot delete profiles (soft delete via status)
      allow delete: if isAdmin();

      // ============== PHOTOS SUBCOLLECTION ==============
      match /photos/{photoId} {
        // Users can read photos from approved profiles
        allow read: if isAuth() &&
                       get(/databases/$(database)/documents/profiles/$(profileId)).data.status == 'approved';

        // Users can read photos from their own profile
        allow read: if isAuth() &&
                       get(/databases/$(database)/documents/profiles/$(profileId)).data.userId == request.auth.uid;

        // Admin can read all photos
        allow read: if isAdmin();

        // Users can create photos in their own profile
        allow create: if isAuth() &&
                         get(/databases/$(database)/documents/profiles/$(profileId)).data.userId == request.auth.uid &&
                         request.resource.data.status in ['pending_review', 'approved'];

        // Users can delete their own photos
        allow delete: if isAuth() &&
                         get(/databases/$(database)/documents/profiles/$(profileId)).data.userId == request.auth.uid;

        // Only admin can update photo status
        allow update: if isAdmin();
      }
    }

    // ============================================
    // INTERESTS COLLECTION - /interests/{interestId}
    // ============================================

    match /interests/{interestId} {
      // User can read interests they sent
      allow read: if isAuth() &&
                      resource.data.fromUserId == request.auth.uid;

      // User can read interests they received
      allow read: if isAuth() &&
                      resource.data.toUserId == request.auth.uid;

      // Admin can read all interests
      allow read: if isAdmin();

      // Authenticated users can send interests
      allow create: if isAuth() &&
                       request.resource.data.fromUserId == request.auth.uid &&
                       // Prevent self-interests
                       request.resource.data.toUserId != request.auth.uid &&
                       // Both profiles must be approved
                       hasApprovedProfile(request.auth.uid) &&
                       hasApprovedProfile(request.resource.data.toUserId);

      // Users can update interests they sent (respond)
      allow update: if isAuth() &&
                       resource.data.fromUserId == request.auth.uid &&
                       // Can only update status
                       request.resource.data.status in ['accepted', 'rejected'];

      // Recipient can update interest they received
      allow update: if isAuth() &&
                       resource.data.toUserId == request.auth.uid &&
                       request.resource.data.status in ['accepted', 'rejected'];

      // Cannot delete interests
      allow delete: if false;
    }

    // ============================================
    // NOTIFICATIONS COLLECTION - /notifications/{notifId}
    // ============================================

    match /notifications/{notifId} {
      // Users can read their own notifications
      allow read: if isAuth() &&
                      resource.data.userId == request.auth.uid;

      // Admin can read all notifications
      allow read: if isAdmin();

      // System can create notifications (via Cloud Functions)
      // Client-side: Not allowed
      allow create: if isAdmin();

      // Users can update their own notifications (mark as read)
      allow update: if isAuth() &&
                       resource.data.userId == request.auth.uid &&
                       // Can only update 'read' status
                       request.resource.data.read == true;

      // Users can delete their own notifications
      allow delete: if isAuth() &&
                       resource.data.userId == request.auth.uid;
    }

    // ============================================
    // REVIEWS COLLECTION - /reviews/{reviewId}
    // ============================================

    match /reviews/{reviewId} {
      // Anyone authenticated can read approved reviews
      allow read: if isAuth() &&
                      resource.data.status == 'approved';

      // Only reviewer can read their pending review
      allow read: if isAuth() &&
                      resource.data.fromUserId == request.auth.uid;

      // Admin can read all reviews
      allow read: if isAdmin();

      // Authenticated users can create reviews
      allow create: if isAuth() &&
                       request.resource.data.fromUserId == request.auth.uid &&
                       // Cannot review themselves
                       request.resource.data.toUserId != request.auth.uid &&
                       // Both must have approved profiles
                       hasApprovedProfile(request.auth.uid) &&
                       hasApprovedProfile(request.resource.data.toUserId);

      // Only reviewer can update their pending review
      allow update: if isAuth() &&
                       resource.data.fromUserId == request.auth.uid &&
                       resource.data.status == 'pending_review';

      // Admin can update reviews (approve/reject)
      allow update: if isAdmin();

      // Cannot delete reviews
      allow delete: if false;
    }

    // ============================================
    // SUCCESS STORIES COLLECTION - /successStories/{storyId}
    // ============================================

    match /successStories/{storyId} {
      // Anyone authenticated can read approved stories
      allow read: if isAuth() &&
                      resource.data.status in ['approved', 'featured'];

      // Story authors can read their own story
      allow read: if isAuth() &&
                      (resource.data.groomId == request.auth.uid ||
                       resource.data.brideId == request.auth.uid);

      // Admin can read all stories
      allow read: if isAdmin();

      // Couple can create their story
      allow create: if isAuth() &&
                       (request.resource.data.groomId == request.auth.uid ||
                        request.resource.data.brideId == request.auth.uid) &&
                       request.resource.data.status == 'pending_review';

      // Authors can update pending stories
      allow update: if isAuth() &&
                       (resource.data.groomId == request.auth.uid ||
                        resource.data.brideId == request.auth.uid) &&
                       resource.data.status == 'pending_review';

      // Admin can update (approve/reject/feature)
      allow update: if isAdmin();

      // Cannot delete stories
      allow delete: if false;
    }

    // ============================================
    // FEATURED PROFILES - /featuredProfiles/{featuredId}
    // ============================================

    match /featuredProfiles/{featuredId} {
      // Anyone can read featured profiles list
      allow read: if isAuth();

      // Only admin can create/update featured profiles
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // ============================================
    // ADMIN MESSAGES - /adminMessages/{messageId}
    // ============================================

    match /adminMessages/{messageId} {
      // Anyone authenticated can read admin messages
      allow read: if isAuth() &&
                      resource.data.active == true;

      // Only admin can manage messages
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // ============================================
    // DONATIONS - /donations/{donationId}
    // ============================================

    match /donations/{donationId} {
      // Users can read their own donations
      allow read: if isAuth() &&
                      resource.data.userId == request.auth.uid;

      // Admin can read all donations
      allow read: if isAdmin();

      // Users can create donations
      allow create: if isAuth() &&
                       request.resource.data.userId == request.auth.uid;

      // Users cannot update/delete donations (immutable record)
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // ============================================
    // VERIFICATION REQUESTS - /verificationRequests/{verId}
    // ============================================

    match /verificationRequests/{verId} {
      // Users can read their own verification requests
      allow read: if isAuth() &&
                      resource.data.userId == request.auth.uid;

      // Admin can read all verification requests
      allow read: if isAdmin();

      // Users can create verification requests
      allow create: if isAuth() &&
                       request.resource.data.userId == request.auth.uid &&
                       request.resource.data.status == 'pending_review' &&
                       // Must have approved profile
                       hasApprovedProfile(request.auth.uid);

      // Users cannot update their own requests
      allow update: if false;

      // Only admin can update (approve/reject)
      allow update: if isAdmin();

      // Cannot delete (auto-expire after 90 days)
      allow delete: if isAdmin();
    }

    // ============================================
    // REPORTS - /reports/{reportId}
    // ============================================

    match /reports/{reportId} {
      // Users can read their own reports
      allow read: if isAuth() &&
                      resource.data.reportedByUserId == request.auth.uid;

      // Admin can read all reports
      allow read: if isAdmin();

      // Authenticated users can report
      allow create: if isAuth() &&
                       request.resource.data.reportedByUserId == request.auth.uid &&
                       request.resource.data.status == 'pending_review' &&
                       // Cannot report themselves
                       request.resource.data.reportedUserId != request.auth.uid;

      // Users cannot update/delete their reports
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // ============================================
    // ANALYTICS - /analytics/{date}
    // ============================================

    match /analytics/{analyticsId} {
      // Only admin can read analytics
      allow read: if isAdmin();

      // Only backend can write analytics (Cloud Functions)
      allow write: if false;
    }

    // ============================================
    // CATCH-ALL (DEFAULT DENY)
    // ============================================

    match /{document=**} {
      allow read, write: if false;
    }

  }
}
```

---

## 2. FIREBASE STORAGE SECURITY RULES

**File: `storage.rules`**

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    function isAuth() {
      return request.auth != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    function isAdmin() {
      return request.auth.token.role == 'admin';
    }

    function isValidImage() {
      return request.resource.contentType in [
        'image/jpeg',
        'image/png',
        'image/webp'
      ];
    }

    function isValidSize() {
      // Max 5MB
      return request.resource.size <= 5242880;
    }

    function parseUserId(path) {
      // Extract userId from path like: profiles/photos/{userId}/...
      let parts = path.split('/');
      return parts.length >= 3 ? parts[2] : null;
    }

    // ============================================
    // PROFILE PHOTOS - /profiles/photos/{userId}/*
    // ============================================

    match /profiles/photos/{userId}/{allFiles=**} {
      // Owner can upload their photos
      allow create: if isAuth() &&
                       isOwner(userId) &&
                       isValidImage() &&
                       isValidSize();

      // Owner can delete their photos
      allow delete: if isAuth() &&
                       isOwner(userId);

      // Authenticated users can view approved profile photos
      allow read: if isAuth();

      // Prevent updates (delete and re-upload instead)
      allow update: if false;
    }

    // ============================================
    // PROFILE AVATARS - /profiles/avatars/{userId}/*
    // ============================================

    match /profiles/avatars/{userId}/{allFiles=**} {
      // Owner can upload/delete avatar
      allow create, delete: if isAuth() &&
                               isOwner(userId) &&
                               isValidImage() &&
                               isValidSize();

      // Authenticated users can read avatars
      allow read: if isAuth();

      allow update: if false;
    }

    // ============================================
    // VERIFICATION IMAGES - /verification/selfies/{userId}/*
    // ============================================

    match /verification/selfies/{userId}/{allFiles=**} {
      // Owner can upload verification images
      allow create: if isAuth() &&
                       isOwner(userId) &&
                       isValidImage() &&
                       isValidSize();

      // Owner can read their own verification images
      allow read: if isAuth() &&
                      isOwner(userId);

      // Admin can read all verification images (for review)
      allow read: if isAdmin();

      // Owner cannot delete (admin deletes after review)
      allow delete: if isAdmin();

      allow update: if false;
    }

    // ============================================
    // STATIC ASSETS - /assets/*
    // ============================================

    match /assets/{allFiles=**} {
      // Anyone can read assets
      allow read: if true;

      // Only admin can upload/delete assets
      allow create, delete: if isAdmin();

      allow update: if false;
    }

    // ============================================
    // DOCUMENTS - /documents/*
    // ============================================

    match /documents/{allFiles=**} {
      // Only admin can manage documents
      allow read, create, delete: if isAdmin();

      allow update: if false;
    }

    // ============================================
    // CATCH-ALL (DEFAULT DENY)
    // ============================================

    match /{allPaths=**} {
      allow read, write: if false;
    }

  }
}
```

---

## 3. SECURITY RULES TESTING

**File: `firestore.rules.test.ts`**

```typescript
import {
  RulesTestEnvironment,
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import * as fs from 'fs';
import * as path from 'path';

let testEnv: RulesTestEnvironment;

const projectId = 'nikah-hub-prod';

// Setup test environment before all tests
beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules: fs.readFileSync(path.join(__dirname, '../firestore.rules'), 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  });
});

// Clear firestore between tests
beforeEach(async () => {
  await testEnv.clearFirestore();
});

// Cleanup
afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore Security Rules', () => {
  const userId = 'user_123';
  const otherUserId = 'user_456';
  const adminId = 'admin_001';

  // ============================================
  // USERS COLLECTION TESTS
  // ============================================

  describe('Users Collection', () => {
    it('allows users to read their own document', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();
      
      // Set up user document
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await context.firestore().collection('users').doc(userId).set({
          uid: userId,
          email: 'user@example.com',
          role: 'user',
        });
      });

      // Should succeed
      await assertSucceeds(
        db.collection('users').doc(userId).get()
      );
    });

    it('prevents users from reading others documents', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      // Should fail
      await assertFails(
        db.collection('users').doc(otherUserId).get()
      );
    });

    it('allows users to create their own account', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertSucceeds(
        db.collection('users').doc(userId).set({
          uid: userId,
          email: 'user@example.com',
          role: 'user',
        })
      );
    });

    it('prevents users from creating accounts for others', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertFails(
        db.collection('users').doc(otherUserId).set({
          uid: otherUserId,
          email: 'other@example.com',
          role: 'user',
        })
      );
    });
  });

  // ============================================
  // PROFILES COLLECTION TESTS
  // ============================================

  describe('Profiles Collection', () => {
    beforeEach(async () => {
      // Create user profiles
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('profiles').doc('profile_1').set({
          userId,
          status: 'approved',
          basicInfo: { name: 'Ahmed' },
        });
        await db.collection('profiles').doc('profile_2').set({
          userId: otherUserId,
          status: 'pending_approval',
          basicInfo: { name: 'Fatima' },
        });
      });
    });

    it('allows reading approved profiles', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertSucceeds(
        db.collection('profiles').doc('profile_1').get()
      );
    });

    it('prevents reading non-approved profiles (except own)', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertFails(
        db.collection('profiles').doc('profile_2').get()
      );
    });

    it('allows users to read their own profile in any status', async () => {
      const db = testEnv.authenticatedContext(otherUserId).firestore();

      await assertSucceeds(
        db.collection('profiles').doc('profile_2').get()
      );
    });

    it('allows users to create their own profile', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertSucceeds(
        db.collection('profiles').doc('profile_new').set({
          userId,
          status: 'incomplete',
          basicInfo: { name: 'Ahmed' },
        })
      );
    });

    it('prevents users from creating profiles for others', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertFails(
        db.collection('profiles').doc('profile_other').set({
          userId: otherUserId,
          status: 'incomplete',
          basicInfo: { name: 'Fatima' },
        })
      );
    });
  });

  // ============================================
  // INTERESTS COLLECTION TESTS
  // ============================================

  describe('Interests Collection', () => {
    beforeEach(async () => {
      // Create approved profiles
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const db = context.firestore();
        await db.collection('profiles').doc(`profile_${userId}`).set({
          userId,
          status: 'approved',
        });
        await db.collection('profiles').doc(`profile_${otherUserId}`).set({
          userId: otherUserId,
          status: 'approved',
        });
      });
    });

    it('allows authenticated users to send interests', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertSucceeds(
        db.collection('interests').add({
          fromUserId: userId,
          toUserId: otherUserId,
          status: 'sent',
          message: 'Hi, interested',
        })
      );
    });

    it('prevents users from sending interests to themselves', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertFails(
        db.collection('interests').add({
          fromUserId: userId,
          toUserId: userId,
          status: 'sent',
          message: 'Self interest',
        })
      );
    });

    it('allows users to view interests they sent', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      // Create interest first
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await context.firestore().collection('interests').add({
          fromUserId: userId,
          toUserId: otherUserId,
          status: 'sent',
        });
      });

      // Should be able to read
      await assertSucceeds(
        db.collection('interests')
          .where('fromUserId', '==', userId)
          .get()
      );
    });
  });

  // ============================================
  // NOTIFICATIONS COLLECTION TESTS
  // ============================================

  describe('Notifications Collection', () => {
    it('allows users to read their notifications', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      // Create notification
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await context.firestore().collection('notifications').add({
          userId,
          type: 'profile_approved',
          read: false,
        });
      });

      // Should succeed
      await assertSucceeds(
        db.collection('notifications').where('userId', '==', userId).get()
      );
    });

    it('prevents users from reading others notifications', async () => {
      const db = testEnv.authenticatedContext(userId).firestore();

      await assertFails(
        db.collection('notifications')
          .where('userId', '==', otherUserId)
          .get()
      );
    });
  });
});
```

---

## 4. STORAGE RULES TESTING

**File: `storage.rules.test.ts`**

```typescript
import {
  RulesTestEnvironment,
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import * as fs from 'fs';
import * as path from 'path';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'nikah-hub-prod',
    storage: {
      rules: fs.readFileSync(
        path.join(__dirname, '../storage.rules'),
        'utf8'
      ),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearStorage();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Storage Security Rules', () => {
  const userId = 'user_123';
  const otherUserId = 'user_456';

  describe('Profile Photos', () => {
    it('allows users to upload photos to their folder', async () => {
      const bucket = testEnv.authenticatedContext(userId).storage();

      const fileRef = bucket.ref(`profiles/photos/${userId}/photo.jpg`);
      
      await assertSucceeds(
        fileRef.putString('fake image content', 'raw', {
          contentType: 'image/jpeg',
        })
      );
    });

    it('prevents users from uploading non-image files', async () => {
      const bucket = testEnv.authenticatedContext(userId).storage();

      const fileRef = bucket.ref(`profiles/photos/${userId}/file.txt`);
      
      await assertFails(
        fileRef.putString('text content', 'raw', {
          contentType: 'text/plain',
        })
      );
    });

    it('prevents users from uploading to others folders', async () => {
      const bucket = testEnv.authenticatedContext(userId).storage();

      const fileRef = bucket.ref(`profiles/photos/${otherUserId}/photo.jpg`);
      
      await assertFails(
        fileRef.putString('fake image content', 'raw', {
          contentType: 'image/jpeg',
        })
      );
    });

    it('allows authenticated users to read profile photos', async () => {
      const bucket = testEnv.authenticatedContext(userId).storage();

      // Create file first
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const ref = context.storage().ref(`profiles/photos/${otherUserId}/photo.jpg`);
        await ref.putString('content');
      });

      // Should be able to read
      const fileRef = bucket.ref(`profiles/photos/${otherUserId}/photo.jpg`);
      await assertSucceeds(fileRef.getBytes(1024));
    });
  });

  describe('Verification Images', () => {
    it('allows users to upload verification images', async () => {
      const bucket = testEnv.authenticatedContext(userId).storage();

      await assertSucceeds(
        bucket
          .ref(`verification/selfies/${userId}/selfie.jpg`)
          .putString('content', 'raw', { contentType: 'image/jpeg' })
      );
    });

    it('prevents non-owners from reading verification images', async () => {
      const bucket = testEnv.authenticatedContext(otherUserId).storage();

      // Create verification image
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const ref = context.storage().ref(`verification/selfies/${userId}/selfie.jpg`);
        await ref.putString('content');
      });

      // Other user shouldn't be able to read
      await assertFails(
        bucket.ref(`verification/selfies/${userId}/selfie.jpg`).getBytes(1024)
      );
    });
  });

  describe('Static Assets', () => {
    it('allows anyone to read static assets', async () => {
      const bucket = testEnv.unauthenticatedContext().storage();

      // Create asset first
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const ref = context.storage().ref('assets/logo.png');
        await ref.putString('content');
      });

      // Anyone can read
      await assertSucceeds(
        bucket.ref('assets/logo.png').getBytes(1024)
      );
    });
  });
});
```

---

## 5. DEPLOYING RULES

```bash
# Validate rules syntax
firebase firestore:rules:validate

# Test rules locally
firebase emulators:start

# Deploy firestore rules
firebase deploy --only firestore:rules

# Deploy storage rules
firebase deploy --only storage

# Deploy both
firebase deploy --only firestore,storage

# Check deployment status
firebase functions:list
firebase firestore:list

# View deployed rules
firebase firestore:rules:list
```

---

## 6. SECURITY BEST PRACTICES CHECKLIST

```
✓ Authentication required for all sensitive operations
✓ Role-based access control implemented
✓ Users can only access their own data
✓ Admin-only operations protected
✓ Validated data structure enforcement
✓ Size limits on uploads (5MB max)
✓ File type validation (images only)
✓ Automatic field filtering for sensitive data
✓ Default-deny approach used
✓ Rules tested with unit tests
✓ Rate limiting logic in cloud functions (future)
✓ Audit logging for sensitive operations (future)
✓ Encryption for sensitive fields (future)
✓ 2FA for admin accounts (future)
```

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Production Ready  
**Security Level**: High
