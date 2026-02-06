import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

const API_URL = "https://032d-203-189-185-124.ngrok-free.app/api/auth";

// Check if user has already enabled biometrics for this app
export const getBiometricPreference = async () => {
  const enabled = await SecureStore.getItemAsync('bio_enabled');
  const email = await SecureStore.getItemAsync('saved_email');
  return { isEnabled: enabled === 'true', savedEmail: email };
};

// Step 1: Manual Login
export const loginWithPassword = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await response.json();

    if (response.ok && data.token) {
      return { success: true, token: data.token };
    }
    return { success: false, message: data.message };
  } catch (error) {
    return { success: false, message: "Server connection failed" };
  }
};

// Step 2: Enable Biometrics (The "Ask" part)
export const enableBiometrics = async (email, token) => {
  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Confirm Biometrics to enable fast login',
  });

  if (auth.success) {
    await SecureStore.setItemAsync('bio_enabled', 'true');
    await SecureStore.setItemAsync('saved_email', email);
    await SecureStore.setItemAsync('user_token', token); // Store JWT securely
    return true;
  }
  return false;
};

// Step 3: Biometric Login
export const loginWithBiometrics = async () => {
  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Login with Biometrics',
  });

  if (auth.success) {
    const token = await SecureStore.getItemAsync('user_token');
    return { success: true, token };
  }
  return { success: false };
};