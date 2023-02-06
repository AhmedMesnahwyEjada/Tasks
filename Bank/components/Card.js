import {ImageBackground} from 'react-native';
import cardImage from '../assets/card.png';
const Card = ({children, height}) => {
  return (
    <ImageBackground
      source={cardImage}
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
export default Card;
