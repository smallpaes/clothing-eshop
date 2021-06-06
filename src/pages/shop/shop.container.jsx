import { connect } from 'react-redux';

import { fetchCollectionsAsync } from '../../redux/shop/shop.actions';

import ShopPage from './shop.component';


const mapDispatchToProps = dispatch => ({
  fetchCollectionsAsync: () => dispatch(fetchCollectionsAsync())
});

const ShopPageContainer = connect(
  null,
  mapDispatchToProps
)(ShopPage);

export default ShopPageContainer;