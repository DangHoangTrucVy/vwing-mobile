import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type Props = {
  title?: string;
  onMenuPress?: () => void;
};

export function AppHeader({ title = "VWING", onMenuPress }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
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

        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>Công nghệ nông nghiệp hàng không</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
  },

  subTitle: {
    color: "#059669",
    fontSize: 10,
    letterSpacing: 0.5,
    fontWeight: "800",
  },
});
