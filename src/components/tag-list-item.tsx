import React from 'react';
import styled from 'styled-components';

// *** images ***
import closeImg from '../images/del-tag.svg';

// *** Styled Components ***
const TagContainer = styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 50px;
    margin: 10px 10px 0 0;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px rgba(0,0,0,0.75);
    background-color: #fff;
    &:hover {
        cursor: pointer;
    }
`
const TagName = styled.p`
    margin: 0 10px 0 0;
`
const TagColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: ${props => props.color};
`
const TagCloseIcon = styled.img`
    width: 10px;
    height: 10px;
    align-self: flex-start;
`

interface TagListItemProps {
    index: number,
    tag: {
        tagName: string,
        color: string
    },
    deleteTagHandler?: (index: number) => void,
    findTagHandler?: (name: string) => void
}

export const TagListItem: React.FC<TagListItemProps> = ({
  index,
  tag,
  deleteTagHandler,
  findTagHandler,
}) => {
  const { tagName, color } = tag;

  return (
    <TagContainer
      key={index}
      onClick={findTagHandler?.bind(null, tagName)}
    >
      <TagName>{tagName}</TagName>
      <TagColor color={color}></TagColor>
      {deleteTagHandler && (
        <TagCloseIcon
          src={closeImg}
          onClick={deleteTagHandler.bind(null, index)}
        />
      )}
    </TagContainer>
  );
}; 