import React from "react";
import "../../assets/css/ProfileDetails.css";
import { Outlet, NavLink} from 'react-router-dom';

const ProfileDetails = () => {
  return (
    <div className="ps-2 mt-5 mb-3">
      <div className="block-header"><h2>My Account</h2></div>
      <div className="pt-2">
        <div className="tab">
          <NavLink to="" end className="tablink"><i className="fa-solid fa-user"></i> <span>Basic Details</span></NavLink>
          <NavLink to="professional" end className="tablink"><i className="fa-solid fa-briefcase"></i> <span>Professional Details</span></NavLink>
          <NavLink to="password" end className="tablink"><i className="fa-solid fa-lock"></i> <span>Change Password</span></NavLink>
          <NavLink to="closeaccount" end className="tablink"><i className="fa-solid fa-lock"></i> <span>Close My Account</span></NavLink>
        </div>
        <div className="tab-content pt-5">
           <Outlet />
        </div>       
      </div>
    </div>
  );
};

export default ProfileDetails;
