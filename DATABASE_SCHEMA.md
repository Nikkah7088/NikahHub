# DATABASE SCHEMA - NIKAH HUB

## Firestore Collections Reference

### 1. USERS Collection

**Purpose**: Store user account information and authentication metadata

```javascript
Collection: users
Document ID: Firebase UID (auto)

{
  // Authentication
  uid: "user_123abc",
  email: "ahmed@example.com",
  emailVerified: true,
  phoneVerified: false,
  phone: "03XXXXXXXXX", // encrypted
  
  // Profile
  displayName: "Ahmed Hassan",
  photoURL: "https://storage.googleapis.com/...",
  
  // Role & Status
  role: "user" | "admin", // custom claim
  status: "active" | "inactive" | "suspended",
  
  // Account Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLoginAt: Timestamp,
  
  // Registration Info
  registrationType: "self" | "parent" | "agent",
  referralCode: "NIKAH2024",
  source: "google" | "email" | "direct",
  
  // Security
  twoFAEnabled: false,
  loginAttempts: 0,
  lastFailedLoginAt: null,
  
  // Privacy
  privacySettings: {
    showEmail: false,
    allowMessages: true,
    allowProfileSharing: true
  }
}
```

### 2. PROFILES Collection

**Purpose**: Store user matrimonial profiles with all details

