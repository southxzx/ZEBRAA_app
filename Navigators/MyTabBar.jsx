import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartIcon, HomeIcon, SearchIcon, UserIcon } from '../Shared/StyledComponents/ListSvg';
import CartBadge from '../Shared/CartIcon';
import TextCustom from '../Shared/StyledComponents/TextCustom';
import { useTheme } from '../Context/store/ThemeContext';

function MyTabBar({ state, descriptors, navigation }) {

  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));


  const showIcon = (label, active) => {
    switch (label) {
      case 'Home':
        return <View style={Styles.singleIcon}>
          <HomeIcon color={active ? "#f48c06" : theme.ink75} />
          <TextCustom color={active ? "#f48c06" : theme.ink75} fontSize={10} fontWeight={400} fontStyle={"Regular"}>Home</TextCustom>
        </View>
      case 'Cart':
        return <View style={Styles.singleIcon}>
          <CartIcon color={active ? "#f48c06" : theme.ink75} />
          <TextCustom color={active ? "#f48c06" : theme.ink75} fontSize={10} fontWeight={400} fontStyle={"Regular"}>Cart</TextCustom>
          <CartBadge />
        </View>
      case 'User':
        return <View style={Styles.singleIcon}>
          <UserIcon color={active ? "#f48c06" : theme.ink75} />
          <TextCustom color={active ? "#f48c06" : theme.ink75} fontSize={10} fontWeight={400} fontStyle={"Regular"}>Profile</TextCustom>
        </View>
      case 'Search': 
        return <View style={Styles.singleIcon}>
        <SearchIcon color={active ? "#f48c06" : theme.ink75} />
        <TextCustom color={active ? "#f48c06" : theme.ink75} fontSize={10} fontWeight={400} fontStyle={"Regular"}>Search</TextCustom>
      </View>
      default:
        return null;
    }
  }

  return (
    <View style={Styles.container}>
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
            key={index}
          >
            <View style={Styles.blockIcon}>
              {/* <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                {label}
              </Text> */}
              <View style={isFocused ? Styles.outActive : Styles.outInactive}>
                {showIcon(label, isFocused)}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const createStyles = (theme) => {
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
      backgroundColor: theme.backgroundPrimary,
      borderTopColor: theme.borderLightOrange,
    },
    singleIcon: {
      alignItems: 'center',
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
  });
  return styles
}

export default MyTabBar;