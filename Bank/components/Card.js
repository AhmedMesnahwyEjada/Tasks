import {ImageBackground, Animated} from 'react-native';
import cardImage from '../assets/card.png';
const Card = ({children, height, pan, panResponder}) => {
  const Children = () => {
    return (
      <ImageBackground
        source={cardImage}
        imageStyle={{borderRadius: 20}}
        style={{
          backgroundColor: 'green',
          borderRadius: 20,
          marginTop: 30,
          height: height,
        }}>
        {children}
      </ImageBackground>
    );
  };
  return !pan ? (
    <Children />
  ) : (
    <Animated.View
      style={[
        {
          position: 'absolute',
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        },
      ]}
      {...panResponder.panHandlers}>
      <Children />
    </Animated.View>
  );
};
export default Card;
