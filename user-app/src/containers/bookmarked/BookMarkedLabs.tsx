import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/labs.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import DashboardService from '../../services/DashBoardService';
import type { UserTranningDTO, CourseLabDTO, LabDTO } from '../../models/dashboard/dashboard';
import type { User } from '../../models/user/User';



const BookMarkedLabs: React.FC = () => {
  const zeroPad = (num: number, places: number = 2): string => String(num).padStart(places, '0');
  const [labData, setLabData] = useState<UserTranningDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: User | null = authUser.Get();

  useEffect(() => {
    if (!user) {
      console.error('No authenticated user found');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    document.title = 'Training Bookmarked Labs';
    DashboardService.GetTrainingBookMarkedLabs(user.userId)
      .then((res: UserTranningDTO) => {
        setLabData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching bookmarked labs:', err);
        setIsLoading(false);
      });
  }, [user]);

  if (!user) {
    return <div>Please log in to view bookmarked labs.</div>;
  }

  return (
    <div className="mt-4">
      <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
        {labData?.courseLabs?.length ? (
          <div className="pt-3">
            {labData.courseLabs.map((content: CourseLabDTO, cIndex: number) => {
              const accordianShow = cIndex === 0 ? 'show' : '';
              const accordianCollapse = cIndex === 0 ? '' : 'collapsed';
              return (
                <div key={cIndex} className="accordion-item">
                  <h4 className="accordion-header" id={`heading-${content.contentId}`}>
                    <button
                      className={`accordion-button ${accordianCollapse}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#accordion-section${cIndex}`}
                      style={{ background: 'rgb(246 249 253)' }}
                    >
                      <div className="row w-100">
                        <div style={{ fontWeight: '500', width: '65%' }}>
                          Module {cIndex + 1}. {content.contentName}
                        </div>
                        <div style={{ width: '35%', paddingTop: '5px' }}>
                          <span
                            style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}
                          >
                            <i className="fa-solid fa-bars-staggered"></i> Labs ({zeroPad(content.labList.length)})
                          </span>
                        </div>
                      </div>
                    </button>
                  </h4>
                  <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                    <div className="accordion-body p-0">
                      {content.labList.map((item: LabDTO, index: number) => (
                        <div
                          className="row"
                          style={{ padding: '10px', margin: '0', borderBottom: '1px solid #e4ecf2', lineHeight: '28px' }}
                          key={index}
                        >
                          <span className="col-sm-7 col-xs-12" style={{ fontSize: '15px' }}>
                            <i className="fa-solid fa-flask"></i> {item.name}
                          </span>
                          <span className="col-sm-5 col-xs-12" style={{ fontSize: '14px', textAlign: 'right' }}>
                            <i className="far fa-gem"></i> {item.learningPoints} |{' '}
                            <i
                              className="far fa-clock"
                              aria-hidden="true"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Play Video"
                            ></i>{' '}
                            {item.duration} Mins{' '}
                            {item.isSubscribed === false && user.membershipId <= 0 ? (
                              <a href={content.courseUrl} className="btn btn-primary" style={{ lineHeight: '1' }}>
                                Subscribe
                              </a>
                            ) : (
                              <Link
                                to={`/user/app/training/details/${item.courseId}/${item.subscriptionId}/lab/details/${item.labId}`}
                                className="btn btn-primary"
                                style={{ lineHeight: '1' }}
                              >
                                Start
                              </Link>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>{isLoading ? <div className="pt-4"><LoadingSpinner /></div> : 'No Bookmarked Lab Found!'}</div>
        )}
      </div>
    </div>
  );
};

export default BookMarkedLabs;