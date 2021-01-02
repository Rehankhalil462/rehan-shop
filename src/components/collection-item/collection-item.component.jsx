import React from 'react'
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';

const CollectionItem =({item,addItem}) => {
    const {name,price,imageUrl}=item;
    return (
    <div className='collection-item'>
        <div className='image' style={{backgroundImage:`url(${imageUrl})`}}/>
        <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
        </div>
        <CustomButton onClick={()=>addItem(item)} inverted>Add to Cart</CustomButton>
    </div>
)}
// whenever we call addItem function, this function will receive the item as a property , pass it in to the addItem action creator which gives us back that object where the type is equal to the addItem and payload is equal to the item that is passed in ,and then we will dispatch that new object into our store and it will go through our redux flow.  
const mapDispatchToProps=dispatch =>({
    addItem:item => dispatch(addItem(item))
});
export default connect(null,mapDispatchToProps)(CollectionItem);