import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  Animated,
  Easing,
} from "react-native";

type Props = {
  onBook: () => void;
};

const backgroundImages = [
  {
    uri: "https://image.bnews.vn/MediaUpload/Org/2023/02/07/162015-dong-thap-co-32-ma-so-vung-trong-sau-rieng.jpg",
  },
  {
    uri: "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/12/7/1621658/H6_11Zon-1.jpg",
  },
  {
    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGN5eL0f7qFjrLlmZBpqT6BaBJDJiZbVjj5TApOESV40wp4_qsjRvTHWaj&s=10",
  },
  {
    uri: "https://t.ex-cdn.com/nongnghiepmoitruong.vn/480w/files/thanhnb/2023/05/05/5809-image001-115548_13.jpg",
  },
];

const benefits = [
  {
    icon: "scan-outline" as const,
    title: "Bản đồ sức khỏe",
    description: "Theo dõi tán lá và vùng trồng.",
  },
  {
    icon: "analytics-outline" as const,
    title: "Dữ liệu trực quan",
    description: "Nhận diện vùng cần theo dõi.",
  },
  {
    icon: "leaf-outline" as const,
    title: "Chăm sóc chủ động",
    description: "Lập kế hoạch cho vườn.",
  },
];

export function TrialBooking({ onBook }: Props) {
  const [imageIndex, setImageIndex] = useState(0);

  const imageOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(imageOpacity, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      setImageIndex((previous) => (previous + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [imageOpacity]);
  const [formVisible, setFormVisible] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    farmLocation: "",
    cropType: "",
    farmArea: "",
    note: "",
  });

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.farmLocation.trim()
    ) {
      Alert.alert(
        "Thiếu thông tin",
        "Fen vui lòng nhập họ tên, số điện thoại và địa chỉ vườn.",
      );
      return;
    }

    if (!/^[0-9+\s()-]{9,15}$/.test(form.phone.trim())) {
      Alert.alert(
        "Số điện thoại chưa hợp lệ",
        "Fen kiểm tra lại số điện thoại nhé.",
      );
      return;
    }

    // Gọi luồng đăng ký hiện tại của dự án.
    onBook();
  };
  return (
    <View style={styles.section}>
      {/* Section label */}
      <View style={styles.kicker}>
        <Ionicons name="calendar-outline" size={18} color="#276C56" />
        <Text style={styles.kickerText}>TRẢI NGHIỆM VWING</Text>
      </View>

      <Text style={styles.heading}>
        Đưa công nghệ đến{"\n"}
        <Text style={styles.highlight}>tận vườn của bạn.</Text>
      </Text>

      <Text style={styles.intro}>
        Khám phá cách drone, bản đồ 3D và AI giúp bạn quản lý nông trại hiệu quả
        hơn.
      </Text>

      {/* Hero */}
      <ImageBackground
        source={backgroundImages[imageIndex]}
        style={styles.heroCard}
        imageStyle={styles.heroImage}
      >
        <View style={styles.overlay} />

        <View style={styles.heroContent}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>VWING FIELD INTELLIGENCE</Text>
          </View>

          <View>
            <Text style={styles.heroEyebrow}>NÔNG NGHIỆP CHÍNH XÁC</Text>

            <Text style={styles.heroTitle}>
              Hiểu rõ từng vùng trồng.{"\n"}
              <Text style={styles.heroHighlight}>Chăm sóc đúng từng cây.</Text>
            </Text>

            <Text style={styles.heroDescription}>
              Biến dữ liệu nông trại thành thông tin trực quan để đưa ra quyết
              định chủ động.
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Benefits */}
      <View style={styles.benefitList}>
        {benefits.map((benefit) => (
          <View key={benefit.title} style={styles.benefit}>
            <View style={styles.benefitIcon}>
              <Ionicons name={benefit.icon} size={20} color="#276C56" />
            </View>

            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitText}>{benefit.description}</Text>
            </View>

            <Ionicons name="checkmark-circle" size={18} color="#78AD91" />
          </View>
        ))}
      </View>

     

      {/* CTA */}
      <Pressable
        style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        onPress={() => setFormVisible(true)}
      >
        <Text style={styles.ctaText}>Đăng ký khảo sát miễn phí</Text>
        <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
      </Pressable>

      <View style={styles.security}>
        <Ionicons name="lock-closed-outline" size={14} color="#438064" />
        <Text style={styles.securityText}>
          Thông tin chỉ được sử dụng để tư vấn khảo sát.
        </Text>
      </View>

      <Modal
        visible={formVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={() => setFormVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={styles.modalDismissArea}
            onPress={() => setFormVisible(false)}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalKeyboard}
          >
            <View style={styles.formSheet}>
              <View style={styles.sheetHandle} />

              <View style={styles.formHeader}>
                <View style={styles.formHeaderText}>
                  <View style={styles.formKicker}>
                    <Ionicons name="leaf-outline" size={15} color="#276C56" />
                    <Text style={styles.formKickerText}>
                      VWING FIELD SERVICE
                    </Text>
                  </View>

                  <Text style={styles.formTitle}>Đăng ký khảo sát</Text>

                  <Text style={styles.formSubtitle}>
                    Cho chúng mình biết một chút về khu vườn của bạn.
                  </Text>
                </View>

                <Pressable
                  onPress={() => setFormVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={22} color="#163D30" />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.formBody}
              >
                <Text style={styles.fieldLabel}>Họ và tên *</Text>
                <TextInput
                  value={form.fullName}
                  onChangeText={(value) => updateForm("fullName", value)}
                  placeholder="Nhập họ và tên"
                  placeholderTextColor="#94A39A"
                  style={styles.formInput}
                  autoCapitalize="words"
                />

                <Text style={styles.fieldLabel}>Số điện thoại *</Text>
                <TextInput
                  value={form.phone}
                  onChangeText={(value) => updateForm("phone", value)}
                  placeholder="Nhập số điện thoại liên hệ"
                  placeholderTextColor="#94A39A"
                  style={styles.formInput}
                  keyboardType="phone-pad"
                />

                <Text style={styles.fieldLabel}>Địa chỉ khu vườn *</Text>
                <TextInput
                  value={form.farmLocation}
                  onChangeText={(value) => updateForm("farmLocation", value)}
                  placeholder="Xã, huyện, tỉnh hoặc địa chỉ vườn"
                  placeholderTextColor="#94A39A"
                  style={styles.formInput}
                  multiline
                />

                <Text style={styles.fieldLabel}>Loại cây trồng</Text>
                <TextInput
                  value={form.cropType}
                  onChangeText={(value) => updateForm("cropType", value)}
                  placeholder="Ví dụ: Sầu riêng, cà phê..."
                  placeholderTextColor="#94A39A"
                  style={styles.formInput}
                />

                <Text style={styles.fieldLabel}>Diện tích vườn</Text>
                <TextInput
                  value={form.farmArea}
                  onChangeText={(value) => updateForm("farmArea", value)}
                  placeholder="Ví dụ: 2 hecta"
                  placeholderTextColor="#94A39A"
                  style={styles.formInput}
                />

                <Text style={styles.fieldLabel}>Nhu cầu khảo sát</Text>
                <TextInput
                  value={form.note}
                  onChangeText={(value) => updateForm("note", value)}
                  placeholder="Bạn muốn theo dõi sức khỏe cây, bản đồ 3D..."
                  placeholderTextColor="#94A39A"
                  style={[styles.formInput, styles.noteInput]}
                  multiline
                  textAlignVertical="top"
                />

                <View style={styles.formPrivacy}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={17}
                    color="#276C56"
                  />
                  <Text style={styles.formPrivacyText}>
                    Thông tin được dùng để liên hệ tư vấn khảo sát.
                  </Text>
                </View>

                <Pressable
                  onPress={handleSubmit}
                  style={({ pressed }) => [
                    styles.submitButton,
                    pressed && styles.ctaPressed,
                  ]}
                >
                  <Text style={styles.submitButtonText}>
                    Gửi yêu cầu khảo sát
                  </Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </Pressable>

                <Pressable
                  onPress={() => setFormVisible(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>
                    Để mình xem lại sau
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    backgroundColor: "#DDF4E4",   
    marginBottom: -24,
    padding: 16,
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

  heading: {
    color: "#163D30",
    fontSize: 27,
    lineHeight: 30,
    fontWeight: "900",
    marginTop: 12,
    letterSpacing: -0.5,
  },

  highlight: {
    color: "#27805D",
  },

  intro: {
    color: "#27342e",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 4,
    fontStyle: "italic",
  },

  heroCard: {
    height: 245,
    borderRadius: 22,
    overflow: "hidden",
    marginTop: 18,
    backgroundColor: "#163D30",
  },

  heroImage: {
    borderRadius: 22,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10, 35, 25, 0.60)",
  },

  heroContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },

  liveBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(10, 48, 36, 0.88)",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#86D6A7",
  },

  liveText: {
    color: "#E1F6E9",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  heroEyebrow: {
    color: "#A7E8C8",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.9,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "900",
    marginTop: 7,
  },

  heroHighlight: {
    color: "#A7E8C8",
  },

  heroDescription: {
    color: "#E2EDE5",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    maxWidth: 290,
  },

  benefitList: {
    gap: 9,
    marginTop: 14,
  },

  benefit: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7EEE8",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5F4E9",
  },

  benefitContent: {
    flex: 1,
  },

  benefitTitle: {
    color: "#163D30",
    fontSize: 13,
    fontWeight: "800",
  },

  benefitText: {
    color: "#718078",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },

  promise: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderRadius: 16,
    backgroundColor: "#EAF6EE",
    borderWidth: 1,
    borderColor: "#D8EBDD",
    marginTop: 14,
    padding: 13,
  },

  promiseIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#D5EDDE",
    alignItems: "center",
    justifyContent: "center",
  },

  promiseContent: {
    flex: 1,
  },

  promiseTitle: {
    color: "#163D30",
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "900",
  },

  promiseText: {
    color: "#58786A",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 4,
  },

  cta: {
    minHeight: 51,
    borderRadius: 14,
    backgroundColor: "#276C56",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 15,
    paddingHorizontal: 14,
  },

  ctaPressed: {
    opacity: 0.82,
  },

  ctaText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  security: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  securityText: {
    color: "#718078",
    fontSize: 10,
    lineHeight: 15,
  },

  stepsCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3ECE5",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    padding: 13,
  },

  stepsHeading: {
    color: "#438064",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
    marginBottom: 13,
  },

  steps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },

  stepWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },

  step: {
    flex: 1,
    alignItems: "center",
  },

  stepNumberCircle: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5F4E9",
  },

  stepNumber: {
    color: "#276C56",
    fontSize: 11,
    fontWeight: "900",
  },

  stepText: {
    color: "#52645A",
    fontSize: 9,
    fontWeight: "700",
    lineHeight: 14,
    textAlign: "center",
    marginTop: 7,
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(8, 30, 22, 0.55)",
  },

  modalDismissArea: {
    ...StyleSheet.absoluteFill,
  },

  modalKeyboard: {
    width: "100%",
    maxHeight: "92%",
    justifyContent: "flex-end",
  },

  formSheet: {
    maxHeight: "100%",
    backgroundColor: "#F7FAF7",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 28 : 18,
  },

  sheetHandle: {
    width: 42,
    height: 5,
    borderRadius: 99,
    backgroundColor: "#CAD9CE",
    alignSelf: "center",
    marginBottom: 20,
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },

  formHeaderText: {
    flex: 1,
  },

  formKicker: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#B7D5C5",
    backgroundColor: "#E8F5EC",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  formKickerText: {
    color: "#276C56",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  formTitle: {
    color: "#163D30",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
    marginTop: 12,
  },

  formSubtitle: {
    color: "#718078",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F1EA",
  },

  formBody: {
    paddingBottom: 12,
  },

  fieldLabel: {
    color: "#254A39",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 12,
  },

  formInput: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#DCE8DF",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 11,
    color: "#163D30",
    fontSize: 13,
  },

  noteInput: {
    minHeight: 88,
  },

  formPrivacy: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: "#E8F5EC",
    padding: 11,
    marginTop: 17,
  },

  formPrivacyText: {
    flex: 1,
    color: "#58786A",
    fontSize: 10,
    lineHeight: 16,
  },

  submitButton: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#276C56",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 16,
    paddingHorizontal: 14,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  cancelButton: {
    alignItems: "center",
    paddingVertical: 13,
  },

  cancelButtonText: {
    color: "#64756D",
    fontSize: 12,
    fontWeight: "700",
  },
});
