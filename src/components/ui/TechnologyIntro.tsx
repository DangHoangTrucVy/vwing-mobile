
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

type Props = {
  onExplore: () => void;
};

const mapImage = {
  uri: "https://tracdiaso.com/wp-content/uploads/2022/11/khao-sat-dia-hinh-3-3.jpg",
};

export function TechnologyIntro({ onExplore }: Props) {
  return (
    <View style={styles.section}>
      {/* Decorative network background */}
      <View pointerEvents="none" style={styles.network}>
        <View style={[styles.networkLine, styles.lineOne]} />
        <View style={[styles.networkLine, styles.lineTwo]} />
        <View style={[styles.networkLine, styles.lineThree]} />
        <View style={[styles.networkDot, styles.dotOne]} />
        <View style={[styles.networkDot, styles.dotTwo]} />
        <View style={[styles.networkDot, styles.dotThree]} />
        
      </View>

      {/* Intro */}
      <View style={styles.kicker}>
        <Ionicons name="leaf-outline" size={22} color="#276C56" />
        <Text style={styles.kickerText}>
          HỆ SINH THÁI SỐ HÓA VƯỜN
        </Text>
      </View>

      <Text style={styles.title}>
        Thấu hiểu từng tán cây.{"\n"}
        <Text style={styles.highlight}>Kiến tạo vườn cây số.</Text>
      </Text>

      <Text style={styles.description}>
        Theo dõi cấu trúc tán, độ ẩm và lịch sử chăm sóc.
        VWING kết hợp viễn thám và AI để biến dữ liệu
        thành thông tin dễ hiểu.
      </Text>

      {/* Main technology card */}
      <Pressable
        onPress={onExplore}
        style={({ pressed }) => [
          styles.techCard,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.innerBorder} />

        {/* Card header */}
        <View style={styles.cardHeader}>
          <View style={styles.headerIcon}>
            <Ionicons
              name="analytics-outline"
              size={27}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.smartText}>
            NÔNG NGHIỆP THÔNG MINH
          </Text>
        </View>

        {/* Map visual */}
        <View style={styles.visual}>
          <View style={styles.visualText}>
            <Text style={styles.techLabel}>Canh tác dựa trên dữ liệu</Text>

            <Text style={styles.techTitle}>
              Mỗi dữ liệu{"\n"}
              <Text style={styles.techHighlight}>
                mở ra một góc nhìn.
              </Text>
            </Text>
          </View>

          <View style={styles.mapContainer}>
            <Image
              source={mapImage}
              style={styles.mapImage}
              resizeMode="cover"
            />

            <View style={styles.mapOverlay}>
              <Ionicons
                name="location"
                size={19}
                color="#FFFFFF"
              />
            </View>
          </View>

        
        </View>

        <Text style={styles.techDescription}>
          Kết nối ảnh drone, dữ liệu cây trồng và lịch sử
          chăm sóc để quản lý vườn khoa học hơn.
        </Text>

        {/* Footer */}
        <View style={styles.divider} />

        <View style={styles.techFooter}>
          <View style={styles.footerContent}>
            <Text style={styles.footerLabel}>
              Công nghệ cốt lõi
            </Text>

            <Text style={styles.footerValue}>
              Viễn thám + AI
            </Text>
          </View>

          <View style={styles.arrow}>
            <Ionicons
              name="arrow-forward"
              size={23}
              color="#6EE7B7"
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    gap: 18,
    position: "relative",
    paddingHorizontal: 12,
  },

  network: {
    position: "absolute",
    top: -25,
    right: -12,
    width: 170,
    height: 235,
    opacity: 0.48,
    overflow: "hidden",
  },

  networkLine: {
    position: "absolute",
    height: 1,
    backgroundColor: "#C9DCD4",
  },

  lineOne: {
    width: 140,
    top: 48,
    right: -10,
    transform: [{ rotate: "30deg" }],
  },

  lineTwo: {
    width: 150,
    top: 105,
    right: -15,
    transform: [{ rotate: "-42deg" }],
  },

  lineThree: {
    width: 125,
    top: 155,
    right: 0,
    transform: [{ rotate: "55deg" }],
  },

  networkDot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B9D1C7",
  },

  dotOne: {
    top: 28,
    left: 15,
  },

  dotTwo: {
    top: 103,
    right: 28,
  },

  dotThree: {
    bottom: 35,
    right: 10,
  },

  settingsBubble: {
    position: "absolute",
    top: 38,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },

  kicker: {
    alignSelf: "flex-start",
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    borderRadius: 99,
    borderWidth: 1.3,
    borderColor: "#8BA99B",
    backgroundColor: "rgba(255,255,255,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  kickerText: {
    color: "#276C56",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.45,
  },

  title: {
    color: "#10212A",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  highlight: {
    color: "#397D68",
  },

  description: {
    color: "#969da2",
    fontSize: 10,
    lineHeight: 15,
    marginTop: -15,
    marginBottom: 2,
    fontStyle: "italic",
  },

  techCard: {
    minHeight: 370,
    position: "relative",
    overflow: "hidden",
    borderRadius: 27,
    padding: 17,
    backgroundColor: "#031B22",
    borderWidth: 1.5,
    borderColor: "#173E40",
  },

  innerBorder: {
    position: "absolute",
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(111, 190, 166, 0.52)",
  },

  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  headerIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  smartText: {
    color: "#F1F7F5",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.25,
  },

  visual: {
    minHeight: 157,
    justifyContent: "center",
    marginTop: 12,
    position: "relative",
  },

  visualText: {
    zIndex: 2,
    paddingRight: 15,
  },

  techLabel: {
    color: "#8C9AA7",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 13,
  },

  techTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  techHighlight: {
    color: "#6EE7B7",
  },

  mapContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 148,
    height: 91,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    opacity: 0.88,
  },

  mapImage: {
    width: "100%",
    height: "100%",
  },

  mapOverlay: {
    
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(7, 35, 36, 0.12)",
  },

  chartDecoration: {
    position: "absolute",
    right: 65,
    top: 65,
    width: 75,
    height: 32,
    opacity: 0.9,
  },

  chartSegment: {
    position: "absolute",
    height: 1,
    width: 27,
    backgroundColor: "#D7F4EA",
  },

  segmentOne: {
    top: 19,
    left: 0,
    transform: [{ rotate: "-48deg" }],
  },

  segmentTwo: {
    top: 9,
    left: 19,
    transform: [{ rotate: "42deg" }],
  },

  segmentThree: {
    top: 12,
    left: 38,
    transform: [{ rotate: "-42deg" }],
  },

  chartPoint: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#E5FFF6",
    backgroundColor: "#183A3E",
  },

  pointOne: {
    top: 28,
    left: 8,
  },

  pointTwo: {
    top: 0,
    left: 36,
  },

  pointThree: {
    top: 27,
    left: 66,
  },

  techDescription: {
    color: "#C5D2D5",
    fontSize: 12,
    lineHeight: 20,
    marginTop: -15,
    marginBottom: 2,
    fontStyle: "italic",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(218, 238, 232, 0.17)",
    marginTop: 15,
  },

  techFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 14,
  },

  footerContent: {
    flex: 1,
  },

  footerLabel: {
    color: "#8FA3A8",
    fontSize: 11,
    fontWeight: "600",
  },

  footerValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 5,
  },

  arrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(110, 231, 183, 0.14)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(110, 231, 183, 0.18)",
  },
});
