import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import TrainingService from '../../services/TrainingService';
import type { SubscriptionDTO } from '../../models/training/training';
import { useNavigate } from 'react-router-dom';



const MyCorporateTraining: React.FC = () => {
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
    document.title = 'My Corporate Training';
    TrainingService.getSubscribedCorporateTrainings(
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
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : subscribedTrainingData?.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.map((item : any, index : number) => {
                const batchId = item.BatchId || 0;
                const sessionURL = `/user/app/training/details/${item.CourseId}/${item.SubscriptionId}/${batchId}`;

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
            <div>No Corporate Courses Found!</div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyCorporateTraining;