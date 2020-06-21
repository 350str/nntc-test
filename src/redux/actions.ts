import { MarkerProps } from '../components/popup';
import { Action } from 'redux';

export enum ActionTypes {
    SET_MARKER_DATA = "SET_MARKER_DATA",
    REMOVE_MARKER = "REMOVE_MARKER",
    EDIT_MARKER = "EDIT_MARKER",
    TOGGLE_POPUP = "TOGGLE_POPUP"
}

export class SetMarkerData implements Action {
    readonly type = ActionTypes.SET_MARKER_DATA;
    constructor(public payload: MarkerProps) {}
}

export class RemoveMarker implements Action {
    readonly type = ActionTypes.REMOVE_MARKER;
    constructor(public id: number){}
}

export class EditMarker implements Action {
    readonly type = ActionTypes.EDIT_MARKER;
    constructor(public id: number,
                public payload: MarkerProps){}
}

export class TogglePopup implements Action {
    readonly type = ActionTypes.TOGGLE_POPUP;
    constructor(public activeMarkerIndex: number | undefined = undefined){}
}

export type ActionsAll = SetMarkerData | RemoveMarker | EditMarker | TogglePopup;