import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";

import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type FeatureId = "lidar" | "pathogen" | "terrain" | "passport";

type Props = {
  onOpenFeature: (feature: FeatureId) => void;
};

type Feature = {
  id: FeatureId;
  shortName: string;
  icon:
    | "scan-outline"
    | "shield-checkmark-outline"
    | "map-outline"
    | "document-text-outline";
  label: string;
  title: string;
  description: string;
  accent: string;
  panel: string;
  image: string;
  cta: string;
  specs: [string, string][];
  visualLabel: string;
};

const features: Feature[] = [
  {
    id: "lidar",
    shortName: "NDVI",
    icon: "scan-outline",
    label: "01 · VIỄN THÁM ĐA PHỔ",
    title: "Bản đồ NDVI & tán cây 3D",
    description:
      "Quan sát sức khỏe thảm thực vật, mật độ tán và sự khác biệt giữa các khu vực trong vườn.",
    accent: "#6EE7B7",
    panel: "#062720",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbGQFAsrf_KDvWVol1oYi6EHdSKugf7Zjx0xJjVNBejYf_OGb55WviPg&s=10",
    cta: "Khám phá công nghệ",
    visualLabel: "VEGETATION INTELLIGENCE",
    specs: [
      ["Công nghệ", "NDVI"],
      ["Không gian", "3D"],
      ["Dữ liệu", "Đa phổ"],
    ],
  },
  {
    id: "pathogen",
    shortName: "AI bệnh",
    icon: "shield-checkmark-outline",
    label: "02 · CHẨN ĐOÁN AI",
    title: "Phát hiện dấu hiệu bất thường",
    description:
      "Hỗ trợ nhận diện dấu hiệu bệnh trên cây trồng và theo dõi các khu vực cần kiểm tra.",
    accent: "#FDA4AF",
    panel: "#35141E",
    image:
      "https://sieuthiphanthuoc.org/wp-content/uploads/2020/09/benh-dom-la-dom-som-lac-v%C3%A0-dom-muon-lac-chuan.jpg",
    cta: "Khám phá AI",
    visualLabel: "PLANT HEALTH ANALYSIS",
    specs: [
      ["Phân tích", "AI"],
      ["Theo dõi", "Bệnh cây"],
      ["Kết quả", "Cảnh báo"],
    ],
  },
  {
    id: "terrain",
    shortName: "Địa hình",
    icon: "map-outline",
    label: "03 · TERRAIN FOLLOW",
    title: "Theo sát địa hình vườn",
    description:
      "Kết hợp dữ liệu địa hình để hỗ trợ lập kế hoạch bay và khảo sát khu vực đồi dốc.",
    accent: "#7DD3FC",
    panel: "#0B293B",
    image:
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2025/1/1/1443942/Sau-Rieng-Min.jpg",
    cta: "Khám phá địa hình",
    visualLabel: "TERRAIN INTELLIGENCE",
    specs: [
      ["Dữ liệu", "Địa hình"],
      ["Không gian", "3D"],
      ["Ứng dụng", "Lập kế hoạch"],
    ],
  },
  {
    id: "passport",
    shortName: "Hộ chiếu",
    icon: "document-text-outline",
    label: "04 · TRUY XUẤT NGUỒN GỐC",
    title: "Hồ sơ vùng trồng số",
    description:
      "Tập hợp nhật ký chăm sóc và thông tin vùng trồng để hỗ trợ quản lý, truy xuất nguồn gốc.",
    accent: "#C4B5FD",
    panel: "#241B43",
    image:
      "https://nhabeagri.com/wp-content/uploads/2025/11/Ung-dung-AI-trong-drone-nong-nghiep-e1763578223845.webp",
    cta: "Khám phá truy xuất",
    visualLabel: "DIGITAL FARM PASSPORT",
    specs: [
      ["Hồ sơ", "Vùng trồng"],
      ["Nhật ký", "Số hóa"],
      ["Truy xuất", "Nguồn gốc"],
    ],
  },
];

