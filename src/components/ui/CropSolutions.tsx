import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { cropSolutions } from "../../components/data/mockData";
import type { CropType } from "../../components/types/index";

type Props = {
  onOpenPlotMap: (cropId: string) => void;
};

export function CropSolutions({ onOpenPlotMap }: Props) {
  const [selectedCrop, setSelectedCrop] = useState<CropType>("durian");
  const [showMapModal, setShowMapModal] = useState(false);

  const currentCrop = useMemo(
    () =>
      cropSolutions.find((crop) => crop.id === selectedCrop) ??
      cropSolutions[0],
    [selectedCrop],
  );

  return (
    <View style={styles.section}>
      {/* Section heading */}
      <View style={styles.kicker}>
        <Ionicons name="leaf-outline" size={18} color="#276C56" />
        <Text style={styles.kickerText}>THEO TỪNG VƯỜN</Text>
      </View>

      <Text style={styles.heading}>
        Giải pháp cho{" "}
        <Text style={styles.headingHighlight}>cây trồng chủ lực.</Text>
      </Text>

      <Text style={styles.intro}>
        Chọn loại cây để khám phá giải pháp chăm sóc và dữ liệu vườn phù hợp.
      </Text>

      {/* Crop selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.selector}
      >
        {cropSolutions.map((crop) => {
          const isSelected = crop.id === selectedCrop;

          return (
            <Pressable
              key={crop.id}
              onPress={() => setSelectedCrop(crop.id)}
              style={[styles.cropChip, isSelected && styles.cropChipActive]}
            >
              <Text
                style={[
                  styles.cropChipText,
                  isSelected && styles.cropChipTextActive,
                ]}
              >
                {crop.name}
              </Text>

              {isSelected && (
                <Ionicons name="checkmark-circle" size={15} color="#FFFFFF" />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Crop solution */}
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardLabel}>
            <View style={styles.statusDot} />
            <Text style={styles.cardLabelText}>GIẢI PHÁP SỐ</Text>
          </View>

          <Ionicons name="analytics-outline" size={21} color="#276C56" />
        </View>

        <Text style={styles.title}>{currentCrop.title}</Text>

        <Text style={styles.description}>{currentCrop.description}</Text>

        {/* Statistics */}
        {/* <View style={styles.statGrid}>
          {currentCrop.stats.map((stat, index) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View> */}

        {/* Pilot plot */}
        <View style={styles.plotCard}>
          <Image
            source={{ uri: currentCrop.pilotPlot.image }}
            style={styles.plotImage}
          />

          <View style={styles.plotContent}>
            <Text style={styles.plotTitle}>{currentCrop.pilotPlot.title}</Text>

            <Text style={styles.plotDescription}>
              {currentCrop.pilotPlot.subtitle}
            </Text>

            <View style={styles.plotInfo}>
              <View style={styles.plotInfoItem}>
                <Ionicons name="leaf-outline" size={16} color="#6EE7B7" />
                <View>
                  <Text style={styles.plotInfoLabel}>SỐ CÂY</Text>
                  <Text style={styles.plotInfoValue}>
                    {currentCrop.pilotPlot.treeCount}
                  </Text>
                </View>
              </View>

              <View style={styles.plotInfoItem}>
                <Ionicons name="location-outline" size={16} color="#6EE7B7" />
                <View>
                  <Text style={styles.plotInfoLabel}>ĐỊNH VỊ</Text>
                  <Text style={styles.plotInfoValue}>
                    {currentCrop.pilotPlot.gpsStatus}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.mapButton,
                pressed && styles.mapButtonPressed,
              ]}
              onPress={() => setShowMapModal(true)}
            >
              <Text style={styles.mapButtonText}>Xem bản đồ vườn</Text>
              <Ionicons name="arrow-forward" size={17} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Detailed plot map modal */}
      <Modal
        visible={showMapModal}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setShowMapModal(false)}
      >
        <View style={styles.mapModalScreen}>
          {/* Header */}
          <View style={styles.mapModalHeader}>
            <View>
              <Text style={styles.mapModalEyebrow}>VWING · BẢN ĐỒ VƯỜN</Text>
              <Text style={styles.mapModalHeaderTitle}>Chi tiết khu vườn</Text>
            </View>

            <Pressable
              onPress={() => setShowMapModal(false)}
              style={styles.mapModalClose}
            >
              <Ionicons name="close" size={24} color="#173D2C" />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mapModalContent}
          >
            {/* Large map image */}
            <Image
              source={{ uri: currentCrop.pilotPlot.image }}
              style={styles.mapModalImage}
              resizeMode="cover"
            />

            <View style={styles.mapImageCaption}>
              <Ionicons name="location" size={18} color="#27805D" />
              <Text style={styles.mapImageCaptionText}>
                {currentCrop.pilotPlot.title}
              </Text>
            </View>

            {/* Plot information */}
            <Text style={styles.mapModalTitle}>{currentCrop.title}</Text>

            <Text style={styles.mapModalDescription}>
              {currentCrop.pilotPlot.subtitle}
            </Text>

            {/* Statistics */}
            <View style={styles.mapStatsGrid}>
              <View style={styles.mapStatCard}>
                <Ionicons name="leaf-outline" size={22} color="#27805D" />
                <Text style={styles.mapStatValue}>
                  {currentCrop.pilotPlot.treeCount}
                </Text>
                <Text style={styles.mapStatLabel}>Số cây</Text>
              </View>

              <View style={styles.mapStatCard}>
                <Ionicons name="water-outline" size={22} color="#27805D" />
                <Text style={styles.mapStatValue}>
                  {currentCrop.pilotPlot.soilMoisture}
                </Text>
                <Text style={styles.mapStatLabel}>Độ ẩm đất</Text>
              </View>
            </View>

            {/* GPS status */}
            <View style={styles.mapGpsCard}>
              <Ionicons
                name="navigate-circle-outline"
                size={25}
                color="#27805D"
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.mapGpsLabel}>Trạng thái định vị</Text>
                <Text style={styles.mapGpsValue}>
                  {currentCrop.pilotPlot.gpsStatus}
                </Text>
              </View>
            </View>

            {/* Crop statistics */}
            <Text style={styles.mapSectionTitle}>Chỉ số cây trồng</Text>

            {currentCrop.stats.map((stat) => (
              <View key={stat.label} style={styles.mapDetailRow}>
                <Text style={styles.mapDetailLabel}>{stat.label}</Text>
                <Text style={styles.mapDetailValue}>{stat.value}</Text>
              </View>
            ))}

            <Pressable
              style={styles.mapModalButton}
              onPress={() => onOpenPlotMap(currentCrop.id)}
            >
              <Ionicons name="map-outline" size={19} color="#FFFFFF" />
              <Text style={styles.mapModalButtonText}>Mở bản đồ đầy đủ</Text>
            </Pressable>

            <Text style={styles.mapModalNote}>
              Thông tin đang hiển thị lấy từ dữ liệu khu vườn hiện có.
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 30,
    backgroundColor: "#27805D",
    marginHorizontal: -12,
    marginBottom: -24,
    padding: 16,
  },

  kicker: {
    alignSelf: "flex-start",
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#B7D5C5",
    backgroundColor: "#E8F5EC",
    paddingHorizontal: 13,
    paddingVertical: 7,
  },

  kickerText: {
    color: "#276C56",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  heading: {
    color: "#0e251d",
    fontSize: 27,
    lineHeight: 35,
    fontWeight: "900",
    marginTop: 15,
    letterSpacing: -0.6,
  },

  headingHighlight: {
    color: "#0e251d",
  },

  intro: {
    color: "#ffffff",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 0,
    maxWidth: 400,
    fontWeight: "500",
  },

  selector: {
    gap: 8,
    paddingTop: 18,
    paddingBottom: 17,
    paddingRight: 16,
  },

  cropChip: {
    minHeight: 39,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "#DCE7DF",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
  },

  cropChipActive: {
    backgroundColor: "#276C56",
    borderColor: "#276C56",
  },

  cropChipText: {
    color: "#52645A",
    fontSize: 12,
    fontWeight: "700",
  },

  cropChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  card: {
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderWidth: 1,
    borderColor: "#E7EEE8",
    elevation: 1,
    shadowColor: "#163D30",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: "#2E9B69",
  },

  cardLabelText: {
    color: "#438064",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  title: {
    color: "#163D30",
    fontSize: 19,
    lineHeight: 26,
    fontWeight: "900",
    marginTop: 12,
  },

  description: {
    color: "#070707",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 1,
  },

  statGrid: {
    flexDirection: "row",
    gap: 8,
    marginTop: 15,
  },

  statCard: {
    flex: 1,
    minWidth: 0,
    minHeight: 72,
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#F2F8F3",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  statValue: {
    color: "#276C56",
    fontSize: 18,
    fontWeight: "900",
  },

  statLabel: {
    color: "#718078",
    fontSize: 10,
    lineHeight: 14,
    marginTop: 4,
  },

  plotCard: {
    marginTop: 17,
    overflow: "hidden",
    borderRadius: 17,
    backgroundColor: "#16352D",
  },

  plotImage: {
    width: "100%",
    height: 155,
    resizeMode: "cover",
    backgroundColor: "#DCE9DF",
  },

  plotContent: {
    padding: 14,
  },

  plotTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  ndviTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  ndviText: {
    color: "#A7E8C8",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  moistureBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,0.09)",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  moisture: {
    color: "#D1FAE5",
    fontSize: 10,
    fontWeight: "700",
  },

  plotTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
    marginTop: 12,
  },

  plotDescription: {
    color: "#C0D2C9",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },

  plotInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.13)",
    marginTop: 14,
    paddingTop: 13,
  },

  plotInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  plotInfoLabel: {
    color: "#A4B8AD",
    fontSize: 9,
    fontWeight: "700",
  },

  plotInfoValue: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 3,
  },

  mapButton: {
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: "#27805D",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 16,
    paddingHorizontal: 12,
  },

  mapButtonPressed: {
    opacity: 0.82,
  },

  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  mapModalScreen: {
    flex: 1,
    backgroundColor: "#F5FAF6",
  },

  mapModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E3ECE5",
  },

  mapModalEyebrow: {
    color: "#27805D",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },

  mapModalHeaderTitle: {
    color: "#173D2C",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 5,
  },

  mapModalClose: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F1E9",
  },

  mapModalContent: {
    padding: 18,
    paddingBottom: 35,
  },

  mapModalImage: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    backgroundColor: "#DCE9DF",
  },

  mapImageCaption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 12,
    marginBottom: 20,
  },

  mapImageCaptionText: {
    flex: 1,
    color: "#27805D",
    fontSize: 12,
    fontWeight: "800",
  },

  mapModalTitle: {
    color: "#173D2C",
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "900",
  },

  mapModalDescription: {
    color: "#64756A",
    fontSize: 13,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 20,
  },

  mapStatsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },

  mapStatCard: {
    flex: 1,
    padding: 16,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2EBE4",
  },

  mapStatValue: {
    color: "#173D2C",
    fontSize: 19,
    fontWeight: "900",
    marginTop: 10,
  },

  mapStatLabel: {
    color: "#718078",
    fontSize: 11,
    marginTop: 4,
  },

  mapGpsCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#E8F5EB",
    marginBottom: 24,
  },

  mapGpsLabel: {
    color: "#64756A",
    fontSize: 11,
  },

  mapGpsValue: {
    color: "#173D2C",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },

  mapSectionTitle: {
    color: "#173D2C",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 10,
  },

  mapDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E3ECE5",
  },

  mapDetailLabel: {
    flex: 1,
    color: "#64756A",
    fontSize: 12,
  },

  mapDetailValue: {
    color: "#27805D",
    fontSize: 13,
    fontWeight: "900",
  },

  mapModalButton: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: "#27805D",
    borderRadius: 15,
    marginTop: 24,
  },

  mapModalButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  mapModalNote: {
    color: "#829187",
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 12,
  },
});
