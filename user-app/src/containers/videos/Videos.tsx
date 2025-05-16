import  { useEffect, useState } from 'react'

import LoadingSpinner from '../../components/LoadingSpinner';
import TrainingService from '../../services/TrainingService';
import { useParams } from 'react-router-dom';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { SelfPacedVideoDTO } from '../../models/dashboard/dashboard';
import VideoActions from '../Action/VideoActions';

const zeroPad = (num:any, places = 2) => String(num).padStart(places, '0')

export default function Videos() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [videoData, setVideoData] = useState<SelfPacedVideoDTO | any>();
    const courseType = EnumCourseType.SelfPlaced;
    const user = authUser.Get();
    
    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.getSelfPlacedVideos(courseid, courseType, user.userId).then(res => {
            setVideoData(res);
            setIsLoading(false);
        })
    }, []);
    const cssBookMarked = {
        color: '#009688 !important',
        fontSize: '16px !important',
        cursor: 'pointer'
    }
    const cssUnBookMarked = {
        fontSize: '16px !important',
        cursor: 'pointer'
    }
    const cssCompleted = {
        color: '#009688',
        marginRight: '4px'
    }
    const cssNotCompleted = {
        marginRight: '4px',
        color: ''
    }
    const bookMarkClick = (contentId:any, courseId:any) => {
        const ContentBookMarksDTO = ({ CourseId: courseId, ContentId: contentId, CourseType: courseType, UserId: user?.userId });
        TrainingService.setContentBookMarked(ContentBookMarksDTO).then(res => { });
        setIsLoading(true);
        if(!user) return
        setTimeout(() => {
            TrainingService.getSelfPlacedVideos(courseid, courseType, user?.userId).then(res => {
                setVideoData(res);
                setIsLoading(false);
            })
        }, 500);
    }
    return (
        <div className="mt-4">
            <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                {
                   (videoData != null && videoData.courseContentList != null && videoData.courseContentList.length > 0 && videoData.CourseWisePerformance != null && videoData.CourseWisePerformance != undefined) &&
                    <div className='row'>
                        <div className='col-sm-4 offset-sm-8 col-xs-4 offset-sm-7'>
                            <span style={{ fontSize: '14px' }}><strong>OverAll Progress</strong></span>
                            <span className='ps-1' style={{ fontSize: '12px' }}>({videoData.CourseWisePerformance}%)</span>
                            {
                                videoData != null && videoData.TotalLessons > 0 &&
                                <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{videoData.CompletedLessons}</strong> out of <strong>{videoData.TotalLessons}</strong> Lessons</span>
                            }
                            <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                <div className="progress-bar" style={{ width: videoData.CourseWisePerformance + '%', height: '10px' }}></div>
                            </div>
                        </div>
                    </div>
                }
                <div className="row pt-3">
                    {
                        (videoData != null && videoData.courseContentList != null && videoData.courseContentList.length > 0) ?
                            <div>
                                {
                                    (videoData.IsSelfPlacedVideoSubscribed == false || videoData.IsTrialSubscribed == true) && <div className="box-shadow">
                                        <div className="p-2">
                                            <span className="float-start mt-2 ms-2 mb-3"><strong>Subscribe Video Course</strong> - Subscribe and get access to all Videos, Codes and PPTs.</span>
                                            <a href={`${videoData.CourseURL}`} className="float-end btn btn-primary me-3 mb-1"> &nbsp;Subscribe</a>
                                        </div>
                                    </div>
                                }
                                {
                                    videoData.courseContentList.map((course:any, cIndex:number) => {
                                        if (course.SubTopicCount > 0) {
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
                                                            {
                                                                course.CourseTopics.map((topic:any, tIndex:number) => {
                                                                    return <div style={{ padding: '5px' }} key={tIndex}>
                                                                        <div className='row'>
                                                                            <div className='col-sm-5 col-xs-12' style={{ color: '#3e3636', fontFamily: 'sans-serif', paddingTop: '5px', paddingLeft: '20px', paddingBottom: '5px' }}>
                                                                                <h5 style={{ fontSize: '1rem' }}>
                                                                                    <i className="fa-solid fa-list-ul" style={{ fontSize: '14px' }}></i> {topic.TopicName}
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                topic.SubTopics.map((subTopic:any, stIndex:number) => {
                                                                                    const cloudCodePath = IMAGE_ADDRESS + subTopic.CodePath;
                                                                                    const cloudPdfPath = IMAGE_ADDRESS + subTopic.PdfPath;
                                                                                    var styleBookMarked = subTopic.IsBookmarked ? cssBookMarked : cssUnBookMarked;
                                                                                    var styleCompleted = subTopic.IsVideoCompleted ? cssCompleted : cssNotCompleted;
                                                                                    return <div className="accor_sec" style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }} key={stIndex}>
                                                                                        <div className='row'>
                                                                                            <div className='col-sm-5 col-xs-12 accor_text_sec' style={{ paddingTop: '5px', paddingLeft: '20px' }}>
                                                                                                <i className={subTopic.TopicType == 3 ? 'fa-regular fa-file-lines' : 'fa fa-play-circle icon-player'} aria-hidden="true" style={styleCompleted}></i>
                                                                                                <span className="accordion-content__row__title" style={{ fontWeight: '500', fontSize: '14px' }}>{subTopic.SubTopicName} </span>
                                                                                            </div>
                                                                                            <div className='col-sm-7 col-xs-12 accor_text_sec' style={{ textAlign: 'right' }}>
                                                                                                <i style={styleBookMarked} className={subTopic.IsBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(subTopic.SubTopicId, course.CourseId)} title="Create Bookmark"></i>&nbsp;&nbsp;
                                                                                                <VideoActions subTopic={subTopic} IsSubscribed={videoData.IsSelfPlacedVideoSubscribed || videoData.IsMembershipSelfPlacedVideoSubscribed} cloudCodePath={cloudCodePath} cloudPdfPath={cloudPdfPath} course={course} courseid={courseid} batchid={batchid} subscriptionid={subscriptionid} topic={topic} isFreeTrial={videoData.IsTrialSubscribed} selfplaced="selfplaced" access={true}></VideoActions>
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
                                        }
                                    })
                                }
                            </div> :
                            <div>
                                {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Video Found!"}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}