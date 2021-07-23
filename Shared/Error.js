import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../Context/store/ThemeContext';
import TextCustom from './StyledComponents/TextCustom';

const Error = ({ message }) => {
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));
  return (
    <View style={Styles.container}>
      <TextCustom fontSize={12} color={theme.redError} style={{ alignSelf: 'center', marginBottom: 5,}}>
        {message}
      </TextCustom>
    </View>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
    },
  });
  return styles
}

export default Error;