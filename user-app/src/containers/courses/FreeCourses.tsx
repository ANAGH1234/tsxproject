import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { Paging } from '../../models/dashboard/dashboard';
import type { SubscriptionDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';


interface ExtendedSubscriptionDTO extends SubscriptionDTO {
  courseId: number;
  subscriptionId: number;
  courseName: string;
  mobileBanner: string;
  firstSubscribedTabName: string;
}

interface SubscribedTrainingData extends Paging<ExtendedSubscriptionDTO> {
  data: ExtendedSubscriptionDTO[];
}

const FreeCourses: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscribedTrainingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: User | null = authUser.Get();

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    document.title = 'My Free Courses';
    TrainingService.getFreeCourses(
      user.userId,
      user.membershipId,
      EnumCourseType.FreeCourse,
      user.membershipExpiry.toISOString()
    )
      .then((res) => {
        // Type assertion to treat the response as Paging<ExtendedSubscriptionDTO>
        const typedResponse = res as Paging<ExtendedSubscriptionDTO>;
        setSubscribedTraining(typedResponse);
        setIsLoading(false);
        // Optional: Log the response to verify the structure
        console.log('API Response:', typedResponse);
      })
      .catch((err) => {
        console.error('Error fetching free courses:', err);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className="mt-4">
      <h2>My Free Courses</h2>
      <div className="tab-wrapper">
        <section className="tab-content">
          {subscribedTrainingData?.data && subscribedTrainingData.data.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.data.map((item, index) => {
                let sessionURL = '';
                if (item.firstSubscribedTabName === '2') {
                  sessionURL = `training/details/${item.courseId}/${item.subscriptionId}/0/selfplaced`;
                } else if (item.firstSubscribedTabName === '8') {
                  sessionURL = `training/details/${item.courseId}/${item.subscriptionId}/0/labs`;
                } else if (item.firstSubscribedTabName === '11') {
                  sessionURL = `training/details/${item.courseId}/${item.subscriptionId}/0/tests`;
                } else if (item.firstSubscribedTabName === '10') {
                  sessionURL = `training/details/${item.courseId}/${item.subscriptionId}/0/qna`;
                } else if (item.firstSubscribedTabName === '7') {
                  sessionURL = `training/details/${item.courseId}/${item.subscriptionId}/0/project`;
                } else {
                  sessionURL = `training/details/${item.courseId}/${item.subscriptionId}/0`;
                }

                return (
                  <div className="col-sm-6 mb-3" key={index}>
                    <div className="card">
                      <div className="row m-1">
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <img
                              src={item.mobileBanner}
                              alt={item.courseName}
                              className="img-fluid"
                              style={{ maxHeight: '70px' }}
                            />
                          </div>
                          <div className="p-2 w-100">
                            <h5 className="pt-1">{item.courseName}</h5>
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
          {user?.membershipId === 0 && (
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
};

export default FreeCourses;