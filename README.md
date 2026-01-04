***

# Biometric Authentication App 🛡️

A modern React Native mobile application built with **Expo** and **SDK 50+** demonstrating how to implement secure biometric authentication (Face ID, Fingerprint, and Iris Scan) for both iOS and Android.

[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 📱 Overview

This app provides a boilerplate for implementing a "Security First" flow. It checks for hardware compatibility, verifies if biometrics are enrolled, and triggers the native OS authentication prompts.

### Key Features
- **Device Support Check**: Detects if the device has biometric hardware.
- **Enrollment Check**: Verifies if the user has fingerprints or faces registered.
- **Cross-Platform**: Seamless Face ID for iOS and Fingerprint/Face unlock for Android.
- **Graceful Fallback**: Support for device PIN/Passcode if biometrics fail.
- **Modern UI**: Built with `Lucide-react-native` icons and clean layout.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Expo Go](https://expo.dev/client) app on your device (for basic testing)
- [EAS CLI](https://docs.expo.dev/build/setup/) installed globally (`npm install -g eas-cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SasadaSaumya/biometric-auth-app.git
   cd biometric-auth-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure permissions**
   Ensure your `app.json` includes the Face ID permission (already configured in this repo):
   ```json
   "ios": {
     "infoPlist": {
       "NSFaceIDUsageDescription": "Allow BiometricAuth to use Face ID for secure login."
     }
   }
   ```

---

## 🛠️ Project Structure

```text
├── assets/               # Static files (images/icons)
├── src/
│   ├── services/         
│   │   └── authService.js # Biometric logic & Hardware checks
│   └── screens/          
│       ├── LoginScreen.js # Entry screen with auth trigger
│       └── HomeScreen.js  # Protected content (Post-auth)
├── App.js                # State management & Navigation
├── app.json              # Expo configuration
└── package.json
```

---

## 🧪 Testing Guide

### Android
You can test on a physical device or an emulator. 
- For emulators: Go to **Extended Controls (...)** > **Fingerprint** to simulate a touch.
```bash
npx expo start
```

### iOS (Face ID)
**Important:** Face ID **cannot** be tested in the standard "Expo Go" app from the App Store because it requires a custom `Info.plist`. To test Face ID, you must create a **Development Build**:

1. **Create a build** (requires a free Expo account):
   ```bash
   npx expo run:ios
   # OR for a cloud build:
   eas build --profile development --platform ios
   ```
2. Install the resulting build on your device/simulator.
3. Start the dev server:
   ```bash
   npx expo start --dev-client
   ```

---

## 📦 Key Libraries Used
- [`expo-local-authentication`](https://docs.expo.dev/versions/latest/sdk/local-authentication/): The core biometric library.
- [`lucide-react-native`](https://lucide.dev/): Beautiful, lightweight icons.
- [`expo-secure-store`](https://docs.expo.dev/versions/latest/sdk/securestore/): (Recommended for production) To store sensitive tokens after authentication.

---

## 🛡️ Security Best Practices (2026)
1. **Level Verification**: This app checks for `BIOMETRIC_STRONG`. Always ensure you aren't allowing "Weak" biometrics (like 2D face photos) for sensitive actions.
2. **Fallback**: Always provide a manual Password/PIN option in case the biometric hardware is damaged.
3. **No Local Storage**: Never store "True/False" login status in `AsyncStorage`. Use a secure token that is only released upon successful biometric callback.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author
**Sasada Saumya**
- GitHub: [@SasadaSaumya](https://github.com/SasadaSaumya)
- LinkedIn: [Your-Profile](https://linkedin.com/in/yourprofile)
