import type { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  onScroll?: (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => void;
  onViewportLayout?: (height: number) => void;
};

export function AppScreen({
  children,
  onScroll,
  onViewportLayout,
}: Props) {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onLayout={(event) =>
          onViewportLayout?.(event.nativeEvent.layout.height)
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
    minWidth: 0,
    alignSelf: "stretch",
    backgroundColor: "#F4F8F5",
  },

  scrollView: {
    flex: 1,
    width: "100%",
    minWidth: 0,
  },

  content: {
    flexGrow: 1,
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  inner: {
    width: "100%",
    minWidth: 0,
    alignSelf: "stretch",
  },
});
