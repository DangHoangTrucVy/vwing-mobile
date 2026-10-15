import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "../../components/ui/AppHeader";
import { BookingForm } from "../../components/ui/BookingForm";

export default function BookingScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AppHeader title="VWING" />
        <BookingForm />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8F5",
  },

  scrollView: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#F4F8F5",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
  },
});
