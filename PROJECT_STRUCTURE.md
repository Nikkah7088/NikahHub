# PHASE 4: COMPLETE PROJECT STRUCTURE - NIKAH HUB MVP

## Overview

This is the **MVP (Minimum Viable Product)** structure focused on:
1. **Security First** - Authentication & Role-based access
2. **Admin Moderation** - No profile visible until approved
3. **Privacy** - Contact info hidden, photos encrypted
4. **Scalability** - Firebase-native, no backend needed

---

## 📁 Complete Folder Structure

```
nikah-hub/
│
├── .github/
│   └── workflows/
│       └── deploy.yml                 # CI/CD deployment pipeline
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── android-chrome-192x192.png
│
├── src/
│   ├── App.jsx                        # Root app component with routing
│   ├── main.jsx                       # Vite entry point
│   ├── index.css                      # Global CSS (Tailwind)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── AdminRoute.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   ├── PasswordReset.jsx
│   │   │   └── EmailVerification.jsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileWizard.jsx      # 5-step creation form
│   │   │   ├── BasicInfoStep.jsx
│   │   │   ├── ReligiousInfoStep.jsx
│   │   │   ├── ProfessionalInfoStep.jsx
│   │   │   ├── PhotoUploadStep.jsx
│   │   │   ├── PreferencesStep.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── ProfileDetail.jsx
│   │   │   ├── PhotoGallery.jsx
│   │   │   └── EditProfile.jsx
│   │   │
│   │   ├── verification/
│   │   │   ├── VerificationFlow.jsx   # Main verification wizard
│   │   │   ├── CameraCapture.jsx      # Camera access
│   │   │   ├── LivenessDetection.jsx  # Head movements
│   │   │   ├── VerificationReview.jsx # Confirmation before submit
│   │   │   └── VerificationStatus.jsx # Status display
│   │   │
│   │   ├── search/
│   │   │   ├── SearchFilters.jsx      # Advanced filters
│   │   │   ├── ProfileGrid.jsx        # Results display
│   │   │   ├── ProfileSkeleton.jsx    # Loading state
│   │   │   └── Pagination.jsx         # Page controls
│   │   │
│   │   ├── dashboard/
│   │   │   ├── UserDashboard.jsx      # Main user dashboard
│   │   │   ├── ProfileSummary.jsx     # Quick stats
│   │   │   ├── InterestsList.jsx      # Received interests
│   │   │   ├── SentInterests.jsx      # Sent interests
│   │   │   ├── Notifications.jsx      # Notification panel
│   │   │   ├── PrivacySettings.jsx    # Privacy controls
│   │   │   └── AccountSettings.jsx    # User settings
│   │   │
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx     # Admin home
│   │   │   ├── StatsCard.jsx          # Metric cards
│   │   │   ├── ProfileModeration.jsx  # Profile approval queue
│   │   │   ├── PhotoModeration.jsx    # Photo review
│   │   │   ├── VerificationReview.jsx # Verification approval
│   │   │   ├── ReportedProfiles.jsx   # User reports
│   │   │   ├── UserManagement.jsx     # User controls
│   │   │   ├── AnalyticsDashboard.jsx # Charts & metrics
│   │   │   ├── AdminMessages.jsx      # Homepage banners
│   │   │   └── FeaturedProfiles.jsx   # Feature management
│   │   │
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── SearchCard.jsx
│   │   │   ├── FeaturedProfiles.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── SafetyFeatures.jsx
│   │   │   ├── SuccessStories.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── DonationSection.jsx
│   │   │   └── NewsletterSignup.jsx
│   │   │
│   │   └── shared/
│   │       ├── Modal.jsx
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Select.jsx
│   │       ├── Textarea.jsx
│   │       ├── FileUpload.jsx
│   │       ├── Tabs.jsx
│   │       ├── Badge.jsx
│   │       └── Tooltip.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── VerifyEmail.jsx
│   │   ├── Profile.jsx               # Public profile view
│   │   ├── Dashboard.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── NotFound.jsx
│   │   ├── Unauthorized.jsx
│   │   ├── ServerError.jsx
│   │   └── Maintenance.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx            # Auth state + user role
│   │   ├── UserContext.jsx            # Current user profile
│   │   ├── NotificationContext.jsx    # Real-time notifications
│   │   ├── FilterContext.jsx          # Search filters state
│   │   ├── AdminContext.jsx           # Admin operations state
│   │   └── LanguageContext.jsx        # i18n state
│   │
│   ├── hooks/
│   │   ├── useAuth.js                 # Login, logout, signup
│   │   ├── useProfile.js              # Create, update, read profile
│   │   ├── useSearch.js               # Search & filter logic
│   │   ├── useInterests.js            # Send/receive interests
│   │   ├── useNotifications.js        # Real-time notifications
│   │   ├── useAdmin.js                # Admin operations
│   │   ├── useVerification.js         # Verification process
│   │   ├── useLocalStorage.js         # Local storage wrapper
│   │   ├── useAsync.js                # Async data loading
│   │   └── useDebounce.js             # Debounce utility
│   │
│   ├── firebase/
│   │   ├── config.js                  # Firebase initialization
│   │   ├── auth.service.js            # Auth operations
│   │   ├── db.service.js              # Firestore operations
│   │   ├── storage.service.js         # Cloud Storage operations
│   │   ├── analytics.service.js       # Event tracking
│   │   └── customClaims.js            # Role management
│   │
│   ├── utils/
│   │   ├── validators.js              # Form validation rules
│   │   ├── formatters.js              # Data formatting functions
│   │   ├── imageProcessor.js          # Image quality validation
│   │   ├── encryption.js              # Simple encryption helpers
│   │   ├── constants.js               # App constants
│   │   ├── errorMessages.js           # Error strings
│   │   ├── logger.js                  # Logging utility
│   │   ├── api.js                     # Centralized API calls
│   │   └── helpers.js                 # General helpers
│   │
│   ├── styles/
│   │   ├── tailwind.config.js         # Tailwind config
│   │   ├── globals.css                # Global styles
│   │   ├── animations.css             # Framer Motion CSS
│   │   ├── forms.css                  # Form styles
│   │   └── variables.css              # CSS variables
│   │
│   ├── i18n/
│   │   ├── en.json                    # English translations
│   │   ├── ur.json                    # Urdu translations
│   │   ├── sk.json                    # Saraiki translations
│   │   └── config.js                  # i18n setup
│   │
│   └── data/
│       ├── countries.json             # Country list
│       ├── cities.json                # Pakistan cities
│       ├── educationLevels.json       # Education options
│       ├── occupations.json           # Job types
│       └── sectors.json               # Industry sectors
│
├── .env.example
├── .env.local                         # Local development
├── .env.staging                       # Staging env
├── .env.production                    # Production env
│
├── .gitignore
├── .eslintrc.json
├── .prettierrc
│
├── firebase.json
├── firestore.rules                    # Firestore security rules
├── storage.rules                      # Storage security rules
│
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── package.json
├── package-lock.json
│
└── docs/
    ├── PHASE_1_DEEP_ANALYSIS.md
    ├── DATABASE_SCHEMA.md
    ├── FIREBASE_SETUP_GUIDE.md
    ├── FIREBASE_SECURITY_RULES.md
    ├── AUTHENTICATION_FLOW.md
    ├── PROFILE_VERIFICATION_SYSTEM.md
    ├── ADMIN_MODERATION_GUIDE.md
    ├── API_REFERENCE.md
    ├── DEPLOYMENT_GUIDE.md
    └── TROUBLESHOOTING.md
```

