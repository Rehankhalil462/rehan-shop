import React from 'react';
import {ErrorImageContainer, ErrorImageText, ErrorImageOverlay} from './404Page.styles';

const ErrorPage=()=> {
    return (
        <div>
             <ErrorImageOverlay>
           <ErrorImageContainer imageUrl='https://i.imgur.com/Q2BAOd2.png'/>
                 <ErrorImageText>Sorry! The Requested Page is Not on the Map.</ErrorImageText>
           </ErrorImageOverlay>  

        </div>
    )
}

export default ErrorPage;
