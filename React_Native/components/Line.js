import {View} from 'react-native';
const Line = ({width}) => {
  return (
    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: width,
        alignSelf: 'stretch',
      }}
    />
  );
};
export default Line;
