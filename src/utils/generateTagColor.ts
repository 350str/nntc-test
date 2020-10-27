import { MarkerProps } from '../components/popup';

export const generateTagColor = (markerList: MarkerProps[], currentMarker: MarkerProps): string => {
    let red: number = Math.floor(Math.random() * 255);
    let green: number = Math.floor(Math.random() * 255);
    let blue: number = Math.floor(Math.random() * 255);

    const sameTagMarker = markerList.find(marker => marker.tags.find(tag => tag.tagName === currentMarker.tag));
    const sameTagColor = sameTagMarker?.tags.find(tag => tag.tagName === currentMarker.tag)?.color;

    const color = sameTagMarker ? sameTagColor!
                                : `rgb(${red}, ${green}, ${blue})`;

    return color;
}