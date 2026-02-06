import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Fingerprint, User } from 'lucide-react-native';
import * as authService from '../services/authService';

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bioInfo, setBioInfo] = useState({ isEnabled: false, savedEmail: '' });

  useEffect(() => {
    // Check if user previously enabled biometrics
    async function loadPref() {
      const pref = await authService.getBiometricPreference();
      setBioInfo(pref);
      if (pref.isEnabled) setEmail(pref.savedEmail);
    }
    loadPref();
  }, []);

  const handleManualLogin = async () => {
    const result = await authService.loginWithPassword(email, password);
    
    if (result.success) {
      // IF successful AND biometrics aren't enabled yet, ASK the user
      if (!bioInfo.isEnabled) {
        Alert.alert(
          "Enable Biometrics",
          "Do you want to enable Fingerprint/FaceID for future logins?",
          [
            { text: "No", onPress: () => onLoginSuccess(result.token) },
            { 
              text: "Yes", 
              onPress: async () => {
                const enabled = await authService.enableBiometrics(email, result.token);
                if (enabled) Alert.alert("Success", "Biometrics enabled!");
                onLoginSuccess(result.token);
              }
            }
          ]
        );
      } else {
        onLoginSuccess(result.token);
      }
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const handleBioLogin = async () => {
    const result = await authService.loginWithBiometrics();
    if (result.success) {
      onLoginSuccess(result.token);
    } else {
      Alert.alert("Failed", "Biometric authentication failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Binance Style Login</Text>
      
      {bioInfo.isEnabled && (
        <View style={styles.rememberedContainer}>
          <User color="#007AFF" size={30} />
          <Text style={styles.rememberedText}>{bioInfo.savedEmail}</Text>
        </View>
      )}

      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleManualLogin}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>

      {bioInfo.isEnabled && (
        <TouchableOpacity style={styles.bioBtn} onPress={handleBioLogin}>
          <Fingerprint color="#007AFF" size={50} />
          <Text style={styles.bioBtnText}>Quick Login with Biometrics</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  rememberedContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20, gap: 10 },
  rememberedText: { fontSize: 18, color: '#333', fontWeight: '500' },
  input: { backgroundColor: '#F0F0F0', padding: 15, borderRadius: 12, marginBottom: 15 },
  loginBtn: { backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  loginText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  bioBtn: { marginTop: 40, alignItems: 'center' },
  bioBtnText: { color: '#007AFF', marginTop: 10, fontWeight: '600' }
});