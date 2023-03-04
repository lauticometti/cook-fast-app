import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import { Landing, Home, Detail, MakeYourOwn } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/home' element={ <Home /> } />
        <Route path='/detail/:id' element={ <Detail /> } />
        <Route path='/make-your-own' element={ <MakeYourOwn /> } />
      </Routes>
    </div>
  );
}

export default App;