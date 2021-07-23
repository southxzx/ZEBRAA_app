import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CloseIcon } from "./StyledComponents/ListSvg";
import TextCustom from "./StyledComponents/TextCustom";

const ModalRequiresLogin = ({ navigation, onClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={[styles.centeredView, styles.modalContainer]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => { setModalVisible(!modalVisible), onClose() }}>
              <CloseIcon />
            </TouchableOpacity>
            <TextCustom style={styles.modalText}>You need to login to 'Add to cart'.</TextCustom>
            <TouchableOpacity
              style={[styles.button, styles.loginBtn]}
              onPress={() => { navigation.navigate('User'), setModalVisible(!modalVisible), onClose() }}
            >
              <Text style={styles.textStyle}>Login Now</Text>
            </TouchableOpacity>
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
const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
  },
  centeredView: {
    // backgroundColor: 'green',
    // opacity: 0.3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2
  },
  closeBtn: {
    backgroundColor: "#fff",
    position: 'absolute',
    right: 5,
    padding: 5,
    borderRadius: 5,
    top: 5,
  },
  loginBtn: {
    backgroundColor: "#f48c06",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModalRequiresLogin;