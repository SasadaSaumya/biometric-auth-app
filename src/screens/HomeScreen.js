import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { LayoutGrid, Bell, User, LogOut, ShieldCheck, Wallet } from 'lucide-react-native';

export default function HomeScreen({ onLogout }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>Sasada Saumya</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Secure Status Card */}
        <View style={styles.statusCard}>
          <ShieldCheck color="#34C759" size={32} />
          <View>
            <Text style={styles.statusTitle}>Biometrically Secured</Text>
            <Text style={styles.statusSub}>Hardware Encrypted Session</Text>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Secure Assets</Text>
          <Text style={styles.balanceAmount}>$42,500.80</Text>
          <View style={styles.chip}>
            <Wallet size={16} color="white" />
            <Text style={styles.chipText}>Primary Vault</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        
        {/* Mock List */}
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.listItem}>
            <View style={styles.listIcon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>Secure Transfer #{item}</Text>
              <Text style={styles.listDate}>Jan 09, 2026 • 12:45 PM</Text>
            </View>
            <Text style={styles.listAmount}>-$120.00</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Secure Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FE' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 24, alignItems: 'center' },
  greeting: { fontSize: 16, color: '#666' },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  content: { padding: 24 },
  statusCard: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', 
    padding: 16, borderRadius: 16, gap: 12, marginBottom: 24 
  },
  statusTitle: { fontWeight: 'bold', color: '#1B5E20' },
  statusSub: { fontSize: 12, color: '#2E7D32' },
  balanceCard: { 
    backgroundColor: '#007AFF', padding: 24, borderRadius: 24, 
    shadowColor: '#007AFF', shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 10, marginBottom: 32
  },
  balanceLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 8 },
  balanceAmount: { color: 'white', fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
  chip: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20, alignSelf: 'flex-start', gap: 6 },
  chipText: { color: 'white', fontSize: 12, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  listItem: { flexDirection: 'row', backgroundColor: 'white', padding: 16, borderRadius: 16, alignItems: 'center', gap: 12, marginBottom: 12 },
  listIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0' },
  listTitle: { fontWeight: '600', color: '#1A1A1A' },
  listDate: { fontSize: 12, color: '#999' },
  listAmount: { fontWeight: 'bold', color: '#FF3B30' },
  logoutButton: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, gap: 8 },
  logoutText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16 }
});