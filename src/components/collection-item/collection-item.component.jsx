import React from 'react';

import { 
  CollectionItemContainer,
  AddButton,
  BackgroundImage,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer
} from './collection-item.styles';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item
  return (
    <CollectionItemContainer>
      <BackgroundImage
        imageUrl={imageUrl}
        className='image'
      />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton
        inverted
        onClick={() => addItem(item)}
      >Add to card</AddButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;