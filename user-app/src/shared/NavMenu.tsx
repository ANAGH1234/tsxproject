import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';
import authUser from '../helpers/authUser';
import type { User } from '../models/user/User';
import type { MemberNotificationsDTO, ShoppingCartDTO } from '../models/dashboard/dashboard';
import DashboardService from '../services/DashBoardService';



// Define SVG symbols component
const SVGSymbols: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
    <symbol id="sun-fill" viewBox="0 0 16 16">
      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </symbol>
    <symbol id="moon-half" viewBox="0 -960 960 960" fill="currentColor">
      <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
    </symbol>
  </svg>
);

// Define the component
const NavMenu: React.FC = () => {
  const user = authUser.Get() as User;
  const [show, setShow] = useState<boolean>(false);
  const [showCart, setCartShow] = useState<boolean>(false);
  const [updates, setUpdates] = useState<MemberNotificationsDTO | null>(null);
  const [cart, setCart] = useState<ShoppingCartDTO[] | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    const handleStorageChange = () => {
      const updatedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
      setTheme(updatedTheme);
      document.body.setAttribute('data-theme', updatedTheme);
      document.documentElement.setAttribute('data-theme', updatedTheme);
      document.documentElement.setAttribute('data-bs-theme', updatedTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);

  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 750) {
      const openleftMenu = document.getElementById('openleftMenu');
      const closeleftMenu = document.getElementById('closeleftMenu');
      const leftSidebar = document.getElementById('leftSidebar');
      if (openleftMenu && closeleftMenu && leftSidebar) {
        openleftMenu.style.display = 'inline-block';
        closeleftMenu.style.display = 'none';
        leftSidebar.style.display = 'none';
        leftSidebar.style.position = 'relative';
      }
    }
    DashboardService.GetNotification(user.userId)
      .then((res) => setUpdates(res))
      .catch((err) => {
        console.error('GetNotification Error:', err);
        setUpdates(null);
      });
    DashboardService.GetCart(user.userId)
      .then((res) => setCart(res))
      .catch((err) => {
        console.error('GetCart Error:', err);
        setCart(null);
      });
  }, [user.userId]);

  const openleftMenu = () => {
    const width = window.innerWidth;
    const openleftMenu = document.getElementById('openleftMenu');
    const closeleftMenu = document.getElementById('closeleftMenu');
    const leftSidebar = document.getElementById('leftSidebar');
    if (openleftMenu && closeleftMenu && leftSidebar) {
      openleftMenu.style.display = 'none';
      closeleftMenu.style.display = 'inline-block';
      leftSidebar.style.display = 'inline-block';
      leftSidebar.style.width = width > 500 ? '350px' : '100%';
    }
  };

  const closeleftMenu = () => {
    const openleftMenu = document.getElementById('openleftMenu');
    const closeleftMenu = document.getElementById('closeleftMenu');
    const leftSidebar = document.getElementById('leftSidebar');
    if (openleftMenu && closeleftMenu && leftSidebar) {
      openleftMenu.style.display = 'inline-block';
      closeleftMenu.style.display = 'none';
      leftSidebar.style.display = 'none';
    }
  };

  return (
    <>
      <SVGSymbols />
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <div>
            <img
              src="/images/logo.webp"
              className="logo logo_dark"
              style={{ marginTop: '-5px', height: '36px' }}
              alt="Logo Dark"
            />
            <img
              src="/images/logo-white.png"
              className="logo logo_light"
              style={{ marginTop: '-5px', height: '36px' }}
              alt="Logo Light"
            />
            <span className="h4"> Updates</span>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ marginTop: '-16px' }}>
            {updates?.NpcomingWebinars  &&
            
            updates?.NpcomingWebinars?.length > 0 && (
              <div>
                <div className="news-header">
                  <img
                    src="/images/icons/masterclass.svg"
                    className="icon20"
                    alt="Masterclass Icon"
                  />{' '}
                  Upcoming Master Classes
                </div>
                {updates.NpcomingWebinars.map((item, index) => (
                  <div className="news-section" key={index}>
                    <div className="news-item">
                      <span>{item.Date}</span>
                    </div>
                    <div className="news-item-link">
                      <a target="_blank" href={item.URL} rel="noopener noreferrer">
                        {item.Name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {updates?.NewCourseRelease  &&
            updates?.NewCourseRelease?.length > 0 && (
              <div>
                <div className="news-header">
                  <img
                    src="/images/icons/video.svg"
                    className="icon20"
                    alt="Video Icon"
                  />{' '}
                  New Released Courses
                </div>
                {updates.NewCourseRelease.map((item, index) => (
                  <div className="news-section" key={index}>
                    <div className="news-item">
                      <span>{item.Date}</span>
                    </div>
                    <div className="news-item-link">
                      <a target="_blank" href={item.URL} rel="noopener noreferrer">
                        {item.Name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {updates?.NewEbookRelease &&
            updates?.NewEbookRelease?.length > 0 && (
              <div>
                <div className="news-header">
                  <img
                    src="/images/icons/masterclass.svg"
                    className="icon20"
                    alt="Book Icon"
                  />{' '}
                  New Released Books
                </div>
                {updates.NewEbookRelease.map((item, index) => (
                  <div className="news-section" key={index}>
                    <div className="news-item">
                      <span>{item.Date}</span>
                    </div>
                    <div className="news-item-link">
                      <a target="_blank" href={item.URL} rel="noopener noreferrer">
                        {item.Name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* {updates?.newLabRelease?.length > 0 && (
              <div>
                <div className="news-header">
                  <img
                    src="/images/icons/lab.svg"
                    className="icon20"
                    alt="Lab Icon"
                  />{' '}
                  New Released Hands-on Labs
                </div>
                {updates?.newLabRelease.map((item, index) => (
                  <div className="news-section" key={index}>
                    <div className="news-item">
                      <span>{item.date}</span>
                    </div>
                    <div className="news-item-link">
                      <a target="_blank" href={item.url} rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )} */}
            {!updates && <div className="p-2">There is no update!</div>}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={showCart} onHide={handleCartClose} placement="end">
        <Offcanvas.Header closeButton>
          <div>
            <img
              src="/images/logo.webp"
              className="logo_dark"
              style={{ marginTop: '-8px', height: '36px' }}
              alt="Logo Dark"
            />
            <img
              src="/images/logo-white.png"
              className="logo_light"
              style={{ marginTop: '-8px', height: '36px' }}
              alt="Logo Light"
            />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ marginTop: '-16px' }}>
            {cart && cart.length > 0 ? (
              <div>
                <div className="news-header" style={{ height: '44px' }}>
                  <img
                    src="/images/icons/masterclass.svg"
                    className="icon20"
                    alt="Masterclass Icon"
                  />{' '}
                  Cart Items ({cart.length}){' '}
                  <a href="/cart" className="btn btn-primary btn-sm float-end">
                    Check Out
                  </a>
                </div>
                {cart.map((item, index) => (
                  <div className="news-section" key={index}>
                    <div className="news-item">
                      <small style={{ fontWeight: 'normal' }}>
                        {item.Name} ({item.CourseTypeName})
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                <div>Cart is Empty!</div>
                <div className="mt-3">
                  <a href="/library" className="btn btn-primary btn-sm">
                    Browse Courses
                  </a>
                </div>
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <nav
        style={{ padding: '0.3rem', height: '50px' }}
        className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white box-shadow fixed-top"
      >
        <div style={{width:"100%"}}>
          <a
            id="openleftMenu"
            onClick={openleftMenu}
            className="navbar-toggler fs-2"
            role="button"
            aria-label="Open Sidebar"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </a>
          <a
            id="closeleftMenu"
            onClick={closeleftMenu}
            className="navbar-toggler fs-2"
            style={{ display: 'none' }}
            role="button"
            aria-label="Close Sidebar"
          >
            <i className="fa-solid fa-xmark"></i>
          </a>
          <a className="navbar-brand ps-1 me-0" href="/">
            <img
              src="/images/logo.webp"
              className="logo-bs logo_dark"
              alt="Logo Dark"
            />
            <img
              src="/images/logo-white.png"
              className="logo-bs logo_light"
              alt="Logo Light"
            />
          </a>
          <div className="float-end">
            <ul style={{ marginRight: '65px' }} className="top-menu">
              <li>
                <a
                  onClick={handleCartShow}
                  className="cursor-pointer"
                  style={{ marginRight: '-6px' }}
                  role="button"
                  aria-label="View Cart"
                >
                  {cart && cart.length > 0 && (
                    <div className="notification-counter">{cart.length}</div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="26"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  onClick={handleShow}
                  className="cursor-pointer"
                  role="button"
                  aria-label="View Notifications"
                >
                  {updates?.NotificationCount  &&
                  updates?.NotificationCount > 0 && (
                    <div className="notification-counter">
                      {updates?.NotificationCount}
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="26"
                    viewBox="0 -960 960 960"
                    width="26"
                    fill="currentColor"
                  >
                    <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
                  </svg>
                </a>
              </li>
              <li>
                <div className="dropdown me-0">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                    style={{
                      color: '#0d6efd',
                      padding: '.5rem 0 0 0',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    role="button"
                    aria-label="User Menu"
                  >
                    {user.profileImage ? (
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          display: 'inline-block',
                          marginRight: '5px',
                          border: '1px solid #0d6efd',
                        }}
                      >
                        <img
                          style={{ width: '100%', height: '100%' }}
                          src={user.profileImage}
                          alt="Profile"
                        />
                      </span>
                    ) : (
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="user-svg"
                          height="26"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                        >
                          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                        </svg>
                      </div>
                    )}
                    <span className="d-none d-sm-inline-block">
                      {user.firstName}
                    </span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                    <a className="dropdown-item" href="/user/app">
                      <i className="fas fa-columns"></i> Dashboard
                    </a>
                    <a className="dropdown-item" href="/user/app/profile">
                      <i className="fas fa-cog"></i> Profile
                    </a>
                    <NavLink
                      className="dropdown-item"
                      to="/user/app/subscriptions"
                    >
                      <i className="far fa-address-card"></i> Subscription Details
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/user/app/payment-details"
                    >
                      <i className="fas fa-file-invoice-dollar"></i> Payment
                      Details
                    </NavLink>
                    <a
                      className="dropdown-item"
                      href="/user/app/profile/password"
                    >
                      <i className="fas fa-key"></i> Change Password
                    </a>
                    <div
                      className="dropdown-item"
                      onClick={toggleTheme}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                      <svg
                        className="bi theme-icon-active"
                        style={{ width: '22px', height: '22px' }}
                      >
                        {theme === 'light' ? (
                          <use href="#moon-half" />
                        ) : (
                          <use href="#sun-fill" />
                        )}
                      </svg>
                      <span style={{ marginLeft: '8px' }}>
                        {theme === 'light' ? 'Dark' : 'Light'} Theme
                      </span>
                    </div>
                    <hr className="dropdown-divider" />
                    <a className="dropdown-item" href="/logout">
                      <i className="fas fa-sign-out-alt"></i> LogOut
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="themechange"
                  style={{
                    cursor: 'pointer',
                    padding: '0.5rem 0 0 0',
                    marginLeft: '10px',
                  }}
                  onClick={toggleTheme}
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <svg
                    className="bi theme-icon-active"
                    style={{
                      width: '22px',
                      height: '22px',
                      marginRight: '10px',
                    }}
                  >
                    {theme === 'light' ? (
                      <use href="#moon-half" />
                    ) : (
                      <use href="#sun-fill" />
                    )}
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;