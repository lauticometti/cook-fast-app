import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import { Landing, Home }from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/home' element={ <Home /> } />
      </Routes>
    </div>
  );
}

export default App;