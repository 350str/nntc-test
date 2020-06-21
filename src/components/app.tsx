import * as React from 'react';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { Popup } from './popup';
import { MarkerListItem } from './marker-list-item';
import { selectMarkerList, selectIsPopupOpen } from '../redux/selector';
import { RemoveMarker, TogglePopup } from '../redux/actions';

// *** Styled Components ***
const GlobalStyle = createGlobalStyle`
    body, html {
        margin: 0;
        padding: 0;
        --main-color: #CCCCCC;
        font-family: 'Balsamiq Sans'
    }
`
const Page = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: var(--main-color);
    padding-top: 20px;
    box-sizing: border-box;
`
const Title = styled.h1`
    margin: 0 auto 50px;
    text-align: center;
`
const Header = styled.div`
    width: 80%;
    margin: 0 auto 50px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`
const SearchInputContainer = styled.div`
    @media screen and (max-width: 1000px) {
        margin-bottom: 20px;
    }
    @media screen and (max-width: 730px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`
const SearchInput = styled.input`
    width: 400px;
    font-size: 20px;
    height: 50px;
    margin-right: 20px;
    border-radius: 10px;
    outline: none;
    @media screen and (max-width: 730px) {
        margin: 0 0 20px;
        width: 80%;
    }
`
const SelectField = styled.select`
    height: 50px;
    padding: 5px;
    font-size: 20px;
    cursor: pointer;
    outline: none;
`
const AddButton = styled.button`
    background-color: black;
    border: 1px solid white;
    color: white;
    width: 150px;
    height: 50px;
    font-size: 30px;
    display: block;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
`
const Content = styled.div`
    width: 86%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
`

export const App:React.FC = () => {
    // *** во внутренем стейте компонента храним состояние ввода инпута и состояние selecta
    const [searchItem, setSearchItem] = useState('');
    const [selectValue, setSelectValue]= useState('name');

    const dispatch = useDispatch();
    const markerList = useSelector(selectMarkerList);
    const isPopupOpen = useSelector(selectIsPopupOpen);

    // *** функция поиска по клику на тег
    const findTagHandler = (tag: string) => {
        setSelectValue('tag');
        setSearchItem(tag);
    }

    // *** функция закрытия/открытия popup-a
    const closeButtonHandler = () => {
        dispatch(new TogglePopup());
    }
    
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.target.value);
    }

    const removeMarkerHandler = (index: number) => {
        dispatch(new RemoveMarker(index));
    }

    // *** функция фильтрует закладки в зависимости от введенной в инпут информации
    const visibleItems = () => {
        if (searchItem === '') return markerList;
        return selectValue === 'name' ? markerList.filter(marker => marker.name.toLowerCase().includes(searchItem.toLowerCase()))
                                      : markerList.filter(marker => marker.tags.find(tag => tag.tagName.toLowerCase().includes(searchItem.toLowerCase())));
    } 
    
    const selectFieldHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectValue(e.target.value);
    }

    return (
        <>
            <GlobalStyle />
            <Page>
                <Title>Add, change, delete your own markers!</Title>
                <Header>
                    <SearchInputContainer>
                        <SearchInput 
                            placeholder="Поиск..."
                            onChange={inputChangeHandler}    
                            value={searchItem}
                        />
                        <SelectField onChange={selectFieldHandler} value={selectValue}>
                            <option value="name">по названию</option>
                            <option value="tag">по тегам</option>
                        </SelectField>
                    </SearchInputContainer>
                    <AddButton onClick={closeButtonHandler}>+</AddButton>
                </Header>
                <Content>
                    {visibleItems() && visibleItems().length ? 
                        visibleItems().map((marker, index) => {
                        return (              
                            <MarkerListItem 
                                marker={marker} 
                                key={index}
                                removeMarker={removeMarkerHandler}
                                index={index}
                                findTagHandler={findTagHandler}
                            />
                        )
                    })
                    : <div>We have no active markers here ;(</div>
                }
                </Content>
                <Popup 
                    isPopupOpen={isPopupOpen} 
                    closeButtonHandler={closeButtonHandler}
                />
            </Page>
        </>
    )
}