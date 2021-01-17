import React from 'react';
import '../directory/directory.styles.scss';
import Menuitem from '../menu-item/menu-item.component';
import {connect} from 'react-redux';
import {selectDirectorySections} from '../../redux/directory/directory.selector';
import { createStructuredSelector } from 'reselect';
  

const Directory = ({sections})=>(
            <div className='directory-menu'>{
                sections.map(({ id, ...otherSectionsProps})=> (
                    <Menuitem key={id} {...otherSectionsProps} />
                )
                  // using Destructring above . a feature of ES6
                )
            }
          </div>
        );

const mapStateToProps = createStructuredSelector({
  sections:selectDirectorySections
});

export default connect(mapStateToProps)(Directory);