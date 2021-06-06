import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import { selectCollection } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../collection/collection.component';

const mapStateProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state),
  collection: (state, ownProps) => selectCollection(ownProps.match.params.collectionId)(state)
});

const CollectionPageContainer = compose(
  connect(mapStateProps),
  WithSpinner
)(CollectionPage);

export default CollectionPageContainer;