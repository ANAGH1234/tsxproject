import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import authUser from '../../helpers/authUser';
import DashboardService from '../../services/DashBoardService';
import type { SelfPacedVideoDTO, CourseContentDTO, CourseTopicDTO, CourseSubTopicDTO } from '../../models/dashboard/dashboard';
import type { User } from '../../models/user/User';



const zeroPad = (num: number, places: number = 2): string => String(num).padStart(places, '0');

const BookMarkedLessons: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<SelfPacedVideoDTO | null>(null);
  const user: User | null = authUser.Get();

  useEffect(() => {
    document.title = 'Bookmarked Lessons';
    if (!user) {
      console.error('User is not authenticated');
      navigate('/login'); // Redirect to login if user is null
      return;
    }

    setIsLoading(true);
    DashboardService.GetBookMarkedLessons(user.userId)
      .then((data: SelfPacedVideoDTO) => {
        console.log('API Response:', data); // Log to inspect structure
        setVideoData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookmarked lessons:', error);
        setIsLoading(false);
      });
  }, []);

  console.log(videoData)

  const GoToPage = (url: string): void => {
    navigate(url, { replace: true });
  };

  if (!user) {
    return null; // Or render a fallback UI, e.g., <div>Please log in</div>
  }

  return (
    <div className="mt-4">
      <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="row pt-3">
          {Array.isArray(videoData?.courseContentList
          ) && videoData.courseContentList
            .length > 0 ? (
            <div>
              {videoData.courseContentList.map((course: CourseContentDTO, cIndex: number) => {
                const accordianShow: string = cIndex === 0 ? 'show' : '';
                const accordianCollapse: string = cIndex === 0 ? 'collapsed' : '';

                return (
                  <div key={cIndex} className="accordion-item">
                    <h4 className="accordion-header">
                      <button
                        className={`accordion-button ${accordianCollapse}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#accordion-section${cIndex}`}
                        style={{ background: 'rgb(246 249 253)' }}
                      >
                        <div className="row w-100">
                          <div style={{ fontWeight: '500', width: '65%' }}>
                            Module {cIndex + 1}. {course.Name}
                          </div>
                          <div style={{ width: '35%', paddingTop: '5px' }}>
                            <span
                              style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}
                            >
                              <i className="fa-solid fa-bars-staggered"></i> Lessons ({zeroPad(course.SubTopicCount)})
                            </span>
                          </div>
                        </div>
                      </button>
                    </h4>
                    <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                      <div className="accordion-body p-0">
                        <div className="ps-1">
                          {course.CourseTopics.map((Topic: CourseTopicDTO, tIndex: number) => (
                            <div style={{ padding: '5px' }} key={tIndex}>
                              <div className="row">
                                <div
                                  className="col-sm-12 col-xs-12"
                                  style={{
                                    color: '#3e3636',
                                    fontFamily: 'sans-serif',
                                    paddingTop: '5px',
                                    paddingLeft: '20px',
                                    paddingBottom: '5px',
                                  }}
                                >
                                  <h5 style={{ fontSize: '1rem' }}>
                                    <i className="fa-solid fa-list-ul" style={{ fontSize: '14px' }}></i>{' '}
                                    {Topic.TopicName}
                                  </h5>
                                </div>
                              </div>
                              <div>
                                {Topic.Subtopics.map((subTopic: CourseSubTopicDTO, stIndex: number) => {
                                  const cloudCodePath: string = subTopic.CodePath ? IMAGE_ADDRESS + subTopic.CodePath : '';
                                  const cloudPdfPath: string = subTopic.PdfPath ? IMAGE_ADDRESS + subTopic.PdfPath : '';

                                  return (
                                    <div
                                      style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }}
                                      key={stIndex}
                                    >
                                      <div className="row">
                                        <div
                                          className="col-sm-7 col-xs-12"
                                          style={{ paddingTop: '5px', paddingLeft: '20px' }}
                                        >
                                          <i
                                            className={
                                              subTopic.TopicType === 3
                                                ? 'fa-regular fa-file-lines'
                                                : 'fa fa-play-circle icon-player'
                                            }
                                            aria-hidden="true"
                                            style={{ marginRight: '4px' }}
                                          ></i>
                                          <span
                                            className="accordion-content__row__title"
                                            style={{ fontWeight: '500', fontSize: '14px' }}
                                          >
                                            {subTopic.SubTopicName}
                                          </span>
                                        </div>
                                        <div className="col-sm-5 col-xs-12" style={{ textAlign: 'right' }}>
                                          <span
                                            style={{ fontSize: '12px', paddingTop: '8px', display: 'inline-block' }}
                                          >
                                            {subTopic.PdfPath &&
                                              subTopic.PdfPath.length > 0 &&
                                              (course.IsSubscribed || videoData.IsSelfPlacedVideoSubscribed) && (
                                                <a
                                                  href={
                                                    subTopic.PdfPath.includes(IMAGE_ADDRESS)
                                                      ? subTopic.PdfPath
                                                      : cloudPdfPath
                                                  }
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  style={{ color: '#d21507', padding: '0 10px 0 0' }}
                                                >
                                                  <i
                                                    className="fas fa-file-pdf"
                                                    aria-hidden="true"
                                                    style={{ paddingRight: '2px', color: '#d21507' }}
                                                  ></i>
                                                  Pdf
                                                </a>
                                              )}
                                            {subTopic.CodePath &&
                                              subTopic.CodePath.length > 0 &&
                                              (course.IsSubscribed || videoData.IsSelfPlacedVideoSubscribed) && (
                                                <a
                                                  href={
                                                    subTopic.CodePath.includes(IMAGE_ADDRESS)
                                                      ? subTopic.CodePath
                                                      : cloudCodePath
                                                  }
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  style={{ fontSize: '12px', padding: '0 10px 0 0' }}
                                                >
                                                  <i
                                                    className="fa fa-file-code"
                                                    aria-hidden="true"
                                                    style={{ paddingRight: '2px' }}
                                                  ></i>
                                                  Code
                                                </a>
                                              )}
                                          </span>
                                          <span className="ms-2" style={{ fontSize: '12px' }}>
                                            <i className="far fa-clock" aria-hidden="true"></i> {subTopic.Duration}
                                          </span>
                                          <span style={{ fontSize: '12px' }}>
                                            <span style={{ cursor: 'pointer' }} className="ps-2">
                                              Not Started
                                            </span>
                                          </span>
                                          {!course.IsSubscribed && user.membershipId <= 0 ? (
                                            <a
                                              type="button"
                                              href={`${course.CourseUrl}`}
                                              className="btn-sm btn-primary ms-2"
                                              style={{ lineHeight: '1', width: '100px', padding: '6px 20px' }}
                                            >
                                              Subscribe
                                            </a>
                                          ) : (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                GoToPage(
                                                  `/user/app/videos/selfplaced/${course.ParentCourseId}/0/${course.SubscriptionId}/${Topic.TopicId}/${subTopic.SubTopicId}/${course.CourseContentId}`
                                                )
                                              }
                                              className="btn-sm btn-primary ms-2"
                                              style={{ lineHeight: '1', width: '70px', padding: '6px 20px' }}
                                            >
                                              Start
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>{isLoading ? <LoadingSpinner /> : 'No Bookmarked Lesson Found!'}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookMarkedLessons;