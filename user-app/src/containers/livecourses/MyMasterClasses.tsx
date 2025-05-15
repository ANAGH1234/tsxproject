import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { SubscriptionDTO } from '../../models/training/training';


const MyMasterClasses: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscriptionDTO | any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  useEffect(() => {
    setIsLoading(true);
    document.title = 'My Master Classes';
    if(!user) return 
    TrainingService.getSubscribedMasterClasses(
      user.userId,
      user.membershipId,
      user.membershipExpiry
    ).then((res) => {
      setSubscribedTraining(res.Data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mt-4">
      <div className="tab-wrapper">
        <section className="tab-content">
          {subscribedTrainingData != null && subscribedTrainingData != null && subscribedTrainingData.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map((item : any, index : number) => {
                const sessionURL = `/user/app/training/details/${item.CourseId}/${item.SubscriptionId}/0`;

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
                            <div className="pt-2 float-end">
                              <a
                                className="btn btn-primary btn-sm"
                                href={sessionURL}
                                target="_self"
                              >
                                Access Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', paddingTop: '10px' }}>
                        {item.LiveSessionCount > 0 && (
                          <span>
                            <i
                              style={{ paddingLeft: '7px' }}
                              className="fa-solid fa-microphone"
                            ></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.LiveSessionCount} Live Classes</strong>
                            </span>
                          </span>
                        )}
                        {item.VideoCount > 0 && (
                          <span>
                            <i
                              style={{ paddingLeft: '7px' }}
                              className="fa-regular fa-circle-play"
                            ></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.VideoCount} Videos</strong>
                            </span>
                          </span>
                        )}
                        {item.LabCount > 0 && (
                          <span>
                            <i
                              style={{ paddingLeft: '7px' }}
                              className="fa-solid fa-flask"
                            ></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.LabCount} Labs</strong>
                            </span>
                          </span>
                        )}
                        {item.TestPapersCount > 0 && (
                          <span>
                            <i
                              style={{ paddingLeft: '7px' }}
                              className="fa-solid fa-list-check"
                            ></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.TestPapersCount} Skill Tests</strong>
                            </span>
                          </span>
                        )}
                        {item.ProjectCount > 0 && (
                          <span>
                            <i
                              style={{ paddingLeft: '7px' }}
                              className="fa-solid fa-cubes"
                            ></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.ProjectCount} Live Project(s)</strong>
                            </span>
                          </span>
                        )}
                        {item.QACount > 0 && (
                          <span>
                            <i
                              style={{ paddingLeft: '7px' }}
                              className="fa-regular fa-circle-question"
                            ></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.QACount} Interview Q&A</strong>
                            </span>
                          </span>
                        )}
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
                ' No Masterclass Found!'
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyMasterClasses;