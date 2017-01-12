import {
    INIT_GAME,
    GHOST_NEW_PATH,
    CHANGE_GHOST_POSITION,
    RESTART_GAME
} from '../actions/types';
import _ from 'lodash';
import {
    GHOSTS
} from '../constants';

const INITIAL_STATE = _.mapKeys(GHOSTS, 'id');

export default (state = _.cloneDeep(INITIAL_STATE), action) => {

    switch (action.type) {
        case INIT_GAME:
            return {...state
            };
        case GHOST_NEW_PATH:
            return {...state,
                [action.payload.id]: action.payload
            };
        case CHANGE_GHOST_POSITION:
            const newState = _.mapKeys(action.payload, 'id');
            return {...state,
                ...newState
            }
        case RESTART_GAME:

            return INITIAL_STATE;
        default:
            return state;
    }
};
