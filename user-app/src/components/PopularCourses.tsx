
import { useEffect, useState, type JSX } from 'react';
import authUser from '../helpers/authUser';
import DashboardService from '../services/DashBoardService';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import type { CourseContentDTO, CourseSubTopicDTO, CourseTopicDTO, SelfPacedVideoDTO } from '../models/dashboard/dashboard';


export default function PopularCourses(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<SelfPacedVideoDTO | null>(null);
  const navigate = useNavigate();
  const user = authUser.Get(); 
  const GoToPage = (url: string): void => {
    navigate(url, { replace: true });
  };

  useEffect(() => {
    if (user?.userId) {
      setIsLoading(true);
      DashboardService.GetBookMarkedLessons(user.userId)
        .then((res: SelfPacedVideoDTO) => {
          setVideoData(res);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); 
    }
  }, [user?.userId]);

  return (
    <div className="pt-4">
      <div style={{ paddingBottom: '10px' }}>
        <span>
          <strong>BookMarked Lessons</strong>
        </span>
        <span style={{ float: 'right' }}>
          <a href="/user/app/subscribed-training/bmlessons">View All</a>
        </span>
      </div>
      <div className="box-shadow pt-2" style={{ minHeight: '200px' }}>
        {videoData?.courseContentList?.length ? (
          <div>
            {videoData.courseContentList.map((course: CourseContentDTO, cIndex: number) => {
              const accordianShow: string = cIndex === 0 ? 'show' : '';

              return (
                <div key={cIndex}>
                  <div
                    id={`accordion-section${cIndex}`}
                    className={`accordion-collapse collapse ${accordianShow}`}
                  >
                    <div className="accordion-body p-0">
                      <div>
                        {course.courseTopics.slice(0, 3).map(
                          (topic: CourseTopicDTO, tIndex: number) => (
                            <div style={{ padding: '5px' }} key={tIndex}>
                              <div className="row">
                                <div
                                  className="col-sm-12 col-xs-12"
                                  style={{
                                    color: '#3e3636',
                                    fontFamily: 'sans-serif',
                                    paddingLeft: '20px',
                                    paddingBottom: '0',
                                    paddingTop: '2px',
                                  }}
                                >
                                  <h5 style={{ fontSize: '.8rem' }}>
                                    <i
                                      className="fa-solid fa-list-ul"
                                      style={{ fontSize: '12px' }}
                                    ></i>{' '}
                                    {topic.topicName}
                                  </h5>
                                </div>
                              </div>
                              <div>
                                {topic.subtopics.slice(0, 4).map(
                                  (subTopic: CourseSubTopicDTO, stIndex: number) => (
                                    <div
                                      style={{
                                        borderBottom: '1px solid #e4ecf2',
                                        background: 'rgb(251 251 251)',
                                        fontSize: '12px',
                                      }}
                                      key={stIndex}
                                    >
                                      <div className="row">
                                        <div
                                          className="col-sm-10 col-xs-12"
                                          style={{
                                            color: '#3e3636',
                                            fontFamily: 'sans-serif',
                                            paddingLeft: '20px',
                                          }}
                                        >
                                          <button
                                            type="button"
                                            onClick={() =>
                                              GoToPage(
                                                `/user/app/videos/selfplaced/${course.parentCourseId}/0/${course.subscriptionId}/${topic.topicId}/${subTopic.subTopicId}/${course.courseContentId}`
                                              )
                                            }
                                            style={{
                                              border: '0',
                                              background: 'none',
                                              color: '#0d6efd',
                                            }}
                                          >
                                            <i
                                              className={
                                                subTopic.topicType === 3
                                                  ? 'fa-regular fa-file-lines'
                                                  : 'fa fa-play-circle icon-player'
                                              }
                                              aria-hidden="true"
                                              style={{ marginRight: '4px' }}
                                            ></i>
                                            <span
                                              className="accordion-content__row__title"
                                              style={{ fontWeight: '500' }}
                                            >
                                              {subTopic.subTopicName}
                                            </span>
                                          </button>
                                        </div>
                                        <div
                                          className="col-sm-2 col-xs-12"
                                          style={{ textAlign: 'right' }}
                                        >
                                          <span
                                            className="ms-2"
                                            style={{ fontSize: '11px' }}
                                          >
                                            <i
                                              className="far fa-clock"
                                              aria-hidden="true"
                                            ></i>{' '}
                                            {subTopic.duration}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        )}
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
              'No Video Found!'
            )}
          </div>
        )}
      </div>
    </div>
  );
}