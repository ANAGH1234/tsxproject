import React, { useEffect, useState } from "react";
import TrainingService from "../../services/TrainingService";
import LoadingSpinner from "../../components/LoadingSpinner";
import authUser from "../../helpers/authUser";
import { EnumCourseType } from "../../helpers/enum";
import type { SubscriptionDTO } from "../../models/training/training";

export default function MySkillTests() {
  const [subscribedTrainingData, setSubscribedTraining] = useState<
    SubscriptionDTO[] | any
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = authUser.Get();
  useEffect(() => {
    setIsLoading(true);
    document.title = "My Skill Tests";
    if (!user) return;
    TrainingService.getSingleSubscribedCourses(
      user.userId,
      user.membershipId,
      EnumCourseType.TestPaper,
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
          {subscribedTrainingData != null &&
          subscribedTrainingData.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map(
                (item: SubscriptionDTO, index: number) => {
                  let sessionURL =
                    "/user/app/training/details/" +
                    item.CourseId +
                    "/" +
                    item.SubscriptionId +
                    "/0/tests";
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
                              {" "}
                              <h5 className="pt-1">
                                {item.Course} : Skill Tests
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
                          {
                            item.NotesCount > 0 && <span><i style={{ paddingLeft: '7px' }} className='fa-regular fa-circle-question'></i><span style={{ paddingLeft: '5px' }}><strong>{item.QACount} Notes</strong></span></span>
                          }
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
                "No Skill Tests Found!"
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
