import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import type {  DashboardVideoProgressDTO } from '../../models/dashboard/dashboard';
import DashboardService from '../../services/DashBoardService';



const LiveCourses: React.FC = () => {
  const [liveCourseData, setLiveCourseData] = useState<DashboardVideoProgressDTO[]>([]);
  const user = authUser.Get();
  const navigate = useNavigate();

   if (!user) {
    useEffect(() => {
      navigate("/login"); 
    }, [navigate]);
    return null;
  }

  

  useEffect(() => {
    
    document.title = 'Live Courses';
    DashboardService.LiveCourses(user.userId).then((res) => {
      setLiveCourseData(res);
    });
  }, []);

  return (
    <div className="mt-4">
      {liveCourseData != null && liveCourseData.length > 0 && (
        <span className="box-shadow pt-4">
          {liveCourseData.map((course, cIndex) => {
            const sessionURL = `/user/app/training/details/${course.CourseId}/${course.SubscriptionId}/0`;
            return (
              <div key={cIndex} className="border-bottom">
                <div
                  className="row p-3"
                  style={{
                    paddingTop: '15px !important',
                    paddingBottom: '15px !important',
                    borderBottom: '1px solid rgb(228, 236, 242)',
                  }}
                >
                  <div className="col-sm-8">
                    <NavLink to={sessionURL}>
                      <i className="fa-regular fa-circle-play"></i>{' '}
                      <span style={{ fontSize: '15px' }}>{course.CourseName}</span>
                    </NavLink>
                  </div>
                  <div className="col-sm-4">
                    <div
                      className="progress col-sm-10"
                      style={{ height: '10px', display: 'inline-block', width: '115px' }}
                    >
                      <div
                        className="progress-bar"
                        style={{ width: `${course.VideoProgress}%`, height: '10px' }}
                      ></div>
                    </div>
                    <span style={{ fontSize: '12px' }}> {course.VideoProgress}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </span>
      )}
    </div>
  );
};

export default LiveCourses;