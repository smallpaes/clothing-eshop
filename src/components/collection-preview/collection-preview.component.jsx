import React from 'react';
import CollectionItemContainer from '../collection-item/collection-item.container';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <TitleContainer>{title.toUpperCase()}</TitleContainer>
    <PreviewContainer>
      {
        items
          .slice(0, 4)
          .map(item => (
            <CollectionItemContainer key={item.id} item={item} />))
      }
    </PreviewContainer>
  </CollectionPreviewContainer>
)

export default CollectionPreview