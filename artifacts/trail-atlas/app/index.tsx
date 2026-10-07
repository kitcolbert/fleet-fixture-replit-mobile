import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findTrail, trails, type TrailDifficulty } from '@/data/trails';
import { useColors } from '@/hooks/useColors';

type DifficultyFilter = 'All' | TrailDifficulty;

const filters: DifficultyFilter[] = ['All', 'Easy', 'Moderate', 'Hard'];

function TrailCard({
  trail,
  onPress,
}: {
  trail: (typeof trails)[number];
  onPress: () => void;
}) {
  const colors = useColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${trail.name}, ${trail.difficulty}, ${trail.distance}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.trailCard,
        pressed && styles.trailCardPressed,
      ]}
      testID={`trail-card-${trail.id}`}
    >
      <ImageBackground
        source={trail.image}
        resizeMode="cover"
        style={styles.trailImage}
        imageStyle={{ borderRadius: 21 }}
      >
        <View style={styles.trailScrim}>
          <View style={styles.cardTopRow}>
            <View style={styles.regionTag}>
              <Text style={styles.regionTagText}>{trail.region}</Text>
            </View>
            <View style={styles.difficultyTag}>
              <View
                style={[
                  styles.difficultyDot,
                  {
                    backgroundColor:
                      trail.difficulty === 'Easy'
                        ? '#C6E09D'
                        : trail.difficulty === 'Moderate'
                          ? '#F2C579'
                          : '#F0A18B',
                  },
                ]}
              />
              <Text style={styles.difficultyText}>{trail.difficulty}</Text>
            </View>
          </View>
          <View style={styles.cardBottomRow}>
            <View style={styles.cardCopy}>
              <Text style={styles.trailName}>{trail.name}</Text>
              <Text style={styles.cardMeta}>
                {trail.distance}  ·  {trail.elevation} ascent
              </Text>
            </View>
            <View
              style={[
                styles.cardArrow,
                { backgroundColor: colors.accent },
              ]}
            >
              <Ionicons name="arrow-up-outline" size={19} color={colors.accentForeground} />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export default function TrailListScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyFilter>('All');
  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottomInset =
    Platform.OS === 'web' ? 34 : Math.max(insets.bottom, 18);

  const visibleTrails = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return trails.filter((trail) => {
      const matchesDifficulty =
        selectedDifficulty === 'All' ||
        trail.difficulty === selectedDifficulty;
      const matchesQuery =
        !normalizedQuery ||
        `${trail.name} ${trail.region} ${trail.terrain}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      return matchesDifficulty && matchesQuery;
    });
  }, [query, selectedDifficulty]);

  function openTrail(id: string) {
    void Haptics.selectionAsync().catch(() => undefined);
    const trail = findTrail(id);
    if (trail) {
      router.push({ pathname: '/trail/[id]', params: { id: trail.id } });
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottomInset + 22 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../assets/images/alpine.jpg')}
          resizeMode="cover"
          style={styles.hero}
        >
          <View
            style={[
              styles.heroShade,
              { paddingTop: topInset + 12 },
            ]}
          >
            <View style={styles.brandRow}>
              <View style={styles.brandMark}>
                <Ionicons name="trail-sign-outline" size={21} color="#F5F3E9" />
              </View>
              <View>
                <Text style={styles.brandName}>TRAIL ATLAS</Text>
                <Text style={styles.brandEyebrow}>A FICTIONAL FIELD GUIDE</Text>
              </View>
            </View>

            <View style={styles.heroCopy}>
              <Text style={styles.heroKicker}>TAKE THE SCENIC ROUTE</Text>
              <Text style={styles.heroTitle}>Somewhere,{'\n'}beyond the map.</Text>
              <Text style={styles.heroSubtitle}>
                Six made-up trails. A little room to wander.
              </Text>
            </View>

            <View
              style={[
                styles.searchBar,
                { backgroundColor: colors.card },
              ]}
            >
              <Ionicons
                name="search-outline"
                size={19}
                color={colors.mutedForeground}
              />
              <TextInput
                accessibilityLabel="Search fictional trails"
                autoCapitalize="none"
                onChangeText={setQuery}
                placeholder="Search trails or regions"
                placeholderTextColor={colors.mutedForeground}
                returnKeyType="search"
                style={[styles.searchInput, { color: colors.foreground }]}
                testID="trail-search"
                value={query}
              />
              {query.length > 0 ? (
                <Pressable
                  accessibilityLabel="Clear search"
                  accessibilityRole="button"
                  onPress={() => setQuery('')}
                  testID="clear-search"
                >
                  <Ionicons
                    name="close-circle"
                    size={19}
                    color={colors.mutedForeground}
                  />
                </Pressable>
              ) : null}
            </View>
          </View>
        </ImageBackground>

        <View
          style={[
            styles.listContent,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={styles.sectionHeading}>
            <View>
              <Text style={[styles.sectionEyebrow, { color: colors.primary }]}>
                THE DAYDREAM DIRECTORY
              </Text>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Pick a path
              </Text>
            </View>
            <View style={[styles.countPill, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.countText, { color: colors.secondaryForeground }]}>
                {visibleTrails.length} {visibleTrails.length === 1 ? 'trail' : 'trails'}
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {filters.map((filter) => {
              const isSelected = selectedDifficulty === filter;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  key={filter}
                  onPress={() => setSelectedDifficulty(filter)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.card,
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                  testID={`filter-${filter.toLowerCase()}`}
                >
                  <Text
                    style={[
                      styles.filterText,
                      {
                        color: isSelected
                          ? colors.primaryForeground
                          : colors.foreground,
                      },
                    ]}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {visibleTrails.length > 0 ? (
            <View style={styles.trailList}>
              {visibleTrails.map((trail) => (
                <TrailCard
                  key={trail.id}
                  onPress={() => openTrail(trail.id)}
                  trail={trail}
                />
              ))}
            </View>
          ) : (
            <View
              style={[
                styles.emptyState,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons
                name="map-outline"
                size={28}
                color={colors.mutedForeground}
              />
              <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
                No trails found
              </Text>
              <Text style={[styles.emptyCopy, { color: colors.mutedForeground }]}>
                Try another name or change the difficulty filter.
              </Text>
            </View>
          )}

          <View style={[styles.disclaimer, { borderTopColor: colors.border }]}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={colors.mutedForeground}
            />
            <Text style={[styles.disclaimerText, { color: colors.mutedForeground }]}>
              Every place here is imaginary. For inspiration, not navigation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  hero: {
    height: 465,
    justifyContent: 'flex-start',
  },
  heroShade: {
    flex: 1,
    minHeight: 465,
    paddingHorizontal: 24,
    paddingBottom: 26,
    backgroundColor: 'rgba(13, 29, 22, 0.45)',
    justifyContent: 'space-between',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: 'rgba(248, 246, 235, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    color: '#F5F3E9',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 2.1,
    fontFamily: 'Inter_700Bold',
  },
  brandEyebrow: {
    color: 'rgba(245, 243, 233, 0.72)',
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1.2,
    fontFamily: 'Inter_500Medium',
  },
  heroCopy: { marginTop: 40, marginBottom: 28 },
  heroKicker: {
    color: '#DCC38F',
    fontSize: 10,
    letterSpacing: 1.7,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
  heroTitle: {
    color: '#FFFDF4',
    fontFamily: 'Georgia',
    fontSize: 39,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  heroSubtitle: {
    color: 'rgba(255, 253, 244, 0.84)',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    marginTop: 11,
  },
  searchBar: {
    minHeight: 54,
    borderRadius: 17,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    outlineStyle: 'none',
  } as never,
  listContent: { paddingHorizontal: 20, paddingTop: 26 },
  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 17,
  },
  sectionEyebrow: {
    fontSize: 9,
    letterSpacing: 1.45,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 27,
    lineHeight: 33,
    fontFamily: 'Georgia',
    letterSpacing: -0.3,
  },
  countPill: {
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 2,
  },
  countText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  filterRow: { gap: 8, paddingBottom: 17 },
  filterChip: {
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  filterText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  trailList: { gap: 13 },
  trailCard: {
    borderRadius: 21,
    overflow: 'hidden',
    elevation: 3,
  },
  trailCardPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  trailImage: { height: 192 },
  trailScrim: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13, 27, 21, 0.30)',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regionTag: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(22, 38, 29, 0.65)',
  },
  regionTagText: {
    color: '#F7F5EB',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.3,
  },
  difficultyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'rgba(22, 38, 29, 0.65)',
  },
  difficultyDot: { width: 6, height: 6, borderRadius: 3 },
  difficultyText: {
    color: '#F7F5EB',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  cardBottomRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  cardCopy: { flex: 1 },
  trailName: {
    color: '#FFFDF4',
    fontSize: 23,
    lineHeight: 29,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  cardMeta: {
    color: 'rgba(255, 253, 244, 0.83)',
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  cardArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '45deg' }],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 180,
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
  },
  emptyTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  emptyCopy: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  disclaimer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 15,
    marginTop: 20,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Inter_400Regular',
  },
});
