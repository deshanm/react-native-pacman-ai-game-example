import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableHighlight,
    InteractionManager,
    Button
} from "react-native";
import _ from 'lodash';
import {connect} from 'react-redux';
import {Col, Row, Grid} from "react-native-easy-grid";
import {
    runGame,
    changeDirection,
    pauseGame,
    continueGame,
    initGame,
    eateanFood,
    wonGame,
    restart
} from '../actions';
import {DEFAULT_MATRIX} from '../constants';
import {MOVE_DOWN, MOVE_RIGHT, MOVE_UP, MOVE_LEFT} from '../actions/types';
import Cell from './Cell';
import PageLoading from './PageLoading';
import PackMan from './PackMan';

class Home extends Component {

    constructor() {
        super()
        this.state = {
            matrix: DEFAULT_MATRIX,
            won: false,
            isReady: false
        }
    }

    componentWillMount() {}

    componentDidMount() {
        let self = this;
        setTimeout(function() {
            self.setState({isReady: true});
            self.props.initGame();
            let matrix = self.state.matrix;
            self.props.runGame();
        }, 2400);
    }

    /**
  * Render content inside the cell
  * @param  {int} rowNum
  * @param  {int} colNum
  * @return {View}
  */
    renderContent(rowNum, colNum) {
        const {packmanPosition, ghosts, foodGrid, currentDirection} = this.props;
        let isPacman,
            ghost,
            direction,
            isFood = false;
        if (foodGrid[rowNum][colNum] === 0) {
            isFood = true;
        }
        // there can be multiple gost in one cell, but we show only one.
        // That is why we find only first one
        ghost = _.find(ghosts, {
            position: {
                x: colNum,
                y: rowNum
            }
        });

        if (packmanPosition.y === rowNum && packmanPosition.x === colNum) {
            direction = currentDirection;
            isPacman = true;
        }

        return <Cell isPacman={isPacman} ghost={ghost} direction={direction} isFood={isFood}/>;
    }

    renderRows(rowIndex, rowdata) {
        return rowdata.map((a, colIndex) => {
            return <Col key={colIndex} style={[
                {
                    backgroundColor: a === 1
                        ? '#303F9F'
                        : 'black'
                },
                styles.cellStyle
            ]}>{this.renderContent(rowIndex, colIndex)}</Col>
        })
    }

    onPressDirection(moveTo) {
        this.props.changeDirection(moveTo);
    }

    onPauseGame() {
        this.props.pauseGame();
    }
    onContinueGame() {
        this.props.continueGame();
    }
    onRestartGame(){
      this.props.pauseGame();
      this.props.restart();
    }
    renderButtonControllers(){
      return (
        <View>
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <View style={styles.btnContainer}>
              <Button onPress={()=>this.onPressDirection(MOVE_UP)}  color="white" title="UP" backgroundColor='red' />
            </View>

            <View style={{flexDirection: 'row', justifyContent:'center'}}>
              <View style={styles.btnContainer}>
                <Button onPress={()=>this.onPressDirection(MOVE_LEFT)}  color="white" title="LEFT" />
              </View>
              <View style={styles.btnContainer}>
                <Button onPress={()=>this.onPressDirection(MOVE_RIGHT)}  color="white" title="RIGHT" />
              </View>
            </View>

            <View style={styles.btnContainer}>
              <Button onPress={()=>this.onPressDirection(MOVE_DOWN)}  color="white" title="DOWN"/>
            </View>

          </View>
        </View>

      )
    }

    renderMaze() {
        let matrix = this.state.matrix;
        return this.state.matrix.map((rowdata, rowIndex) => {
            return <Row key={rowIndex}>{this.renderRows(rowIndex, rowdata)}</Row>
        })
    }

  render() {
    if (!this.state.isReady) {
      return <PageLoading/>;
    }
    return (
      <ScrollView style={{backgroundColor:'black', flex: 1}}>
        <View style={{height: 30}} />
          <Text style={styles.headingStyle}>PACMAN AI</Text>
          <Text style={styles.subHeadingStyle}>Pacman Using AStar Algorithm </Text>
        <View>
          <Text>Packman {this.props.marks}</Text>
        </View>
        <View style={styles.mazeContainerStyle}>
          {this.renderMaze()}
        </View>
        <View style={{flexDirection: 'row', margin: 20}}>
          { this.props.pause ?
            <View style={[styles.btnContainer,{backgroundColor:'#757575'}]}>
                <Button onPress={()=>this.onContinueGame()} title="Continue " color="white"/>
            </View>:
            <View style={[styles.btnContainer,{backgroundColor:'#757575'}]}>
                  <Button onPress={()=>this.onPauseGame()} title="Pause " color="white"/>
            </View>
          }
          <Text style={styles.whiteText}>{this.props.marks}</Text>
            <View style={[styles.btnContainer,{backgroundColor:'#757575'}]}>
                  <Button onPress={()=>this.onRestartGame()} title="RESTART" color="white"/>
            </View>
        </View>
      {this.renderButtonControllers()}
        <Text style={styles.footerStyle}>Developed By Desh Atom</Text>
      </ScrollView>
    );
  }
}
const styles = {
    cellStyle: {
        flex: 1,
        height: 25,
        borderColor: '#3F51B5',
        borderWidth: 0.5
    },
    headingStyle: {
        fontSize: 20,
        color: 'yellow',
        fontWeight: '600',
        textAlign: 'center'
    },
    subHeadingStyle: {
        color: 'white',
        textAlign: 'center'
    },
    mazeContainerStyle: {
        backgroundColor: '#3F51B5',
        padding: 4
    },
    buttonStyle: {
        backgroundColor: '#0d4674',
        margin: 4,
        padding: 14
    },
    footerStyle: {
        paddingTop: 34,
        textAlign: 'center',
        fontSize: 11,
        color: 'lightgray'
    },
    btnContainer:{
      margin: 2,
      backgroundColor:'#607D8B',
      flex: 1,
    },
    whiteText:{
      color:'white',
      flex: 1,
      textAlign:'center'
    }
};

const mapStateToProps = (state) => {
    const {packmanPosition, pause, currentDirection, foodGrid, marks} = state.game;
    const {ghosts} = state;
    return {
        packmanPosition,
        pause,
        currentDirection,
        foodGrid,
        marks,
        ghosts
    };
};

export default connect(mapStateToProps, {
    initGame,
    runGame,
    changeDirection,
    pauseGame,
    continueGame,
    eateanFood,
    restart,
    wonGame
})(Home);