```javascript
Collection: profiles
Document ID: profileId (random UUID)

{
  // Reference
  id: "profile_789xyz",
  userId: "user_123abc",
  
  // Status
  status: "incomplete" | "pending_approval" | "approved" | "rejected" | "hidden",
  profileCompletion: 95, // percentage
  
  // BASIC INFORMATION
  basicInfo: {
    fullName: "Ahmed Hassan Noor",
    firstName: "Ahmed",
    lastName: "Hassan",
    gender: "male" | "female",
    dateOfBirth: Timestamp, // YYYY-MM-DD
    age: 28,
    city: "Rahim Yar Khan",
    country: "Pakistan",
    phone: "+923XXXXXXXXX", // encrypted
    whatsApp: "+923XXXXXXXXX" // encrypted
  },
  
  // PHYSICAL INFORMATION
  physical: {
    height: "5'8\"" | "5'9\"" | "6'0\"",
    weight: 70, // kg
    complexion: "fair" | "medium" | "dark" | "wheatish",
    bodyType: "slim" | "athletic" | "average" | "heavy"
  },
  
  // RELIGIOUS INFORMATION
  religious: {
    religion: "Islam", // always Islam
    sect: "Sunni" | "Shia" | "Ahmadi" | "Other",
    religiousPractice: "very_religious" | "religious" | "moderate" | "casual",
    salahPractice: "5_times_daily" | "regularly" | "sometimes" | "rarely",
    hijabPractice: "full_niqab" | "hijab" | "covers_hair" | "no_headcover" // female only
  },
  
  // EDUCATION & CAREER
  professional: {
    education: "Matric" | "Intermediate" | "Bachelors" | "Masters" | "PhD",
    educationField: "Engineering" | "Medicine" | "Business" | etc,
    occupation: "Software Engineer" | "Doctor" | "Student" | etc,
    company: "Tech Company Name",
    position: "Senior Engineer",
    monthlyIncome: "50000-100000" | "100000-200000" | "200000-500000" | "500000+"
  },
  
  // FAMILY INFORMATION
  familyInfo: {
    maritalStatus: "never_married" | "widowed" | "divorced",
    children: "no_children" | "one_child" | "two_children" | "multiple_children",
    familySetup: "joint_family" | "nuclear_family" | "extended_family",
    parentalStatus: "both_alive" | "father_deceased" | "mother_deceased" | "both_deceased",
    fatherOccupation: "Businessman",
    motherStatus: "housewife" | "working",
    siblings: 2,
    siblingDetails: [
      { name: "Fatima", gender: "female", status: "married" },
      { name: "Ali", gender: "male", status: "married" }
    ]
  },
  
  // PREFERENCES FOR PARTNER
  preferences: {
    seekingGender: "male" | "female",
    ageRange: { min: 18, max: 35 },
    heightPreference: "5'0\" - 6'0\"",
    
    locationPreference: [
      { country: "Pakistan", priority: 1 },
      { country: "UAE", priority: 2 },
      { country: "UK", priority: 3 }
    ],
    
    educationPreference: ["Bachelors", "Masters", "PhD"],
    
    occupationPreference: ["Engineer", "Doctor", "Businessman"],
    
    religiousPreference: "very_religious" | "religious" | "moderate",
    sectPreference: ["Sunni"],
    
    maritalStatusPreference: "never_married" | "widowed" | "divorced",
    childrenAcceptance: "no_children" | "accepts_with_children",
    
    incomeRange: "100000-200000",
    
    familyTypePreference: ["nuclear_family", "joint_family"],
    
    personalTraits: ["honest", "educated", "caring", "humble"],
    
    noPreferenceIfLike: true // if personality matches
  },
  
  // PERSONAL DESCRIPTION
  aboutMe: "I am a practicing Muslim, educated professional seeking a righteous spouse to build a peaceful Islamic household...",
  partnerPreference: "Looking for someone who is family-oriented, practices Islam, and values honesty and trust...",
  hobbies: ["reading", "sports", "travel", "cooking"],
  interests: ["Islamic learning", "community service"],
  
  // PHOTOS
  photos: [
    {
      id: "photo_1",
      url: "gs://bucket/profiles/user_123abc/photo_1.jpg",
      thumbnailUrl: "gs://bucket/profiles/user_123abc/photo_1_thumb.jpg",
      uploadedAt: Timestamp,
      status: "approved" | "pending_review" | "rejected",
      type: "selfie" | "half_body" | "full_body",
      qualityScore: 0.95,
      blurScore: 0.92,
      faceDetectedScore: 0.99,
      brightnessScore: 0.88,
      resolution: "1200x1200",
      size: 245000, // bytes
      moderationNotes: "Clear, well-lit selfie"
    },
    {
      id: "photo_2",
      url: "gs://bucket/profiles/user_123abc/photo_2.jpg",
      thumbnailUrl: "gs://bucket/profiles/user_123abc/photo_2_thumb.jpg",
      uploadedAt: Timestamp,
      status: "approved",
      type: "half_body",
      qualityScore: 0.87
    }
  ],
  photoCount: 2,
  mainPhotoId: "photo_1",
  
  // VERIFICATION STATUS
  verification: {
    status: "not_verified" | "pending_review" | "verified" | "rejected",
    submittedAt: Timestamp,
    reviewedAt: Timestamp,
    reviewedBy: "admin_user_456",
    badge: true, // visible on profile if verified
    notes: "Verified via liveness detection",
    livenessScore: 0.98,
    verificationRequestId: "ver_123"
  },
  
  // PRIVACY SETTINGS
  privacy: {
    photosVisibleTo: "approved_logged_in" | "all_logged_in" | "verified_only",
    contactVisible: false,
    showOnHomepage: true,
    showInSearch: true,
    allowMessages: true,
    allowInterests: true,
    hiddenFrom: ["user_999"], // blocked users
    lastActiveVisible: true,
    locationVisible: true,
    photoDownloadProtected: true
  },
  
  // ENGAGEMENT METRICS
  engagement: {
    profileViews: 245,
    profileViewsThisMonth: 45,
    interestsReceived: 12,
    interestsSent: 5,
    reviewsReceived: 2,
    lastActivityAt: Timestamp,
    lastProfileEditAt: Timestamp,
    lastLoginAt: Timestamp
  },
  
  // ADMIN MODERATION
  adminInfo: {
    approvedAt: Timestamp,
    approvedBy: "admin_123",
    rejectionReason: null, // "Incomplete information", "Inappropriate content", etc
    rejectionDetails: null,
    adminNotes: "Clean profile, verified user, good photos",
    flaggedForReview: false,
    flagReason: null,
    reportCount: 0
  },
  
  // TIMESTAMP
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // SEO & Searchable Fields
  searchKeywords: ["Ahmed", "Hassan", "28", "Lahore", "Engineer", "Sunni"]
}
```

### 3. INTERESTS Collection

**Purpose**: Track interests/proposals between users

```javascript
Collection: interests
Document ID: interest_<uuid>

{
  id: "interest_abc123",
  
  // Users
  fromUserId: "user_123abc",
  toUserId: "user_789xyz",
  
  // Quick Display
  fromUserName: "Ahmed Hassan",
  fromUserPhoto: "url",
  fromUserCity: "Lahore",
  toUserName: "Fatima Khan",
  toUserPhoto: "url",
  toUserCity: "Karachi",
  
  // Message
  message: "Assalamu Alaikum, I am interested in connecting with you. I am...",
  status: "sent" | "accepted" | "rejected" | "expired",
  
  // Timestamps
  createdAt: Timestamp,
  respondedAt: Timestamp,
  expiresAt: Timestamp (30 days),
  
  // Contact Exchange (if accepted)
  contactExchange: {
    exchangedAt: Timestamp,
    fromUserPhone: "+923XXXXXXXXX", // encrypted
    fromUserWhatsApp: "+923XXXXXXXXX",
    toUserPhone: "+923XXXXXXXXX",
    toUserWhatsApp: "+923XXXXXXXXX"
  }
}
```

### 4. NOTIFICATIONS Collection

**Purpose**: Track user notifications

```javascript
Collection: notifications
Document ID: notif_<uuid>

{
  id: "notif_xyz789",
  userId: "user_123abc", // recipient
  
  // Notification Content
  type: "profile_approved" | "interest_received" | "interest_accepted" | 
        "message_received" | "verification_verified" | "photo_rejected" |
        "admin_message" | "review_received" | "profile_featured",
  title: "Your profile is approved!",
  message: "Congratulations! Your profile has been approved by admin.",
  
  // Context
  relatedUserId: "user_789xyz", // who triggered this
  relatedProfileId: "profile_789xyz",
  relatedInterestId: "interest_abc",
  relatedReviewId: "review_def",
  
  // Action
  actionUrl: "/profile/fatimakhan",
  actionLabel: "View Profile",
  
  // Status
  read: false,
  readAt: null,
  archived: false,
  
  // Metadata
  createdAt: Timestamp,
  expiresAt: Timestamp (90 days),
  priority: "high" | "normal" | "low"
}
```

### 5. REVIEWS Collection

**Purpose**: Store community reviews

```javascript
Collection: reviews
Document ID: review_<uuid>

{
  id: "review_abc123",
  
  // Users
  fromUserId: "user_123abc",
  toUserId: "user_789xyz",
  fromUserName: "Ahmed Hassan",
  toUserName: "Fatima Khan",
  
  // Review Content
  title: "Great experience with Fatima!",
  content: "Fatima is very respectful, honest, and family-oriented. Highly recommend!",
  rating: 5, // 1-5 stars
  
  // Categories
  honesty: 5,
  respect: 5,
  communication: 4,
  familyOriented: 5,
  religiousPractice: 5,
  
  // Status
  status: "pending_review" | "approved" | "rejected",
  approvedAt: Timestamp,
  approvedBy: "admin_456",
  rejectionReason: null,
  
  // Metadata
  createdAt: Timestamp,
  helpful: 12, // users marked as helpful
  unhelpful: 1
}
```

### 6. SUCCESS STORIES Collection

**Purpose**: Store success stories of matched couples

```javascript
Collection: successStories
Document ID: story_<uuid>

{
  id: "story_xyz123",
  
  // Couple Info
  groomId: "user_123abc",
  groomName: "Ahmed Hassan",
  groomPhoto: "url",
  
  brideId: "user_789xyz",
  brideName: "Fatima Khan",
  bridePhoto: "url",
  
  // Story Details
  title: "Found my perfect match on Nikah Hub!",
  story: "We met on Nikah Hub in 2024 and connected immediately. After getting to know each other through messages, we had family meetings and decided to get married. Alhamdulillah, the wedding was beautiful...",
  
  // Dates
  metDate: Timestamp,
  marriageDate: Timestamp,
  
  // Media
  images: [
    {
      id: "img_1",
      url: "gs://bucket/stories/story_xyz123/img_1.jpg",
      caption: "On our wedding day",
      uploadedAt: Timestamp
    }
  ],
  
  // Status
  status: "pending_review" | "approved" | "featured",
  featured: true,
  featuredAt: Timestamp,
  approvedAt: Timestamp,
  approvedBy: "admin_456",
  
  // Analytics
  viewCount: 1250,
  likeCount: 340,
  shareCount: 85,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 7. FEATURED PROFILES Collection

**Purpose**: Track featured/boosted profiles on homepage

```javascript
Collection: featuredProfiles
Document ID: featured_<uuid>

{
  id: "featured_abc123",
  profileId: "profile_789xyz",
  userId: "user_123abc",
  
  // Display Info
  userName: "Ahmed Hassan",
  userPhoto: "url",
  age: 28,
  city: "Lahore",
  occupation: "Software Engineer",
  
  // Feature Type
  featureType: "premium_featured" | "boosted" | "highlighted",
  displayOrder: 1, // sorting order on homepage
  
  // Duration
  startDate: Timestamp,
  endDate: Timestamp,
  durationDays: 30,
  
  // Payment (future)
  isPaid: false,
  cost: 0,
  paymentMethod: null,
  paymentId: null,
  
  // Metrics
  impressions: 5000,
  clicks: 250,
  ctr: 5.0, // click-through rate
  
  // Metadata
  addedAt: Timestamp,
  addedBy: "admin_456"
}
```

### 8. ADMIN MESSAGES Collection

**Purpose**: Store banner messages for homepage/dashboard

```javascript
Collection: adminMessages
Document ID: msg_<uuid>

{
  id: "msg_123abc",
  
  // Content
  title: "Welcome to Nikah Hub!",
  content: "We've made improvements to the verification process. Learn more.",
  type: "announcement" | "warning" | "info" | "success",
  
  // Display Settings
  displayOnHome: true,
  displayOnDashboard: true,
  displayToNewUsersOnly: false,
  displayToDismissible: true,
  
  // Duration
  active: true,
  startDate: Timestamp,
  endDate: Timestamp,
  expiresAt: Timestamp,
  
  // Styling
  backgroundColor: "#f0f4f8",
  textColor: "#1a202c",
  icon: "info-circle",
  ctaText: "Learn More",
  ctaUrl: "/help/verification",
  
  // Analytics
  views: 1250,
  clicks: 340,
  dismissals: 89,
  
  // Metadata
  createdAt: Timestamp,
  createdBy: "admin_456",
  updatedAt: Timestamp
}
```

### 9. DONATIONS Collection

**Purpose**: Track user donations

```javascript
Collection: donations
Document ID: donation_<uuid>

{
  id: "donation_xyz789",
  userId: "user_123abc",
  
  // Amount
  amount: 5000, // in smallest currency unit
  currency: "PKR",
  
  // Payment Method
  method: "jazzcash" | "nayapay" | "sadapay" | "stripe" | "bank_transfer",
  paymentProvider: "JazzCash",
  transactionId: "JC123456789",
  reference: "NIKAH_5000_20240618",
  
  // Status
  status: "pending" | "completed" | "failed" | "refunded",
  completedAt: Timestamp,
  
  // Details
  purpose: "platform_support" | "maintenance" | "growth" | "charity",
  message: "For the noble cause of helping Muslims find partners",
  anonymous: false,
  
  // Receipt
  receiptUrl: "gs://bucket/receipts/donation_xyz789.pdf",
  receiptSentAt: Timestamp,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Analytics
  attributed: true
}
```

### 10. VERIFICATION REQUESTS Collection

**Purpose**: Track identity verification submissions

```javascript
Collection: verificationRequests
Document ID: ver_<uuid>

