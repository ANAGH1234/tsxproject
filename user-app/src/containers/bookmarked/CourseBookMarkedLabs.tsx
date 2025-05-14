
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/labs.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { UserTranningDTO, CourseLabDTO, LabDTO } from '../../models/dashboard/dashboard';
import type { User } from '../../models/user/User';
import DashboardService from '../../services/DashBoardService';

const zeroPad = (num: number, places: number = 2): string => String(num).padStart(places, '0');

const CourseBookMarkedLabs: React.FC = () => {
  const [labData, setLabData] = useState<UserTranningDTO>({
    isLabSubscribed: false,
    labs: [],
    quickNotes: [],
    courseUrl: '',
    courseLabs: [],
    courseQuickNote: [],
    interviewQuestionList: [],
    totalCompletedLabs: 0,
    totalLabs: 0,
    totalCompletedQuickNotes: 0,
    totalQuickNotes: 0,
    labProgress: 0,
    quickNoteProgress: 0,
    isTrialSubscribed: false,
    isQuickNoteSubscribed: false,
    isQnASubscribed: false,
    isBookSubscribed: false,
    isQnAVideoExists: false,
    isQnATextExists: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user: User | null = authUser.Get();

  useEffect(() => {
    document.title = 'Course Bookmarked Labs';
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    setIsLoading(true);
    DashboardService.GetCourseBookMarkedLabs(user.userId)
      .then((response) => {
        const data: UserTranningDTO = response ;
        console.log('API Response:', data);
        setLabData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookmarked labs:', error);
        setIsLoading(false);
      });
  }, [user]);

  if (!user) {
    return null; 
  }

  return (
    <div className="mt-4">
      <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
        {labData.courseLabs && labData.courseLabs.length > 0 ? (
          <div className="pt-3">
            {labData.courseLabs.map((content: CourseLabDTO, cIndex: number) => {
              const accordionShow: string = cIndex === 0 ? 'show' : '';
              const accordionCollapse: string = cIndex === 0 ? '' : 'collapsed';

              return (
                <div key={cIndex} className="accordion-item">
                  <h4 className="accordion-header" id={`heading-${content.contentId}`}>
                    <button
                      className={`accordion-button ${accordionCollapse}`}
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
                  <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordionShow}`}>
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
                            {!item.isSubscribed && user.membershipId <= 0 ? (
                              <Link to={`${content.courseUrl}`} className="btn btn-primary" style={{ lineHeight: '1' }}>
                                Subscribe
                              </Link>
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

export default CourseBookMarkedLabs;
