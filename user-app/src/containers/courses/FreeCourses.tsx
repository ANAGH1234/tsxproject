import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { SubscriptionDTO } from '../../models/training/training';



export default function FreeCourses() {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscriptionDTO[] | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  useEffect(() => {
    setIsLoading(true);
    document.title = 'My Free Courses';
    if(!user) return
    TrainingService.getFreeCourses(user.userId, user.membershipId, EnumCourseType.FreeCourse, user.membershipExpiry).then(res => {
      setSubscribedTraining(res.Data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mt-4">
      <h2>My Free Courses</h2>
      <div className="tab-wrapper">
        <section className="tab-content">
          {subscribedTrainingData && subscribedTrainingData.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map((item: SubscriptionDTO, index: number) => {
                let sessionURL = '';
                if (item.FirstSubscribedTabName === '2') {
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
                            <div className="pt-2 float-end">
                              <a
                                className="btn btn-primary btn-sm"
                                href={`/user/app/${sessionURL}`}
                                target="_self"
                              >
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
                'No Free Course Found!'
              )}
            </div>
          )}
          {/* Added Browse More button */}
          {user && user.membershipId === 0 && (
            <div className="text-center mt-4">
              <a href="/library">
                <button
                  className="btn"
                  style={{
                    backgroundColor: '#007bff',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontWeight: '500',
                  }}
                >
                  Browse Free Courses
                </button>
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}