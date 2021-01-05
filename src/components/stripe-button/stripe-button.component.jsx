import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton =({price})=>{
    const priceForStripe=price*100;
    const publishableKey= 'pk_test_51I6HSOExrFTF6yoLb4nb64AwNi2iivJ6Uv9g9xEoHfxQCl8XsNDLKVg7E8szLog7owMu2qwaQMZmttqIbLoG0hbm00ay7Ptubf';
const onToken=token=>{
    console.log(token);
    alert('Payment Successful!');
}
    
    return(
        <StripeCheckout
        label='Pay Now'
        name='RK Mart Ltd'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your Total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        // token is the on Success Callback that triggers when we submit. so submission is gonna get handled by this component.
        token={onToken}
        stripeKey={publishableKey}
        
        />
    )    ;
};
export default StripeCheckoutButton;
