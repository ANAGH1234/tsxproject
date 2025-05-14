import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import DashboardService from '../../services/DashBoardService';
import type { DashboardVideoProgressDTO } from '../../models/dashboard/dashboard';
import type { User } from '../../models/user/User';



// Define the component
const VideoProgress: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoProgressData, setVideoProgressData] = useState<DashboardVideoProgressDTO[]>([]);
  const user = authUser.Get() as User;

  useEffect(() => {
    setIsLoading(true);
    DashboardService.VideoProgress(user.userId)
      .then((res) => {
        setVideoProgressData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('VideoProgress Error:', err);
        setVideoProgressData([]);
        setIsLoading(false);
      });
  }, [user.userId]);

  return (
    <div className="pt-2">
      <div style={{ paddingBottom: '10px' }}>
        <span>
          <strong>Video Course Learning Progress</strong>
        </span>
        <span style={{ float: 'right' }}>
          <a href="/user/app/subscribed-training">View All</a>
        </span>
      </div>
      {videoProgressData.length > 0 ? (
        <span className="box-shadow pt-4" style={{ minHeight: '150px' }}>
          {videoProgressData.map((course, cIndex) => {
            const sessionURL = `training/details/${course.CourseId}/${course.SubscriptionId}/0/selfplaced`;
            return (
              <div key={cIndex} className="border-bottom">
                <div className="row ps-2 p-1">
                  <div className="col-sm-8">
                    <NavLink to={sessionURL}>
                      <i className="fa-regular fa-circle-play"></i>{' '}
                      <span style={{ fontSize: '14px' }}>{course.CourseName}</span>
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
      ) : (
        <div>
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : (
            'No Video Course Learning Progress!'
          )}
        </div>
      )}
    </div>
  );
};

export default VideoProgress;