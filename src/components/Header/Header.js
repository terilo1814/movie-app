import React from 'react'
import { Link } from 'react-router-dom';
import user from "../../images/user.png";
import "./Header.scss";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Header = ({ theme, setTheme }) => {

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`header ${theme}`}>
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>

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