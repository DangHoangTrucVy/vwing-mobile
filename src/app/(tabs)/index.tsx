
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import { AppScreen } from "../../components/ui/AppScreen";
import { AppHeader } from "../../components/ui/AppHeader";
import { HomeHero } from "../../components/ui/HomeHero";
import { TechnologyIntro } from "../../components/ui/TechnologyIntro";
import { FeatureShowcase } from "../../components/ui/FeatureShowcase";
import { CropSolutions } from "../../components/ui/CropSolutions";
import { PressResearch } from "../../components/ui/PressResearch";
import { TrialBooking } from "../../components/ui/TrialBooking";
import { MobileFooter } from "../../components/ui/MobileFooter";
import { RevealOnScroll } from "../../components/ui/RevealOnScroll";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <AppScreen>
      <AppHeader />

      <RevealOnScroll>
        <HomeHero
          onConsult={() => router.push("/booking")}
          onExploreFeatures={() => router.push("/solution")}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <TechnologyIntro
          onExplore={() => router.push("/solution")}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <FeatureShowcase
          onOpenFeature={(feature) => {
            const messages = {
              lidar: "Mở chi tiết bản đồ NDVI và LiDAR 3D",
              pathogen: "Mở chi tiết cảnh báo bệnh bằng AI",
              terrain: "Mở chi tiết công nghệ bay bám địa hình",
              passport: "Mở chi tiết hộ chiếu số vùng trồng",
            };

            Alert.alert("VWING", messages[feature]);
          }}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <CropSolutions
          onOpenPlotMap={(cropId) =>
            Alert.alert(
              "Bản đồ thử nghiệm",
              `Mở bản đồ cho: ${cropId}`
            )
          }
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <PressResearch
          onSelectArticle={(article) =>
            Alert.alert(article.title, article.summary)
          }
          onViewAll={() => router.push("/news")}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <TrialBooking
          onBook={() => router.push("/booking")}
        />
      </RevealOnScroll>

      <RevealOnScroll>
        <MobileFooter
          onNavigate={(route) => router.push(`/${route}`)}
        />
      </RevealOnScroll>
    </AppScreen>
  );
}
