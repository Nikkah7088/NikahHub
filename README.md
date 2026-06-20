# Nikah Hub - Islamic Matrimonial Platform

**Version**: 1.0.0  
**Status**: Production Ready  
**Founded**: June 2024  
**Founder**: Ahmed Hassan Noor (Rahim Yar Khan, Pakistan)

---

## 📖 Overview

**Nikah Hub** is a professional, trust-focused Islamic matrimonial matching platform designed to help Muslim families find suitable marriage proposals in a secure, verified, and privacy-centric environment.

**Tagline**: *Halal • Trust • Rabta*

**Mission**: To make Nikah easier, safer, family-oriented, and accessible for Muslim families while maintaining privacy, trust, transparency, and Islamic values.

**Vision**: To become one of the most trusted Muslim matrimonial platforms connecting families worldwide through a secure, ethical, and technology-driven system.

---

## ✨ Key Features

### 🔐 Security & Trust
- **Manual Admin Approval**: All profiles vetted by administrators before public display
- **Identity Verification**: Liveness-based selfie verification with AI detection
- **Photo Moderation**: AI-powered quality validation + manual review
- **Verified Badge**: Trust indicator for verified profiles
- **Community Reporting**: Report inappropriate profiles safely

### 👤 User Management
- **Email & Google Authentication**: Flexible signup options
- **Profile Completion Wizard**: 5-step guided onboarding
- **Profile Visibility Controls**: Choose who sees your profile and photos
- **Privacy Settings**: Hide contact info, control photo visibility
- **Multi-Role Support**: Self, Parent/Guardian, Marriage Bureau Agent

### 🔍 Search & Discovery
- **Advanced Filters**: 
  - Gender, Age Range
  - Location (Country, City)
  - Education Level
  - Occupation & Income
  - Religious Practice
  - Marital Status
- **Featured Profiles**: Admin-curated homepage recommendations
- **Success Stories**: Real testimonials from matched couples
- **Infinite Scroll**: Smooth browsing experience

### 💬 Engagement
- **Interest System**: Express interest in profiles securely
- **Contact Exchange**: Safe phone/WhatsApp sharing after mutual interest
- **Community Reviews**: Rate and review users (moderated)
- **Notifications**: Real-time alerts for interests and updates

### 📊 Admin Dashboard
- **Profile Moderation**: Approve/Reject profiles with feedback
- **Verification Review**: Process identity verification requests
- **Photo Moderation**: Review and approve profile photos
- **Analytics Dashboard**: User growth, engagement metrics
- **Featured Profile Management**: Promote trending profiles
- **User Management**: Monitor and manage user accounts

### 🌍 Localization
- **Multi-Language Support**:
  - English
  - Urdu
  - Saraiki
  - Sindhi
  - Punjabi
- **Multi-Currency**: JazzCash, NayaPay, SadaPay donations

### 📱 Responsive Design
- **Mobile-First**: Optimized for iOS and Android
- **Desktop Ready**: Full experience on laptops and larger screens
- **Fast Loading**: Optimized performance for slow connections
- **Accessible**: WCAG 2.1 AA compliant

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18+ with Hooks
- **Build Tool**: Vite (Lightning-fast development)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **State Management**: Context API + React Query
- **Forms**: React Hook Form
- **UI Components**: Radix UI
- **Charts**: Recharts (Analytics)

### Backend
- **Platform**: Firebase
  - Authentication (Email, Google OAuth)
  - Firestore (NoSQL Database)
  - Cloud Storage (Image hosting)
  - Cloud Hosting (CDN)
  - (Future) Cloud Functions
  - (Future) Cloud Tasks

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint + Prettier
- **Testing**: Vitest + React Testing Library
- **Error Tracking**: Sentry (production)
- **Analytics**: Google Analytics 4 + Firebase Analytics

---

## 📦 Installation & Setup

### Prerequisites
```bash
- Node.js 18.x or later
- npm or yarn
- Git
- Firebase account
```

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/yourusername/nikah-hub.git
cd nikah-hub

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your Firebase credentials

# 4. Start development server
npm run dev
# Open http://localhost:5173

# 5. Start Firebase emulators (optional)
firebase emulators:start
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview

# Deploy to Firebase Hosting
npm run build
firebase deploy

