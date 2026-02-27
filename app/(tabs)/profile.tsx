import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../../constants/Theme';
import { User, Settings, LogOut, ChevronRight, Languages } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  return (
    <View style={styles.container}>
       <LinearGradient
        colors={[Colors.background, '#1a1a2e']}
        style={styles.background}
      />
      
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="white" />
        </View>
        <Text style={styles.name}>{user?.email?.split('@')[0] || 'Enthusiast'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem} onPress={toggleLanguage}>
          <View style={styles.menuLeft}>
            <Languages size={20} color={Colors.accent} />
            <View>
              <Text style={styles.menuText}>{t('language')}</Text>
              <Text style={styles.menuSubText}>{language === 'en' ? t('english') : t('korean')}</Text>
            </View>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Settings size={20} color={Colors.textSecondary} />
            <Text style={styles.menuText}>{t('settings')}</Text>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={signOut}>
          <View style={styles.menuLeft}>
            <LogOut size={20} color={Colors.primary} />
            <Text style={[styles.menuText, { color: Colors.primary }]}>{t('signOut')}</Text>
          </View>
          <ChevronRight size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
  },
  menuSubText: {
    fontSize: 12,
    color: Colors.textSecondary,
  }
});
