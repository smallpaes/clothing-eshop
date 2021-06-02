import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  constructor () {
    super();
    this.state = {
      loading: true
    };
  };

  unsubscribeFromSnapshot = null;

  componentDidMount () {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    // get fetch back data associated to this collection
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  };

  render () {
    const { match } = this.props
    const { loading } = this.state
    return (
      <div className='shop-page'>
        <Route 
          exact 
          path={`${match.path}`} 
          render={routeProps => (
            <CollectionsOverviewWithSpinner
              {...routeProps}
              isLoading={loading}
            />
          )} />
        <Route
          path={`${match.path}/:collectionId`} 
          render={routeProps => (
            <CollectionPageWithSpinner
              {...routeProps}
              isLoading={loading}
            />
          )}
        />
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionMap => {
    dispatch(updateCollections(collectionMap))
  }
});

export default connect(
  null, 
  mapDispatchToProps
)(ShopPage);