import {createSelector} from 'reselect';
// it is called input selector. 
const selectCart = state => state.cart;

// following are output selector that use  input selector and createSelector both.
// it is now a memoized selector. it is like cache which checks if the same function is called, it dont call all the other things inside that function, and then just return that cache. this is called Memoization.
export const selectCartItems = createSelector(
    [selectCart],
    cart =>cart.cartItems
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce((accumulatedQuantity,cartItem) => accumulatedQuantity+cartItem.quantity,0) 
);