export function FeatureShowcase({ onOpenFeature }: Props) {
  const [activeId, setActiveId] = useState<FeatureId>("lidar");
  const [detailFeature, setDetailFeature] = useState<Feature | null>(null);

  const activeFeature = useMemo(
    () => features.find((feature) => feature.id === activeId) ?? features[0],
    [activeId],
  );

  return (
    <View style={styles.section}>
      {/* Section heading */}
      <View style={styles.kicker}>
        <Ionicons name="layers-outline" size={22} color="#276C56" />
        <Text style={styles.kickerText}>CÔNG NGHỆ LÕI</Text>
      </View>

      <Text style={styles.heading}>
        Công nghệ cho{" "}
        <Text style={styles.headingHighlight}>từng góc vườn.</Text>
      </Text>

      <Text style={styles.intro}>Chọn một công nghệ để khám phá.</Text>

      {/* Feature selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {features.map((feature, index) => {
          const isActive = feature.id === activeId;

          return (
            <Pressable
              key={feature.id}
              onPress={() => setActiveId(feature.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              style={[
                styles.tab,
                isActive && {
                  backgroundColor: feature.accent,
                  borderColor: feature.accent,
                },
              ]}
            >
              <Ionicons
                name={feature.icon}
                size={16}
                color={isActive ? "#10251F" : "#64748B"}
              />

              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {feature.shortName}
              </Text>

              {isActive && (
                <View style={styles.activeIndicator}>
                  <Text style={styles.activeIndicatorText}>0{index + 1}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Image card changes with selected feature */}
      <ImageBackground
        key={activeFeature.id}
        source={{ uri: activeFeature.image }}
        style={styles.featureCard}
        imageStyle={styles.featureImage}
        resizeMode="cover"
      >
        <View
          pointerEvents="none"
          style={[
            styles.imageOverlay,
            { backgroundColor: activeFeature.panel + "D9" },
          ]}
        />

        {/* Decorative rings */}
        <View pointerEvents="none" style={styles.decorativeRing} />
        <View pointerEvents="none" style={styles.decorativeRingSmall} />

        <View style={styles.cardContent}>
          {/* Card top */}
          <View style={styles.cardTop}>
            <View
              style={[
                styles.featureIcon,
                {
                  backgroundColor: activeFeature.accent + "25",
                  borderColor: activeFeature.accent + "60",
                },
              ]}
            >
              <Ionicons
                name={activeFeature.icon}
                size={24}
                color={activeFeature.accent}
              />
            </View>

            <View
              style={[
                styles.liveBadge,
                { borderColor: activeFeature.accent + "75" },
              ]}
            >
              <View
                style={[
                  styles.liveDot,
                  { backgroundColor: activeFeature.accent },
                ]}
              />
              <Text style={[styles.liveText, { color: activeFeature.accent }]}>
                VWING TECHNOLOGY
              </Text>
            </View>
          </View>

          {/* Main title */}
          <View style={styles.titleBlock}>
            <Text
              style={[styles.featureLabel, { color: activeFeature.accent }]}
            >
              {activeFeature.label}
            </Text>

            <Text style={styles.featureTitle}>{activeFeature.title}</Text>

            <Text style={styles.featureDescription}>
              {activeFeature.description}
            </Text>
          </View>

          {/* Unique visual signature */}
          <View style={styles.visualSignature}>
            <View
              style={[
                styles.signatureLine,
                { backgroundColor: activeFeature.accent },
              ]}
            />
            <Text
              style={[styles.signatureText, { color: activeFeature.accent }]}
            >
              {activeFeature.visualLabel}
            </Text>
            <Ionicons
              name="scan-outline"
              size={17}
              color={activeFeature.accent}
            />
          </View>

          {/* Feature specifications */}
          <View style={styles.specGrid}>
            {activeFeature.specs.map(([label, value], index) => (
              <View
                key={label}
                style={[styles.specCard, index === 0 && styles.firstSpecCard]}
              >
                <Text style={styles.specLabel}>{label}</Text>
                <Text
                  style={[styles.specValue, { color: activeFeature.accent }]}
                  numberOfLines={2}
                >
                  {value}
                </Text>
              </View>
            ))}
          </View>

          {/* CTA */}
          <Pressable
            accessibilityRole="button"
            onPress={() => setDetailFeature(activeFeature)}
            style={({ pressed }) => [
              styles.cta,
              { backgroundColor: activeFeature.accent },
              pressed && styles.ctaPressed,
            ]}
          >
            <Text style={styles.ctaText}>{activeFeature.cta}</Text>
          </Pressable>
        </View>
      </ImageBackground>

      {/* Feature detail modal */}
      <Modal
        visible={detailFeature !== null}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setDetailFeature(null)}
      >
        <View style={styles.detailScreen}>
          {/* Header */}
          <View style={styles.detailHeader}>
            <View style={styles.detailHeaderTitle}>
              <Ionicons name="leaf" size={23} color="#168465" />
              <Text style={styles.detailHeaderText}>
                VWING · Chi tiết công nghệ
              </Text>
            </View>

            <Pressable
              onPress={() => setDetailFeature(null)}
              style={styles.detailCloseButton}
              accessibilityRole="button"
              accessibilityLabel="Đóng chi tiết"
            >
              <Ionicons name="close" size={24} color="#173D2C" />
            </Pressable>
          </View>

          {detailFeature && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.detailContent}
            >
              {/* Main image */}
              <Image
                source={{ uri: detailFeature.image }}
                style={styles.detailImage}
                resizeMode="cover"
              />

              {/* Category */}
              <Text
                style={[styles.detailLabel, { color: detailFeature.accent }]}
              >
                {detailFeature.label}
              </Text>

              {/* Title */}
              <Text style={styles.detailTitle}>{detailFeature.title}</Text>

              {/* Description */}
              <Text style={styles.detailDescription}>
                {detailFeature.description}
              </Text>

              {/* Technology information */}
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>
                  Thông tin công nghệ
                </Text>

                {detailFeature.specs.map(([label, value]) => (
                  <View key={label} style={styles.detailInfoRow}>
                    <View style={styles.detailInfoIcon}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={20}
                        color="#168465"
                      />
                    </View>

                    <View style={styles.detailInfoText}>
                      <Text style={styles.detailInfoLabel}>{label}</Text>
                      <Text style={styles.detailInfoValue}>{value}</Text>
                    </View>
                  </View>
                ))}
              </View>

              {/* Applications */}
              <View style={styles.detailApplicationCard}>
                <View style={styles.detailApplicationHeading}>
                  <Ionicons name="bulb-outline" size={21} color="#168465" />
                  <Text style={styles.detailSectionTitle}>
                    Ứng dụng thực tế
                  </Text>
                </View>

                <Text style={styles.detailApplicationText}>
                  {detailFeature.id === "lidar"
                    ? "Quan sát sức khỏe thảm thực vật, so sánh mật độ tán cây và xác định những khu vực cần được kiểm tra trong vườn."
                    : detailFeature.id === "pathogen"
                      ? "Hỗ trợ phân tích hình ảnh cây trồng, nhận diện dấu hiệu bất thường và giúp nhà vườn xác định khu vực cần kiểm tra kỹ hơn."
                      : detailFeature.id === "terrain"
                        ? "Theo dõi địa hình, khu vực đồi dốc và hỗ trợ lập kế hoạch khảo sát, bay drone phù hợp với điều kiện của khu vườn."
                        : "Tập hợp thông tin vùng trồng, nhật ký chăm sóc và dữ liệu sản xuất để hỗ trợ quản lý hồ sơ và truy xuất nguồn gốc nông sản."}
                </Text>
              </View>

              {/* Visual signature */}
              <View style={styles.detailFooter}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color="#168465"
                />
                <Text style={styles.detailFooterText}>
                  {detailFeature.visualLabel}
                </Text>
              </View>

              <Pressable
                style={styles.detailDoneButton}
                onPress={() => setDetailFeature(null)}
              >
                <Text style={styles.detailDoneText}>Đã hiểu · Quay lại</Text>
                <Ionicons name="arrow-back-outline" size={19} color="#FFFFFF" />
              </Pressable>
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Pagination */}
      <View style={styles.pagination}>
        {features.map((feature) => (
          <Pressable
            key={feature.id}
            accessibilityRole="button"
            accessibilityLabel={`Chọn ${feature.shortName}`}
            onPress={() => setActiveId(feature.id)}
            style={[
              styles.paginationDot,
              activeId === feature.id && {
                backgroundColor: feature.accent,
                width: 25,
              },
            ]}
          />
        ))}
        <Text style={styles.paginationLabel}>
          {String(
            features.findIndex((feature) => feature.id === activeId) + 1,
          ).padStart(2, "0")}{" "}
          / 04
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 52,
    gap: 12,
    paddingHorizontal: 12,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headingMark: {
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#059669",
  },

  eyebrow: {
    color: "#059669",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  heading: {
    color: "#10212A",
    fontSize: 29,
    lineHeight: 30,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  headingHighlight: {
    color: "#278363",
  },

  intro: {
    color: "#718096",
    fontSize: 13,
    marginTop: -5,
  },

  tabs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 3,
    paddingRight: 12,
  },

  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 99,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  tabText: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "800",
  },

  activeTabText: {
    color: "#10251F",
  },

  activeIndicator: {
    borderRadius: 99,
    backgroundColor: "rgba(16,37,31,0.12)",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  activeIndicatorText: {
    color: "#10251F",
    fontSize: 8,
    fontWeight: "900",
  },

  featureCard: {
    minHeight: 390,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#09251F",
  },

  featureImage: {
    borderRadius: 25,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFill,
  },

  decorativeRing: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    top: 65,
    right: -95,
  },

  decorativeRingSmall: {
    position: "absolute",
    width: 135,
    height: 135,
    borderRadius: 68,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    top: 102,
    right: -57,
  },

  cardContent: {
    flex: 1,
    padding: 17,
    justifyContent: "space-between",
    gap: 18,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  featureIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 9,
    paddingVertical: 7,
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  liveText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.65,
  },

  titleBlock: {
    gap: 9,
  },

  featureLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  featureTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    letterSpacing: -0.55,
    maxWidth: 300,
  },

  featureDescription: {
    color: "#E0E7E9",
    fontSize: 12,
    lineHeight: 19,
    maxWidth: 310,
  },

  visualSignature: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  signatureLine: {
    width: 22,
    height: 2,
    borderRadius: 2,
  },

  signatureText: {
    flex: 1,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  specGrid: {
    flexDirection: "row",
    gap: 7,
  },

  specCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 65,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.24)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    paddingHorizontal: 9,
    paddingVertical: 10,
    justifyContent: "center",
  },

  firstSpecCard: {
    backgroundColor: "rgba(255,255,255,0.09)",
  },

  specLabel: {
    color: "#CBD5E1",
    fontSize: 9,
    fontWeight: "600",
  },

  specValue: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 6,
  },

  cta: {
    minHeight: 47,
    borderRadius: 14,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  ctaText: {
    flex: 1,
    color: "#10251F",
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },

  ctaPressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 2,
  },

  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
  },

  paginationLabel: {
    marginLeft: 5,
    color: "#64748B",
    fontSize: 10,
    fontWeight: "800",
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
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  kickerText: {
    color: "#276C56",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.45,
  },

  detailScreen: {
    flex: 1,
    backgroundColor: "#F5FAF6",
  },

  detailHeader: {
    minHeight: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E2EBE4",
    backgroundColor: "#FFFFFF",
  },

  detailHeaderTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  detailHeaderText: {
    color: "#173D2C",
    fontSize: 15,
    fontWeight: "800",
  },

  detailCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F1E9",
    alignItems: "center",
    justifyContent: "center",
  },

  detailContent: {
    padding: 20,
    paddingBottom: 35,
  },

  detailImage: {
    width: "100%",
    height: 225,
    borderRadius: 20,
    backgroundColor: "#DCE8DF",
    marginBottom: 22,
  },

  detailLabel: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 10,
  },

  detailTitle: {
    color: "#173D2C",
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    marginBottom: 9,
  },

  detailDescription: {
    color: "#52675A",
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 20,
  },

  detailSection: {
    padding: 17,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3ECE5",
    marginBottom: 18,
  },

  detailSectionTitle: {
    color: "#173D2C",
    fontSize: 16,
    fontWeight: "900",
  },

  detailInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF2EE",
  },

  detailInfoIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#E8F5EB",
    alignItems: "center",
    justifyContent: "center",
  },

  detailInfoText: {
    flex: 1,
  },

  detailInfoLabel: {
    color: "#829187",
    fontSize: 11,
    marginBottom: 4,
  },

  detailInfoValue: {
    color: "#173D2C",
    fontSize: 14,
    fontWeight: "800",
  },

  detailApplicationCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#E8F5EB",
    marginBottom: 20,
  },

  detailApplicationHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 12,
  },

  detailApplicationText: {
    color: "#315542",
    fontSize: 13,
    lineHeight: 23,
  },

  detailFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    paddingVertical: 15,
  },

  detailFooterText: {
    color: "#168465",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  detailDoneButton: {
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: "#168465",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 12,
  },

  detailDoneText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
});
