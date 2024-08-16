import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import user from "../../images/user.png";
import "./Header.scss";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncSeries } from '../../features/movies/movieSlice';
import Loader from '../Loader/Loader';


const Header = ({ theme, setTheme }) => {

  const [term, setTerm] = useState('')
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.movies.isLoading)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncSeries(term))
    setTerm('')
  }

  return (
    <div className={`header ${theme}`}>
      {isLoading && <Loader />}
      <div className="logo">
        <Link to="/"> Cinema Vault</Link>
      </div>
      <div className='search-bar'>
        <form onSubmit={submitHandler}>
          <input type='text'
            value={term}
            placeholder='Search Movies or Series'
            onChange={(e) => setTerm(e.target.value)} />
          <button type='submit'><i className='fa fa-search'></i></button>
        </form>
      </div>
      <div className='images'>
        <div className='theme-icon' onClick={toggleTheme}>
          {theme === 'light' ? (
            <FontAwesomeIcon icon={faSun} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faMoon} size="2x" />
          )}
        </div>
        <div className="user-image">
          <img src={user} alt="user" />
        </div>
      </div>
    </div>
  );
}

export default Header