import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import authUser from '../../helpers/authUser'
import DashboardService from '../../services/DashBoardService';
import type { SelfPacedVideoDTO } from '../../models/dashboard/dashboard';
const zeroPad = (num: any, places = 2) => String(num).padStart(places, '0')

export default function BookMarkedLessons() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<SelfPacedVideoDTO>();
  const user = authUser.Get();
  useEffect(() => {
    document.title = 'Bookmarked Lessons';
    setIsLoading(true);
    if (!user) return
    DashboardService.GetBookMarkedLessons(user.userId).then(res => {



      setVideoData(res);
      setIsLoading(false);
    })
  }, []);
  const GoToPage = (url: any) => {
    navigate(url, { replace: true });
  }
  return (<div className="mt-4">
    <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
      <div className="row pt-3">
        {
          (videoData != null && videoData.courseContentList != null && videoData.courseContentList.length > 0) ?
            <div>
              {
                videoData.courseContentList.map((course, cIndex) => {
                  let accordianShow = cIndex == 0 ? 'show' : '';
                  let accordianCollapse = cIndex == 0 ? '' : 'collapsed';

                  return <div key={cIndex} className="accordion-item">
                    <h4 className="accordion-header">
                      <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section${cIndex}`} style={{ background: 'rgb(246 249 253)' }}>
                        <div className='row w-100'>
                          <div style={{ fontWeight: '500', width: '65%' }}>
                            Module {cIndex + 1}. {course.Name}
                          </div>
                          <div style={{ width: '35%', paddingTop: '5px' }}>
                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;Lessons ({zeroPad(course.SubTopicCount)})</span>
                          </div>
                        </div>
                      </button>
                    </h4>
                    <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                      <div className="accordion-body p-0">
                        <div className='ps-1'>
                          {course.CourseTopics &&
                            course.CourseTopics.map((topic, tIndex) => {
                              return <div style={{ padding: '5px' }} key={tIndex}>
                                <div className='row'>
                                  <div className='col-sm-12 col-xs-12' style={{ color: '#3e3636', fontFamily: 'sans-serif', paddingTop: '5px', paddingLeft: '20px', paddingBottom: '5px' }}>
                                    <h5 style={{ fontSize: '1rem' }}>
                                      <i className="fa-solid fa-list-ul" style={{ fontSize: '14px' }}></i> {topic.TopicName}
                                    </h5>
                                  </div>
                                </div>
                                <div>
                                  { topic.SubTopics &&
                                    topic.SubTopics.map((subTopic, stIndex) => {
                                      const cloudCodePath = IMAGE_ADDRESS + subTopic.CodePath;
                                      const cloudPdfPath = IMAGE_ADDRESS + subTopic.PdfPath;
                                      return <div style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }} key={stIndex}>
                                        <div className='row'>
                                          <div className='col-sm-7 col-xs-12' style={{ paddingTop: '5px', paddingLeft: '20px' }}>
                                            <i className={subTopic.TopicType == 3 ? 'fa-regular fa-file-lines' : 'fa fa-play-circle icon-player'} aria-hidden="true" style={{ marginRight: '4px' }}></i>
                                            <span className="accordion-content__row__title" style={{ fontWeight: '500', fontSize: '14px' }}>{subTopic.SubTopicName} </span>
                                          </div>
                                          <div className='col-sm-5 col-xs-12' style={{ textAlign: 'right' }}>

                                            <span style={{ fontSize: '12px', paddingTop: '8px', display: 'inline-block' }}>
                                              {
                                                subTopic.PdfPath !== undefined && subTopic.PdfPath !== null && subTopic.PdfPath.length !== 0 && subTopic.IsSubscribed == true &&
                                                subTopic.PdfPath.includes(IMAGE_ADDRESS) && videoData.IsSelfPlacedVideoSubscribed == true &&
                                                <a href={subTopic.PdfPath} target="_blank" style={{ color: '#d21507', padding: '0 10px 0 0' }}>
                                                  <i className="fas fa-file-pdf" aria-hidden="true" style={{ paddingRight: '2px', color: '#d21507' }}></i>
                                                  &nbsp;Pdf &nbsp;
                                                </a>
                                              }
                                              {
                                                subTopic.PdfPath !== undefined && subTopic.PdfPath !== null && subTopic.PdfPath.length !== 0 && subTopic.IsSubscribed == true &&
                                                subTopic.PdfPath.includes(IMAGE_ADDRESS) === false && videoData.IsSelfPlacedVideoSubscribed == true &&
                                                <a href={cloudPdfPath} target="_blank" style={{ color: '#d21507', padding: '0 10px 0 0' }}>
                                                  <i className="fas fa-file-pdf" aria-hidden="true" style={{ paddingRight: '2px', color: '#d21507' }}></i>
                                                  &nbsp;Pdf &nbsp;
                                                </a>
                                              }
                                              {
                                                subTopic.CodePath !== undefined && subTopic.CodePath !== null && subTopic.CodePath.length !== 0 && subTopic.IsSubscribed == true &&
                                                subTopic.CodePath.includes(IMAGE_ADDRESS) && videoData.IsSelfPlacedVideoSubscribed == true &&
                                                <a href={subTopic.CodePath} target="_blank" style={{ fontSize: '12px', padding: '0 10px 0 0' }}>
                                                  <i className="fa fa-file-code" aria-hidden="true" style={{ paddingRight: '2px' }} ></i>
                                                  &nbsp;Code
                                                </a>
                                              }
                                              {
                                                subTopic.CodePath !== undefined && subTopic.CodePath !== null && subTopic.CodePath.length !== 0 && subTopic.IsSubscribed == true &&
                                                subTopic.CodePath.includes(IMAGE_ADDRESS) === false && videoData.IsSelfPlacedVideoSubscribed == true &&
                                                <a href={cloudCodePath} target="_blank" style={{ fontSize: '12px', padding: '0 10px 0 0' }}>
                                                  <i className="fa fa-file-code" aria-hidden="true" style={{ paddingRight: '2px' }}></i>
                                                  &nbsp;Code
                                                </a>
                                              }
                                            </span>
                                            <span className='ms-2' style={{ fontSize: '12px' }}>
                                              <i className="far fa-clock" aria-hidden="true"></i>
                                              &nbsp;{subTopic.Duration}
                                            </span>
                                            {
                                              (subTopic.SelfPlacedVideoProgress != null && subTopic.SelfPlacedVideoProgress != undefined && subTopic.SelfPlacedVideoProgress > 0) ?
                                                <span className="ms-2">
                                                  <div className="progress" style={{ height: '10px', display: 'inline-block', width: '100px' }}>
                                                    <div className="progress-bar" style={{ width: subTopic.SelfPlacedVideoProgress + '%', height: '10px' }}></div>
                                                  </div>
                                                  <span style={{ fontSize: '12px' }}>{subTopic.SelfPlacedVideoProgress}%</span>
                                                </span> : <span style={{ fontSize: '12px' }}><span style={{ cursor: 'pointer' }} className="ps-2">
                                                  Not Started</span></span>
                                            }
                                            {
                                              (course.IsSubscribed == false && user && user.membershipId <= 0) ?
                                                <a type="button" href={`${course.CourseURL}`} className="btn-sm btn-primary ms-2" style={{ lineHeight: '1', width: '100px', padding: '6px 20px' }}>Subscribe</a>
                                                : subTopic.SelfPlacedVideoProgress != null && subTopic.SelfPlacedVideoProgress != undefined && subTopic.SelfPlacedVideoProgress > 0
                                                  ? <button type="button" onClick={() => GoToPage(`/user/app/videos/selfplaced/${course.CourseId}/0/${course.SubscriptionId}/${topic.TopicId}/${subTopic.SubTopicId}/${course.CourseContentId}`)} className="btn btn-info ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px' }}>Resume</button>
                                                  : <button type="button" onClick={() => GoToPage(`/user/app/videos/selfplaced/${course.ParentCourseId}/0/${course.SubscriptionId}/${topic.TopicId}/${subTopic.SubTopicId}/${course.CourseContentId}`)} className="btn-sm btn-primary ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px 20px' }}>Start</button>
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    })
                                  }
                                </div>
                              </div>

                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                })
              }
            </div> :
            <div>
              {isLoading ? <div><LoadingSpinner /></div> : "No Bookmarked Lesson Found!"}
            </div>
        }
      </div>
    </div>
  </div>
  )
}