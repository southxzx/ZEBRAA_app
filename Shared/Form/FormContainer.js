import React from 'react';
import { ScrollView, Dimensions, StyleSheet, View } from 'react-native';
import TextCustom from '../StyledComponents/TextCustom';

var { width } = Dimensions.get("window");

const FormContainer = (props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps={'always'}
    >
      <TextCustom style={styles.title} fontSize={24} fontWeight={500} fontStyle="Medium">{props.title}</TextCustom>
      {props.children}
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 400,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f48c06',
    marginBottom: 30,
  }
})

export default FormContainer;