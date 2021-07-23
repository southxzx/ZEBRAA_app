import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button, Image } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
import { useTheme } from '../../../Context/store/ThemeContext';
import TextCustom from '../../../Shared/StyledComponents/TextCustom';
import EasyButton from '../../../Shared/StyledComponents/EasyButton';

var { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  return (
    <View style={Styles.container}>
      <Image
        source={{ uri: "https://res.cloudinary.com/zebraa/image/upload/v1625312148/orderplaced_bpukqm.png" }}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <TextCustom fontWeight={500} fontStyle="Medium" fontSize={18} style={Styles.textThanks}>Thanks for your Purchase</TextCustom>
      <View style={{ width: '90%' }}>
        <EasyButton
          large
          primary
          onPress={() => props.navigation.navigate("Home")}
        >
          <TextCustom>CONTINUE SHOPPING</TextCustom>
        </EasyButton>
      </View>
    </View>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      height: height,
      padding: 8,
      alignItems: 'center',
      backgroundColor: theme.backgroundPrimary,
    },
    titleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
    },
    shipping: {
      alignSelf: 'center',
      margin: 8,
      fontSize: 16,
      fontWeight: 'bold',
    },
    listItem: {
      alignSelf: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',

    },
    body: {
      margin: 10,
      alignItems: 'center',
      flexDirection: 'row',
    },
    title: {
      fontWeight: 'bold'
    },
    textThanks: {
      alignSelf: 'center',
      paddingVertical: 50
    }
  });
  return styles
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart())
  }
}

export default connect(null, mapDispatchToProps)(Confirm);