import { ActionType } from "../action-types";
import { Action,UpdateCellAction,DeleteCellAction,MoveCellAction,InsertCellAfterAction,Direction } from '../actions';
import { CellTypes } from "../cell";
import bundle from '../../bundler';
import { Dispatch } from "react";

export const updateCell = (id:string,content:string):UpdateCellAction => {
    return {
        type:ActionType.UPDATE_CELL,
        payload: {
            id,content
        }
    };
};
export const deleteCell = (id:string): DeleteCellAction => {
    return {
        type:ActionType.DELETE_CELL,
        payload:id
    };
};
export const moveCell = (id:string,direction:Direction): MoveCellAction => {

    return {
        type:ActionType.MOVE_CELL,
        payload: {
            id,direction
        }
    };
};
export const insertCellAfter = (id:string|null,cellType:CellTypes):InsertCellAfterAction => {
    return {
        type:ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type:cellType
        }
    };
};

export const createBundle = (CellId:string,input:string) => {
    return async (dispatch:Dispatch<Action>)=>{

        dispatch({
            type:ActionType.BUNDLE_START,
            payload:{
                cellId:CellId,
            },
        });

        const result = await bundle(input);

        dispatch({
            type:ActionType.BUNDLE_COMPLETE,
            payload:{
                cellId:CellId,
                bundle:result
            },
        });

    }
};