{
  id: "ver_123456",
  userId: "user_123abc",
  profileId: "profile_789xyz",
  
  // Images
  images: {
    selfie: "gs://bucket/verification/ver_123456/selfie.jpg",
    headLeft: "gs://bucket/verification/ver_123456/head_left.jpg",
    headRight: "gs://bucket/verification/ver_123456/head_right.jpg",
    lookUp: "gs://bucket/verification/ver_123456/look_up.jpg",
    lookDown: "gs://bucket/verification/ver_123456/look_down.jpg"
  },
  
  // Quality Scores
  qualityScores: {
    selfie: {
      blur: 0.95,
      brightness: 0.88,
      faceDetected: 0.99,
      faceVisibility: 0.95
    },
    headLeft: {
      blur: 0.92,
      headTurnAngle: 35,
      confidence: 0.96
    },
    headRight: {
      blur: 0.94,
      headTurnAngle: -32,
      confidence: 0.97
    },
    lookUp: {
      blur: 0.90,
      tiltAngle: 25,
      confidence: 0.94
    },
    lookDown: {
      blur: 0.91,
      tiltAngle: -28,
      confidence: 0.95
    }
  },
  
  // Liveness Verification
  liveliness: {
    overallScore: 0.96,
    detectedActions: {
      headTurnLeft: true,
      headTurnRight: true,
      lookUp: true,
      lookDown: true
    },
    faceMatchScore: 0.92, // match to profile photo
    spoofingScore: 0.98 // not a spoof
  },
  
  // Status
  status: "pending_review" | "approved" | "rejected",
  submittedAt: Timestamp,
  reviewedAt: Timestamp,
  reviewedBy: "admin_123",
  
  // Rejection (if applicable)
  rejectionReason: null,
  rejectionDetails: null,
  canRetryAt: null,
  retryCount: 0,
  
  // Device Info
  deviceInfo: {
    browser: "Chrome",
    os: "iOS",
    screenSize: "375x812",
    userAgent: "Mozilla/5.0..."
  },
  ipAddress: "192.168.1.1",
  
  // Expiry
  createdAt: Timestamp,
  expiresAt: Timestamp (90 days, then auto-delete)
}
```

### 11. REPORTS Collection

**Purpose**: Track user-reported profiles

```javascript
Collection: reports
Document ID: report_<uuid>

