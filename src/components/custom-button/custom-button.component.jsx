import React from 'react'

import {CustomButtonContainer} from './custom-button.styles';

const CustomButton=({children,...props})=>(
    <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);




// import './custom-button.styles.scss';
// const CustomButton = ({children, isGoogleSignin, inverted, ...otherProps})=>
// (
//     <button className={`${inverted? 'inverted' : ''} ${isGoogleSignin ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
//         {children}
//     </button>
    
    
// );

export default CustomButton;