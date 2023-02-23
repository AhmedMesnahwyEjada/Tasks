import React, {useRef, useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, Button} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 10})).current;
  const [button, setButton] = useState(false);
  let state = false;
  const toggleButton = () => {
    setButton(button => {
      return !button;
    });
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (!state) pan.setOffset({x: 0, y: 10});
        else pan.setOffset({x: -100, y: -100});
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        if (
          pan.x._value >= -100 &&
          pan.x._value <= 100 &&
          pan.y._value >= -100 &&
          pan.y._value <= 100
        ) {
          state = false;
          // setState(true);
          console.log('zero', state);
          Animated.spring(pan, {
            toValue: {x: 0, y: 10},
            duration: 100,
            useNativeDriver: true,
          }).start();
        } else {
          state = true;
          console.log('one', state);
          Animated.spring(pan, {
            toValue: {x: -100, y: -100},
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag & Release this box!</Text>
      <View
        style={{
          left: 0,
          top: 0,
          width: 110,
          height: 110,
          borderWidth: 5,
          borderRadius: 20,
          borderStyle: 'dashed',
          borderColor: 'green',
          zIndex: 2,
        }}></View>
      <Animated.View
        style={[
          {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          },
          styles.box,
        ]}
        {...panResponder.panHandlers}>
        <Text>Hello</Text>
      </Animated.View>
      <Button onPress={toggleButton} title={'button'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 1,
  },
});

export default App;