{
  id: "report_abc123",
  
  // Reported Content
  reportedUserId: "user_789xyz",
  reportedProfileId: "profile_789xyz",
  reportedItemType: "profile" | "photo" | "message",
  
  // Reporter Info
  reportedByUserId: "user_123abc",
  reportedByEmail: "reporter@example.com",
  reporterAnonymous: false,
  
  // Report Details
  reason: "fake_profile" | "inappropriate_photo" | "misleading_info" | 
          "offensive_content" | "harassment" | "fraud" | "other",
  description: "Photos appear to be fake or heavily edited. Profile looks suspicious.",
  evidence: [
    {
      type: "photo",
      url: "gs://bucket/evidence/report_abc123_1.jpg"
    },
    {
      type: "text",
      content: "Screenshot of message"
    }
  ],
  
  // Status
  status: "pending_review" | "investigating" | "resolved" | "dismissed",
  
  // Resolution
  action: "none" | "photo_removed" | "warning_issued" | "suspended" | "deleted",
  actionTakenAt: Timestamp,
  resolvedAt: Timestamp,
  resolvedBy: "admin_456",
  
  // Notes
  adminNotes: "Profile photos do not match ID verification",
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### 12. ANALYTICS Collection

**Purpose**: Aggregated analytics data (daily snapshots)

```javascript
Collection: analytics
Document ID: analytics_<YYYY-MM-DD>

{
  id: "analytics_2024-06-18",
  date: "2024-06-18",
  
  // User Stats
  totalUsers: 45234,
  activeUsers_7days: 12456,
  activeUsers_30days: 28950,
  newUsers_today: 45,
  newUsers_7days: 320,
  newUsers_30days: 1250,
  
  // Profile Stats
  totalProfiles: 40950,
  approvedProfiles: 39250,
  pendingApprovals: 245,
  rejectedProfiles: 1455,
  verifiedProfiles: 8950,
  
  // Photo Stats
  totalPhotos: 125340,
  approviedPhotos: 122150,
  rejectedPhotos: 3190,
  avgPhotosPerProfile: 3.05,
  
  // Engagement
  interestsSent_today: 850,
  interestsSent_7days: 5250,
  acceptanceRate: 0.32, // 32%
  
  // Verification
  verificationRequests_today: 15,
  verificationApproved_today: 12,
  verificationRejected_today: 2,
  avgVerificationTime: 8.5, // hours
  
  // Donations
  donationsReceived_today: 45000,
  donationsReceived_7days: 285000,
  donorCount_7days: 45,
  
  // Reviews
  reviewsSubmitted_7days: 32,
  reviewsApproved_7days: 28,
  averageRating: 4.7,
  
  // Success Stories
  storiesSubmitted_7days: 3,
  storiesApproved_7days: 2,
  totalStories: 45,
  
  // Geographic
  topCountries: [
    { country: "Pakistan", count: 35000, percentage: 77.4 },
    { country: "UAE", count: 5200, percentage: 11.5 },
    { country: "UK", count: 2500, percentage: 5.5 },
    { country: "USA", count: 1200, percentage: 2.7 },
    { country: "Saudi Arabia", count: 1334, percentage: 2.9 }
  ],
  
  topCities_Pakistan: [
    { city: "Karachi", count: 8500 },
    { city: "Lahore", count: 7200 },
    { city: "Islamabad", count: 4500 },
    { city: "Faisalabad", count: 3200 },
    { city: "Multan", count: 2800 }
  ],
  
  // Demographics
  genderRatio: { male: 0.48, female: 0.52 },
  ageDistribution: {
    "18-22": 0.12,
    "23-25": 0.18,
    "26-30": 0.28,
    "31-35": 0.22,
    "36-40": 0.15,
    "41+": 0.05
  },
  
  // Performance
  avgSessionDuration: 8.5, // minutes
  bounceRate: 0.32,
  pageLoadTime: 1.8, // seconds
  
  // Metadata
  createdAt: Timestamp
}
```

---

## Firestore Indexes Configuration

### Required Compound Indexes

```javascript
// Index 1: Profile Search (Primary)
Collection: profiles
Fields:
  - basicInfo.gender (Ascending)
  - basicInfo.country (Ascending)
  - basicInfo.age (Ascending)
  - status (Ascending)
  - updatedAt (Descending)

// Index 2: City-based Search
Collection: profiles
Fields:
  - basicInfo.city (Ascending)
  - basicInfo.country (Ascending)
  - status (Ascending)
  - engagement.lastActivityAt (Descending)

// Index 3: Education Filter
Collection: profiles
Fields:
  - professional.education (Ascending)
  - basicInfo.age (Ascending)
  - basicInfo.gender (Ascending)
  - status (Ascending)

// Index 4: Religion Filter
Collection: profiles
Fields:
  - religious.religiousPractice (Ascending)
  - basicInfo.country (Ascending)
  - basicInfo.gender (Ascending)
  - status (Ascending)

// Index 5: Interests Listing
Collection: interests
Fields:
  - toUserId (Ascending)
  - status (Ascending)
  - createdAt (Descending)

// Index 6: User Interests Sent
Collection: interests
Fields:
  - fromUserId (Ascending)
  - status (Ascending)
  - createdAt (Descending)

// Index 7: User Notifications
Collection: notifications
Fields:
  - userId (Ascending)
  - read (Ascending)
  - createdAt (Descending)

// Index 8: User Reviews
Collection: reviews
Fields:
  - toUserId (Ascending)
  - status (Ascending)
  - createdAt (Descending)

// Index 9: Featured Profiles
Collection: featuredProfiles
Fields:
  - featureType (Ascending)
  - displayOrder (Ascending)
  - startDate (Ascending)
  - endDate (Descending)
```

---

## Data Validation Rules

### BasicInfo Validation

```javascript
// Field constraints
fullName:
  - Type: String
  - Min length: 3
  - Max length: 50
  - Allowed chars: a-z, A-Z, spaces, hyphens, apostrophes
  
gender:
  - Type: String
  - Enum: ["male", "female"]
  - Required: true
  
age:
  - Type: Integer
  - Min: 18
  - Max: 80
  - Calculated from dateOfBirth
  
city:
  - Type: String
  - Min length: 2
  - Max length: 50
  - Provided by user/form dropdown
  
country:
  - Type: String
  - Enum: [ISO 3166-1 alpha-2 country codes]
  - Required: true
```

### Profile Status Workflow

```
INCOMPLETE
  ↓ [User fills all required fields]
PENDING_APPROVAL
  ↓ [Admin reviews profile]
  ├─ APPROVED (visible in search)
  └─ REJECTED (back to incomplete)

APPROVED
  ├─ [User hides profile] → HIDDEN
  ├─ [User deletes profile] → DELETED
  └─ [Admin suspends] → SUSPENDED
```

---

## Collection Relationships

```
users (1) ──────── (many) profiles
users (1) ──────── (many) interests (fromUserId)
users (1) ──────── (many) interests (toUserId)
users (1) ──────── (many) reviews (fromUserId)
users (1) ──────── (many) reviews (toUserId)
users (1) ──────── (many) notifications
users (1) ──────── (many) verificationRequests
users (1) ──────── (many) donations
users (1) ──────── (many) reports (reportedBy)

profiles (1) ────── (many) photos
profiles (1) ────── (1) verification
profiles (1) ────── (many) interests (toProfileId)
profiles (1) ────── (many) reviews (toProfileId)
```

---

## Document Size Optimization

### Estimated Document Sizes

```
User Document:
  - Basic fields: ~200 bytes
  - Privacy settings: ~300 bytes
  Total: ~500 bytes per user

Profile Document:
  - All fields denormalized: ~8-10 KB
  - Photos array (2 photos): +2 KB
  Total: ~10-12 KB per profile

Interest Document:
  - Basic fields: ~800 bytes
  - Contact exchange data: +400 bytes
  Total: ~1.2 KB

Notification Document:
  - Basic fields: ~600 bytes

Review Document:
  - Basic fields: ~1.2 KB

Success Story Document:
  - Denormalized: ~3-5 KB
  - Images array: ~2 KB per image
```

### Storage Estimates (100k Users)

```
Users: 100,000 * 0.5 KB = 50 MB
Profiles: 95,000 * 12 KB = 1.14 GB
Interests: 500,000 * 1.2 KB = 600 MB
Notifications: 5,000,000 * 0.6 KB = 3 GB (archivable)
Reviews: 50,000 * 1.2 KB = 60 MB
Stories: 500 * 5 KB = 2.5 MB

Photos (Firebase Storage):
  - 95,000 profiles * 3 photos avg = 285,000 photos
  - Avg 300 KB per original + 30 KB thumb = 330 KB
  - Total: ~94 GB

Verification Images:
  - 10,000 verifications * 5 images * 250 KB = 12.5 GB

TOTAL FIRESTORE: ~5 GB
TOTAL STORAGE: ~106 GB
ESTIMATED COST: ~$2-3/month
```

---

## Backup & Recovery Strategy

```
1. Automated Exports
   - Firestore: Daily exports to Cloud Storage
   - Schedule: 2 AM UTC
   - Retention: 90 days
   - Cost: ~$0.50/day for storage

2. Point-in-time Recovery
   - Restore from: Any previous export
   - Timeline: Within 90 days
   - Process: Firestore import from backup

3. Disaster Recovery
   - RPO (Recovery Point Objective): < 1 day
   - RTO (Recovery Time Objective): < 4 hours
   - Backup location: Multi-region Cloud Storage

4. Data Integrity
   - Monthly consistency checks
   - Verify: All foreign key relationships
   - Index: Re-index collections
```

---

**Document Version**: 1.0  
**Last Updated**: June 18, 2024  
**Status**: Production Ready
