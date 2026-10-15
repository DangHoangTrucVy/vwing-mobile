import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onFeaturePress: (name: string) => void;
};

const features = [
  { name: "Sức khỏe tán", detail: "NDVI & LiDAR", icon: "scan-outline" },
  { name: "Cảnh báo bệnh", detail: "Quét nấm sớm", icon: "shield-checkmark-outline" },
  { name: "Bay địa hình", detail: "Terrain Follow", icon: "map-outline" },
  { name: "Hộ chiếu cây", detail: "Truy xuất số", icon: "document-text-outline" },
] as const;

export function FeatureGrid({ onFeaturePress }: Props) {
  return (
    <View style={styles.grid}>
      {features.map((feature) => (
        <Pressable
          key={feature.name}
          style={styles.card}
          onPress={() => onFeaturePress(feature.name)}
        >
          <View style={styles.icon}>
            <Ionicons name={feature.icon} size={22} color="#047857" />
          </View>

          <Text style={styles.name}>{feature.name}</Text>
          <Text style={styles.detail}>{feature.detail}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 15,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },
  name: { color: "#0F172A", fontSize: 14, fontWeight: "800", marginTop: 14 },
  detail: { color: "#64748B", fontSize: 11, marginTop: 4 },
});