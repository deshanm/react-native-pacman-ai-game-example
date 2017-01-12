import React from 'react';
import { Text, View } from 'react-native';
import {DoubleBounce } from 'react-native-loader';

const PageLoading = () => {
  const { container,textStyle } = styles;

  return (
    <View style={container}>
        <DoubleBounce size={30} color="#1CAFF6" />
        <Text style={textStyle}>Pacman is Loading...</Text>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  textStyle:{
    color:'gray',
    fontSize:15,
    padding: 10,
  }

};

export default PageLoading;
