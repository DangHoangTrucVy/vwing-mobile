import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Svg, { Path } from "react-native-svg";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Route = "solution" | "news" | "booking";

type Props = {
  onNavigate: (route: Route) => void;
};

export function MobileFooter({ onNavigate }: Props) {
  const [email, setEmail] = useState("");

  function subscribe() {
    const validEmail = /^\S+@\S+\.\S+$/.test(email.trim());

    if (!validEmail) {
      Alert.alert(
        "Email chưa hợp lệ",
        "Nhập email của bạn để đăng ký nhận tin nhé.",
      );
      return;
    }

    Alert.alert(
      "Đăng ký thành công",
      "VWING sẽ gửi các thông tin mới nhất đến email của bạn.",
    );
    setEmail("");
  }

  return (
    <View style={styles.footer}>
      <View style={styles.brandBlock}>
        <View style={styles.logo}>
          <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 21V10"
              stroke="#6EE7B7"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12 15C5 15 4 10 4 7c5 0 8 2 8 8Z"
              stroke="#6EE7B7"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12 12c0-5 3-8 8-8 0 5-2 8-8 8Z"
              stroke="#6EE7B7"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <View style={styles.brandContent}>
          <Text style={styles.brandName}>VWING</Text>
          <Text style={styles.brandSub}>AEROAGRI PRECISION</Text>
        </View>
      </View>

      <Text style={styles.description}>
        Tiên phong số hóa và tối ưu năng suất vườn cây lâu năm (sầu riêng, bơ,
        cà phê, cao su) bằng mạng lưới thiết bị bay viễn thám đa quang phổ NDVI
        và trí tuệ nhân tạo chuyên sâu.
      </Text>

      <View style={styles.divider} />

      <Text style={styles.quickLinksTitle}>LIÊN KẾT NHANH</Text>

      <View style={styles.linkGrid}>
        <View style={styles.linkColumn}>
          <Pressable onPress={() => onNavigate("solution")}>
            <Text style={styles.link}>Giải pháp cây trồng</Text>
          </Pressable>

          <Pressable onPress={() => onNavigate("booking")}>
            <Text style={styles.link}>Đăng ký khảo sát</Text>
          </Pressable>
        </View>

        <View style={styles.linkColumn}>
          <Pressable onPress={() => onNavigate("news")}>
            <Text style={styles.link}>Tin tức & nghiên cứu</Text>
          </Pressable>

          <Pressable onPress={() => Linking.openURL("tel:18006868")}>
            <Text style={styles.link}>Hotline: 1800 6868</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottomDivider} />

      <Text style={styles.copyright}>© 2026 VWING AeroAgri Precision JSC.</Text>

      <View style={styles.policyRow}>
        <Text style={styles.policy}>Điều khoản</Text>
        <Text style={styles.dot}>•</Text>
        <Text style={styles.policy}>Chính sách bảo mật</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 footer: {
  alignSelf: "stretch",
  backgroundColor: "#0B4A37",
  marginTop: 24,
  paddingHorizontal: 16,
  paddingTop: 16,
  paddingBottom: 16,
  marginBottom: 0,
},

  overline: {
    color: "#A7F3D0",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.3,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "900",
    marginTop: 7,
  },

  subscribeRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 13,
  },

  emailInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 42,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.14)",
    color: "#FFFFFF",
    fontSize: 11,
    paddingHorizontal: 11,
  },

  subscribeButton: {
    width: 63,
    minHeight: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D1FAE5",
  },

  subscribeText: {
    color: "#065F46",
    fontSize: 10,
    fontWeight: "900",
  },

  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 25,
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },

  brandContent: {
    gap: 2,
  },

  brandName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.4,
  },

  brandSub: {
    color: "#A7F3D0",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  description: {
    color: "#D7FBEA",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 12,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  followText: {
    color: "#A7F3D0",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  socialIcons: {
    flexDirection: "row",
    gap: 8,
  },

  socialButton: {
    width: 31,
    height: 31,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginTop: 18,
  },

  quickLinksTitle: {
    color: "#A7F3D0",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.1,
    marginTop: 17,
  },

  linkGrid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 11,
  },

  linkColumn: {
    flex: 1,
    gap: 11,
  },

  link: {
    color: "#FFFFFF",
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "700",
  },

  bottomDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginTop: 21,
  },

  copyright: {
    color: "#A7CFC0",
    fontSize: 9,
    textAlign: "center",
    marginTop: 14,
  },

  policyRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    marginTop: 6,
  },

  policy: {
    color: "#D7FBEA",
    fontSize: 9,
  },

  dot: {
    color: "#78A99A",
    fontSize: 9,
  },
});
