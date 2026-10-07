import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findTrail } from '@/data/trails';
import { useColors } from '@/hooks/useColors';

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.metric,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
        {label}
      </Text>
      <Text style={[styles.metricValue, { color: colors.foreground }]}>
        {value}
      </Text>
    </View>
  );
}

export default function TrailDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const trail = findTrail(id);
  const topInset = Platform.OS === 'web' ? Math.max(insets.top, 67) : insets.top;
  const bottomInset =
    Platform.OS === 'web' ? 34 : Math.max(insets.bottom, 18);

  if (!trail) {
    return (
      <View
        style={[
          styles.missingScreen,
          { backgroundColor: colors.background, paddingTop: topInset },
        ]}
      >
        <Ionicons name="trail-sign-outline" size={34} color={colors.primary} />
        <Text style={[styles.missingTitle, { color: colors.foreground }]}>
          Trail not found
        </Text>
        <Text style={[styles.missingCopy, { color: colors.mutedForeground }]}>
          That path isn’t in this field guide.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/')}
          style={[styles.returnButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.returnButtonText, { color: colors.primaryForeground }]}>
            Back to the trail book
          </Text>
        </Pressable>
      </View>
    );
  }

  function goBack() {
    void Haptics.selectionAsync().catch(() => undefined);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomInset + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={trail.image}
          resizeMode="cover"
          style={styles.hero}
        >
          <View style={styles.heroScrim}>
            <View
              style={[
                styles.heroHeader,
                { paddingTop: topInset + 12 },
              ]}
            >
              <Pressable
                accessibilityLabel="Go back to trails"
                accessibilityRole="button"
                onPress={goBack}
                style={styles.backButton}
                testID="trail-detail-back"
              >
                <Ionicons name="arrow-back" size={24} color="#FFFDF4" />
              </Pressable>
              <Text style={styles.headerLabel}>TRAIL NOTES</Text>
              <View style={styles.headerSpacer} />
            </View>
            <View style={styles.heroCopy}>
              <View style={styles.regionBadge}>
                <Ionicons
                  name="location-outline"
                  size={13}
                  color="#F7E2B9"
                />
                <Text style={styles.regionBadgeText}>{trail.region}</Text>
              </View>
              <Text style={styles.heroTitle}>{trail.name}</Text>
              <Text style={styles.heroSubtitle}>
                {trail.routeType}  ·  {trail.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.metricsRow}>
            <Metric label="DISTANCE" value={trail.distance} />
            <Metric label="ASCENT" value={trail.elevation} />
            <Metric label="ON TRAIL" value={trail.duration} />
          </View>

          <Text style={[styles.sectionEyebrow, { color: colors.primary }]}>
            THE ROUTE
          </Text>
          <Text style={[styles.description, { color: colors.foreground }]}>
            {trail.description}
          </Text>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Along the way
            </Text>
            <Ionicons name="leaf-outline" size={20} color={colors.primary} />
          </View>
          <View
            style={[
              styles.highlightsCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {trail.highlights.map((highlight, index) => (
              <View
                key={highlight}
                style={[
                  styles.highlightRow,
                  index > 0 && {
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderTopColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.highlightIcon,
                    { backgroundColor: colors.secondary },
                  ]}
                >
                  <Ionicons
                    name={index === 0 ? 'eye-outline' : index === 1 ? 'flower-outline' : 'navigate-outline'}
                    size={16}
                    color={colors.primary}
                  />
                </View>
                <Text style={[styles.highlightText, { color: colors.foreground }]}>
                  {highlight}
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={15}
                  color={colors.mutedForeground}
                />
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              At a glance
            </Text>
          </View>
          <View
            style={[
              styles.glanceCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={styles.glanceRow}>
              <Text style={[styles.glanceLabel, { color: colors.mutedForeground }]}>
                Best season
              </Text>
              <Text style={[styles.glanceValue, { color: colors.foreground }]}>
                {trail.bestSeason}
              </Text>
            </View>
            <View style={[styles.glanceDivider, { backgroundColor: colors.border }]} />
            <View style={styles.glanceRow}>
              <Text style={[styles.glanceLabel, { color: colors.mutedForeground }]}>
                Route
              </Text>
              <Text style={[styles.glanceValue, { color: colors.foreground }]}>
                {trail.routeType}
              </Text>
            </View>
            <View style={[styles.glanceDivider, { backgroundColor: colors.border }]} />
            <View style={styles.glanceRow}>
              <Text style={[styles.glanceLabel, { color: colors.mutedForeground }]}>
                Terrain
              </Text>
              <Text style={[styles.glanceValue, styles.terrainValue, { color: colors.foreground }]}>
                {trail.terrain}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.disclaimer,
              { backgroundColor: colors.secondary },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={[styles.disclaimerText, { color: colors.secondaryForeground }]}>
              This is a fictional route. Trail details are for inspiration, not navigation.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: { height: 390 },
  heroScrim: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(13, 29, 22, 0.43)',
    paddingHorizontal: 22,
    paddingBottom: 25,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerLabel: {
    color: 'rgba(255, 253, 244, 0.83)',
    fontSize: 10,
    letterSpacing: 1.8,
    fontFamily: 'Inter_600SemiBold',
  },
  headerSpacer: { width: 40 },
  heroCopy: { paddingBottom: 1 },
  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  regionBadgeText: {
    color: '#F7E2B9',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  heroTitle: {
    color: '#FFFDF4',
    fontSize: 37,
    lineHeight: 43,
    fontFamily: 'Georgia',
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    marginTop: 8,
    color: 'rgba(255, 253, 244, 0.88)',
    fontSize: 11,
    letterSpacing: 1.25,
    fontFamily: 'Inter_600SemiBold',
  },
  content: { paddingHorizontal: 20, paddingTop: 18 },
  metricsRow: { flexDirection: 'row', gap: 8, marginBottom: 26 },
  metric: {
    flex: 1,
    minHeight: 72,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 10,
    paddingVertical: 13,
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: 8,
    letterSpacing: 0.9,
    fontFamily: 'Inter_600SemiBold',
  },
  metricValue: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  sectionEyebrow: {
    fontSize: 9,
    letterSpacing: 1.6,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    marginBottom: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Georgia',
  },
  highlightsCard: {
    borderRadius: 19,
    borderWidth: 1,
    paddingHorizontal: 14,
    marginBottom: 25,
  },
  highlightRow: {
    minHeight: 63,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  highlightIcon: {
    width: 33,
    height: 33,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightText: { flex: 1, fontSize: 13, fontFamily: 'Inter_500Medium' },
  glanceCard: {
    borderRadius: 19,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 17,
  },
  glanceRow: {
    minHeight: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  },
  glanceLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  glanceValue: {
    flexShrink: 1,
    textAlign: 'right',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  terrainValue: { maxWidth: '64%' },
  glanceDivider: { height: StyleSheet.hairlineWidth },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 16,
    padding: 14,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'Inter_400Regular',
  },
  missingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: 10,
  },
  missingTitle: { fontSize: 23, fontFamily: 'Georgia', marginTop: 6 },
  missingCopy: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    fontFamily: 'Inter_400Regular',
  },
  returnButton: {
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 15,
    marginTop: 12,
  },
  returnButtonText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
});
