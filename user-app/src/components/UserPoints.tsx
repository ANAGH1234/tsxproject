
import LoadingSpinner from './LoadingSpinner';
import authUser from '../helpers/authUser';
import { useEffect, useState, type JSX } from 'react';
import DashboardService from '../services/DashBoardService';
import type { UserPointsDTO } from '../models/dashboard/dashboard';


export default function UserPoints(): JSX.Element {
  const [pointsData, setPointsData] = useState<UserPointsDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  useEffect(() => {
    if (user?.userId) {
      setIsLoading(true);
      DashboardService.GetUserPoints(user.userId)
        .then((res) => {
          setPointsData(res);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setPointsData(null);
        });
    } else {
      setIsLoading(false);
      setPointsData(null);
    }
  }, [user?.userId]);

  return (
    <div className="pt-2">
      <div style={{ paddingBottom: '10px' }}>
        <span>
          <strong>Earned Learning Points</strong>
        </span>
        <span style={{ float: 'right' }}>
          <a href="/user/app/points">View All</a>
        </span>
      </div>
      {pointsData ? (
        <span className="box-shadow pt-4" style={{ minHeight: '150px' }}>
          <div>
            <div className="border-bottom">
              <div className="d-flex flex-row ps-2 p-1">
                <span className="w-100">
                  <i className="fa-solid fa-microphone"></i>{' '}
                  <span style={{ fontSize: '14px', paddingLeft: '5px' }}>
                    Live Sessions Points
                  </span>
                </span>
                <span className="float-end col-sm-1 pe-1">
                  <span style={{ fontSize: '14px' }}>
                    {pointsData.liveSessionPoints}
                  </span>
                </span>
              </div>
            </div>
            <div className="border-bottom">
              <div className="d-flex flex-row ps-2 p-1">
                <span className="w-100">
                  <i className="fa-regular fa-circle-play"></i>{' '}
                  <span style={{ fontSize: '14px', paddingLeft: '5px' }}>
                    Video Course Points
                  </span>
                </span>
                <span className="float-end col-sm-1 pe-1">
                  <span style={{ fontSize: '14px' }}>{pointsData.videoPoints}</span>
                </span>
              </div>
            </div>
            <div className="border-bottom">
              <div className="d-flex flex-row ps-2 p-1">
                <span className="w-100">
                  <i className="fa-solid fa-flask"></i>{' '}
                  <span style={{ fontSize: '14px', paddingLeft: '5px' }}>
                    Labs Points
                  </span>
                </span>
                <span className="float-end col-sm-1 pe-1">
                  <span style={{ fontSize: '14px' }}>{pointsData.labPoints}</span>
                </span>
              </div>
            </div>
          </div>
        </span>
      ) : (
        <div>
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : (
            'No Point Earned Yet!'
          )}
        </div>
      )}
    </div>
  );
}