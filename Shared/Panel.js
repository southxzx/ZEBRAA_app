import { Component, StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowTop } from './StyledComponents/ListSvg';
import TextCustom from './StyledComponents/TextCustom';

const Panel = ({ children, isExpandContent, title }) => {

  const startingHeight = 30;
  const [state, setState] = useState({
    expanded: true,
    fullHeight: startingHeight
  });

  const animatedHeight = useRef(new Animated.Value(startingHeight)).current;

  useEffect(() => {
    Animated.spring(animatedHeight, {
      friction: 100,
      toValue: state.expanded ? state.fullHeight : startingHeight,
      useNativeDriver: false
    }).start();
  }), [state.expanded]

  const icons = {
    up: <ArrowTop />,
    down: <ArrowDown />
  }

  let icon = state.expanded ? icons['up'] : icons['down'];

  const onToggleExpand = () => {
    setState(prevState => ({ ...prevState, expanded: !prevState.expanded }));
  }

  const onLayout = (e) => {
    let {x, y, width, height} = e.nativeEvent.layout;
    height = Math.floor(height) + 30;
    if(height > startingHeight ){
        setState(prevState => ({ ...prevState, fullHeight: height}));
    }
};

  return (
    <Animated.View style={[styles.container, { height: animatedHeight }]} >
      <View onLayout={(e) => onLayout(e)}>
        <TouchableHighlight
          style={styles.button}
          onPress={onToggleExpand}
          underlayColor="#fff">
          <View style={styles.titleContainer} >
            <TextCustom fontSize={16} fontWeight={500} fontStyle="Medium">{title}</TextCustom>
            <View style={styles.buttonImage}>
              {icon}
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.body}>
          {children}
        </View>
      </View>
    </Animated.View>
  )
}

var styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  body: {
    paddingTop: 0,
  }
});

export default Panel;