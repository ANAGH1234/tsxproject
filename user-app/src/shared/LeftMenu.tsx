import React from 'react';
import { NavLink } from 'react-router-dom';

// Define the component
const LeftMenu: React.FC = () => {
  return (
    <aside id="sidebar" className="sidebarHidShow min-vh-100">
      <div
        className="sidebar-inner mt-2 col-6 col-md-3 col-xl-2"
        style={{ boxShadow: '4px 0 4px rgba(0,0,0,.1)' }}
      >
        <ul className="main-menu mt-5">
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app"
            >
              <img
                src="/images/icons/dashboard.svg"
                className="icon20"
                alt="Dashboard Icon"
              />{' '}
              Dashboard
            </NavLink>
          </li>
        </ul>
        <div className="main-menu-header">LIVE TRAINING</div>
        <ul className="main-menu">
          <li>
            <NavLink
              end
              to="/user/app/subscribed-training"
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
            >
              <img
                src="/images/icons/live.svg"
                className="icon20"
                alt="Live Training Icon"
              />{' '}
              My Live Training
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/user/app/subscribed-training/corporatetraining"
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
            >
              <img
                src="/images/icons/live.svg"
                className="icon20"
                alt="Corporate Training Icon"
              />{' '}
              Corporate Training
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/schedules"
            >
              <img
                src="/images/icons/calendar.svg"
                className="icon20"
                alt="Schedules Icon"
              />{' '}
              My Live Schedules
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/schedules/batches"
            >
              <img
                src="/images/icons/batch.svg"
                className="icon20"
                alt="Batches Icon"
              />{' '}
              Live Batches
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-training/masterclasses"
            >
              <img
                src="/images/icons/masterclass.svg"
                className="icon20"
                alt="Master Classes Icon"
              />{' '}
              My Master Classes
            </NavLink>
          </li>
        </ul>
        <div className="main-menu-header">FREE RESOURCES</div>
        <ul className="main-menu">
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/resources/free"
            >
              <img
                src="/images/icons/freecourse.svg"
                className="icon20"
                alt="Free Courses Icon"
              />{' '}
              Free Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/resources/skill-challenges"
            >
              <i className="fa-solid fa-trophy icon20"></i> Skill Challenges
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              to="/user/app/resources/books"
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
            >
              <i className="fa-solid fa-book icon20"></i> Interview Books
            </NavLink>
          </li>
        </ul>
        <div className="main-menu-header">SELF PACED COURSES</div>
        <ul className="main-menu">
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-courses"
            >
              <img
                src="/images/icons/video.svg"
                className="icon20"
                alt="Courses Icon"
              />{' '}
              My Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-courses/quicknotes"
            >
              <img
                src="/images/icons/note.svg"
                className="icon18"
                alt="Quick Notes Icon"
              />{' '}
              My Quick Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-courses/labs"
            >
              <img
                src="/images/icons/lab.svg"
                className="icon18"
                alt="Hands-On Labs Icon"
              />{' '}
              My Hands-On Labs
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-courses/tests"
            >
              <img
                src="/images/icons/test.svg"
                className="icon20"
                alt="Skill Tests Icon"
              />{' '}
              My Skill Tests
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-courses/qna"
            >
              <img
                src="/images/icons/question.svg"
                className="icon20"
                alt="Interview Q&A Icon"
              />{' '}
              My Interview Q&A
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/subscribed-courses/projects"
            >
              <img
                src="/images/icons/project.svg"
                className="icon20"
                alt="Projects Icon"
              />{' '}
              My Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/bookmarked"
            >
              <i className="fa-solid fa-bookmark icon20"></i> My Bookmarks
            </NavLink>
          </li>
        </ul>
        <div className="main-menu-header">RESOURCES</div>
        <ul className="main-menu">
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/certificates"
            >
              <img
                src="/images/icons/certificate.svg"
                className="icon20"
                alt="Certificates Icon"
              />{' '}
              My Certificates
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/points"
            >
              <img
                src="/images/icons/point.svg"
                className="icon20"
                alt="Learning Points Icon"
              />{' '}
              Learning Points
            </NavLink>
          </li>
          <li>
            <a href="/master-classes">
              <i style={{ fontSize: '18px' }} className="fa-regular fa-calendar-check icon20"></i>{' '}
              Master Classes
            </a>
          </li>
          <li>
            <a href="/tutorial">
              <img
                src="/images/icons/article.svg"
                className="icon20"
                alt="Articles Icon"
              />{' '}
              Articles Library
            </a>
          </li>
        </ul>
        <div className="main-menu-header">ACCOUNT</div>
        <ul className="main-menu">
          <li>
            <NavLink
              className={({ isActive }:{isActive:boolean}) => (isActive ? 'active-menu' : '')}
              to="/user/app/payment-details"
            >
              <img
                src="/images/icons/invoice.svg"
                className="icon20"
                alt="Payment Details Icon"
              />{' '}
              Payment Details
            </NavLink>
          </li>
          <li>
            <a href="/logout">
              <img
                src="/images/icons/logout.svg"
                className="icon16"
                alt="Logout Icon"
              />{' '}
              Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftMenu;