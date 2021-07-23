import React, { useContext, useState, useMemo } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { ArrowNext, CloseIcon } from "./StyledComponents/ListSvg";
import TextCustom from "./StyledComponents/TextCustom";
import { Switch } from 'react-native-paper';
import { useTheme } from "../Context/store/ThemeContext";

const ModalSetting = ({ onClose }) => {

  const { theme, toggleTheme }  = useTheme();
  const Styles = useMemo(() => createStyles(theme), [theme]);
  const [modalVisible, setModalVisible] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = React.useState(theme.darkTheme);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    toggleTheme();
  }
  return (
    <View style={[Styles.centeredView, Styles.modalContainer]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <TouchableOpacity style={Styles.closeBtn} onPress={() => { setModalVisible(!modalVisible), onClose() }}>
              <CloseIcon color={theme.ink} />
            </TouchableOpacity>
            <View style={Styles.settingLine}>
              <View style={Styles.settingLineDes}>
                <Image
                  source={require('../assets/lang.png')}
                  style={Styles.iconSetting}
                  resizeMode="contain"
                />
                <View><TextCustom>Language</TextCustom></View>
              </View>
              <View style={Styles.iconNext}>
                <ArrowNext color={theme.ink} />
              </View>
            </View>
            <View style={Styles.settingLine}>
              <View style={Styles.settingLineDes}>
                <Image
                  source={require('../assets/bell.png')}
                  style={Styles.iconSetting}
                  resizeMode="contain"
                />
                <View><TextCustom>Notification</TextCustom></View>
              </View>
              <View style={Styles.iconNext}>
                <ArrowNext color={theme.ink}/>
              </View>
            </View>
            <View style={Styles.settingLine}>
              <View style={Styles.settingLineDes}>
                <Image
                  source={require('../assets/mode.png')}
                  style={Styles.iconSetting}
                  resizeMode="contain"
                />
                <View><TextCustom>Dark Mode</TextCustom></View>
              </View>
              <View>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              </View>
            </View>
            <View style={Styles.settingLine}>
              <View style={Styles.settingLineDes}>
                <Image
                  source={require('../assets/help.png')}
                  style={Styles.iconSetting}
                  resizeMode="contain"
                />
                <View><TextCustom>Help</TextCustom></View>
              </View>
              <View style={Styles.iconNext}>
                <ArrowNext color={theme.ink} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    modalContainer: {
      position: 'absolute',
    },
    centeredView: {
      backgroundColor: 'rgba(0, 0, 0, 0.44)',
      // opacity: 0.3,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    closeBtn: {
      position: 'absolute',
      right: 5,
      padding: 5,
      borderRadius: 5,
      top: 5,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    iconSetting: {
      width: 48,
      height: 48,
      marginRight: 15,
    },
    settingLineDes: {
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 200,
      paddingRight: 40,
    },
    settingLine: {
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center' 
    },
    iconNext: {
      backgroundColor: theme.iconBg,
      padding: 8,
      borderRadius: 15,
    }
  });
  return styles;
}

export default ModalSetting;