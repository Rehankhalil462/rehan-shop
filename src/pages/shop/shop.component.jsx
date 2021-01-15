import React,{useEffect} from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import {
//   firestore,
//   convertCollectionsSnapshotToMap
// } from '../../firebase/firebase.utils.js';

// import { updateCollections } from '../../redux/shop/shop.actions';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
// import {createStructuredSelector} from 'reselect';
// import {selectIsCollectionLoaded} from '../../redux/shop/shop.selectors';

// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage =({fetchCollectionsStart,match})=>{
 
useEffect(()=>{
  fetchCollectionsStart();
},[fetchCollectionsStart]);

    // const { updateCollections } = this.props;
    // const collectionRef = firestore.collection('collections');


    // Following is getting data using fetch API Call where we dont need subscription after getting data from firestore.
// fetch('https://firestore.googleapis.com/v1/projects/rehan-db/databases/(default)/documents/collections')
// .then(response=>response.json())
// .then(collections=>console.log('new after getting from fetch',collections));



 // Following is getting data in promise pattern using .then pattern.
    // collectionRef.get().then(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  

  return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
          // render={props => (
          //   <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
          // )}
        />
        <Route
          path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
          // render={props => (
          //   <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
          // )}
        />
      </div>
    );
  }


// const mapStateToProps=createStructuredSelector({
// isCollectionFetching:selectIsCollectionFetching,
//   isCollectionLoaded:selectIsCollectionLoaded
// });


const mapDispatchToProps=dispatch=>({
  fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
});

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap =>
//     dispatch(updateCollections(collectionsMap))
// });

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);

// const ShopPage = ({ match }) => {
//   // console.log("what is this",match);
//   return (
//   <div className='shop-page'>
//     <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
//   </div>
// )};

