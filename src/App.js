
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import {Route } from 'react-router-dom';

const Hatspage = ()=>(
  <div>Hats page hahahahah . you got it</div>
)
function App() {
  return (
    <div >
      <Route exact path='/' component={Homepage}/>
      <Route exact path='/shop/hats' component={Hatspage}/>
    </div>
  );
}

export default App;
