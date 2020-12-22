import React from 'react'
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import { Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';

// const Hatspage = ()=>(
  // <div>Hats page hahahahah . you got it</div>)

function App() {
  return (
    <div >
      <Header/>
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/shop' component={ShopPage}/>
    </div>
  );
}

export default App;
