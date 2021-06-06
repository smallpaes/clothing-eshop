import ShopActionTypes from './shop.types';


const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
  console.log(state)
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true
      };
    case ShopActionTypes.UPDATE_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: action.payload
      };
    case ShopActionTypes.UPDATE_COLLECTIONS_FAILURE: 
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default: 
      return state;
  };
};

export default shopReducer;