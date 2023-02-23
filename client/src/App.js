import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import recipeTest1 from './assets/recipe-test-1.jpg'
import recipeTest2 from './assets/recipe-test-2.jpg'

function App() {

  const recipesImg = [recipeTest1, recipeTest2]

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route path='/home' element={ <Home recipes={recipesImg} /> } />
      </Routes>
    </div>
  );
}

export default App;