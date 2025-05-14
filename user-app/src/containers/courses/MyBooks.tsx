import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { Paging } from '../../models/dashboard/dashboard';
import type { SubscriptionDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';

// Extend SubscriptionDTO to include additional properties
interface ExtendedSubscriptionDTO extends SubscriptionDTO {
  courseId: number;
  subscriptionId: number;
  course: string;
  mobileBanner: string;
}

// Define the interface for the state
interface SubscribedTrainingData extends Paging<ExtendedSubscriptionDTO> {
  data: ExtendedSubscriptionDTO[];
}

const MyBooks: React.FC = () => {
  const [subscribedTrainingData, setSubscribedTraining] = useState<SubscribedTrainingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: User | null = authUser.Get();

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    document.title = 'My Interview Books';
    TrainingService.getSubscribedBooks(
      user.userId,
      user.membershipId,
      EnumCourseType.Books,
      user.membershipExpiry.toISOString()
    )
      .then((res) => {
        setSubscribedTraining(res as SubscribedTrainingData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching subscribed books:', err);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className="mt-4">
      <div className="block-header">
        <h2>My Interview Books</h2>
      </div>
      <div className="tab-wrapper">
        <section className="tab-content">
          {subscribedTrainingData?.data && subscribedTrainingData.data.length > 0 ? (
            <div className="row mt-5">
              {subscribedTrainingData.data.map((item, index) => {
                let sessionURL = `/user/app/books/${item.courseId}/${item.subscriptionId}/0`;
                sessionURL = sessionURL.replace('/resources', '');
                return (
                  <div className="col-sm-6 mb-3" key={index}>
                    <div className="card">
                      <div className="row m-1">
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <img
                              src={item.mobileBanner}
                              alt={item.course}
                              className="img-fluid"
                              style={{ maxHeight: '70px' }}
                            />
                          </div>
                          <div className="p-2 w-100">
                            <h5 className="pt-1">{item.course}</h5>
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
                <div className="pt-2">No Book Found!</div>
              )}
            </div>
          )}
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
};

export default MyBooks;