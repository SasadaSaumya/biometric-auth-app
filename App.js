import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // If not authenticated, show Login. If authenticated, show Home content.
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <View style={styles.homeContainer}>
          <Text style={styles.welcomeText}>🔓 Welcome Back!</Text>
          <Text style={styles.infoText}>You are inside the protected area.</Text>
          <Button title="Logout" onPress={() => setIsAuthenticated(false)} color="#FF3B30" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  homeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#666', marginBottom: 30 }
});