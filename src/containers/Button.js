import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, textStyle, style, title }) => {
  const { buttonStyle, txtStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={[txtStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  txtStyle: {
    alignSelf: 'center',
    color: 'black',
    color: 'white'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5
  }
};

export default Button;
