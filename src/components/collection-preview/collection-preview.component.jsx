import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItemContainer from '../collection-item/collection-item.container';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, history, match }) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${title}`)}>
      {title.toUpperCase()}
    </TitleContainer>
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

export default withRouter(CollectionPreview);