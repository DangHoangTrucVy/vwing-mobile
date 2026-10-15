import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Animated,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const heroImage = require("../../../assets/images/hero_drone_orchard_1791883988500.jpg");
const heroImages = [
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPmSYgz7zvdRswakZk8_HTt9apy1b6TA354Ygs7gaLE4bITG22Pi_kbBYr&s=10",
    label: "NÔNG NGHIỆP SỐ",
  },
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUEtHdEOq7eFYu7GxuKasgeVFXT47v2f2p8uUgpcBfGCyacRTYfO-e9_M&s=10",
    label: "CÔNG NGHỆ NÔNG NGHIỆP",
  },
  {
    uri: "https://tracdiaso.com/wp-content/uploads/2022/11/khao-sat-dia-hinh-3-3.jpg",
    label: "VÙNG TRỒNG THÔNG MINH",
  },
];
type Props = {
  onConsult: () => void;
  onExploreFeatures: () => void;
};

export function HomeHero({ onConsult, onExploreFeatures }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const [hectares, setHectares] = useState(0);
  const [farms, setFarms] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const entryAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Tự động chuyển ảnh mỗi 5 giây
    const imageTimer = setInterval(() => {
      setImageIndex((previous) => (previous + 1) % heroImages.length);
    }, 5000);

    // Banner và nội dung xuất hiện khi mở màn hình
    Animated.timing(entryAnimation, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    // Chạy số liệu từ 0 đến giá trị đích
    const duration = 1500;
    const startTime = Date.now();

    const countTimer = setInterval(() => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);

      setHectares(Math.floor(5000 * progress));
      setFarms(Math.floor(420 * progress));
      setAccuracy(Number((98.5 * progress).toFixed(1)));

      if (progress >= 1) {
        clearInterval(countTimer);
      }
    }, 30);

    return () => {
      clearInterval(imageTimer);
      clearInterval(countTimer);
    };
  }, [entryAnimation]);

  const animatedStyle = {
    opacity: entryAnimation,
    transform: [
      {
        translateY: entryAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        key={heroImages[imageIndex].uri}
        source={{ uri: heroImages[imageIndex].uri }}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.overlay} />

        <Animated.View style={[styles.content, animatedStyle]}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{heroImages[imageIndex].label}</Text>
          </View>

          <Text style={styles.title}>
            Số hóa vườn cây,{"\n"}
            <Text style={styles.highlight}>ra quyết định</Text>
            {"\n"}dễ dàng hơn.
          </Text>

          <Text style={styles.description}>
            Theo dõi sức khỏe cây trồng bằng drone, bản đồ NDVI và AI.
          </Text>

          <Pressable style={styles.primaryButton} onPress={onConsult}>
            <Text style={styles.primaryButtonText}>Tư vấn giải pháp</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </Pressable>

          
        </Animated.View>
      </ImageBackground>

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {hectares.toLocaleString("vi-VN")}
            <Text style={styles.green}>+ ha</Text>
          </Text>
          <Text style={styles.statLabel}>Đã số hóa</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statValue}>{farms}+</Text>
          <Text style={styles.statLabel}>Trang trại</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={[styles.statValue, styles.green]}>
            {accuracy.toLocaleString("vi-VN", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            %
          </Text>
          <Text style={styles.statLabel}>Chính xác</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 4,
  },

  hero: {
    minHeight: 304,
    overflow: "hidden",
    backgroundColor: "#07131E",
    marginHorizontal: -12,
    marginBottom: -24,
  },

  heroImage: {
    height: "100%",
    opacity: 0.65,
  },

  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(5, 20, 31, 0.66)",
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 9,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderRadius: 99,
    backgroundColor: "rgba(15, 23, 42, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#34D399",
  },

  badgeText: {
    color: "#E2E8F0",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.6,
  },

  highlight: {
    color: "#6EE7B7",
  },

  description: {
    color: "#D1DCE7",
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 270,
  },

  primaryButton: {
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 13,
    backgroundColor: "#059669",
    marginTop: 2,
    width: 170
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  featureLink: {
    minHeight: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  featureLinkText: {
    color: "#D1FAE5",
    fontSize: 11,
    fontWeight: "700",
  },

  statsCard: {
    marginHorizontal: -12,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",

    paddingVertical: 13,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E2EDE5",
    elevation: 2,
  },

  stat: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 2,
  },

  statValue: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },

  green: {
    color: "#059669",
  },
  statLabel: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },

  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#E2E8F0",
  },
});
