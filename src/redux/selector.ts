import { StateProps } from './reducer'; 
import { MarkerProps } from '../components/popup'

export const selectMarkerList = (state: StateProps): MarkerProps[] => {
    return state.markerList
}

export const selectIsPopupOpen = (state: StateProps): boolean => {
    return state.isPopupOpen
}

export const selectActiveMarkerIndex = (state: StateProps): number | null => {
    return state.activeMarkerIndex ?? null;
}