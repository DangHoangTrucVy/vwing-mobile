import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

import { AppHeader } from "../../components/ui/AppHeader";
import { NewsCard } from "../../components/ui/NewsCard";
import { newsArticles } from "../../components/data/mockData";
import type { NewsArticle } from "../../components/types/index";

type ScrollRevealProps = {
  children: ReactNode;
  scrollY: SharedValue<number>;
  viewportHeight: SharedValue<number>;
  offsetY?: SharedValue<number>;
};

function ScrollReveal({
  children,
  scrollY,
  viewportHeight,
  offsetY,
}: ScrollRevealProps) {
  const layoutY = useSharedValue(0);
  const itemHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const viewport = viewportHeight.value;
    const top = layoutY.value + (offsetY?.value ?? 0);
    const height = itemHeight.value;
    const currentScroll = scrollY.value;

    if (viewport <= 0 || height <= 0) {
      return {
        opacity: 1,
        transform: [{ translateY: 0 }],
      };
    }

    // Nội dung bắt đầu xuất hiện khi đi vào màn hình
    const enterStart = top - viewport + 80;
    const enterEnd = top - viewport * 0.55;

    // Nội dung mờ dần khi cuộn qua khỏi phía trên
    const exitStart = top + height - viewport * 0.35;
    const exitEnd = top + height;

    const opacity = interpolate(
      currentScroll,
      [
        enterStart,
        enterEnd,
        Math.max(enterEnd + 1, exitStart),
        Math.max(enterEnd + 2, exitEnd),
      ],
      [0, 1, 1, 0],
      Extrapolation.CLAMP,
    );

    const translateY = interpolate(
      currentScroll,
      [
        enterStart,
        enterEnd,
        Math.max(enterEnd + 1, exitStart),
        Math.max(enterEnd + 2, exitEnd),
      ],
      [35, 0, 0, -20],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      onLayout={(event) => {
        layoutY.value = event.nativeEvent.layout.y;
        itemHeight.value = event.nativeEvent.layout.height;
      }}
      style={animatedStyle}
    >
      {children}
    </Animated.View>
  );
}

