import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const FreeResources: React.FC = () => {
  return (
    <div className="pt-5">
      <div className="block-header">
        <h2>Free Learning Resources</h2>
      </div>
      <div className="pt-2">
        <div className="tab">
          <NavLink to="free" end className="tablink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="20px"
              viewBox="0 -960 960 960"
              className="icon"
            >
              <path d="M170-228q-38-44-61-98T80-440h82q6 44 22 83.5t42 72.5l-56 56ZM80-520q8-60 30-114t60-98l56 56q-26 33-42 72.5T162-520H80ZM438-82q-60-6-113.5-29T226-170l56-58q35 26 73.5 43t82.5 23v80ZM284-732l-58-58q45-36 98.5-59T440-878v80q-45 6-84 23t-72 43Zm96 432v-360l280 180-280 180ZM520-82v-80q121-17 200.5-107T800-480q0-121-79.5-211T520-798v-80q154 17 257 130t103 268q0 155-103 268T520-82Z" />
            </svg>{' '}
            <span>Free Courses</span>
          </NavLink>
          <NavLink to="skill-challenges" end className="tablink">
            <i className="fa-solid fa-trophy"></i> <span>Skill Challenge</span>
          </NavLink>
          <NavLink to="books" end className="tablink">
            <i className="fa-solid fa-book"></i> <span>Interview Books</span>
          </NavLink>
        </div>
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default FreeResources;