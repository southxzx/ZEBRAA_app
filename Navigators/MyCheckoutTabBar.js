import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '../Context/store/ThemeContext';

const MyCheckoutTabBar = (props) => {
  const { state, descriptors, navigation, position } = props;
  const { theme } = useTheme();
  // const Styles = useMemo(() => createStyles(theme));
  return (
    <View style={{ flexDirection: 'row' }}>
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // const onLongPress = () => {
          //   navigation.emit({
          //     type: 'tabLongPress',
          //     target: route.key,
          //   });
          // };

          const inputRange = state.routes.map((_, i) => i);
          console.log(inputRange.map(i => (i === index ? 1 : 0)));
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{ flex: 1, backgroundColor: theme.backgroundPrimary, alignItems: 'center' }}
            >
              <Animated.Text style={{ color: theme.ink, fontWeight: '700' }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

export default MyCheckoutTabBar;
