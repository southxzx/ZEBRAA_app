import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartIcon, HomeIcon, UserIcon } from '../Shared/StyledComponents/ListSvg';

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const showIcon = (label, active) => {
    switch (label) {
      case 'Home':
        return <HomeIcon color={active ? "#fff" : "#757575"} />
      case 'Cart':
        return <CartIcon color={active ? "#fff" : "#757575"} />
      case 'User':
        return <UserIcon color={active ? "#fff" : "#757575"} />
      default:
        return null;
    }
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
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

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={styles.blockIcon}>
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text> */}
              <View style={isFocused ? styles.outActive : styles.outInactive}>
                <View style={isFocused ? styles.iconActive : styles.iconInactive}>
                  {showIcon(label, isFocused)}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#FFE4C4'
  },
  blockIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  iconActive: {
    backgroundColor: '#f48c06',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#e85d04',
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  iconInactive: {

  },
})

export default MyTabBar;