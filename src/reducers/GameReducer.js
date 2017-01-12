import {
    INIT_GAME,
    PAUSE_GAME,
    CONTINUE_GAME,
    CHANGE_DIRECTION,
    CHANGE_PAC_POSITION,
    INCREMENT_MARKS,
    UPDATE_FOOD_GRID,
    USER_WON,
    RESTART_GAME,
    USER_LOST,
    MOVE_RIGHT
} from '../actions/types';
import _ from 'lodash';
import {
    DEFAULT_MATRIX
} from '../constants';

const INITIAL_STATE = {
    currentDirection: MOVE_RIGHT,
    packmanPosition: {
        x: 0,
        y: 0
    },
    pause: true,
    win: false,
    lost: false,
    lifes: 3,
    marks: 0,
    foodGrid: _.cloneDeepWith(DEFAULT_MATRIX)
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INIT_GAME:
            return {...state,
                pause: false
            };
        case USER_LOST:
            return {...state,
                lost: true,
                pause: true
            };
        case USER_WON:
            return {...state,
                win: true,
                pause: true
            };
        case INCREMENT_MARKS:
            return {...state,
                marks: ++marks
            };
        case UPDATE_FOOD_GRID:
            return {...state,
                foodGrid: action.payload,
                marks: ++state.marks
            };
        case PAUSE_GAME:
            return {...state,
                pause: true
            };
        case CONTINUE_GAME:
            return {...state,
                pause: false
            };
        case CHANGE_DIRECTION:
            return {...state,
                currentDirection: action.payload
            };
        case CHANGE_PAC_POSITION:
            return {...state,
                packmanPosition: action.payload
            };
        case RESTART_GAME:
            return {...INITIAL_STATE
            };
        default:
            return state;
    }
};
