import { ActionType } from "../action-types";
import axios from 'axios';
import { 
    Action,
    DeleteCellAction, 
    Direction, 
    InsertCellAfterAction, 
    MoveCellAction, 
    UpdateCellAction
} from "../actions";
import { Cell, CellTypes } from "../cell";
import { Dispatch } from 'redux';
import bundle from '../../bundler';
import { RootState } from "../reducers";

// TODO split action creators into separate files for cell actions / bundle actions and export from here

export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id, 
            content
        }
    }
};

export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id, 
            direction
        }
    }
};

export const insertCellAfter = (id: string | null, type: CellTypes): InsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type
        }
    }
};

export const createBundle = (cellId: string, userInput: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.BUNDLE_START,
            payload: {
                cellId: cellId
            }
        });

        const result = await bundle(userInput);

        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId,
                output: {
                    code: result.code,
                    error: result.error
                }
            }
        });
    }
}

export const fetchCells = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({ type: ActionType.FETCH_CELLS });
        try {
            const { data }: { data: Cell[] } = await axios.get('/cells');

            dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({
                    type: ActionType.FETCH_CELLS_ERROR,
                    payload: error.message
                });
            }
        }
    };
};

export const saveCells = () => {
    return async(dispatch: Dispatch<Action>, getState: () => RootState) => {
        const { cells: { data, order } } = getState();

        const cells = order.map(id => data[id]);

        try {
            await axios.post('/cells', { cells: cells });
        } catch (error) {
            if (error instanceof Error) {
                dispatch({
                    type: ActionType.SAVE_CELLS_ERROR,
                    payload: error.message
                });
            }
        }
    }
}