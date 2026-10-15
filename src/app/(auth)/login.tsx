import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập email và mật khẩu.");
      return;
    }

    // TODO: Kết nối API đăng nhập của backend VWing.
    Alert.alert(
      "VWing",
      "Giao diện đã sẵn sàng. Cần tích hợp API để đăng nhập.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityLabel="Quay lại"
            >
              <Ionicons name="arrow-back" size={22} color="#064E3B" />
            </Pressable>

            <View style={styles.brand}>
              <View style={styles.logo}>
                <Svg width={25} height={25} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M12 21V10"
                    stroke="#047857"
                    strokeWidth={1.7}
                    strokeLinecap="round"
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

              <Text style={styles.brandText}>
                VWING<Text style={styles.brandDot}></Text>
              </Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* Intro */}
          <View style={styles.intro}>
            <View style={styles.welcomeBadge}>
              <Ionicons name="leaf-outline" size={15} color="#047857" />
              <Text style={styles.welcomeText}>Nền tảng nông nghiệp số</Text>
            </View>

            <Text style={styles.title}>
              Chào mừng trở lại!
              <Text style={styles.titleHighlight}></Text>
            </Text>

            <Text style={styles.subtitle}>
              Đăng nhập để tiếp tục quản lý vùng trồng và khám phá hệ sinh thái
              nông nghiệp thông minh.
            </Text>
          </View>

          {/* Login form */}
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                placeholder="Nhập email của bạn"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                returnKeyType="next"
              />
            </View>

            <View style={styles.passwordLabelRow}>
              <Text style={styles.label}>Mật khẩu</Text>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    "Quên mật khẩu",
                    "Chức năng đặt lại mật khẩu sẽ được tích hợp sau.",
                  )
                }
              >
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
              </Pressable>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#64748B" />

              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="current-password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <Pressable
                onPress={() => setShowPassword((previous) => !previous)}
                accessibilityLabel={
                  showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                }
                hitSlop={10}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={21}
                  color="#64748B"
                />
              </Pressable>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Đăng nhập</Text>

              <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
            </Pressable>

            <View style={styles.securityNote}>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color="#059669"
              />
              <Text style={styles.securityText}>
                Thông tin của bạn được bảo vệ an toàn
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerDivider} />

            <Text style={styles.footerText}>
              Phát triển thông minh hơn cùng{" "}
              <Text style={styles.footerBrand}>VWING</Text>
            </Text>

            <Text style={styles.footerDescription}>
              Công nghệ hôm nay, nông nghiệp bền vững ngày mai.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    width: "100%",
    minWidth: 0,
    alignSelf: "stretch",
    backgroundColor: "#FFFFFF",
  },

  // scrollContent: {
  //   flexGrow: 1,
  //   paddingHorizontal: 24,
  //   paddingTop: 10,
  //   paddingBottom: 24,
  // },

  scrollContent: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 24,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2EDE5",
    alignItems: "center",
    justifyContent: "center",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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

  brandText: {
    color: "rgb(9, 10, 10)",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  brandDot: {
    color: "#10B981",
  },

  headerSpacer: {
    width: 42,
  },

  intro: {
    marginBottom: 30,
  },

  welcomeBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 7,
    backgroundColor: "#D1FAE5",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 22,
    marginTop: 18,
  },

  welcomeText: {
    color: "#074332",
    fontSize: 9,
    fontWeight: "800",
  },

  title: {
    color: "#1a4f2d",
    fontSize: 31,
    lineHeight: 44,
    fontWeight: "900",
    marginTop: -15,
  },

  titleHighlight: {
    color: "#059669",
  },

  subtitle: {
    color: "#a7a8a8",
    fontSize: 9,
    fontStyle: "italic",
    lineHeight: 15,
    marginTop: 2,
    textAlign: "center",
  },

  form: {
    gap: 12,
  },

  label: {
    color: "#1E293B",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },

  inputContainer: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE7DE",
    borderRadius: 15,
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    minWidth: 0,
    color: "#0F172A",
    fontSize: 14,
    paddingVertical: 14,
  },

  passwordLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  forgotText: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "700",
  },

  loginButton: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#047857",
    borderRadius: 16,
    marginTop: 14,
    paddingHorizontal: 20,
    shadowColor: "#047857",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 12,
  },

  securityText: {
    color: "#64748B",
    fontSize: 11,
  },

  footer: {
    marginTop: "auto",
    paddingTop: 38,
    alignItems: "center",
  },

  footerDivider: {
    width: 42,
    height: 4,
    borderRadius: 5,
    backgroundColor: "#A7F3D0",
    marginBottom: 18,
  },

  footerText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  footerBrand: {
    color: "#047857",
    fontWeight: "900",
  },

  footerDescription: {
    color: "#94A3B8",
    fontSize: 11,
    textAlign: "center",
    marginTop: 9,
  },
});
