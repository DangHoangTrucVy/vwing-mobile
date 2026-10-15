
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { NewsArticle } from "../types/index";

type Props = {
  article: NewsArticle;
  onPress: () => void;
};

export function NewsCard({ article, onPress }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Đọc bài viết ${article.title}`}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      {/* Ảnh bài viết */}
      <View style={styles.imageWrap}>
        {article.imageUrl && !imageError ? (
          <Image
            source={{ uri: article.imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.imageFallback}>
            <Ionicons
              name="leaf-outline"
              size={34}
              color="#168465"
            />
            <Text style={styles.fallbackText}>VWING AGRITECH</Text>
          </View>
        )}

        <View style={styles.categoryBadge}>
          <Ionicons name="leaf" size={12} color="#FFFFFF" />
          <Text style={styles.categoryText} numberOfLines={1}>
            {article.category}
          </Text>
        </View>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <View style={styles.publisherWrap}>
            <View style={styles.dot} />
            <Text style={styles.publisher} numberOfLines={1}>
              {article.publisher}
            </Text>
          </View>

          <View style={styles.readTimeWrap}>
            <Ionicons
              name="time-outline"
              size={13}
              color="#718078"
            />
            <Text style={styles.readTime}>
              {article.readTime}
            </Text>
          </View>
        </View>

        <Text style={styles.date}>{article.date}</Text>

        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>

        <Text style={styles.summary} numberOfLines={3}>
          {article.summary}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.readMore}>Đọc bài viết</Text>
          <View style={styles.arrowCircle}>
            <Ionicons
              name="arrow-forward"
              size={16}
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E3ECE4",
    shadowColor: "#164E35",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },

  imageWrap: {
    height: 175,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#E5F3E8",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#E8F5E9",
  },

  fallbackText: {
    color: "#168465",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  categoryBadge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    maxWidth: "85%",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#086B50",
  },

  categoryText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },

  content: {
    padding: 15,
    gap: 9,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  publisherWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#168465",
  },

  publisher: {
    flex: 1,
    color: "#168465",
    fontSize: 10,
    fontWeight: "800",
  },

  readTimeWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  readTime: {
    color: "#718078",
    fontSize: 10,
  },

  date: {
    color: "#94A39A",
    fontSize: 10,
  },

  title: {
    color: "#173D2C",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 23,
  },

  summary: {
    color: "#64756A",
    fontSize: 12,
    lineHeight: 19,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 11,
    marginTop: 3,
    borderTopWidth: 1,
    borderTopColor: "#EDF2ED",
  },

  readMore: {
    color: "#086B50",
    fontSize: 12,
    fontWeight: "800",
  },

  arrowCircle: {
    width: 31,
    height: 31,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#086B50",
  },
});
