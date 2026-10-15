import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { TelemetryMission } from "../../components/types/index";

type Props = {
  mission: TelemetryMission;
  onPress: () => void;
};

export function MissionCard({ mission, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.map}>
        <Text style={styles.live}>● ĐANG BAY</Text>
        <Text style={styles.ndvi}>NDVI {mission.ndviAverage}</Text>
      </View>

      <View style={styles.info}>
        <View>
          <Text style={styles.name}>{mission.code}</Text>
          <Text style={styles.detail}>{mission.location}</Text>
        </View>

        <View style={styles.icon}>
          <Ionicons name="arrow-forward" size={20} color="#047857" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#FFF", borderRadius: 24, overflow: "hidden" },
  map: {
    height: 132,
    backgroundColor: "#245948",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 14,
  },
  live: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "800",
    backgroundColor: "#0F172A",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ndvi: {
    alignSelf: "flex-end",
    color: "#FFF",
    fontWeight: "800",
    backgroundColor: "#10B981",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  info: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { color: "#0F172A", fontSize: 16, fontWeight: "800" },
  detail: { color: "#64748B", fontSize: 12, marginTop: 5, maxWidth: 240 },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },
});