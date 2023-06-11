import { combineReducers } from "redux";
import reducer from "./cellReducer";

import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
    cells:reducer,
    bundles:bundlesReducer,
});

export default reducers;

export type RootState =ReturnType<typeof reducers>;
