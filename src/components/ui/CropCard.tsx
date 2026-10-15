import { StyleSheet, Text, View } from "react-native";
import type { CropSolution } from "../../components/types/index";

type Props = {
  crop: CropSolution;
};

export function CropCard({ crop }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>{crop.badge}</Text>
      <Text style={styles.name}>{crop.name}</Text>
      <Text style={styles.subName}>{crop.subName}</Text>
      <Text style={styles.title}>{crop.title}</Text>
      <Text style={styles.description}>{crop.description}</Text>

      <View style={styles.stats}>
        {crop.stats.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFF", borderRadius: 22, padding: 18, gap: 8 },
  badge: { color: "#059669", fontSize: 10, fontWeight: "800" },
  name: { color: "#0F172A", fontSize: 21, fontWeight: "900" },
  subName: { color: "#64748B", fontSize: 12 },
  title: { color: "#0F172A", fontSize: 16, fontWeight: "800", lineHeight: 23, marginTop: 4 },
  description: { color: "#64748B", fontSize: 13, lineHeight: 20 },
  stats: { flexDirection: "row", gap: 10, marginTop: 8 },
  stat: { flex: 1, backgroundColor: "#ECFDF5", borderRadius: 14, padding: 12 },
  value: { color: "#047857", fontSize: 18, fontWeight: "900" },
  label: { color: "#475569", fontSize: 10, lineHeight: 15, marginTop: 3 },
});