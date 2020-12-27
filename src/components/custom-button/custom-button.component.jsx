import React from 'react'
import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignin, ...otherProps})=>
(
    <div>
    <button className={`${isGoogleSignin ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
    
    </div>
)

export default CustomButton;