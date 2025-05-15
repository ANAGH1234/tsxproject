import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import TrainingService from '../../services/TrainingService';
import type { SubscriptionDTO } from '../../models/training/training';
import { useNavigate } from 'react-router-dom';



const MyLiveTraining: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscriptionDTO | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  const navigate = useNavigate();

  if (!user) {
   useEffect(() => {
     navigate("/login"); 
   }, [navigate]);
   return null;
 }

  useEffect(() => {
    setIsLoading(true);
    document.title = 'My Live Training';
    TrainingService.getSubscribedTrainings(
      user.userId,
      user.membershipId,
      user.membershipExpiry
    ).then((res) => {
      console.log(res)
      const liveTrainingCourses =
        res.Data.filter(
          (item) =>
            item.CourseType === EnumCourseType.Instructorled ||
            item.CourseType === EnumCourseType.JobOriented
        ) || [];
      setSubscribedTraining({ ...res.Data, Data: liveTrainingCourses });
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mt-4">
      <div className="tab-wrapper">
        <section className="tab-content">
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : subscribedTrainingData?.Data?.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.Data.map((item : any, index: number) => {
                let sessionURL = '';
                if (item.CourseType === EnumCourseType.JobOriented) {
                  sessionURL = `/user/app/courseplan/details/${item.CourseId}/${item.SubscriptionId}/0`;
                } else {
                  if (item.FirstSubscribedTabName === EnumCourseType.Instructorled) {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0`;
                  } else if (item.FirstSubscribedTabName === EnumCourseType.SelfPlaced) {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/selfplaced`;
                  } else if (item.FirstSubscribedTabName === EnumCourseType.HandsOnLab) {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/labs`;
                  } else if (item.FirstSubscribedTabName === EnumCourseType.TestPaper) {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/tests`;
                  } else if (item.FirstSubscribedTabName === EnumCourseType.QnA) {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/qna`;
                  } else if (item.FirstSubscribedTabName === EnumCourseType.Project) {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0/project`;
                  } else {
                    sessionURL = `training/details/${item.CourseId}/${item.SubscriptionId}/0`;
                  }
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
                                href={sessionURL}
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
            <div>No Live Training Courses Found!</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyLiveTraining;