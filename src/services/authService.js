import * as LocalAuthentication from 'expo-local-authentication';

export const checkDeviceSupport = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return { hasHardware, isEnrolled };
};

export const authenticate = async () => {
  try {
    const results = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: 'Enter Passcode',
      disableDeviceFallback: false, // If false, allows PIN/Pattern fallback
    });

    return results.success;
  } catch (error) {
    console.error("Auth Error:", error);
    return false;
  }
};