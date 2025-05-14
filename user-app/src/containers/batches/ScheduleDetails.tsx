
import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { PLATFORM_VIDEOS, SESSION_JOIN_GUIDE } from '../../helpers/constant';

type PlatformVideos = Record<string, string>;

const ScheduleDetails: React.FC = () => {
  const [platformVideos] = useState<PlatformVideos>(PLATFORM_VIDEOS);

  return (
    <div className="pt-2">
      <div className="pt-2">
        <div className="card">
          <h4 className="ps-3 pt-3 pb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
            </svg>{' '}
            Important Information
          </h4>
          <div className="row m-0">
            <div className="col-sm-8 col-12">
              <ul>
                <li>
                  You can easily join live sessions by clicking on the <b>Join Session</b> button.
                  For help, refer to{' '}
                  <a href={SESSION_JOIN_GUIDE} target="_blank" style={{ marginLeft: '2px' }}>
                    <i className="fas fa-file-pdf" style={{ color: 'red' }}></i> Session Joining
                    Guide
                  </a>
                  .
                </li>
                <li>
                  Join Audio by computer for switching on your audio for{' '}
                  <b>listening and speaking</b>.
                </li>
                <li>
                  Allow <b>Camera option</b> for switching on your video.
                </li>
                <li>
                  An Internet connection with minimum <b>2.0 Mbps</b> speed and{' '}
                  <b>supported browsers</b> are{' '}
                  <a href="https://www.google.com/intl/en_in/chrome/" target="_blank">
                    Google Chrome
                  </a>
                  ,{' '}
                  <a href="https://www.microsoft.com/en-us/edge" target="_blank">
                    Microsoft Edge
                  </a>
                  .
                </li>
                <li>
                  Each live training subscription is valid only for <b>12 months</b> from the day of
                  subscription.
                </li>
              </ul>
              <p className="ps-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm80-146q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-101-95q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Zm30-65Z" />
                </svg>{' '}
                Can't find convenient schedule? Let us know through email at{' '}
                <a href="mailto:support@scholarhat.com">support@scholarhat.com</a> or call us at{' '}
                <b>+91-9999 123 502</b>.
              </p>
            </div>
            <div className="col-sm-4 col-12" id="video-container" style={{ textAlign: 'center' }}>
              <iframe
                style={{ minHeight: '95%' }}
                src={`//youtube.com/embed/${platformVideos['JoinLiveSession']}`}
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href="//youtube.com/embed/${platformVideos['JoinLiveSession']}?autoplay=1"><img src="//img.youtube.com/vi/${platformVideos['JoinLiveSession']}/hqdefault.jpg"><span><svg viewBox='0 0 200 200' height='40px' width='40px' y='0' x='0'><circle r='96' cy='100' cx='100' stroke-width='8' stroke='#FFFFFF' fill='#347eff'></circle><circle r='130' cy='100' cx='100' fill='url(#ripple)' clip-path='url(#clipper)'></circle><polygon points='70.993,60.347 153.398,102.384 70.993,144.42' fill='#FFFFFF'></polygon></svg></span></a>`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-3">
        <div className="tab">
          <NavLink to="" end className="tablink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="20px"
              viewBox="0 -960 960 960"
            >
              <path d="M480-406.247q-48.522 0-81.674-34.463-33.152-34.463-33.152-83.696v-245.978q0-47.434 33.493-80.797t81.341-33.363q47.847 0 81.412 33.363 33.565 33.363 33.565 80.797v245.978q0 49.233-33.232 83.696-33.231 34.463-81.753 34.463Zm0-238.934Zm-36.282 537.377v-132.464q-108.921-12.478-181.501-93.55-72.579-81.072-72.579-190.588h72.804q0 90.007 63.611 152.116 63.611 62.109 153.862 62.109 90.252 0 153.948-62.143 63.695-62.143 63.695-152.082h72.804q0 109.573-72.579 190.616-72.58 81.044-181.501 93.506v132.48h-72.564ZM480.017-482q16.996 0 28.026-12.375 11.029-12.375 11.029-30.031v-245.957q0-16.208-11.301-27.318Q496.47-808.79 480-808.79t-27.771 11.109q-11.301 11.11-11.301 27.318v245.957q0 17.656 11.046 30.031Q463.021-482 480.017-482Z" />
            </svg>
            <span>My Schedules</span>
          </NavLink>
          <NavLink to="all" end className="tablink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M711-480Zm209 80H737q-3-21-9.5-41T711-480h126q-4-7-9-12t-12-9q-26-15-59.5-22t-76.5-7h-3q-20-23-43.5-40T582-599q23-5 47.5-8t50.5-3q53 0 99 11t86 32q26 14 40.5 41.5T920-463v63ZM680-640q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35389Zm0-80q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0-40ZM249-480ZM40-400v-63q0-35 14.5-62.5T95-567q40-21 86-32t99-11q26 0 50.5 3t47.5 8q-28 12-51.5 29T283-530h-3q-43 0-76.5 7T144-501q-7 4-12 9t-9 12h126q-10 19-16.5 39t-9.5 41H40Zm240-240q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T320-760q0-17-11.5-28.5T280-800q-17 0-28.5 11.5T240-760q0 17 11.5 28.5T280-720Zm0-40Zm200 480q-33 0-56.5-23.5T400-360v-120q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480v120q0 33-23.5 56.5T480-280ZM450-80v-82q-72-11-121-67t-49-131h60q0 58 41 99t99 41q58 0 99-41t41-99h60q0 75-49 131t-121 67v82h-60Z" />
            </svg>
            <span>All Schedules</span>
          </NavLink>
        </div>
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ScheduleDetails;
