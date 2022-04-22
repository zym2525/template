import {
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  StyleSheet,
  StyleProp,
  Platform,
  Keyboard,
  ViewStyle,
  ColorValue
} from 'react-native';
import React from 'react'
import { Text } from '@zero-d/rn-components'
import { TouchableRipple, Surface, withTheme, overlay, Colors } from 'react-native-paper'
import { MaybeScreen, MaybeScreenContainer } from './ScreenFallback';
import color from 'color';
import TabBar, { TabBarProps } from './TabHorizontalBar'

export type Route = {
  key: string;
  title?: string;
  icon?: string;
  badge?: string | number | boolean;
  color?: string;
  accessibilityLabel?: string;
  testID?: string;
  lazy?: boolean;
  unmountOnBlur?: boolean;
};

export type NavigationState = {
  index: number;
  routes: Route[];
};

export type TabPressEvent = {
  defaultPrevented: boolean;
  preventDefault(): void;
};

export type Props = {
  /**
   * 只显示icon
   */
  labeled?: boolean;
  navigationState: NavigationState;
  onIndexChange: (index: number) => void;

  renderScene: (props: {
    route: Route;
    jumpTo: (key: string) => void;
  }) => React.ReactNode | null;

  renderIcon?: (props: {
    route: Route;
    focused: boolean;
    color: string;
  }) => React.ReactNode;

  renderLabel?: (props: {
    route: Route;
    focused: boolean;
    color: string;
  }) => React.ReactNode;

  getLabelText?: (props: { route: Route }) => string | undefined;

  getBadge?: (props: { route: Route }) => boolean | number | string | undefined;

  getColor?: (props: { route: Route }) => string | undefined;

  getLazy?: (props: { route: Route }) => boolean | undefined;

  getUnmountOnBlur?: (props: { route: Route }) => boolean | undefined;

  onTabPress?: (props: { route: Route } & TabPressEvent) => void;

  activeColor?: string;
  inactiveColor?: string;

  barStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: ReactNativePaper.Theme;

  renderTabBar: (props: TabBarProps) => React.ReactNode
}

const SceneComponent = React.memo(({ component, ...rest }: any) =>
  React.createElement(component, rest)
);

const TabHorizontalView = ({
  navigationState,
  onTabPress,
  onIndexChange,
  renderScene,
  barStyle,
  style,
  theme,
  renderTabBar = (props: TabBarProps) => <TabBar {...props} />,
  getBadge = ({ route }: { route: Route }) => route.badge,
  getLabelText = ({ route }: { route: Route }) => route.title,
  getColor = ({ route }: { route: Route }) => route.color,
  getLazy = ({ route }: { route: Route }) => route.lazy ?? true,
  getUnmountOnBlur = ({ route }: { route: Route }) => route.unmountOnBlur,
  activeColor,
  inactiveColor,
  labeled = true,
  renderLabel
}: Props) => {

  const focusedKey = navigationState.routes[navigationState.index].key;

  const [loaded, setLoaded] = React.useState<string[]>([focusedKey]);

  if (!loaded.includes(focusedKey)) {
    setLoaded((loaded) => [...loaded, focusedKey]);
  }

  const handleTabPress = (index: number) => {
    const event = {
      route: navigationState.routes[index],
      defaultPrevented: false,
      preventDefault: () => {
        event.defaultPrevented = true;
      },
    };

    onTabPress?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (index !== navigationState.index) {
      onIndexChange(index);
    }
  };

  const jumpTo = React.useCallback(
    (key: string) => {
      const index = navigationState.routes.findIndex(
        (route) => route.key === key
      );

      onIndexChange(index);
    },
    [navigationState.routes, onIndexChange]
  );

  const { routes } = navigationState;
  const { colors, dark: isDarkTheme, mode } = theme;
  const { backgroundColor: customBackground, elevation = 4 }: ViewStyle =
    StyleSheet.flatten(barStyle) || {};

  const approxBackgroundColor = customBackground
    ? customBackground
    : isDarkTheme && mode === 'adaptive'
      ? overlay(elevation, colors.surface)
      : colors.primary;

  return (
    <View style={[styles.wrapper, style]}>
      <Surface
        style={[styles.bar, barStyle]}
      >
        {renderTabBar({
          approxBackgroundColor,
          navigationState,
          getBadge,
          activeColor,
          inactiveColor,
          handleTabPress,
          jumpTo,
          labeled,
          getLabelText,
          renderLabel
        })}
      </Surface>
      <MaybeScreenContainer
        enabled
        hasTwoStates
        style={styles.container}
      >
        {routes.map((route, index) => {
          const unmountOnBlur = getUnmountOnBlur({ route });
          const lazy = getLazy({ route });
          const isFocused = navigationState.index === index;

          if (unmountOnBlur && !isFocused) {
            return null;
          }

          if (lazy && !loaded.includes(route.key) && !isFocused) {
            return null;
          }
          return (
            <MaybeScreen
              key={route.key}
              style={[StyleSheet.absoluteFill, { zIndex: isFocused ? 0 : -1 }]}
              visible={isFocused}
              enabled
            >
              {renderScene({ route, jumpTo })}
            </MaybeScreen>
          );
        })}
      </MaybeScreenContainer>
    </View>
  )
}

TabHorizontalView.SceneMap = (scenes: {
  [key: string]: React.ComponentType<{
    route: Route;
    jumpTo: (key: string) => void;
  }>;
}) => {
  return ({
    route,
    jumpTo,
  }: {
    route: Route;
    jumpTo: (key: string) => void;
  }) => (
    <SceneComponent
      key={route.key}
      component={scenes[route.key ? route.key : '']}
      route={route}
      jumpTo={jumpTo}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  bar: {
    left: 0,
    top: 0,
    bottom: 0,
    elevation: 4,
  },

})

export default withTheme(TabHorizontalView)