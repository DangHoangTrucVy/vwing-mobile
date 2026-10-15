
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(-18)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslate = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(heroTranslate, {
          toValue: 0,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.spring(formTranslate, {
          toValue: 0,
          speed: 14,
          bounciness: 4,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    heroOpacity,
    heroTranslate,
    formOpacity,
    formTranslate,
  ]);

  function submit() {
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      Alert.alert(
        "Thiếu thông tin",
        "Vui lòng nhập họ tên và số điện thoại nhé."
      );
      return;
    }

    if (!/^[0-9+\s()-]{9,15}$/.test(trimmedPhone)) {
      Alert.alert(
        "Số điện thoại chưa hợp lệ",
        "Vui lòng kiểm tra lại số điện thoại."
      );
      return;
    }

    setLoading(true);

    Alert.alert(
      "Đăng ký thành công",
      "Cảm ơn bạn đã quan tâm VWING. Đội ngũ tư vấn sẽ liên hệ với bạn sớm.",
      [
        {
          text: "Đã hiểu",
          onPress: () => {
            setName("");
            setPhone("");
            setLoading(false);
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HERO IMAGE */}
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: heroOpacity,
              transform: [{ translateY: heroTranslate }],
            },
          ]}
        >
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <View style={styles.heroOverlay}>
            <View style={styles.brand}>
              <View style={styles.brandIcon}>
                <Ionicons
                  name="leaf"
                  size={20}
                  color="#A7F3D0"
                />
              </View>

              <Text style={styles.heroEyebrow}>
                VWING AEROAGRI PRECISION
              </Text>
            </View>

            <View style={styles.heroContent}>
              <View style={styles.heroBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.heroBadgeText}>
                  NÔNG NGHIỆP THÔNG MINH
                </Text>
              </View>

              <Text style={styles.heroTitle}>
                Chăm vườn thông minh,{" "}
                <Text style={styles.heroHighlight}>
                  nâng tầm mùa vụ.
                </Text>
              </Text>

              <Text style={styles.heroDescription}>
                Công nghệ đồng hành cùng nhà nông,
                kiến tạo mùa vụ hiệu quả và bền vững.
              </Text>
            </View>

            <View style={styles.heroFooter}>
              <Ionicons
                name="checkmark-circle"
                size={17}
                color="#A7F3D0"
              />
              <Text style={styles.heroFooterText}>
                Giải pháp dành riêng cho vườn cây của bạn
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* BOOKING FORM */}
        <Animated.View
          style={[
            styles.formSection,
            {
              opacity: formOpacity,
              transform: [{ translateY: formTranslate }],
            },
          ]}
        >
          <View style={styles.card}>
            <View style={styles.accent} />

            <View style={styles.formHeader}>
              <View style={styles.formIcon}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={23}
                  color="#086B50"
                />
              </View>

              <View style={styles.headerText}>
                <Text style={styles.eyebrow}>
                  KẾT NỐI CÙNG VWING
                </Text>
                <Text style={styles.title}>
                  Nhận tư vấn miễn phí
                </Text>
              </View>
            </View>

            <Text style={styles.description}>
              Để lại thông tin để đội ngũ VWING tư vấn
              giải pháp phù hợp với vườn cây của bạn.
            </Text>

            {/* NAME */}
            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>
                  HỌ VÀ TÊN
                </Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color="#718078"
                  />

                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Nhập họ và tên"
                    placeholderTextColor="#9AA79F"
                    style={styles.input}
                    returnKeyType="next"
                    maxLength={100}
                    autoCapitalize="words"
                    accessibilityLabel="Họ và tên"
                  />
                </View>
              </View>

              {/* PHONE */}
              <View style={styles.field}>
                <Text style={styles.label}>
                  SỐ ĐIỆN THOẠI
                </Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="call-outline"
                    size={19}
                    color="#718078"
                  />

                  <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Nhập số điện thoại"
                    placeholderTextColor="#9AA79F"
                    keyboardType="phone-pad"
                    style={styles.input}
                    returnKeyType="done"
                    maxLength={15}
                    accessibilityLabel="Số điện thoại"
                  />
                </View>
              </View>

              {/* SUBMIT BUTTON */}
              <Pressable
                disabled={loading}
                onPress={submit}
                style={({ pressed }) => [
                  styles.button,
                  pressed && !loading && styles.buttonPressed,
                  loading && styles.buttonDisabled,
                ]}
              >
                <Text style={styles.buttonText}>
                  {loading
                    ? "Đang xử lý..."
                    : "Đăng ký khảo sát miễn phí"}
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color="#FFFFFF"
                />
              </Pressable>

              {/* SECURITY */}
              <View style={styles.security}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={15}
                  color="#168465"
                />
                <Text style={styles.securityText}>
                  Thông tin của bạn được bảo mật
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.bottomNote}>
            VWING · Đồng hành cùng nhà nông Việt Nam
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F7F2",
    marginHorizontal: -12,
    marginBottom: -24,
  },

  container: {
    paddingBottom: 0,
    
  },

  // HERO
  hero: {
    height: 370,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#086B50",  
  },

  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: "rgba(3, 35, 25, 0.53)",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  brandIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(167,243,208,0.35)",
  },

  heroEyebrow: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },

  heroContent: {
    gap: 12,
  },

  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#6EE7B7",
  },

  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "800",
  },

  heroHighlight: {
    color: "#A7F3D0",
  },

  heroDescription: {
    maxWidth: 380,
    color: "#ECFDF5",
    fontSize: 11,
    lineHeight: 15,
    fontStyle: "italic",
  },

  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  heroFooterText: {
    color: "#87fbc1",
    fontSize: 10,
    fontWeight: "600",
    flexShrink: 1,
  },

  // FORM SECTION
  formSection: {
    marginTop: -22,
    paddingTop: 22,
  },

  card: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 22, 
    borderBottomRightRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: "#E1EBE3",
    shadowColor: "#164E35",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },

  accent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#168465",
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  formIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F6ED",
  },

  headerText: {
    flex: 1,
    gap: 4,
  },

  eyebrow: {
    color: "#168465",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  title: {
    color: "#153D2B",
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "800",
  },

  description: {
    color: "#6B7D72",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 15,
    marginBottom: 22,
  },

  form: {
    gap: 17,
  },

  field: {
    gap: 8,
  },

  label: {
    color: "#33483B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  inputWrap: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    backgroundColor: "#F8FAF8",
    borderRadius: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#DFE9E1",
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    color: "#163D30",
    fontSize: 13,
  },

  button: {
    minHeight: 51,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#086B50",
    borderRadius: 14,
    marginTop: 3,
    paddingHorizontal: 12,
    shadowColor: "#086B50",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 7,
    elevation: 3,
  },

  buttonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }],
  },

  buttonDisabled: {
    opacity: 0.65,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  security: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 1,
  },

  securityText: {
    color: "#718078",
    fontSize: 10,
  },

  bottomNote: {
    color: "#829187",
    textAlign: "center",
    fontSize: 10,
    marginTop: 18,
  },
});
