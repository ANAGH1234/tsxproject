import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { SubscriptionDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';



const MyCourses: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscriptionDTO | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: User | null = authUser.Get();

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    document.title = 'My Courses';
    TrainingService.getSubscribedCourses(
      user.userId,
      user.membershipId,
      EnumCourseType.SelfPlaced,
      user.membershipExpiry
    )
      .then((res) => {
        setSubscribedTraining(res.Data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching subscribed courses:', err);
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
              {subscribedTrainingData.map((item : SubscriptionDTO, index : number) => {
                let sessionURL = '';
                if (item.FirstSubscribedTabName === '1') {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0`;
                } else if (item.FirstSubscribedTabName === '2') {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/selfplaced`;
                } else if (item.FirstSubscribedTabName === '8') {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/labs`;
                } else if (item.FirstSubscribedTabName === '11') {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/tests`;
                } else if (item.FirstSubscribedTabName === '10') {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/qna`;
                } else if (item.FirstSubscribedTabName === '7') {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/project`;
                } else {
                  sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0`;
                }
                return (
                  <div className="col-sm-6 mb-3" key={index}>
                    <div className="card">
                      <div className="row m-1">
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <img
                              src={item.MobileBanner}
                              alt={item.Course}
                              className="img-fluid"
                              style={{ maxHeight: '70px' }}
                            />
                          </div>
                          <div className="p-2 w-100">
                            <h5 className="pt-1">{item.Course}</h5>
                            {/* Uncomment if needed
                            <div style={{ fontSize: '12px', paddingTop: '10px' }}>
                              {item.videoCount > 0 && (
                                <span>
                                  <i style={{ paddingLeft: '7px' }} className="fa-regular fa-circle-play"></i>
                                  <span style={{ paddingLeft: '5px' }}>
                                    <strong>{item.videoCount} Videos</strong>
                                  </span>
                                </span>
                              )}
                              {item.labCount > 0 && (
                                <span>
                                  <i style={{ paddingLeft: '7px' }} className="fa-solid fa-flask"></i>
                                  <span style={{ paddingLeft: '5px' }}>
                                    <strong>{item.labCount} Labs</strong>
                                  </span>
                                </span>
                              )}
                              {item.testPapersCount > 0 && (
                                <span>
                                  <i style={{ paddingLeft: '7px' }} className="fa-solid fa-list-check"></i>
                                  <span style={{ paddingLeft: '5px' }}>
                                    <strong>{item.testPapersCount} Skill Tests</strong>
                                  </span>
                                </span>
                              )}
                              {item.projectCount > 0 && (
                                <span>
                                  <i style={{ paddingLeft: '7px' }} className="fa-solid fa-cubes"></i>
                                  <span style={{ paddingLeft: '5px' }}>
                                    <strong>{item.projectCount} Live Project(s)</strong>
                                  </span>
                                </span>
                              )}
                              {item.qaCount > 0 && (
                                <span>
                                  <i style={{ paddingLeft: '7px' }} className="fa-regular fa-circle-question"></i>
                                  <span style={{ paddingLeft: '5px' }}>
                                    <strong>{item.qaCount} Interview Q&A</strong>
                                  </span>
                                </span>
                              )}
                            </div>
                            */}
                            <div className="pt-2 float-end">
                              <a className="btn btn-primary btn-sm" href={sessionURL} target="_self">
                                Access Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                ' No Course Found!'
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyCourses;