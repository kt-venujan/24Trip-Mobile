# 🚗 24 Trip – Mobile Application

**24 Trip** is a ride-sharing mobile application designed to connect passengers and drivers for convenient, affordable, and reliable long-distance travel across Sri Lanka.

Built using **React Native, Expo, and TypeScript**, the mobile application integrates with the existing 24 Trip web platform and backend.

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile development |
| Expo | Mobile development framework |
| TypeScript | Type-safe application development |
| Expo Router / React Navigation | Mobile screen navigation |
| Next.js | Existing backend and API services |
| Supabase PostgreSQL | Database |
| Prisma | Database ORM (backend) |
| Cloudinary | Image storage |
| Vercel | Backend hosting |

## ✨ Features

### 👤 Passenger Features
- Search for available trips
- View trip details and available seats
- Book seats on available trips
- Manage trip bookings
- View booking history
- Manage passenger profiles

### 🚘 Driver Features
- Create and publish trips
- Manage available seats
- View passenger bookings
- Manage trip schedules
- Update trip status
- Manage driver and vehicle information

### 🔐 Authentication
- User registration and login
- Role-based access for passengers and drivers
- Secure integration with the existing backend

> **Development Note:** The features listed above represent the planned functionality. The mobile UI and backend integration are being developed progressively.

## 🏗️ System Architecture

```text
24 Trip Platform
│
├── 🌐 Web Application
│   └── Next.js + TypeScript
│
├── 📱 Mobile Application
│   └── React Native + Expo
│
└── ⚙️ Existing Backend
    ├── Next.js API Routes
    ├── Prisma ORM
    ├── Supabase PostgreSQL
    └── Cloudinary
```

Both the web and mobile applications are designed to use the same backend services and database.

## 📂 Project Structure

Proposed structure:

```text
24trip-mobile/
├── app/                 # Expo Router screens
│   ├── (auth)/          # Authentication screens
│   ├── (tabs)/          # Main navigation screens
│   └── _layout.tsx      # Root navigation layout
├── components/          # Reusable UI components
├── constants/           # Theme and constants
├── hooks/               # Custom React hooks
├── services/            # Backend API integration
├── types/               # TypeScript definitions
├── assets/              # Images, icons and fonts
├── package.json
├── app.json
└── tsconfig.json
```

*The actual directory structure may change during development.*

## 🛠️ Getting Started

### Prerequisites

- Node.js (supported LTS version)
- npm
- Expo Go on an Android device
- VS Code or another code editor

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/24trip-mobile.git
cd 24trip-mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npx expo start
```

### 4. Run on Android

1. Install Expo Go from the Google Play Store.
2. Connect your computer and Android device to the same Wi-Fi network.
3. Scan the QR code displayed in the terminal.
4. Open the application using Expo Go.

## 🔗 Backend Integration

The mobile application is intended to communicate with the existing **24 Trip Next.js backend** through API endpoints.

Example environment configuration:

```env
EXPO_PUBLIC_API_URL=https://your-api-domain.com/api
```

Only expose public configuration through `EXPO_PUBLIC_` variables. Keep database credentials, API secrets, and other sensitive keys on the backend.

## 🗺️ Development Roadmap

- [x] Initialize React Native application with Expo
- [x] Run the application on Android using Expo Go
- [ ] Implement mobile branding and theme
- [ ] Build reusable UI components
- [ ] Configure screen navigation
- [ ] Develop passenger interfaces
- [ ] Develop driver interfaces
- [ ] Integrate authentication
- [ ] Connect existing backend APIs
- [ ] Implement trip searching and booking
- [ ] Perform testing and optimization
- [ ] Prepare Android production build

## 🎯 Project Goal

To create a user-friendly mobile experience for long-distance ride-sharing in Sri Lanka while maintaining compatibility with the existing 24 Trip web platform.

## 👨‍💻 Developer

**Thirugnanam Venujan**

- Portfolio: https://venuu.codes
- Location: Sri Lanka

---

**24 Trip – Connecting People, Sharing Journeys.** 🚗
