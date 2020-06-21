import * as React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { MarkerProps } from './popup';
import { TagListItem } from './tag-list-item';
import { TogglePopup } from '../redux/actions';
import { dateHandler } from '../utils';

// *** images ***
import closeImg from '../images/close.svg';
import editImg from '../images/edit.svg';

// *** Styled Components ***
const Container = styled.div`
    position: relative;
    width: 300px;
    border-radius: 10px;
    background-color: #FFFF99;
    box-shadow: 2px 2px 4px 1px rgba(0,0,0,0.75);
    margin: 20px;
    padding: 10px;
    box-sizing: border-box;
`
const Content = styled.div`
`
const MainInfo = styled.a`
    color: black;
    text-decoration: none;
    cursor: pointer;
`
const Name = styled.h2`
    text-align: center;
    margin-top: 0;
`
const Url = styled.p`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const CloseIcon = styled.img.attrs({
    src: `${closeImg}`,
    alt: 'close icon'
})`
    width: 14px;
    position: absolute;
    top: -18px;
    right: -14px;
    cursor: pointer;
`
const EditIcon = styled.img.attrs({
    src: `${editImg}`,
    alt: "edit icon"
})`
    width: 14px;
    position: absolute;
    top: -18px;
    right: 5px;
    cursor: pointer;
`
const CreatingDate = styled.div``


interface MarkerListItemProps {
    marker: MarkerProps,
    removeMarker: (index: number) => void,
    index: number,
    findTagHandler: (name: string) => void
}
export const MarkerListItem: React.FC<MarkerListItemProps> = ({ marker, removeMarker, index, findTagHandler }) => {
    const dispatch = useDispatch();

    // *** при нажатии на кнопку "редактировать" диспатчим открытие попапа и 
    //     передаем индекс активного слайда 
    const editButtonHandler = () => {
        dispatch(new TogglePopup(index));
    }
    
    const { url, name, tags, date } = marker;

    return (
            <Container >
                <Content >   
                    <MainInfo 
                        href={`${url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Name>{name}</Name>
                        <Url>{`URL: ${url}`}</Url>
                        <CreatingDate>{`Дата создания: ${dateHandler(date)}`}</CreatingDate>
                    </MainInfo>
                    <TagList>
                        {tags.map((tag, index) => {
                        return <TagListItem 
                                    key={index}
                                    index={index} 
                                    tag={tag} 
                                    findTagHandler={findTagHandler}
                                />}
                        )}
                    </TagList>
                </Content>
                <CloseIcon onClick={removeMarker.bind(null, index)} />
                <EditIcon onClick={editButtonHandler} />
            </Container>
    )
}