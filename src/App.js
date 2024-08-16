import React, { useState } from 'react';
import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import MovieDetail from './components/MovieDetail/MovieDetail';
import Footer from './components/Footer/Footer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './components/Home/Home';

function App() {

  const [theme, setTheme] = useState('dark')
  return (

    <>
      <div className={`app ${theme}-theme`}>
        <Router>
          <Header theme={theme} setTheme={setTheme} />
          <div className='container'>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/movie/:imdbID' element={<MovieDetail theme={theme} />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
