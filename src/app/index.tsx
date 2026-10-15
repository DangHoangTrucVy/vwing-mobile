import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

function LeafLogo({ size = 25 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21V10"
        stroke="#047857"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15C5 15 4 10 4 7c5 0 8 2 8 8Z"
        stroke="#047857"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12c0-5 3-8 8-8 0 5-2 8-8 8Z"
        stroke="#047857"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function LandingScreen() {
  const router = useRouter();
  const progress = useRef(new Animated.Value(0)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const landingOpacity = useRef(new Animated.Value(0)).current;

  const eyebrowAnim = useRef(new Animated.Value(0)).current;
  const headingAnim = useRef(new Animated.Value(0)).current;
  const subheadingAnim = useRef(new Animated.Value(0)).current;
  const descriptionAnim = useRef(new Animated.Value(0)).current;
  const ctaAnim = useRef(new Animated.Value(0)).current;

  const splashLogoAnim = useRef(new Animated.Value(0)).current;
  const splashTextAnim = useRef(new Animated.Value(0)).current;
  const splashMessageAnim = useRef(new Animated.Value(0)).current;
  const splashDescAnim = useRef(new Animated.Value(0)).current;

  const [showSplash, setShowSplash] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const listenerId = progress.addListener(({ value }) => {
      setPercentage(Math.min(100, Math.round(value)));
    });

    const showSplashText = (value: Animated.Value, delay: number) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(value, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ]);

    Animated.parallel([
      showSplashText(splashLogoAnim, 100),
      showSplashText(splashTextAnim, 350),
      showSplashText(splashMessageAnim, 650),
      showSplashText(splashDescAnim, 900),
    ]).start();

    const animation = Animated.sequence([
      Animated.timing(progress, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(landingOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start(({ finished }) => {
      if (finished) {
        setShowSplash(false);

        const fadeInUp = (value: Animated.Value) =>
          Animated.timing(value, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          });

        Animated.stagger(180, [
          fadeInUp(eyebrowAnim),
          fadeInUp(headingAnim),
          fadeInUp(subheadingAnim),
          fadeInUp(descriptionAnim),
          fadeInUp(ctaAnim),
        ]).start();
      }
    });

    return () => {
      animation.stop();
      progress.removeListener(listenerId);
    };
  }, []);

  return (
    <View style={styles.root}>
      {/* Landing Page hiện tại */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: landingOpacity }]}
      >
        <ImageBackground
          source={require("../../assets/images/vwing-landing.jpg")}
          style={styles.background}
          imageStyle={styles.image}
        >
          <View style={styles.overlay} />

          <SafeAreaView style={styles.container}>
            {/* Header */}

            <View style={styles.header}>
              <View style={styles.brand}>
                {/* Logo chiếc lá */}
                <View style={styles.logo}>
                  <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M12 21V10"
                      stroke="#047857"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M12 15C5 15 4 10 4 7c5 0 8 2 8 8Z"
                      stroke="#047857"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M12 12c0-5 3-8 8-8 0 5-2 8-8 8Z"
                      stroke="#047857"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>

                {/* Chữ VWING bên cạnh */}
                <Text style={styles.logoText}>VWING</Text>
              </View>

              <Pressable
                style={styles.topButton}
                onPress={() => router.push("/(auth)/login")}
              >
                <Text style={styles.topButtonText}>Đăng nhập</Text>
              </Pressable>
            </View>

            {/* Main content */}
            <View style={styles.content}>
              <View style={styles.glassCard}>
                <Animated.View
                  style={{
                    opacity: eyebrowAnim,
                    transform: [
                      {
                        translateY: eyebrowAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [18, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.eyebrow}>
                    Công nghệ nông nghiệp hàng không
                  </Text>
                </Animated.View>

                <Animated.View
                  style={{
                    opacity: headingAnim,
                    transform: [
                      {
                        translateY: headingAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [22, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.heading}>
                    Nông nghiệp{" "}
                    <Text style={styles.highlight}>thông minh.</Text>
                  </Text>
                </Animated.View>
                <Animated.View
                  style={{
                    opacity: subheadingAnim,
                    transform: [
                      {
                        translateY: subheadingAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [18, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.heading1}>
                    Chính xác trong từng chuyến bay.
                  </Text>
                </Animated.View>

                <Animated.View
                  style={{
                    opacity: descriptionAnim,
                    transform: [
                      {
                        translateY: descriptionAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [15, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.description}>
                    Kết nối AI, dữ liệu và công nghệ hàng không để quản lý vùng
                    trồng hiệu quả hơn.
                  </Text>
                </Animated.View>

                <Animated.View
                  style={{
                    opacity: ctaAnim,
                    transform: [
                      {
                        translateY: ctaAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [15, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Pressable
                    style={styles.cta}
                    onPress={() => router.replace("/(tabs)")}
                  >
                    <Text style={styles.ctaText}>Bắt đầu khám phá</Text>
                    <Ionicons
                      name="arrow-up-outline"
                      size={18}
                      color="#065F46"
                    />
                  </Pressable>
                </Animated.View>
              </View>
            </View>

            <Text style={styles.footer}>
              Phát triển thông minh hơn cùng VWING
            </Text>
          </SafeAreaView>
        </ImageBackground>
      </Animated.View>

      {/* Splash Screen */}

      {showSplash && (
        <Animated.View style={[styles.splash, { opacity: splashOpacity }]}>
          <View style={styles.splashBackground}>
            {/* Lớp phủ xanh */}
            <View style={styles.splashOverlay} />

            <SafeAreaView style={styles.splashContent}>
              {/* Logo và thương hiệu */}
              <Animated.View
                style={[
                  styles.splashBrand,
                  {
                    opacity: splashOpacity,
                    transform: [
                      {
                        scale: splashOpacity.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.92, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Animated.View
                  style={{
                    opacity: splashLogoAnim,
                    transform: [
                      {
                        scale: splashLogoAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.7, 1],
                        }),
                      },
                      {
                        translateY: splashLogoAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <View style={styles.splashLogo}>
                    <LeafLogo size={42} />
                  </View>
                </Animated.View>

                <Animated.View
                  style={{
                    opacity: splashTextAnim,
                    transform: [
                      {
                        translateY: splashTextAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [18, 0],
                        }),
                      },
                    ],
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.splashBrandText}>
                    VWING<Text style={styles.splashDot}>.</Text>
                  </Text>

                  <Text style={styles.splashTagline}>SMART AGRICULTURE</Text>
                </Animated.View>

                <View style={styles.splashDivider} />

                <Animated.View
                  style={{
                    opacity: splashMessageAnim,
                    transform: [
                      {
                        translateY: splashMessageAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.splashMessage}>
                    Nông nghiệp thông minh
                  </Text>
                </Animated.View>

                <Animated.View
                  style={{
                    opacity: splashDescAnim,
                    transform: [
                      {
                        translateY: splashDescAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [15, 0],
                        }),
                      },
                    ],
                  }}
                >
                  <Text style={styles.splashDescription}>
                    Kết nối AI, dữ liệu và công nghệ Drone
                    {"\n"}cho một mùa vụ hiệu quả hơn.
                  </Text>
                </Animated.View>
              </Animated.View>

              {/* Loading nằm phía dưới */}
              <View style={styles.loadingArea}>
                <View style={styles.loadingHeader}>
                  <Text style={styles.loadingLabel}>
                    Đang khởi tạo hệ thống
                  </Text>

                  <Text style={styles.percentText}>{percentage}%</Text>
                </View>

                <View style={styles.progressTrack}>
                  <Animated.View
                    style={[
                      styles.progressFill,
                      {
                        width: progress.interpolate({
                          inputRange: [0, 100],
                          outputRange: ["0%", "100%"],
                        }),
                      },
                    ]}
                  />
                </View>

                <Text style={styles.splashFooter}>
                  Phát triển thông minh hơn cùng VWING
                </Text>
              </View>
            </SafeAreaView>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#14532D",
  },
  image: {
    borderRadius: 28,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(5, 30, 19, 0.36)",
    borderRadius: 28,
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 12,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 1,
    minHeight: 50,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    alignItems: "center",
    justifyContent: "center",
  },
  topButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  topButtonText: {
    color: "#065F46",
    fontSize: 12,
    fontWeight: "700",
  },
  socials: {
    position: "absolute",
    left: 24,
    top: "24%",
    gap: 15,
  },

  content: {
    marginTop: 150,
    marginBottom: 154,
    paddingHorizontal: 0,
  },

  eyebrow: {
    color: "#D1FAE5",
    fontSize: 9,
    fontWeight: "700",
    marginBottom: 12,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 41,
    lineHeight: 38,
    fontWeight: "900",
    alignSelf: "stretch",
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },

  heading1: {
    color: "#deffe7",
    fontSize: 17,
    lineHeight: 25,
    fontWeight: "700",
  },
  highlight: {
    color: "#A7F3D0",
    fontSize: 28,
  },
  description: {
    color: "#dadada",
    fontSize: 9,
    lineHeight: 12,
    fontStyle: "italic",
    marginTop: 2,
    maxWidth: 350,
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  cta: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginTop: 38,
  },

  glassCard: {
    backgroundColor: "rgba(22, 101, 52, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,

    // Bóng đổ nhẹ
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaText: {
    color: "#065F46",
    fontSize: 12,
    fontWeight: "800",
  },

  footer: {
    color: "#c0ffb0",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "800",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  root: {
    flex: 1,
    backgroundColor: "#064E3B",
  },

  splash: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    elevation: 10,
    backgroundColor: "#064E3B",
  },

  splashBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#064E3B",
  },

  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(3, 35, 23, 0.35)",
  },

  splashContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  splashBrand: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -35,
  },

  splashLogo: {
    width: 88,
    height: 88,
    borderRadius: 28,
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  splashBrandText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: 4,
  },

  splashDot: {
    color: "#6EE7B7",
  },

  splashTagline: {
    color: "#A7F3D0",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 4,
    marginTop: 7,
  },

  splashDivider: {
    width: 42,
    height: 3,
    borderRadius: 10,
    backgroundColor: "#6EE7B7",
    marginTop: 30,
    marginBottom: 24,
  },

  splashMessage: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  splashDescription: {
    color: "#D1FAE5",
    fontSize: 13,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 290,
  },

  loadingArea: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: 65,
    alignSelf: "center",
    width: "auto",
  },

  loadingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },

  loadingLabel: {
    color: "#D1FAE5",
    fontSize: 12,
    fontWeight: "600",
  },

  percentText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#6EE7B7",
    borderRadius: 20,
  },

  splashFooter: {
    color: "#A7F3D0",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
    letterSpacing: 0.3,
  },

  splashHeading: {
    color: "#FFFFFF",
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: -0.6,
  },

  splashHighlight: {
    color: "#6EE7B7",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
