import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import type { User } from '../../models/user/User';
import DashboardService from '../../services/DashBoardService';
import type { DashboardCoursesCountDTO } from '../../models/dashboard/dashboard';



const CourseCount: React.FC = () => {
  const [courseCountData, setCourseCountData] = useState<DashboardCoursesCountDTO | null>(null);
  const user = authUser.Get() as User;

  useEffect(() => {
    DashboardService.CoursesCount(user.userId, user.membershipId, user.membershipExpiry)
      .then((res) => {
        setCourseCountData(res);
      })
      .catch((err) => {
        console.error('CoursesCount Error:', err);
        setCourseCountData(null);
      });
  }, [user.userId, user.membershipId, user.membershipExpiry]);

  return (
    <div>
      <div className="row pt-3 mb-3">
        <div className="col-sm-3 pb-3 col">
          <NavLink to="/user/app/subscribed-training" className="text-default">
            <div className="container pt-3 text-center box-gray">
              <div>
                <img src="https://www.scholarhat.com/images/icons/live.svg" className="icon32" alt="Live Training" />
              </div>
              <div>
                <span>My Live Training</span>
              </div>
              <h4>
                <span>{courseCountData?.LiveTrainingCount ?? 0}</span>
              </h4>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-3 pb-3 col">
          <NavLink to="/user/app/schedules" className="text-default">
            <div className="container pt-3 text-center box-blue">
              <div>
                <img src="/images/icons/calendar.svg" className="icon32" alt="Live Schedules" />
              </div>
              <div>
                <span>My Live Schedules</span>
              </div>
              <h4>
                <span>{courseCountData?.LiveSessionsCount ?? 0}</span>
              </h4>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-3 pb-3 col">
          <NavLink to="/user/app/schedules/batches" className="text-default">
            <div className="container pt-3 text-center box-green">
              <div>
                <img src="/images/icons/batch.svg" className="icon32" alt="Live Batches" />
              </div>
              <div>
                <span>Live Batches</span>
              </div>
              <h4>
                <span>{courseCountData?.BatchSchedulesCount ?? 0}</span>
              </h4>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-3 pb-3 col">
          <NavLink to="/user/app/certificates" className="text-default">
            <div className="container pt-3 text-center box-gray">
              <div>
                <img src="/images/icons/certificate.svg" className="icon32" alt="Certificates" />
              </div>
              <div>
                <span>My Certificates</span>
              </div>
              <h4>
                <span>{courseCountData?.CertificatesCount ?? 0}</span>
              </h4>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-3 pb-3 col">
          <a href="/user/app/subscribed-courses" className="text-default">
            <div className="container pt-3 text-center box-blue">
              <div>
                <img src="/images/icons/video.svg" className="icon32" alt="Courses" />
              </div>
              <div>
                <span>My Courses</span>
              </div>
              <h4>
                <span>{courseCountData?.CoursesCount ?? 0}</span>
              </h4>
            </div>
          </a>
        </div>
        <div className="col-sm-3 pb-3 col">
          <NavLink to="/user/app/subscribed-training/masterclasses" className="text-default">
            <div className="container pt-3 text-center box-yellow">
              <div>
                <img src="/images/icons/masterclass.svg" className="icon32" alt="Master Classes" />
              </div>
              <div>
                <span>My Master Classes</span>
              </div>
              <h4>
                <span>{courseCountData?.MasterClassesCount ?? 0}</span>
              </h4>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-3 pb-3 col">
          <NavLink to="/user/app/points" className="text-default">
            <div className="container pt-3 text-center box-green">
              <div>
                <img src="/images/icons/point.svg" className="icon32" alt="Learning Points" />
              </div>
              <div>
                <span>Learning Points</span>
              </div>
              <h4>
                <span>{courseCountData?.PointsCount ?? 0}</span>
              </h4>
            </div>
          </NavLink>
        </div>
        <div className="col-sm-3 pb-3 col">
          <a href="/tutorial" className="text-default">
            <div className="container pt-3 text-center box-yellow">
              <div>
                <img src="/images/icons/article.svg" className="icon32" alt="Articles Library" />
              </div>
              <div>
                <span>Articles Library</span>
              </div>
              <h4>
                <span>{courseCountData?.ArticleCount ?? 0}</span>
              </h4>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseCount;