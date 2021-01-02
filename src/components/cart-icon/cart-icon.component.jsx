import React from 'react'
import './cart-icon.styles.scss';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {ReactComponent as ShoppingIcon} from '../../assests/shopping-bag.svg';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';

const CartIcon = ({toggleCartHidden,itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)
// this reduce function is also called selector. which just tell us the total quantity of the items added in the cart from the whole object. 
// const mapStateToProps =  ({cart:{cartItems}})=>({
//     itemCount: cartItems.reduce((accumulatedQuantity,cartItem) => accumulatedQuantity+cartItem.quantity,0) 
// });


// const mapStateToProps= state=>({
//     itemCount: selectCartItemsCount(state)
// });

const mapStateToProps=createStructuredSelector({
    itemCount:selectCartItemsCount
})

const mapDispatchToProps =dispatch =>({
    toggleCartHidden:()=>dispatch(toggleCartHidden())
});
export default connect(mapStateToProps,mapDispatchToProps)(CartIcon); 