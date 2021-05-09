import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text } from 'native-base';
import TextCustom from '../../Shared/StyledComponents/TextCustom';

const CategoryFilter = (props) => {

  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: '#fbfbfb' }}
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
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive
            ]}
          >
            <TextCustom style={styles.textCate} fontSize={13} fontWeight={400} fontStyle="Regular">All Shoes</TextCustom>
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
                  styles.center,
                  { margin: 5 },
                  props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                ]}
              >
                <TextCustom style={styles.textCate} fontSize={13} fontWeight={400} fontStyle="Regular">{item.name}</TextCustom>
              </Badge>
            </TouchableOpacity>
          )) : null
        }
      </ListItem>
    </ScrollView>
  )
}

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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFE4C4',
  }
})

export default CategoryFilter;