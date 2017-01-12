import { combineReducers } from 'redux';
import GameReducer from './GameReducer';
import GhostReducer from './GhostReducer';

export default combineReducers({
  game: GameReducer,
  ghosts: GhostReducer,
});
