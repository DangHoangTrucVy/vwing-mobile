import {
  Animated,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from "react-native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealContextType = {
  scrollY: number;
  viewportHeight: number;
};

export const RevealContext = createContext<RevealContextType>({
  scrollY: 0,
  viewportHeight: 0,
});

type Props = {
  children: React.ReactNode;
  delay?: number;
};

export function RevealOnScroll({
  children,
  delay = 0,
}: Props) {
  const { scrollY, viewportHeight } = useContext(RevealContext);

  const [layout, setLayout] = useState({ top: 0, height: 0 });
  const [hasLayout, setHasLayout] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const previousVisible = useRef<boolean | null>(null);
  const animation = useRef<Animated.CompositeAnimation | null>(null);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;

    setLayout({ top: y, height });
    setHasLayout(height > 0);
  }, []);

  // Xác định section có nằm trong vùng màn hình hay không.
  useEffect(() => {
    if (!hasLayout || viewportHeight <= 0) {
      setIsVisible(true);
      return;
    }

    const screenTop = scrollY;
    const screenBottom = scrollY + viewportHeight;

    const sectionTop = layout.top;
    const sectionBottom = layout.top + layout.height;

    const visible =
      sectionBottom > screenTop + 40 &&
      sectionTop < screenBottom - 40;

    setIsVisible(visible);
  }, [scrollY, viewportHeight, layout, hasLayout]);

  // Fade-in khi đi vào màn hình; reset khi đi ra.
  useEffect(() => {
    if (!hasLayout) return;

    if (previousVisible.current === isVisible) return;
    previousVisible.current = isVisible;

    animation.current?.stop();

    if (isVisible) {
      opacity.setValue(0);
      translateY.setValue(22);

      animation.current = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 650,
          delay,
          useNativeDriver: true,
        }),
      ]);

      animation.current.start();
    } else {
      opacity.setValue(0);
      translateY.setValue(22);
    }

    return () => {
      animation.current?.stop();
    };
  }, [isVisible, hasLayout, delay, opacity, translateY]);

  return (
    <View onLayout={handleLayout} style={styles.wrapper}>
      <Animated.View
        style={[
          styles.content,
          {
            // Luôn hiển thị nếu chưa đo được layout.
            opacity: hasLayout ? opacity : 1,
            transform: [
              {
                translateY: hasLayout ? translateY : 0,
              },
            ],
          },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
  },
  content: {
    alignSelf: "stretch",
  },
});
