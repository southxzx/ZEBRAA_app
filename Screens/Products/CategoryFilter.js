import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';
import TextCustom from '../../Shared/StyledComponents/TextCustom';
import { useTheme } from '../../Context/store/ThemeContext';

const CategoryFilter = (props) => {

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: theme.backgroundPrimary }}
      showsHorizontalScrollIndicator={false}
    >
      <ListItem style={{ borderBottomWidth: 0, paddingBottom: 0, paddingTop: 0 }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'),
              props.setActive(-1)
          }}
        >
          <Badge
            style={[
              Styles.center,
              { margin: 5 },
              props.active == -1 ? Styles.active : Styles.inactive
            ]}
          >
            <TextCustom style={Styles.textCate} fontSize={13} fontWeight={400} fontStyle="Regular">All Shoes</TextCustom>
          </Badge>
        </TouchableOpacity>
        {
          props.categories ? props.categories.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                props.categoryFilter(item._id),
                  props.setActive(props.categories.indexOf(item))
              }}
            >
              <Badge
                style={[
                  Styles.center,
                  { margin: 5 },
                  props.active == props.categories.indexOf(item) ? Styles.active : Styles.inactive
                ]}
              >
                <TextCustom style={Styles.textCate} fontSize={13} fontWeight={400} fontStyle="Regular">{item.name}</TextCustom>
              </Badge>
            </TouchableOpacity>
          )) : null
        }
      </ListItem>
    </ScrollView>
  )
}

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    center: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textCate: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 2,
    },
    active: {
      backgroundColor: theme.iconBg,
      borderWidth: 2,
      borderColor: '#f48c06',
      shadowColor: '#e85d04',
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    },
    inactive: {
      backgroundColor: theme.iconBg,
      borderWidth: 1,
      borderColor: theme.borderLightOrange,
    }
  });
  return styles
}

export default CategoryFilter;