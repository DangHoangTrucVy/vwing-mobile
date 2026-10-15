import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { newsArticles } from "../../components/data/mockData";
import type { NewsArticle } from "../../components/types";
import { useEffect, useRef, useState } from "react";

type Props = {
  onSelectArticle: (article: NewsArticle) => void;
  onViewAll: () => void;
};

const articleImages = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1200&q=85",
];

export function PressResearch({ onSelectArticle, onViewAll }: Props) {
  const { width } = useWindowDimensions();

  // 3 bài đầu tiên được đưa vào khu vực nổi bật.
  const featuredArticles = newsArticles.slice(0, 5);

  const featuredScrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = Math.min(width - 44, 430);
  const cardStep = cardWidth + 12;

  useEffect(() => {
    if (featuredArticles.length <= 1) return;

    let index = 0;

    const timer = setInterval(() => {
      index = (index + 1) % featuredArticles.length;
      setActiveIndex(index);

      featuredScrollRef.current?.scrollTo({
        x: index * cardStep,
        animated: true,
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [featuredArticles.length, cardStep]);

  // Các bài tiếp theo hiển thị trong danh sách bên dưới.
  const quickArticles = newsArticles.slice(3, 5);

  const featuredWidth = Math.min(width - 44, 430);

  if (!newsArticles.length) {
    return null;
  }

  return (
    <View style={styles.section}>
      {/* Decorative technology line */}
      <View style={styles.topDecoration}>
        <View style={styles.lineTrack}>
          <View style={styles.lineMain} />
          <View style={styles.lineAccent} />
          <View style={styles.lineShort} />
          <View style={styles.lineDot} />
        </View>

        <View style={styles.signalGroup}>
          <View style={styles.signalDot} />
          <View style={styles.signalLine} />
          <View style={styles.signalDotSmall} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <View style={styles.kicker}>
            <Ionicons name="newspaper-outline" size={18} color="#276C56" />
            <Text style={styles.kickerText}>TIN TỨC & TRI THỨC</Text>
          </View>

          <Text style={styles.heading}>Báo chí & nghiên cứu</Text>
        </View>

        <Pressable onPress={onViewAll} style={styles.allButton}>
          <Text style={styles.allButtonText}>Xem tất cả</Text>
          <Ionicons name="arrow-forward" size={15} color="#276C56" />
        </Pressable>
      </View>

      <Text style={styles.intro}>
        Cập nhật xu hướng AI, drone và dữ liệu đang thay đổi nông nghiệp.
      </Text>

      {/* Featured article carousel */}
      <View style={styles.featuredSection}>
        <View style={styles.featuredSectionHeader}>
          <View style={styles.featuredSectionTitleGroup}>
            <View style={styles.featuredTitleMark} />
            <Text style={styles.featuredSectionTitle}>ĐÁNG CHÚ Ý</Text>
          </View>

          <Text style={styles.swipeHint}>Vuốt để khám phá</Text>
        </View>

        <ScrollView
          ref={featuredScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={cardStep}
          snapToAlignment="start"
          contentContainerStyle={styles.featuredList}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / cardStep,
            );

            setActiveIndex(Math.min(index, featuredArticles.length - 1));
          }}
        >
          {featuredArticles.map((article, index) => (
            <Pressable
              key={article.id}
              style={[styles.featuredCard, { width: featuredWidth }]}
              onPress={() => onSelectArticle(article)}
            >
              <ImageBackground
                source={{
                  uri: articleImages[index % articleImages.length],
                }}
                style={styles.featuredImage}
                imageStyle={styles.featuredImageStyle}
              >
                <View style={styles.imageOverlay} />

                <View style={styles.featuredContent}>
                  <View style={styles.featuredTopRow}>
                    <View style={styles.featuredBadge}>
                      <Ionicons
                        name="sparkles-outline"
                        size={14}
                        color="#A7E8C8"
                      />
                      <Text style={styles.featuredBadgeText}>
                        BÀI VIẾT NỔI BẬT
                      </Text>
                    </View>

                    <View style={styles.articleNumber}>
                      <Text style={styles.articleNumberText}>0{index + 1}</Text>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.featuredCategory}>
                      {article.publisher}
                    </Text>

                    <Text numberOfLines={3} style={styles.featuredTitle}>
                      {article.title}
                    </Text>

                    <View style={styles.featuredFooter}>
                      <View style={styles.featuredMeta}>
                        <Text style={styles.featuredMetaText}>
                          {article.date}
                        </Text>

                        <View style={styles.metaDot} />

                        <Text style={styles.featuredMetaText}>
                          {article.readTime}
                        </Text>
                      </View>

                      <View style={styles.readButton}>
                        <Ionicons
                          name="arrow-up-outline"
                          size={17}
                          color="#FFFFFF"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.pagination}>
          {featuredArticles.map((article, index) => (
            <View
              key={article.id}
              style={[
                styles.paginationDot,
                activeIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.carouselHint}>
          <Ionicons name="swap-horizontal-outline" size={14} color="#718078" />
          <Text style={styles.carouselHintText}>
            Khám phá thêm các bài viết nổi bật
          </Text>
        </View>
      </View>

      {/* Other articles */}
      {quickArticles.length > 0 && (
        <View style={styles.quickSection}>
          <View style={styles.quickSectionHeader}>
            <Text style={styles.quickSectionTitle}>Bài viết mới</Text>

            <View style={styles.quickSectionLine} />
          </View>

          <View style={styles.quickList}>
            {quickArticles.map((article, index) => {
              const imageIndex =
                (index + featuredArticles.length) % articleImages.length;

              return (
                <Pressable
                  key={article.id}
                  style={styles.quickCard}
                  onPress={() => onSelectArticle(article)}
                >
                  <Image
                    source={{
                      uri: articleImages[imageIndex],
                    }}
                    style={styles.quickImage}
                  />

                  <View style={styles.quickContent}>
                    <Text numberOfLines={1} style={styles.publisher}>
                      {article.publisher}
                    </Text>

                    <Text numberOfLines={2} style={styles.quickTitle}>
                      {article.title}
                    </Text>

                    <Text style={styles.quickMeta}>
                      {article.date} · {article.readTime}
                    </Text>
                  </View>

                  <Ionicons name="chevron-forward" size={18} color="#739080" />
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    paddingTop: 2,
    paddingHorizontal: 12,
  },

  // Top decorative line
  topDecoration: {
    height: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  lineTrack: {
    flex: 1,
    height: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  lineMain: {
    width: "36%",
    height: 3,
    borderRadius: 99,
    backgroundColor: "#163D30",
  },

  lineAccent: {
    width: 36,
    height: 3,
    borderRadius: 99,
    backgroundColor: "#27805D",
  },

  lineShort: {
    width: 18,
    height: 3,
    borderRadius: 99,
    backgroundColor: "#A7D5B9",
  },

  lineDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#27805D",
  },

  signalGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginLeft: 12,
  },

  signalDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#27805D",
  },

  signalLine: {
    width: 18,
    height: 2,
    backgroundColor: "#A7D5B9",
    borderRadius: 99,
  },

  signalDotSmall: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: "#163D30",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  headerText: {
    flex: 1,
  },

  eyebrow: {
    color: "#27805D",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  heading: {
    color: "#163D30",
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "900",
    marginTop: 5,
    letterSpacing: -0.5,
  },

  allButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingLeft: 4,
  },

  allButtonText: {
    color: "#276C56",
    fontSize: 11,
    fontWeight: "800",
  },

  intro: {
    color: "#718078",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },

  featuredSection: {
    marginTop: 19,
  },

  featuredSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },

  featuredSectionTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  featuredTitleMark: {
    width: 4,
    height: 15,
    borderRadius: 99,
    backgroundColor: "#27805D",
  },

  featuredSectionTitle: {
    color: "#163D30",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  swipeHint: {
    color: "#819187",
    fontSize: 10,
    fontWeight: "600",
  },

  featuredList: {
    paddingRight: 2,
  },

  featuredCard: {
    height: 255,
    borderRadius: 21,
    overflow: "hidden",
    marginRight: 12,
    backgroundColor: "#163D30",
  },

  featuredImage: {
    flex: 1,
  },

  featuredImageStyle: {
    borderRadius: 21,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(9, 31, 26, 0.46)",
  },

  featuredContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 15,
  },

  featuredTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  featuredBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 99,
    backgroundColor: "rgba(8, 48, 38, 0.88)",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  featuredBadgeText: {
    color: "#E1F6E9",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  articleNumber: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  articleNumberText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  featuredCategory: {
    color: "#A7E8C8",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.7,
    marginBottom: 7,
  },

  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "900",
  },

  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flex: 1,
  },

  featuredMetaText: {
    color: "#F0F6F1",
    fontSize: 10,
    fontWeight: "700",
  },

  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    backgroundColor: "#A7E8C8",
  },

  readButton: {
    width: 31,
    height: 31,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#27805D",
    marginLeft: 8,
  },

  carouselHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
  },

  carouselHintText: {
    color: "#819187",
    fontSize: 10,
  },

  quickSection: {
    marginTop: 23,
  },

  quickSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 11,
  },

  quickSectionTitle: {
    color: "#163D30",
    fontSize: 15,
    fontWeight: "900",
  },

  quickSectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#DCE9DF",
  },

  quickSectionLine1: {
    flex: 1,
    height: 2,
    backgroundColor: "#DCE9DF",
    marginTop: 18,
  }, 

  quickList: {
    gap: 9,
  },

  quickCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDF2ED",
    backgroundColor: "#FFFFFF",
    padding: 9,
  },

  quickImage: {
    width: 68,
    height: 68,
    borderRadius: 11,
    backgroundColor: "#E2EDE5",
  },

  quickContent: {
    flex: 1,
    gap: 4,
  },

  publisher: {
    color: "#27805D",
    fontSize: 9,
    fontWeight: "800",
  },

  quickTitle: {
    color: "#163D30",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
  },

  quickMeta: {
    color: "#89988F",
    fontSize: 9,
    fontWeight: "600",
  },

  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 17,
    backgroundColor: "#EAF6EE",
    borderWidth: 1,
    borderColor: "#D8EBDD",
    marginTop: 17,
    padding: 13,
  },

  noteIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D3EEDF",
  },

  noteContent: {
    flex: 1,
  },

  noteTitle: {
    color: "#163D30",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "900",
  },

  noteText: {
    color: "#58786A",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 4,
  },
  kicker: {
    alignSelf: "flex-start",
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#B7D5C5",
    backgroundColor: "#E8F5EC",
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  kickerText: {
    color: "#276C56",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },

  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#C8D9CE",
  },

  paginationDotActive: {
    width: 20,
    backgroundColor: "#276C56",
  },
});
