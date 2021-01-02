// utility functions allows us to keep our files clean and organize fuctions that we may need in multiple files in one location.

// addItemToCart is a function that will take two arguments . The first is all the existing cart Items array right now and then the second item is going to be the cart ITem to add. we are gonna look inside of our cartItems to see if that cart item already exists and we are actually going to write that in this code . 
// cartItems.find will return you the first item found in our cartItems array , based off condition that we passed in this. 
// and the function is based of the conditon where we get each of the cartItem and we will check  the cartItems.id . if it matches to the cartItemToAdd.id we wanna add. if this matches it will set our existingCartItems to the true . if it does not find anything after looping through all of it  , it will be undefined.
// if existingCartItems exists, which mean it is true, then we want to return cartItems.map  , because cartItems.map will return us a new array .
// we are gonna pass the cartItems inside of our map . if cartItems.id is equal to our cartItemToAdd.id , then we will create a new object where we have the cartItem except the quantity will be the cartItems.quantity + 1. and if does not match  then we just want to return original cartItems, because there's no need to update any of the components that might be relying on our object. 
// if the cartItems is not found inside of our array then we want to return a new array with all of our existing items that are already there. but we also want to now add in an object which is equal to our cartItemsToAdd , except we are gonna give it a base quantity of 1. 
// quantity property  gets attached the first time around since this if block won't run when it's a new item!.


export const addItemToCart=(cartItems,cartItemToAdd)=>{
    const existingCartItem=cartItems.find(
        cartItem=> cartItem.id===cartItemToAdd.id);

        if (existingCartItem){
            return cartItems.map(cartItem => 
                cartItem.id === cartItemToAdd.id?
                {...cartItem, quantity:cartItem.quantity+1}
                : cartItem
                );
        }
      return  [...cartItems, {...cartItemToAdd, quantity:1}];
    
};


// remove the items from the cart and if the item that is being removed has quantity of 0 left, then it will remove that item from cart too. xD

export const removeItemFromItem=(cartItems,cartItemToRemove)=>{
    const existingCartItem= cartItems.find(
        cartItem=>
        cartItem.id ===cartItemToRemove.id
        );

        if (existingCartItem.quantity===1){
            return cartItems.filter(cartItem =>cartItem.id !==cartItemToRemove.id)
        }
        return cartItems.map(cartItem=>
        cartItem.id===cartItemToRemove.id?
        {...cartItem, quantity:cartItem.quantity-1}
                : cartItem

            );
};