# Or deploy with one command
firebase deploy --only hosting
```

---

## 📁 Project Structure

```
nikah-hub/
├── public/                          # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   ├── components/                  # Reusable React components
│   │   ├── common/                  # Global components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   ├── ProfileWizard.jsx
│   │   │   └── VerificationFlow.jsx
│   │   ├── profile/
│   │   │   ├── ProfileCard.jsx
│   │   │   ├── ProfileDetail.jsx
│   │   │   ├── PhotoGallery.jsx
│   │   │   └── EditProfile.jsx
│   │   ├── search/
│   │   │   ├── SearchFilter.jsx
│   │   │   ├── ProfileGrid.jsx
│   │   │   └── SortOptions.jsx
│   │   ├── dashboard/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── InterestsList.jsx
│   │   │   ├── SavedProfiles.jsx
│   │   │   └── Notifications.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ProfileModeration.jsx
│   │   │   ├── VerificationReview.jsx
│   │   │   ├── PhotoModeration.jsx
│   │   │   └── Analytics.jsx
│   │   └── home/
│   │       ├── HeroSection.jsx
│   │       ├── FeaturedProfiles.jsx
│   │       ├── HowItWorks.jsx
│   │       ├── SuccessStories.jsx
│   │       └── FAQ.jsx
│   │
│   ├── pages/                       # Page components (routes)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   │
│   ├── context/                     # Context API providers
│   │   ├── AuthContext.jsx          # Authentication state
│   │   ├── UserContext.jsx          # User profile state
│   │   ├── AdminContext.jsx         # Admin operations state
│   │   ├── NotificationContext.jsx  # Notifications state
│   │   └── LanguageContext.jsx      # Language/i18n state
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.js               # Authentication
│   │   ├── useProfile.js            # Profile operations
│   │   ├── useSearch.js             # Search functionality
│   │   ├── useNotifications.js      # Notifications
│   │   └── useAdmin.js              # Admin operations
│   │
│   ├── firebase/                    # Firebase integration
│   │   ├── config.js                # Firebase initialization
│   │   ├── auth.js                  # Authentication service
│   │   ├── db.js                    # Firestore operations
│   │   ├── storage.js               # Cloud Storage operations
│   │   └── customClaims.js          # Role management
│   │
│   ├── utils/                       # Utility functions
│   │   ├── validators.js            # Form validation
│   │   ├── formatters.js            # Data formatting
│   │   ├── imageProcessor.js        # Image processing
│   │   ├── analytics.js             # Event tracking
│   │   ├── constants.js             # App constants
│   │   └── errorHandler.js          # Error utilities
│   │
│   ├── styles/                      # Global styles
│   │   ├── tailwind.config.js       # Tailwind configuration
│   │   ├── globals.css              # Global styles
│   │   └── animations.css           # Custom animations
│   │
│   ├── i18n/                        # Internationalization
│   │   ├── en.json                  # English translations
│   │   ├── ur.json                  # Urdu translations
│   │   ├── sk.json                  # Saraiki translations
│   │   └── i18n.js                  # i18n configuration
│   │
│   ├── types/                       # TypeScript types (optional)
│   │   ├── User.ts
│   │   ├── Profile.ts
│   │   └── Interest.ts
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Base styles
│
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── .eslintrc.json                    # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── firebase.json                     # Firebase configuration
├── firestore.rules                   # Firestore security rules
├── storage.rules                     # Storage security rules
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Dependencies
├── package-lock.json                 # Dependency lock
│
├── docs/                             # Documentation
│   ├── DATABASE_SCHEMA.md
│   ├── FIREBASE_SETUP_GUIDE.md
│   ├── FIREBASE_SECURITY_RULES.md
│   ├── API_REFERENCE.md
│   ├── AUTHENTICATION.md
│   ├── ADMIN_GUIDE.md
│   └── DEPLOYMENT.md
│
└── README.md                         # This file
```

---

## 🔑 Key Directories Explained

### `/src/components`
Reusable React components organized by feature. Each component is self-contained with its own styles and logic.

### `/src/pages`
Page-level components that correspond to routes. These compose smaller components.

### `/src/context`
Global state management using React Context API. Reduces prop drilling.

### `/src/hooks`
Custom React hooks encapsulating reusable logic for authentication, data fetching, etc.

### `/src/firebase`
Firebase integration layer. All Firebase operations centralized here for easy maintenance.

### `/src/utils`
Utility functions for common tasks: validation, formatting, image processing, analytics.

### `/src/i18n`
Internationalization files and configuration for multi-language support.

---

## 🔄 Project Workflow

### User Journey

```
Guest
  ↓
Visit Home → Browse Profiles (limited) → Sign Up
  ↓
Email Verification
  ↓
Complete Profile (Wizard - 5 steps)
  ↓
Upload Photos
  ↓
Verification Submitted (Pending Admin Review)
  ↓
Admin Approves Profile
  ↓
Profile Visible in Search
  ↓
Search for Matches → Send Interest
  ↓
Recipient Responds
  ↓
Contact Exchange
  ↓
Communication (Outside Platform)
```

### Admin Workflow

```
Admin Login
  ↓
Dashboard Overview (Pending items)
  ↓
Moderation Queue
  ├─ Pending Profiles (45)
  ├─ Pending Verifications (12)
  ├─ Pending Photos (28)
  ├─ Reported Profiles (5)
  └─ Pending Reviews (8)
  ↓
Review Items → Approve/Reject/Suspend
  ↓
Analytics & Reports
  ↓
Manage Featured Profiles
  ↓
Manage Homepage Messages
```

---

## 🚀 Getting Started with Development

### 1. Set Up Firebase Project

```bash
# Create Firebase project at console.firebase.google.com
# Download Firebase credentials
# Create .env file with:
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
# (See .env.example for all variables)
```

### 2. Run Development Server

```bash
npm run dev
# Starts at http://localhost:5173
# HMR (Hot Module Replacement) enabled
```

### 3. Use Firebase Emulator (Optional)

```bash
firebase emulators:start
# Runs Firestore, Auth, Storage locally
# UI at http://localhost:4000
# Great for development without using quotas
```

### 4. Development Commands

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Check code quality
npm run format        # Format code with Prettier
npm test              # Run tests
npm run type-check    # TypeScript check (if using TS)
```

---

## 📱 Mobile App Consideration

For mobile apps (iOS/Android), consider:

```
Nikah Hub Web → Build Web Wrapper
├─ React Native (Recommended)
├─ Flutter (Alternative)
└─ Native (Full control)

Use same Firebase backend across platforms
```

---

## 🔐 Security Features

- ✅ HTTPS enforcement
- ✅ Firebase Authentication
- ✅ Row-level security rules
- ✅ Role-based access control
- ✅ Encrypted sensitive fields
- ✅ CSRF protection
- ✅ XSS prevention (React auto-escaping)
- ✅ Rate limiting (server-side)
- ✅ Image validation (type, size, quality)
- ✅ Verification system (liveness detection)

---

## 📊 Performance

**Lighthouse Scores Target**:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Key Optimizations**:
- Code splitting by route
- Image lazy loading
- Tailwind CSS purging
- Service Worker (offline support)
- CDN via Firebase Hosting
- Optimized Firebase queries

---

## 🌐 Deployment

### Firebase Hosting

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting

# View live
firebase open hosting:site
```

### Custom Domain

```
1. Buy domain (GoDaddy, Namecheap, etc)
2. Firebase Console → Hosting → Connect domain
3. Add DNS records
4. Wait for SSL (automatic)
```

### CI/CD with GitHub

```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: nikah-hub-prod
```

---

## 📚 Documentation

See `/docs` folder for detailed documentation:
- `DATABASE_SCHEMA.md` - Firestore structure
- `FIREBASE_SETUP_GUIDE.md` - Firebase configuration
- `FIREBASE_SECURITY_RULES.md` - Security rules
- `API_REFERENCE.md` - API documentation
- `AUTHENTICATION.md` - Auth flow
- `ADMIN_GUIDE.md` - Admin panel guide
- `DEPLOYMENT.md` - Production deployment

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Create Pull Request

### Code Standards
- Use ESLint configuration
- Format with Prettier
- Write descriptive commit messages
- Add comments for complex logic
- Keep components under 300 lines

---

## 📞 Contact & Support

**Founder & Administrator**:
- Name: Ahmed Hassan Noor (Mahar Ahmed / AhmedRYK)
- Email: HalalNikkahMatch@gmail.com
- Location: Rahim Yar Khan, Punjab, Pakistan
- Facebook: https://www.facebook.com/mahar.ahmed.144/

**Support**:
- Email: HalalNikkahMatch@gmail.com
- WhatsApp: [Available via contact page]
- Response time: 24 hours

---

## 🙏 Special Appreciation

**Special note of gratitude** to **Qari Nadeem Ahmed Sahib**, whose sincere guidance, encouragement, and years of community service inspired this journey.

---

## 📜 License

This project is private and proprietary. All rights reserved.

---

## 🎯 Roadmap

### Phase 1 (Current) - MVP
- ✅ User authentication
- ✅ Profile creation & management
- ✅ Search & filtering
- ✅ Interest system
- ✅ Photo moderation
- ✅ Verification system

### Phase 2 - Premium Features
- 🔲 Real-time messaging
- 🔲 Premium membership tiers
- 🔲 Profile boosting
- 🔲 Video verification
- 🔲 Payment integration (JazzCash, NayaPay)
- 🔲 Mobile app (React Native)

### Phase 3 - AI Features
- 🔲 AI-powered match suggestions
- 🔲 Smart recommendations
- 🔲 Personality matching
- 🔲 Compatibility scoring

### Phase 4 - Scale
- 🔲 Multi-language expansion
- 🔲 International launch
- 🔲 Offline app support
- 🔲 Advanced analytics

---

## 📈 Success Metrics

- **User Growth**: Target 100,000+ users in Year 1
- **Engagement**: 40%+ monthly active users
- **Trust**: 95%+ positive user reviews
- **Safety**: 0 major security incidents
- **Performance**: Lighthouse score 95+
- **Success Rate**: 5%+ marriage conversions

---

## 🙏 Prayer & Support

**Dua (Prayer)**:
> "O Allah, make this platform a means of bringing righteous families together. Protect all users, guide them to suitable matches, and bless them with peaceful, Islamic marriages. Ameen."

---

## ✨ Built With 💚 For The Muslim Community

**Assalamu Alaikum** 🤲

Nikah Hub is built with sincere intentions to serve Muslim families and community. May Allah accept this effort and grant success to all users in their matrimonial journey.

---

**Last Updated**: June 18, 2024  
**Status**: Production Ready  
**Version**: 1.0.0
