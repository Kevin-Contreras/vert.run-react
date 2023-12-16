import '../css/nav.css';
import { Link, NavLink, Outlet } from 'react-router-dom';
import shoes from '../img/shoes.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function Nav() {
  // Get the refresh token from Redux state
  let token = useSelector((state) => {
    return state.token.refresh_token;
  });

  // State to manage the local state of tokens
  let [tokens, setTokens] = useState(localStorage.getItem('token'));

  // Function to toggle the navigation menu
  function nav() {
    const navToggler = document.querySelector('.js-nav__toggler');
    const nav = document.querySelector('.js__nav');

    navToggler.classList.toggle('active');
    nav.classList.toggle('open');
  }

  // Function to close the navigation menu
  function para() {
    nav();
  }

  // Function to log out and clear tokens
  function para2() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setTokens('');

    nav();
  }

  return (
    <div>
      {/* Conditional rendering based on whether there are tokens */}
      {tokens === '' || token == null ? (
        ''
      ) : (
        <header style={{ display: 'flex', background: 'black', alignItems: 'center', padding: '1.2rem 0' }}>
          <div class='container header__container'>
            <div class='header-logo'>
              {/* Use NavLink for navigation to maintain active state */}
              <NavLink to={'/activities'}>
                <img src={shoes} alt='' />
              </NavLink>
            </div>
            <button type='button' onClick={nav} class='nav__toggler js-nav__toggler'>
              <span data-text='close'>Menu</span>
            </button>
            <nav class='nav js__nav'>
              <ul>
                {/* Use NavLink for navigation to maintain active state */}
                <li>
                  <NavLink onClick={nav} to={'/activities'} style={{ '--i': 0 }}>
                    Activities
                  </NavLink>{' '}
                </li>
                <li>
                  <NavLink onClick={para} to={'/activitiesformonth'} style={{ '--i': 1 }}>
                    Monthly Stats
                  </NavLink>{' '}
                </li>
                <li>
                  <NavLink onClick={para2} to={'/'} style={{ '--i': 1 }}>
                    Logout
                  </NavLink>{' '}
                </li>
              </ul>
            </nav>
          </div>
        </header>
      )}
    </div>
  );
}

export default Nav;
