import React, { useEffect, useState } from "react";
import TrainingService from "../../services/TrainingService";
import LoadingSpinner from "../../components/LoadingSpinner";
import authUser from "../../helpers/authUser";
import { EnumCourseType } from "../../helpers/enum";
import type { User } from "../../models/user/User";
import type { SubscriptionDTO } from "../../models/training/training";
import type { Paging } from "../../models/dashboard/dashboard";

// Define the component
const MyQna: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<
    SubscriptionDTO[] | any
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get() as User;

  useEffect(() => {
    setIsLoading(true);
    document.title = "My Interview Q&A";
    TrainingService.getSingleSubscribedCourses(
      user.userId,
      user.membershipId,
      EnumCourseType.QnA,
      user.membershipExpiry
    )
      .then((res) => {
        setSubscribedTraining(res.Data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("GetSingleSubscribedCourses Error:", err);
        setSubscribedTraining({ data: [], totalRows: 0 });
        setIsLoading(false);
      });
  }, []);

  console.log(subscribedTrainingData);
  

  return (
    <div className="mt-4">
      <div className="tab-wrapper">
        <section className="tab-content">
          {subscribedTrainingData != null &&
          subscribedTrainingData.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map(
                (item: SubscriptionDTO, index: number) => {
                  const sessionURL = `/user/app/training/details/${item.CourseId}/${item.SubscriptionId}/0/qna`;
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
                                style={{ maxHeight: "70px" }}
                              />
                            </div>
                            <div className="p-2 w-100">
                              <h5 className="pt-1">
                                {item.Course} :
                                Interview Q&A
                              </h5>
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
                        {/* <div style={{ fontSize: '12px', paddingTop: '10px' }}>
                        {item.Course?.qaCount > 0 && (
                          <span>
                            <i style={{ paddingLeft: '7px' }} className="fa-regular fa-circle-question"></i>
                            <span style={{ paddingLeft: '5px' }}>
                              <strong>{item.Course?.qaCount} Interview Q&A</strong>
                            </span>
                          </span>
                        )}
                      </div> */}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div className="pt-4">
                  <LoadingSpinner />
                </div>
              ) : (
                "No Interview Q&A Found!"
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyQna;
