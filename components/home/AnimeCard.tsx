import React, { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { Anime } from '../../types';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../hooks/useLanguage';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.44;

interface AnimeCardProps {
  anime: Anime;
  onPress: (anime: Anime) => void;
  viewMode?: 'grid' | 'list';
}

export const AnimeCard = memo(({ anime, onPress, viewMode = 'grid' }: AnimeCardProps) => {
  const { language, t } = useLanguage();
  const displayTitle = language === 'ko' ? anime.titleKo : anime.title;

  if (viewMode === 'list') {
    return (
      <TouchableOpacity 
        style={[styles.listContainer, Shadows.soft]} 
        onPress={() => onPress(anime)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: anime.imageUrl }}
          style={styles.listImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.listContent}>
          <Text style={styles.title} numberOfLines={1}>{displayTitle}</Text>
          <View style={styles.listMeta}>
            <View style={styles.ratingBadge}>
              <Star size={12} color={Colors.gold} fill={Colors.gold} />
              <Text style={styles.ratingText}>{anime.rating}</Text>
            </View>
            <Text style={styles.yearText}>2024</Text>
          </View>
          <View style={styles.genreRow}>
            {anime.genre?.slice(0, 2).map(g => (
              <View key={g} style={styles.genreTag}>
                <Text style={styles.genreTagText}>{g}</Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.gridContainer, Shadows.soft]} 
      onPress={() => onPress(anime)}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: anime.imageUrl }}
          style={styles.gridImage}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.cardGradient}
        />
        <View style={styles.overlay}>
          <View style={styles.ratingBadgeSmall}>
            <Star size={10} color={Colors.gold} fill={Colors.gold} />
            <Text style={styles.ratingTextSmall}>{anime.rating}</Text>
          </View>
        </View>
      </View>
      <View style={styles.gridContent}>
        <Text style={styles.title} numberOfLines={1}>{displayTitle}</Text>
        <Text style={styles.genreSubtitle} numberOfLines={1}>
          {anime.genre?.join(' • ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  // Grid Styles
  gridContainer: {
    width: CARD_WIDTH,
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  imageWrapper: {
    width: '100%',
    height: CARD_WIDTH * 1.4,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  gridContent: {
    padding: Spacing.sm + 2,
  },
  overlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  
  // List Styles
  listContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
  },
  listImage: {
    width: 80,
    height: 100,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  listContent: {
    flex: 1,
  },
  listMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  
  // Common Styles
  title: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  genreSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: 'bold',
  },
  ratingBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  ratingTextSmall: {
    color: Colors.gold,
    fontSize: 10,
    fontWeight: 'bold',
  },
  yearText: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 4,
  },
  genreTag: {
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  genreTagText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