---

## 🎯 Phase 5: Code Generation Roadmap

### **BATCH 1: PROJECT SETUP** (15 mins)
- ✅ `vite.config.js` - Build configuration
- ✅ `tailwind.config.js` - CSS framework
- ✅ `package.json` - Dependencies
- ✅ `.env.example` - Environment template
- ✅ `main.jsx` + `App.jsx` - Entry points

### **BATCH 2: FIREBASE INTEGRATION** (30 mins)
- ✅ `src/firebase/config.js` - Firebase init
- ✅ `src/firebase/auth.service.js` - Auth operations
- ✅ `src/firebase/db.service.js` - Firestore queries
- ✅ `src/firebase/storage.service.js` - Image upload
- ✅ `firestore.rules` - Security rules

### **BATCH 3: AUTHENTICATION** (45 mins)
- ✅ `src/context/AuthContext.jsx` - Auth state
- ✅ `src/hooks/useAuth.js` - Auth hook
- ✅ `src/pages/Login.jsx` - Login page
- ✅ `src/pages/Signup.jsx` - Signup page
- ✅ `src/components/auth/` - Auth forms
- ✅ `src/components/common/ProtectedRoute.jsx` - Route guards

### **BATCH 4: CORE PAGES** (60 mins)
- ✅ `src/pages/Home.jsx` - Homepage
- ✅ `src/pages/About.jsx` - About page
- ✅ `src/pages/Contact.jsx` - Contact page
- ✅ `src/components/home/` - Home sections
- ✅ `src/components/common/Navbar.jsx` - Navigation
- ✅ `src/components/common/Footer.jsx` - Footer

