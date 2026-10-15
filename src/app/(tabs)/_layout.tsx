import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#059669",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 72,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
      }}
      tabBar={(props) => {
        const { state, descriptors, navigation } = props;

        return (
          <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
              if (route.name === "solution") return null;

              const options = descriptors[route.key].options;
              const focused = state.index === index;
              const color = focused ? "#059669" : "#64748B";

              const icon =
                route.name === "index"
                  ? "home-outline"
                  : route.name === "news"
                    ? "newspaper-outline"
                    : "calendar-outline";

              return (
                <Pressable
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityLabel={options.title}
                  onPress={() => navigation.navigate(route.name)}
                  style={styles.tab}
                >
                  <Ionicons name={icon} size={23} color={color} />
                  <Text style={[styles.label, { color }]}>{options.title}</Text>
                </Pressable>
              );
            })}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Đăng nhập"
              onPress={() => router.push("/(auth)/login")}
              style={styles.tab}
            >
              <Ionicons name="person-outline" size={23} color="#64748B" />
              <Text style={[styles.label, { color: "#64748B" }]}>
                Đăng nhập
              </Text>
            </Pressable>
          </View>
        );
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="news"
        options={{
          title: "Tin tức",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="booking"
        options={{
          title: "Tư vấn",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="solution" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  borderTopWidth: 1,
  borderTopColor: "#E2E8F0",
  paddingTop: 7,
  paddingBottom: 8,
  minHeight: 64,
},

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  label: {
    fontSize: 10,
    fontWeight: "700",
  },
});
