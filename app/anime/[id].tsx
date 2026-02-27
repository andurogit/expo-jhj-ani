import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { ChevronLeft, Share2, Star, Play, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_ANIME } from '../../components/home/HomeScreen';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const { width, height } = Dimensions.get('window');

// Mock characters based on Stitch Screen 1
const CHARACTERS = [
  { name: 'Tanjiro', image: 'https://stitch-assets.imgix.net/18435197042999415442/6076cce65be042bf88c44091a22b4af9/char_tanjiro.png' },
  { name: 'Nezuko', image: 'https://stitch-assets.imgix.net/18435197042999415442/6076cce65be042bf88c44091a22b4af9/char_nezuko.png' },
  { name: 'Zenitsu', image: 'https://stitch-assets.imgix.net/18435197042999415442/6076cce65be042bf88c44091a22b4af9/char_zenitsu.png' },
];

export default function AnimeDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t, language } = useLanguage();

  const anime = MOCK_ANIME.find(a => a.id === id);

  if (!anime) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('animeNotFound')}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>{t('goBack')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const displayTitle = language === 'ko' ? anime.titleKo : anime.title;
  const displayDescription = language === 'ko' ? anime.descriptionKo : anime.description;

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Header Image Section with 3D Depth Style */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: anime.imageUrl }}
            style={styles.headerImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(26, 26, 46, 0.2)', 'rgba(26, 26, 46, 1)']}
            style={styles.gradient}
          />
          
          <SafeAreaView style={styles.headerAction}>
            <TouchableOpacity 
              style={[styles.roundBtn, Shadows.soft]} 
              onPress={() => router.back()}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roundBtn, Shadows.soft]} 
            >
              <Share2 color="white" size={20} />
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.heroInfo}>
            <View style={[styles.ratingBadge, Shadows.glow]}>
              <Star size={14} color={Colors.gold} fill={Colors.gold} />
              <Text style={styles.ratingText}>{anime.rating}</Text>
            </View>
            <Text style={styles.heroTitle}>{displayTitle}</Text>
            <View style={styles.heroMeta}>
              <View style={styles.metaItem}>
                 <Clock size={14} color="#BBBBBB" />
                 <Text style={styles.metaText}>24m / Ep</Text>
              </View>
              <Text style={styles.metaText}>•</Text>
              <Text style={styles.metaText}>{anime.genre?.join(', ')}</Text>
            </View>
          </View>
        </View>

        {/* Content Section with Modern Layout */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>{t('synopsis')}</Text>
          <Text style={styles.synopsisText}>
            {displayDescription}
          </Text>

          <Text style={styles.sectionTitle}>{t('characters')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.charList}>
            {CHARACTERS.map((char, index) => (
              <View key={index} style={styles.charCard}>
                <View style={[styles.charImageWrapper, Shadows.soft]}>
                  <Image
                    source={{ uri: char.image }}
                    style={styles.charImage}
                    contentFit="cover"
                  />
                </View>
                <Text style={styles.charName}>{char.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Fixed Play Button with 3D Glow */}
      <View style={styles.footerAction}>
        <TouchableOpacity style={[styles.playBtn, Shadows.glow]} activeOpacity={0.9}>
          <Play size={20} color="white" fill="white" />
          <Text style={styles.playBtnText}>{t('watchNow')}</Text>
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
  imageContainer: {
    height: height * 0.5,
    width: width,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  headerAction: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroInfo: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
    marginBottom: 12,
  },
  ratingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    marginBottom: 10,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: '#BBBBBB',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginTop: 24,
    marginBottom: 16,
  },
  synopsisText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#CBD5E1',
  },
  charList: {
    gap: 20,
    paddingBottom: 10,
  },
  charCard: {
    alignItems: 'center',
    gap: 10,
  },
  charImageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  charImage: {
    width: '100%',
    height: '100%',
  },
  charName: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  footerAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: 'transparent',
  },
  playBtn: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: BorderRadius.round,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  playBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
  backLink: {
    color: Colors.primary,
    marginTop: 10,
    fontSize: 16,
  },
});
