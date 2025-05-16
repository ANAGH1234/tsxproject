import React, { useEffect, useState } from 'react';
import DashboardService from '../../services/DashBoardService';
import type { UserPointsDTO } from '../../models/dashboard/dashboard';
import authUser from '../../helpers/authUser';
import LoadingSpinner from '../../components/LoadingSpinner';




const UserPoints: React.FC = () => {
  const [pointsData, setPointsData] = useState<UserPointsDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  useEffect(() => {
    setIsLoading(true);
    document.title = 'Learning Points';
    if(!user) return
    DashboardService.GetUserPointsDetails(user.userId).then(res => {
      setPointsData(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="pt-5">
      <div className="block-header mb-3">
        <h2>My Learning Points</h2>
      </div>
      {pointsData?.length ? (
        <div style={{ minHeight: '150px' }}>
          <table className="table table-bordered bordered table-striped">
            <thead>
              <tr>
                <th style={{ border: '1px solid #dee2e6' }}>Course</th>
                <th style={{ border: '1px solid #dee2e6' }}>Live Sessions Points</th>
                <th style={{ border: '1px solid #dee2e6' }}>Video Course Points</th>
                <th style={{ border: '1px solid #dee2e6' }}>Labs Points</th>
              </tr>
            </thead>
            <tbody>
              {pointsData.map((course: UserPointsDTO, cIndex: number) => (
                <tr key={cIndex}>
                  <td style={{ border: '1px solid #dee2e6' }}>{course.CourseName}</td>
                  <td style={{ border: '1px solid #dee2e6' }}>
                    {course.LiveSessionPoints ?? 0}
                  </td>
                  <td style={{ border: '1px solid #dee2e6' }}>
                    {course.VideoPoints ?? 0}
                  </td>
                  <td style={{ border: '1px solid #dee2e6' }}>
                    {course.LabPoints ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : (
            'No Data Found!'
          )}
        </div>
      )}
    </div>
  );
};

export default UserPoints;