import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

const addItem = item =>({
  type:CartActionTypes.ADD_ITEM,
  payload: item
});
export default addItem;