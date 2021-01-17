import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';


const StripeCheckoutButton =({price})=>{
    const priceForStripe=price*100;
    const publishableKey= 'pk_test_51IAcAhC3riPfo6xqY97RkopM32C2vkFjMhoPUJgO0ZYOaJf9tGOHIEiZ0GFzvJBmX6iV3wQJX3KkmkF4F5u0jL4S000jW0P3JF';
const onToken=token=>{
    axios({
        url:'payment',
        method:'post',
        data:{
            amount:priceForStripe,
            token
        }
    }).then(response=>{
        alert('Payment Successful!')
    }).catch(error=>{
        console.log('Payment Error: ' , JSON.parse(error));
        alert('There was an issue with your payment. Please make sure you use the provided credit card');
        
    })
    
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
