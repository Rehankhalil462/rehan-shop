import React from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import  StripeCheckoutButton   from '../../components/stripe-button/stripe-button.component';

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                Product
            </div>
            <div className='header-block'>
                Description
            </div>
            <div className='header-block'>
                Quantity
            </div>
            <div className='header-block'>
                Price
            </div>
            <div className='header-block'>
                Remove
            </div>
        </div>
        {
            cartItems.map(cartItem=>
                <CheckoutItem cartItem={cartItem} key={cartItem.id}/>)
        }
        <div className='total'>TOTAL: ${total}</div>
        <div className='test-warning'>
            *Please use the following test Credit Card for Payments*
            <br/>
            4242 4242 4242 4242 - Exp:01/23 - CVV:123  
        </div>
        <StripeCheckoutButton price={total}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);