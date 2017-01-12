import React from 'react';
import {
  Text,
  View,
  Animated
} from 'react-native';

const PACKMAN_WIDTH = 10;
const PACKMAN_COLOR = 'yellow';

const PackMan = ({style}) => {

  return ( <View
    style = {[styles.packmanStyle, style]}>
  </View>
);
};

const styles = {
    packmanStyle: {
        width: 0,
        height: 0,
        borderRightWidth: PACKMAN_WIDTH,
        borderRightColor: 'transparent',
        borderTopWidth: PACKMAN_WIDTH,
        borderTopColor: PACKMAN_COLOR,
        borderLeftWidth: PACKMAN_WIDTH,
        borderLeftColor: PACKMAN_COLOR,
        borderBottomWidth: PACKMAN_WIDTH,
        borderBottomColor: PACKMAN_COLOR,
        borderTopLeftRadius: PACKMAN_WIDTH,
        borderTopRightRadius: PACKMAN_WIDTH,
        borderBottomLeftRadius: PACKMAN_WIDTH,
        borderBottomRightRadius: PACKMAN_WIDTH,
    },

};

export default PackMan;
