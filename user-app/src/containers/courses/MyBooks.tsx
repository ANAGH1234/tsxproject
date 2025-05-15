import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { SubscriptionDTO } from '../../models/training/training';


export default function MyBooks() {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscriptionDTO[] | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get();

  useEffect(() => {
    setIsLoading(true);
    document.title = 'My Interview Books';
    if(!user) return
    TrainingService.getSubscribedBooks(user.userId, user.membershipId, EnumCourseType.Books, user.membershipExpiry).then(res => {
      setSubscribedTraining(res.Data);
      setIsLoading(false);
    });
  }, []);


  console.log(subscribedTrainingData)

  return (
    <div className="mt-4">
      <div className="block-header"><h2>My Interview Books</h2></div>
      <div className="tab-wrapper">
        <section className="tab-content">
          {subscribedTrainingData && subscribedTrainingData.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map((item: SubscriptionDTO, index: number) => {
                let sessionURL = "/user/app/";
                sessionURL += `books/${item.CourseId}/${item.SubscriptionId}/0`;
                sessionURL = sessionURL.replace("/resources", "");
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
            <div>
              {isLoading ? (
                <div className="pt-4">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="pt-2">No Book Found!</div>
              )}
            </div>
          )}
          {/* Added back the Browse More button */}
          {user?.membershipId === 0 && (
            <div className="text-center mt-4">
              <a href="/library/books">
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
                  Browse Free Interview Books
                </button>
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}