import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Fingerprint, ShieldCheck } from 'lucide-react-native';
import { authenticate, checkDeviceSupport } from '../services/authService';

export default function LoginScreen({ onLoginSuccess }) {
  const handleBiometricAuth = async () => {
    const { hasHardware, isEnrolled } = await checkDeviceSupport();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Error', 'Biometrics not available or not set up on this device.');
      return;
    }

    const success = await authenticate();
    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <View style={styles.container}>
      <ShieldCheck size={80} color="#007AFF" />
      <Text style={styles.title}>Secure Vault</Text>
      <Text style={styles.subtitle}>Please authenticate to continue</Text>

      <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
        <Fingerprint color="white" size={24} />
        <Text style={styles.buttonText}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F7FA' },
  title: { fontSize: 28, fontWeight: 'bold', marginTop: 20, color: '#1A1A1A' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 40 },
  button: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    elevation: 3,
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '600' },
});