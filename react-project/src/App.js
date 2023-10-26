import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetail from './pages/MovieDetail';
import SearchResult from './pages/SearchResult';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/movies/:id' element={<MovieDetail/>}></Route>
        <Route path='/search' element={<SearchResult/>}></Route>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
