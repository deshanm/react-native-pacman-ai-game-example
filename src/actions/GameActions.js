import {
    INIT_GAME,
    PAUSE_GAME,
    CONTINUE_GAME,
    CHANGE_DIRECTION,
    UPDATE_FOOD_GRID,
    MOVE_UP,
    MOVE_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    CHANGE_PAC_POSITION,
    CHANGE_GHOST_POSITION,
    GHOST_NEW_PATH,
    USER_WON,
    USER_LOST,
    RESTART_GAME
} from './types';
import {
    Actions
} from 'react-native-router-flux';
import PF from 'pathfinding';
import {
    COL_COUNT,
    ROW_COUNT,
    DEFAULT_MATRIX,
    PACMAN_SPEED,
    WIN_MARKS,
    MIN_GHOST_FOLLOWING_LENGTH,

} from '../constants';

const grid = new PF.Grid(DEFAULT_MATRIX);
import _ from 'lodash';


export const changeDirection = (moveTo) => {

    return (dispatch) => {
        dispatch({
            type: CHANGE_DIRECTION,
            payload: moveTo
        });
    }
};
export const restart = () => {
    return {
        type: RESTART_GAME
    }
}
export const eatFood = (foodGrid) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_FOOD_GRID,
            payload: foodGrid
        });
    }
}
export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const wonGame = () => {
    alert('You Won... Thank You For Playing');
    return {
        type: USER_WON,
    };
}
export const initGame = () => {

    return {
        type: INIT_GAME,
    };
}
export const pauseGame = () => {
    return {
        type: PAUSE_GAME,
    };
};

export const continueGame = () => {
    return (dispatch) => {
        dispatch({
            type: CONTINUE_GAME
        });
        dispatch(runGame());
    }
}


/**
 * Continuesly Run ght game... Game speed is depend on PACMAN_SPEED
 */
export const runGame = () => {
    return (dispatch, getState) => {
        delay(PACMAN_SPEED).then(() => {
            if (!getState().game.pause) {
                dispatch(movePackman());
                //dispatch(moveGhosts());
                dispatch(runGame());
            }
        });
    }
}

export const movePackman = () => {

    return (dispatch, getState) => {
        let {
            packmanPosition,
            currentDirection,
            foodGrid,
            marks
        } = getState().game;

        let {
            ghosts,
            game
        } = getState();
        let caught = false;
        _.forEach(ghosts, (ghost) => {
            if (!ghost.path || !ghost.path.length || ghost.path.length === 0) {
                ghost.path = findSuitableGhostPath(ghost.position, packmanPosition);
            }

            const newPosition = ghost.path.shift(); // remove and use first path of the array

            if (newPosition) {
                ghost.position = {
                    x: newPosition[0],
                    y: newPosition[1]
                };

                if (newPosition[0] === packmanPosition.x && newPosition[1] === packmanPosition.y) {
                    dispatch({
                        type: USER_LOST,
                    });
                    alert('You LOST... Play agin..');
                    return;
                }
            } else {
                ghost.path = [];
            }
        });


        dispatch({
            type: CHANGE_GHOST_POSITION,
            payload: ghosts
        });

        let {
            x,
            y
        } = packmanPosition;
        let newPackmanPosition = packmanPosition;
        switch (currentDirection) {
            case MOVE_UP:
                y--;
                newPackmanPosition = {
                    x: x,
                    y: y
                };
                break;
            case MOVE_DOWN:
                y++;
                newPackmanPosition = {
                    x: x,
                    y: y
                };
                break;
            case MOVE_RIGHT:
                x++;
                newPackmanPosition = {
                    x: x,
                    y: y
                };
                break;
            case MOVE_LEFT:
                x--;
                newPackmanPosition = {
                    x: x,
                    y: y
                };
                break;
        }
        let finder = new PF.AStarFinder();
        //console.log('('+packmanPosition.x+','+ packmanPosition.y+')('+ x+','+y+')');

        let newPayload = packmanPosition;

        // check if the packman bypass the grid
        if (isValidPosition(newPackmanPosition)) {

            // check if there is obstacle
            let path = finder.findPath(packmanPosition.x, packmanPosition.y, x, y, grid.clone());
            if (path.length != 0) {
                newPayload = newPackmanPosition;
            }
        }

        if (foodGrid[newPayload.y][newPayload.x] === 0) {
            foodGrid[newPayload.y][newPayload.x] = 1;
            dispatch(eatFood(foodGrid));
            if (marks === WIN_MARKS) {
                dispatch(wonGame());
            }
        }
        dispatch({
            type: CHANGE_PAC_POSITION,
            payload: newPayload
        });
    }


}

/**
 * Position can be invalid like out of the wall. In here it checks.
 * @param  {Object}  newPackmanPosition {x,y}
 * @return {Boolean}                    {valid - true / invalid - false}
 */
function isValidPosition(newPackmanPosition) {
    const {
        x,
        y
    } = newPackmanPosition;
    if (x > COL_COUNT - 1 || x < 0 || y > ROW_COUNT - 1 || y < 0) {
        return false;
    }
    return true;
}

/**
 * Find Suitable path for ghost. IF the gost path length is less than
 * MIN_GHOST_FOLLOWING_LENGTH. Then end point of the gost will be the pacman.
 *
 * @param  {Object} ghostPosition   {x, y}
 * @param  {Object} packmanPosition {x, y}
 * @return {Array}                 Path array with {x, y}
 */
function findSuitableGhostPath(ghostPosition, packmanPosition) {
    let finder = new PF.AStarFinder();

    //first randomly select final target
    let targetPosition = {
        x: _.random(COL_COUNT - 1),
        y: _.random(ROW_COUNT - 1)
    };

    let path = finder.findPath(ghostPosition.x, ghostPosition.y, packmanPosition.x, packmanPosition.y, grid.clone());

    //If path length is greater than min length. It try to go to random position
    if (path.length > MIN_GHOST_FOLLOWING_LENGTH) {
        path = finder.findPath(ghostPosition.x, ghostPosition.y, targetPosition.x, targetPosition.y, grid.clone());
    }
    return path;
}
