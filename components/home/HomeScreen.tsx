import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Search, Grid, List, Plus, Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AnimeCard } from './AnimeCard';
import { Anime } from '../../types';
import { useRouter } from 'expo-router';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { useLanguage } from '../../hooks/useLanguage';

const { width } = Dimensions.get('window');

const GENRE_MAP: Record<string, any> = {
  'All': 'all',
  'Action': 'action',
  'Adventure': 'adventure',
  'Fantasy': 'fantasy',
  'Drama': 'drama',
  'Sci-Fi': 'sciFi',
  'Comedy': 'comedy',
  'Thriller': 'thriller',
  'Romance': 'romance'
};

const GENRE_KEYS = Object.keys(GENRE_MAP);

export const MOCK_ANIME: Anime[] = [
  {
    id: '1',
    title: "Demon Slayer: Kimetsu no Yaiba",
    titleKo: "귀멸의 칼날",
    rating: 4.9,
    genre: ["Action", "Fantasy"],
    imageUrl: 'https://stitch-assets.imgix.net/18435197042999415442/6076cce65be042bf88c44091a22b4af9/anime_hero.png',
    description: "Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon.",
    descriptionKo: "가족을 잃은 소년 탄지로가 혈귀가 된 여동생 네즈코를 인간으로 되돌리기 위해 귀살대의 길을 걷는 이야기입니다."
  },
  {
    id: '2',
    title: "Naruto Shippuden",
    titleKo: "나루토 질풍전",
    rating: 4.7,
    genre: ["Action", "Adventure"],
    imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=400',
    description: "Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition.",
    descriptionKo: "닌자 마을의 문제아 나루토가 호카게를 꿈꾸며 동료들과 함께 성장해 나가는 장대한 서사시입니다."
  },
  {
    id: '3',
    title: "One Piece",
    titleKo: "원피스",
    rating: 4.8,
    genre: ["Action", "Adventure", "Comedy"],
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400',
    description: "Monkey D. Luffy and his pirate crew explore a fantastical world of endless oceans.",
    descriptionKo: "해적왕을 꿈꾸는 루피와 밀짚모자 일당이 전설의 보물 '원피스'를 찾아 떠나는 끝없는 모험 이야기입니다."
  },
  {
    id: '4',
    title: "Attack on Titan",
    titleKo: "진격의 거인",
    rating: 4.9,
    genre: ["Action", "Drama"],
    imageUrl: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400',
    description: "Eren Jaeger fights for humanity against giant Titans.",
    descriptionKo: "거인들로부터 인류를 지키기 위해 성벽 안에서 살아가던 인류와, 자유를 향해 나아가는 에렌 예거의 사투를 그립니다."
  },
  {
    id: '5',
    title: "Spy x Family",
    titleKo: "스파이 패밀리",
    rating: 4.7,
    genre: ["Comedy", "Action"],
    imageUrl: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=400',
    description: "A spy creates a fake family to complete his secret mission.",
    descriptionKo: "스파이 아버지, 암살자 어머니, 그리고 독심술사 딸이 각자의 정체를 숨긴 채 가짜 가족이 되어 벌어지는 코미디입니다."
  },
  {
    id: '6',
    title: "Jujutsu Kaisen",
    titleKo: "주술회전",
    rating: 4.6,
    genre: ["Action", "Thriller"],
    imageUrl: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=400',
    description: "Yuji Itadori joins Jujutsu Sorcerers to eliminate a powerful Curse.",
    descriptionKo: "평범한 고등학생 이타도리 유지가 저주의 왕 스쿠나의 손가락을 먹게 되면서 주술사의 세계로 발을 들이는 이야기입니다."
  },
];

export const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAnime = useMemo(() => {
    return MOCK_ANIME.filter(anime => {
      const title = language === 'ko' ? anime.titleKo : anime.title;
      const matchesSearch = 
        title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.titleKo.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesGenre = selectedGenre === 'All' || anime.genre?.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre, language]);

  const renderItem = useCallback(({ item }: { item: Anime }) => (
    <AnimeCard 
      anime={item} 
      onPress={(a) => router.push(`/anime/${a.id}`)} 
      viewMode={viewMode}
    />
  ), [router, viewMode]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={[Colors.background, Colors.accent]}
        style={styles.background}
      />
      
      {/* 3D Header Style from Screen 2 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{t('welcomeUser')}</Text>
          <Text style={styles.title}>{t('trendingNow')}</Text>
        </View>
        <TouchableOpacity style={[styles.profileBtn, Shadows.soft]}>
          <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>JD</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={[styles.searchBar, Shadows.soft]}>
          <Search color={Colors.textSecondary} size={20} />
          <TextInput
            key={`search-input-lang-${language}`}
            style={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>
        <View style={[styles.viewToggle, Shadows.soft]}>
          <TouchableOpacity 
            style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleBtnActive]} 
            onPress={() => setViewMode('grid')}
          >
            <Grid size={18} color={viewMode === 'grid' ? Colors.text : Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, viewMode === 'list' && styles.toggleBtnActive]} 
            onPress={() => setViewMode('list')}
          >
            <List size={18} color={viewMode === 'list' ? Colors.text : Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.genreContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreList}>
          {GENRE_KEYS.map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.genreChip,
                selectedGenre === key && styles.genreChipActive,
                selectedGenre === key && Shadows.glow
              ]}
              onPress={() => setSelectedGenre(key)}
            >
              <Text style={[
                styles.genreText,
                selectedGenre === key && styles.genreTextActive
              ]}>
                {t(GENRE_MAP[key] as any)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <FlashList
          key={`${viewMode}-${language}`}
          data={filteredAnime}
          renderItem={renderItem}
          estimatedItemSize={viewMode === 'grid' ? 250 : 120}
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={{ paddingBottom: 100 }}
          columnWrapperStyle={viewMode === 'grid' ? { justifyContent: 'space-between' } : undefined}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found.</Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={[styles.fab, Shadows.glow]}>
        <Plus color="white" size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: Spacing.lg,
  },
  welcomeText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: Spacing.md,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
    ...Platform.select({
      web: { outlineStyle: 'none' },
    }),
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  toggleBtn: {
    padding: 10,
    paddingHorizontal: 12,
  },
  toggleBtnActive: {
    backgroundColor: Colors.primary,
  },
  genreContainer: {
    marginBottom: Spacing.md,
  },
  genreList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  genreChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  genreChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genreText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  genreTextActive: {
    color: Colors.text,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
