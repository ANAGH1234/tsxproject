
import LoadingSpinner from './LoadingSpinner';
import authUser from '../helpers/authUser';
import { useEffect, useState, type JSX } from 'react';
import DashboardService from '../services/DashBoardService';
import type { LabDTO } from '../models/dashboard/dashboard';

export default function PopularLabs(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [labsData, setLabsData] = useState<LabDTO[]>([]);
  const user = authUser.Get();

  useEffect(() => {
    if (user?.userId) {
      setIsLoading(true);
      DashboardService.PopularLabs(user.userId)
        .then((res) => {
          setLabsData(res);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setLabsData([]);
        });
    } else {
      setIsLoading(false);
      setLabsData([]);
    }
  }, [user?.userId]);

  return (
    <div className="pt-4">
      <div style={{ paddingBottom: '10px' }}>
        <span>
          <strong>BookMarked Labs</strong>
        </span>
        <span style={{ float: 'right' }}>
          <a href="/user/app/subscribed-training/bmlabs">View All</a>
        </span>
      </div>
      <div className="box-shadow pt-4" style={{ minHeight: '200px' }}>
        {labsData.length > 0 ? (
          <div>
            {labsData.map((lab: LabDTO, cIndex: number) => (
              <div key={cIndex} className="border-bottom">
                <div className="row">
                  <div className="d-flex flex-row">
                    <span className="p-2 w-100" style={{ fontSize: '14px' }}>
                      <a
                        href={`/user/app/training/details/${lab.courseId}/${lab.subscriptionId}/lab/details/${lab.labId}`}
                      >
                        <i className="fa-solid fa-flask"></i> {lab.name}
                      </a>
                    </span>
                    <span className="float-end col-sm-3">
                      <span style={{ fontSize: '13px' }}>
                        <i
                          className="far fa-clock"
                          aria-hidden="true"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Play Video"
                        ></i>{' '}
                        {lab.duration + ' Mins'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {isLoading ? (
              <div className="pt-4">
                <LoadingSpinner />
              </div>
            ) : (
              'No Lab Found!'
            )}
          </div>
        )}
      </div>
    </div>
  );
}