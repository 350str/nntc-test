import { Reducer } from 'redux';

import { MarkerProps } from '../components/popup'
import { ActionTypes, ActionsAll } from './actions';

export interface StateProps {
    markerList: MarkerProps[],
    isPopupOpen: boolean,
    activeMarkerIndex?: number | undefined
}
export const initialState: StateProps = { markerList: [], isPopupOpen: false };

export const reducer: Reducer<StateProps, ActionsAll> = (state: StateProps = initialState, action: ActionsAll) => {
    switch (action.type) {
        case ActionTypes.SET_MARKER_DATA: 
            return {
                ...state,
                markerList: [...state.markerList, action.payload]
            }
        case ActionTypes.REMOVE_MARKER:
            const id = action.id;
            return {
                ...state,
                markerList: [...state.markerList.slice(0, id), ...state.markerList.slice(id + 1)]
            }
        case ActionTypes.EDIT_MARKER:
            const itemId = action.id;
            const payload = action.payload;
            return {
                ...state,
                markerList: [
                    ...state.markerList.slice(0, itemId), 
                    payload, 
                    ...state.markerList.slice(itemId + 1)
                ]
            }
        case ActionTypes.TOGGLE_POPUP:
            return {
                ...state,
                isPopupOpen: !state.isPopupOpen,
                activeMarkerIndex: action.activeMarkerIndex
            }
        default: 
            return state      
    }
}