export default function NewsScreen() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );

  const scrollY = useSharedValue(0);
  const viewportHeight = useSharedValue(0);
  const newsListY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <AppHeader title="VWING" />

      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onLayout={(event) => {
          viewportHeight.value = event.nativeEvent.layout.height;
        }}
      >
        {/* Page introduction */}
        <ScrollReveal scrollY={scrollY} viewportHeight={viewportHeight}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
            }}
            style={styles.hero}
            imageStyle={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroIcon}>
                <Ionicons name="newspaper-outline" size={24} color="#A7F3D0" />
              </View>

              {/* <Text style={styles.eyebrow}>GÓC NHÌN MỚI</Text> */}

              <Text style={styles.heading}>
                Tin tức & nghiên cứu nông nghiệp
              </Text>

              <Text style={styles.description}>
                Cập nhật xu hướng, khám phá công nghệ và kiến thức mới cho nền
                nông nghiệp thông minh.
              </Text>

              <View style={styles.articleCount}>
                <Ionicons name="book-outline" size={15} color="#FFFFFF" />
                <Text style={styles.articleCountText}>
                  {newsArticles.length} bài viết nổi bật
                </Text>
              </View>
            </View>
          </ImageBackground>
        </ScrollReveal>
        {/* Article list */}

        {/* Article list */}
        <ScrollReveal scrollY={scrollY} viewportHeight={viewportHeight}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Khám phá bài viết</Text>
              <Text style={styles.sectionSubtitle}>
                Kiến thức mới, giá trị thực tiễn
              </Text>
            </View>

            <View style={styles.sectionIcon}>
              <Ionicons name="leaf-outline" size={21} color="#168465" />
            </View>
          </View>
        </ScrollReveal>

        <View
          style={styles.newsList}
          onLayout={(event) => {
            newsListY.value = event.nativeEvent.layout.y;
          }}
        >
          {newsArticles.map((article) => (
            <ScrollReveal
              key={article.id}
              scrollY={scrollY}
              viewportHeight={viewportHeight}
              offsetY={newsListY}
            >
              <NewsCard
                article={article}
                onPress={() => setSelectedArticle(article)}
              />
            </ScrollReveal>
          ))}
        </View>

        <View style={styles.newsList}>
          {newsArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onPress={() => setSelectedArticle(article)}
            />
          ))}
        </View>

        <Text style={styles.bottomNote}>
          VWING · Đồng hành cùng nhà nông Việt Nam
        </Text>
      </Animated.ScrollView>

      {/* Article detail modal */}
      <Modal
        visible={selectedArticle !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setSelectedArticle(null)}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTitle}>Chi tiết bài viết</Text>

            <Pressable
              onPress={() => setSelectedArticle(null)}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Đóng bài viết"
            >
              <Ionicons name="close" size={23} color="#173D2C" />
            </Pressable>
          </View>

          {selectedArticle && (
            <ScrollView
              contentContainerStyle={styles.articleContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalCategory}>
                {selectedArticle.category}
              </Text>

              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>

              <View style={styles.modalMeta}>
                <Ionicons name="newspaper-outline" size={15} color="#168465" />
                <Text style={styles.modalPublisher}>
                  {selectedArticle.publisher}
                </Text>
                <Text style={styles.modalDate}>· {selectedArticle.date}</Text>
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>TỔNG QUAN</Text>
                <Text style={styles.modalSummary}>
                  {selectedArticle.summary}
                </Text>
              </View>

              {selectedArticle.content.map((paragraph, index) => (
                <Text
                  key={`${selectedArticle.id}-${index}`}
                  style={styles.paragraph}
                >
                  {paragraph}
                </Text>
              ))}

              <View style={styles.articleEnd}>
                <Ionicons name="leaf" size={19} color="#168465" />
                <Text style={styles.articleEndText}>
                  VWING · Nông nghiệp thông minh
                </Text>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0fff2",
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 2,
  },

  scrollView: {
    flex: 1,
  },

  container: {
    paddingTop: 0,
  },

  hero: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#086B50",
  },

  heroImage: {
    borderRadius: 20,
  },

  heroOverlay: {
    padding: 21,
    backgroundColor: "rgba(3, 44, 31, 0.75)",
  },

  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(167,243,208,0.3)",
    marginBottom: 18,
  },

  eyebrow: {
    color: "#A7F3D0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "900",
  },

  description: {
    color: "#d5deda",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 9,
    fontStyle: "italic",
  },

  articleCount: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginTop: 17,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.14)",
  },

  articleCountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#173D2C",
    fontSize: 18,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: "#829187",
    fontSize: 11,
    marginTop: 5,
  },

  sectionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E2F2E5",
    alignItems: "center",
    justifyContent: "center",
  },

  newsList: {
    gap: 16,
  },

  bottomNote: {
    color: "#829187",
    textAlign: "center",
    fontSize: 10,
    marginTop: 25,
  },

  // Article modal
  modalSafeArea: {
    flex: 1,
    backgroundColor: "#F8FAF7",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#E5ECE5",
  },

  modalHeaderTitle: {
    color: "#173D2C",
    fontSize: 17,
    fontWeight: "800",
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E8F1E9",
    alignItems: "center",
    justifyContent: "center",
  },

  articleContent: {
    padding: 21,
    paddingBottom: 40,
  },

  modalCategory: {
    color: "#168465",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 12,
  },

  modalTitle: {
    color: "#173D2C",
    fontSize: 24,
    lineHeight: 33,
    fontWeight: "900",
  },

  modalMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 15,
    marginBottom: 20,
  },

  modalPublisher: {
    color: "#168465",
    fontSize: 11,
    fontWeight: "700",
  },

  modalDate: {
    color: "#829187",
    fontSize: 11,
  },

  summaryBox: {
    padding: 16,
    backgroundColor: "#E8F5EB",
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#168465",
    marginBottom: 20,
  },

  summaryLabel: {
    color: "#168465",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 8,
  },

  modalSummary: {
    color: "#315542",
    fontSize: 13,
    lineHeight: 22,
    fontWeight: "600",
  },

  paragraph: {
    color: "#425449",
    fontSize: 14,
    lineHeight: 25,
    marginBottom: 17,
    textAlign: "left",
  },

  articleEnd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 20,
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#E2EAE2",
  },

  articleEndText: {
    color: "#168465",
    fontSize: 11,
    fontWeight: "800",
  },
});
