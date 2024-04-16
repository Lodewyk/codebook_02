import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware = ({ 
    dispatch,
    getState
}: {
    dispatch: Dispatch<Action>,
    getState: () => RootState
}) => {
    let timer: any;

    /**
     * Annotating these as "action: Action" instead of "action: any" causes store.ts to throw 
     * a "No overload matches this call." error when passing "persistMiddleware" into applyMiddleware.
     * 
     * The redux type def specifies that the middleware being passed in will be of type "any" so we
     * need to match that signature. 
     * 
     * Time wasted: At least 30 minutes, trying to find some error in my middleware itself.
     */
    return (next: (action: any) => void) => {
        return (action: any) => {
            next(action);

            if ([ActionType.MOVE_CELL, ActionType.UPDATE_CELL, ActionType.INSERT_CELL_AFTER, ActionType.DELETE_CELL].includes(action.type)) {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(() => {
                    saveCells()(dispatch, getState);
                }, 250);
            }
        }
    }
}