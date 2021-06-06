import React from 'react';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';

import { CollectionOverviewContainer } from './collection-overview.styles';

const CollectionOverview = ({ collections }) => (
  <CollectionOverviewContainer>
    {
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </CollectionOverviewContainer>
);

export default CollectionOverview;