import { ScrollView, StyleSheet, Text } from "react-native";
import { AppHeader } from "../../components/ui/AppHeader";
import { CropCard } from "../../components/ui/CropCard";
import { cropSolutions } from "../../components/data/mockData";

export default function SolutionScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader title="Cây trồng" />

      <Text style={styles.eyebrow}>GIẢI PHÁP VWING</Text>
      <Text style={styles.heading}>Quản lý theo từng loại cây</Text>

      {cropSolutions.map((crop) => (
        <CropCard key={crop.id} crop={crop} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F4F8F5", paddingHorizontal: 16, paddingBottom: 30, gap: 14 },
  eyebrow: { color: "#059669", fontSize: 11, fontWeight: "800", letterSpacing: 1.3 },
  heading: { color: "#0F172A", fontSize: 25, fontWeight: "900", marginBottom: 6 },
});