import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';
import { Mail, Lock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (email: string, pass: string) => void;
  onSignUpToggle: () => void;
  isSignUp: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUpToggle, isSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  const handleSubmit = () => {
    onLogin(email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.background, Colors.secondary]}
          style={styles.background}
        />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
          style={styles.formWrapper}
        >
          {/* Logo Section from Screen 1 */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>🎎</Text>
            </View>
            <Text style={styles.brandTitle}>Anime Enthusiast</Text>
          </View>

          <View style={[styles.formContainer, Shadows.deep]}>
            <Text style={styles.formLabel}>{isSignUp ? t('signUp') : t('login')}</Text>
            
            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Mail size={16} color={Colors.primary} />
                <Text style={styles.label}>{t('emailPlaceholder')}</Text>
              </View>
              <TextInput
                key="email-input-3d"
                style={styles.input}
                placeholder="example@mail.com"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputHeader}>
                <Lock size={16} color={Colors.primary} />
                <Text style={styles.label}>{t('passwordPlaceholder')}</Text>
              </View>
              <TextInput
                key="password-input-3d"
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0A0A0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="off"
                textContentType="none"
                importantForAutofill="no"
                underlineColorAndroid="transparent"
              />
            </View>

            <TouchableOpacity 
              style={[styles.loginBtn, Shadows.glow]} 
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.loginBtnText}>{isSignUp ? t('signUp') : t('login')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toggleBtn} onPress={onSignUpToggle}>
              <Text style={styles.toggleText}>
                {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}
                <Text style={styles.toggleTextRed}>{isSignUp ? t('login') : t('signUp')}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoEmoji: {
    fontSize: 50,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: 1,
  },
  formContainer: {
    width: Platform.OS === 'web' ? Math.min(width * 0.9, 420) : '100%',
    backgroundColor: Colors.surface,
    padding: 30,
    borderRadius: BorderRadius.xl,
  },
  formLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#F8FAFC',
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    color: Colors.textDark,
    paddingHorizontal: 16,
    fontSize: 16,
    ...Platform.select({
      web: { outlineStyle: 'none' },
    }),
  },
  loginBtn: {
    width: '100%',
    height: 56,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginBtnText: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  toggleBtn: {
    marginTop: 24,
    alignItems: 'center',
  },
  toggleText: {
    color: '#64748B',
    fontSize: 14,
  },
  toggleTextRed: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
