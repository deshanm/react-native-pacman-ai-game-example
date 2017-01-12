import React, {
    Component
} from 'react';
import {
    View,
    Text,
    Animated,
    Button,
} from "react-native";
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }
    componentDidMount() {
        this.state.bounceValue.setValue(1.5);
        Animated.spring(
            this.state.bounceValue, {
                toValue: 1.1,
                friction: 1,
            }
        ).start();
    }

    render() {
        return (
          <View style = {styles.container}>
            <Text style={styles.textStyle}>React Native</Text>
            <Animated.Text style={[
              styles.largeTextStyle,
              {
              transform: [
                {scale: this.state.bounceValue},
              ]
            }]}>PACMAN GAME </Animated.Text>


            <View style={styles.buttonContainer}>
              <Button title="START GAME" onPress={()=>Actions.home()}></Button>
            </View>
          </View>

        );
    }
}

const styles = {
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems:'center',
    },
    textStyle:{
      color:'#5a5c5e',
      fontSize:18
    },
    largeTextStyle:{
      color:'#5a5c5e',
      fontSize:30
    },
    buttonContainer:{
      top: 80,
    },
};

export default connect(null, {
})(Home);
