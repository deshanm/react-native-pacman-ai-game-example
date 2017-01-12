import React from 'react';
import {Text, View, Image} from 'react-native';
import PackMan from './PackMan';

import ghost_1 from '../images/G1.gif';
import ghost_2 from '../images/G2.gif';
import ghost_3 from '../images/G3.gif';
import ghost_4 from '../images/G4.gif';
import {MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT} from '../actions/types';
const ghostIcons = {
    'G1': ghost_1,
    'G2': ghost_2,
    'G3': ghost_3,
    'G4': ghost_4
}

const Cell = ({ghost, isFood, isPacman, direction}) => {
    const {containerStyle, textStyle, cardSectionStyle, ghostStyle} = styles;
    let cellContent = null;
    if (ghost) {

        cellContent = <Image source={ghostIcons[ghost.id]} style={ghostStyle}/>;
    } else if (isPacman) {
        let rotate = '0deg';
        switch (direction) {
            case MOVE_UP:
                rotate = '270deg'
                break;
            case MOVE_DOWN:
                rotate = '90deg'
                break;
            case MOVE_LEFT:
                rotate = '180deg'
                break;
        }
        cellContent = <PackMan style={{
            transform: [
                {
                    rotate: rotate
                }
            ]
        }}/>;
    } else if (isFood) {
        cellContent = <Text style={{
            color: 'yellow'
        }}>*</Text>;
    }
    return (
        <View>
            {cellContent}
        </View>
    );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  ghostStyle:{
    width: 20,
    height: 20,
  }
};

export default Cell;
