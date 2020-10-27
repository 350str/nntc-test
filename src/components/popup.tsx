import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { SetMarkerData, EditMarker } from '../redux/actions';
import { selectMarkerList, selectActiveMarkerIndex } from '../redux/selector';
import { TagListItem } from './tag-list-item';
import { generateTagColor } from '../utils';

// *** images ***
import closeImg from '../images/close.svg';

const PopupBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
`
const PopupContent = styled.div`
    width: 450px;
    min-height: 330px;
    max-height: 90%;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    box-sizing: border-box;
    padding: 34px 36px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
`
const PopupClose = styled.img`
    width: 26px;
    position: absolute;
    top: -26px;
    right: -26px;
    cursor: pointer;
`
const PopupForm = styled.form`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const Input = styled.input`
    width: 100%;
    height: 47px;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    font-size: 14px;
    line-height: 17px;
    box-sizing: border-box;
    padding: 5px 6px 13px;
    margin-bottom: 30px;
`
const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, .2);
  margin-top: 33px;
  font-size: 36px;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  background-color: #000;
  border-radius: 10px;
  color: #fff;
  outline: none;
  cursor: pointer;
 
`
const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const AddTagButton = styled.button`
    border: 1px solid rgba(0, 0, 0, .2);
    height: 30px;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    background-color: #000;
    border-radius: 3px;
    color: #fff;
    outline: none;
    cursor: pointer;
`

interface PopupProps {
    isPopupOpen: boolean,
    closeButtonHandler: () => void
}
export interface MarkerProps {
    name: string,
    url: string,
    tag: string,
    tags: { 
        tagName: string, 
        color: string 
    }[],
    date: number
}
export const Popup: React.FC<PopupProps> = ({ isPopupOpen, closeButtonHandler }) => {
    const dispatch = useDispatch();

    // *** локальный стейт для обработки состояния компонента
    const [marker, setMarker] = useState<MarkerProps>({
        name: '',
        url: '',
        tag: '',
        tags: [],
        date: 0
    });

    const activeMarkerIndex = useSelector(selectActiveMarkerIndex);
    const fullMarkerList = useSelector(selectMarkerList);

    // *** если попап открыт с активным индексом (т.е. в режиме "редактировать") - 
    //     заполняем поля данными из редакса для выбранного индекса
    useEffect(() => {
        if (typeof activeMarkerIndex === 'number') {
            setMarker(fullMarkerList[activeMarkerIndex])
        } else {
            setMarker({
                name: '',
                url: '',
                tag: '',
                tags: [],
                date: 0
            })
        }
    }, [activeMarkerIndex, fullMarkerList])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMarker({
            ...marker,
            [e.target.name]: e.target.value
        })
    }

    // *** создаем новую закладку или редактируем текущую в зависимости от activeMarkerIndex
    const submitFormHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const markerWithDate = { ...marker, date: Date.now() };
      
        typeof activeMarkerIndex === 'number' ? dispatch(new EditMarker(activeMarkerIndex, markerWithDate))
                                              : dispatch(new SetMarkerData(markerWithDate));
        closeButtonHandler();
    }
    
    // *** добавляем тег в массив тегов по клику на кнопку
    const addTagHandler = (e: React.MouseEvent) => {
        e.preventDefault();

        // *** генерируем цвет тега или берем цвет тега из массива, если такой уже имеется
        const color = generateTagColor(fullMarkerList, marker);

        // *** проверяем что длина тега не 0 и что такого тега еще нет                                                                  
        if (marker.tag.length > 0 && !marker.tags.find(tag => tag.tagName === marker.tag)) {
            setMarker({
                ...marker,
                tags: [...marker.tags, { tagName: marker.tag, color }],
                tag: ''
            })
        }
    }

    // *** удаляем тег из массива тегов
    const deleteTagHandler = (id: number) => {
        setMarker({
            ...marker,
            tags: marker.tags.filter((tag, index) => index !== id)
        })
    }

    return (
        <>
        {isPopupOpen &&
            <PopupBackground>
                <PopupContent>
                    <PopupForm onSubmit={submitFormHandler}>
                        <Input
                            name="name"
                            value={marker.name}
                            type="text"
                            onChange={onChangeHandler}
                            placeholder="Название закладки"
                            minLength={2}
                            maxLength={20} 
                            required
                        />
                        <Input
                            name="url"
                            value={marker.url}
                            type="url"
                            onChange={onChangeHandler}
                            placeholder="URL"
                            minLength={5}
                            required
                        />
                        <div>
                            <Input
                                name="tag"
                                value={marker.tag}
                                type="text"
                                onChange={onChangeHandler}
                                placeholder="Теги"
                                minLength={2}
                                maxLength={20} 
                            />
                            <AddTagButton onClick={addTagHandler}>Add tag</AddTagButton>
                        </div>
                        <TagsContainer>
                            {marker.tags.map((tag, index) => {
                                return (
                                    <TagListItem 
                                        key={index}
                                        index={index}
                                        tag={tag}
                                        deleteTagHandler={deleteTagHandler}
                                    />
                                )
                            })}
                        </TagsContainer>
                        <SubmitButton>Go!</SubmitButton>
                    </PopupForm>
                    <PopupClose 
                        src={closeImg} 
                        onClick={closeButtonHandler}
                    />
                </PopupContent>
            </PopupBackground>
        }
        </>
    )
}