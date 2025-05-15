import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { SubscriptionDTO } from '../../models/training/training';


const MyQuickNotes: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscriptionDTO[] | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get() ;

  useEffect(() => {
    setIsLoading(true);
    document.title = 'My Quick Notes';
    if(!user) return
    TrainingService.getSingleSubscribedCourses(
      user.userId,
      user.membershipId,
      EnumCourseType.QuickNote,
      user.membershipExpiry
    )
      .then((res) => {
        setSubscribedTraining(res.Data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('GetSingleSubscribedCourses Error:', err);
        setSubscribedTraining({ data: [], totalRows: 0 });
        setIsLoading(false);
      });
  }, []);

  console.log(subscribedTrainingData)

  return (
    <div className="mt-4">
      <div className="tab-wrapper">
      <section className="tab-content">
          {subscribedTrainingData && subscribedTrainingData.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map((item: SubscriptionDTO, index: number) => {
                const sessionURL = `/user/app/training/details/${item.CourseId}/${item.SubscriptionId}/0/quicknotes`;
                return (item.CourseList &&
                  item.CourseList.length > 0 ? (
                    <div className="col-sm-6 mb-3" key={index}>
                      <div className="card">
                        <div className="row m-1">
                          <div className="d-flex flex-row">
                            <div className="p-2">
                              <img
                                src={item.CourseList[0]?.MobileBanner}
                                alt={item.CourseList[0]?.Name}
                                className="img-fluid"
                                style={{ maxHeight: '70px' }}
                              />
                            </div>
                            <div className="p-2 w-100">
                              <h5 className="pt-1">{item.CourseList[0]?.Name} : Notes</h5>
                              <div className="pt-2 float-end">
                                <a className="btn btn-primary btn-sm" href={sessionURL} target="_self">
                                  Access Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '12px', paddingTop: '10px' }}>
                          {item.CourseList[0]?.QuickNoteCount > 0 && (
                            <span>
                              <i style={{ paddingLeft: '7px' }} className="fa-regular fa-note-sticky" aria-hidden="true"></i>
                              <span style={{ paddingLeft: '5px' }}>
                                <strong>{item.CourseList[0]?.QuickNoteCount} Notes</strong>
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={index}>No course list found</div>
                  )
                );
              })}
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div className="pt-4">
                  <LoadingSpinner />
                </div>
              ) : (
                'No Notes Found!'
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyQuickNotes;