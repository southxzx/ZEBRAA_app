import React, { useMemo } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useTheme } from '../../Context/store/ThemeContext';
import TextCustom from '../StyledComponents/TextCustom';

const Input = ({ name, id, value, autoCorrect, onChangeText, onFocus, secureTextEntry, keyboardType, onBlur, placeholder }) => {
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));
  return (
    <View style={Styles.container}>
      <TextCustom fontSize={12} color={ theme.darkTheme ? "#FFF" : "#919191"} fontWeight={500} fontStyle="Medium" style={{width: '80%', alignSelf: 'center'}}>{placeholder}</TextCustom>
      <TextInput
        style={Styles.input}
        // placeholder={props.placeholder}
        name={name}
        id={id}
        value={value}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 2,
      alignItems: 'center',
    },
    input: {
      color: theme.ink,
      fontSize: 16,
      width: '80%',
      height: 40,
      borderBottomWidth: 1,
      borderColor: '#d7d7d7',
      marginVertical: 5,
    }
  });
  return styles
}

export default Input;