### **BATCH 5: PROFILE SYSTEM** (90 mins)
- ✅ `src/pages/Profile.jsx` - Public profile view
- ✅ `src/components/profile/ProfileWizard.jsx` - 5-step creation
- ✅ `src/components/profile/` - Profile components
- ✅ `src/hooks/useProfile.js` - Profile operations
- ✅ `src/utils/validators.js` - Form validation
- ⚠️ **MVP STOPS HERE** - Core profile system working

### **BATCH 6: ADMIN MODERATION** (120 mins)
- ✅ `src/pages/AdminPanel.jsx` - Admin dashboard
- ✅ `src/components/admin/ProfileModeration.jsx` - Approval queue
- ✅ `src/components/admin/PhotoModeration.jsx` - Photo review
- ✅ `src/hooks/useAdmin.js` - Admin operations
- ✅ `src/components/common/AdminRoute.jsx` - Admin guard
- ⚠️ **PRODUCTION READY MVP** - Moderated platform

### **BATCH 7: VERIFICATION SYSTEM** (120 mins)
- ✅ `src/components/verification/` - Verification flow
- ✅ `src/hooks/useVerification.js` - Verification logic
- ✅ Liveness detection integration
- ✅ Image quality validation

### **BATCH 8: ADVANCED FEATURES** (Future)
- 🔲 Messaging system
- 🔲 Real-time notifications
- 🔲 AI matching
- 🔲 Payment integration

---

## 🔐 MVP Security Priorities

```
TIER 1 - CRITICAL (Batch 2-3)
├─ Firebase Authentication (email + Google)
├─ Firestore security rules
├─ Role-based access (user vs admin)
├─ Protected routes
└─ Password hashing (Firebase native)

TIER 2 - HIGH (Batch 4-5)
├─ Form validation
├─ CORS protection
├─ XSS prevention (React auto-escape)
├─ CSRF tokens (Firebase native)
└─ Input sanitization

TIER 3 - MEDIUM (Batch 6-7)
├─ Image validation (type, size, quality)
├─ Admin approval before visibility
├─ Privacy settings
├─ Photo moderation
└─ Verification system
```

---

## 📊 MVP Feature Set

### ✅ INCLUDED IN MVP

```
Authentication
├─ Email/Password signup & login
├─ Google OAuth
├─ Password reset
├─ Email verification
└─ Custom roles (user, admin)

User Profile
├─ Complete profile in 5 steps
├─ 13 profile fields
├─ Photo upload (1-5 photos)
├─ Privacy controls
└─ Edit profile anytime

Search & Discovery
├─ Browse profiles (approved only)
├─ 6 main filters (gender, age, location, etc)
├─ Infinite scroll
└─ Profile cards

Engagement
├─ Send interests
├─ Receive interests
├─ View interests received
├─ Quick contact exchange
└─ Notifications

Admin Panel
├─ Dashboard with stats
├─ Profile approval queue
├─ Photo review & moderation
├─ User management
└─ Analytics overview

Safety
├─ Manual profile approval
├─ Photo moderation
├─ Contact info protection
├─ Report profiles
└─ User blocking
```

### 🔲 NOT IN MVP (Phase 2+)

```
Messaging & Chat
- Real-time messaging
- Chat history
- Message search

Verification
- Liveness detection
- Verified badge
- ID verification

Premium Features
- Featured profiles
- Boosted visibility
- Priority support
- See who viewed

Advanced
- AI recommendations
- Match scores
- Personality tests
- Video verification
- Mobile app
```

---

## 🔄 Data Flow (MVP)

```
USER REGISTRATION
Guest
  ↓ [Sign up email/password]
→ Firebase Auth
  ↓
→ Create Firestore user doc
  ↓
→ Send verification email
  ↓
→ Verify email link
  ↓
Logged In → Profile Setup

PROFILE CREATION
Logged In User
  ↓ [Start profile wizard]
→ Step 1: Basic Info
  ↓ [Next]
→ Step 2: Religious Info
  ↓ [Next]
→ Step 3: Professional Info
  ↓ [Next]
→ Step 4: Upload Photos
  ↓ [Next]
→ Step 5: Preferences
  ↓ [Submit]
→ Save to Firestore
→ Status: "Pending Approval"
  ↓ [Email: "Profile under review"]
→ Admin Reviews
  ├─ [Approve] → Status: "Approved" → Visible
  └─ [Reject] → Status: "Rejected" → Can edit & resubmit

PROFILE DISCOVERY
User (Approved Profile)
  ↓ [Browse profiles]
→ Query: profiles where status == "approved"
  ↓
→ Apply filters (gender, age, location, etc)
  ↓
→ Display results (pagination)
  ↓
→ User clicks profile
  ↓ [View full details]
→ [Send Interest]
  ↓
→ Create Interest doc
→ Send notification to recipient
  ↓
Recipient
  ├─ [View interest]
  ├─ [Accept] → Exchange contact info
  └─ [Reject] → Notify sender
```

---

## 🚀 Deployment Stages (MVP)

```
STAGE 1: LOCAL DEVELOPMENT
├─ Vite dev server (npm run dev)
├─ Firebase emulator
└─ Test everything locally

STAGE 2: STAGING
├─ Firebase staging project
├─ Real Firestore data (test set)
├─ Admin testing
└─ Firebase deploy --only hosting

STAGE 3: PRODUCTION
├─ Firebase production project
├─ Real Firestore data
├─ Live users
├─ Monitoring & alerts
└─ firebase deploy
```

---

## 📈 Success Metrics (MVP)

```
Week 1-2: Setup & Auth
├─ Users can signup/login
├─ Profiles created
└─ Profiles awaiting approval

Week 3-4: Moderation
├─ Admin can approve profiles
├─ Approved profiles visible
└─ Users can search

Week 5-6: Engagement
├─ Interest system working
├─ Contact exchange
└─ Basic notifications

Week 7-8: Polish & Launch
├─ Performance optimized
├─ Security rules tested
├─ Documentation complete
└─ Public launch ready
```

---

## 🔒 Privacy Checklist (MVP)

```
✓ Profiles hidden until admin approval
✓ Photos visible only to approved, logged-in users
✓ Phone/WhatsApp numbers encrypted
✓ Contact info not visible publicly
✓ Only shown via "Contact Exchange" when approved
✓ Users can hide profile anytime
✓ Users can delete account/data
✓ Privacy policy in footer
✓ Terms of service agreement required
✓ GDPR-ready (data export, deletion)
```

---

## 📝 Configuration Files Summary

```
.env
├─ VITE_FIREBASE_API_KEY
├─ VITE_FIREBASE_PROJECT_ID
├─ VITE_FIREBASE_STORAGE_BUCKET
├─ VITE_APP_NAME
└─ VITE_SUPPORT_EMAIL

vite.config.js
├─ Port: 5173
├─ Proxy: None (Firebase handles)
└─ Plugins: React

tailwind.config.js
├─ Theme colors
├─ Dark mode
└─ Custom utilities

firebase.json
├─ Hosting: dist/
├─ Rewrites: SPA
├─ Headers: Security
└─ Functions: None (MVP)
```

---

**Document Version**: 1.0  
**Status**: Ready for Phase 5 Code Generation  
**Security Level**: High (MVP Baseline)
