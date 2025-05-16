import { useEffect, useState } from 'react'

import LoadingSpinner from '../../components/LoadingSpinner';
import TrainingService from '../../services/TrainingService';
import { useParams } from 'react-router-dom';
import { IMAGE_ADDRESS } from '../../helpers/constant';

import authUser from '../../helpers/authUser';
import moment from 'moment';
import type { CoursePlanDetailDTO } from '../../models/training/training';
import HandsOnLabActions from '../Action/HandsOnLabActions';
import QuickNoteActions from '../Action/QuickNoteActions';
import VideoActions from '../Action/VideoActions';
const zeroPad = (num: any, places = 2) => String(num).padStart(places, '0')
export default function CoursePlanDetails() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [coursePlanData, setCoursePlanData] = useState<CoursePlanDetailDTO | any>();
    const user = authUser.Get();

    useEffect(() => {
        setIsLoading(true);
        if (!user) return
        document.title = 'Course Plan Details';
        TrainingService.getCoursePlanDetails(courseid, user.userId).then(res => {
            setCoursePlanData(res);
            setIsLoading(false);
        });
        localStorage.setItem('pl', "courseplan");
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


    return (
        <div className="mt-4">
            <div className="tab-wrapper">
                {
                    (coursePlanData != null && coursePlanData.coursePlansList != null && coursePlanData.coursePlansList.length > 0) ?
                        <div>
                            {
                                coursePlanData != null && coursePlanData.coursePlansList.map((plan: any, pIndex: number) => {
                                    let accordianShow = 'show';
                                    let accordianCollapse = 'collapsed';
                                    return <div key={pIndex} style={{ marginBottom: '30px' }}>
                                        <h4 id={plan.PlanId}>
                                            <div className='row w-100 pb-10'>
                                                <div>{plan.PlanName}</div>
                                                <div style={{ fontSize: '14px', marginTop: '4px', marginBottom: '4px' }}>(Scheduled On : {moment(plan.StartDate).format('ddd, MMM DD')})</div>
                                            </div>
                                        </h4>
                                        <div id={`accordion-section${pIndex}`} className={`accordion-collapse collapse ${accordianShow}`} aria-labelledby={plan.PlanId} data-bs-parent="#accordionExample">
                                            <div className="accordion-body p-0">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header" id={`${plan.PlanId}`}>
                                                        <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section-v${plan.PlanId}`} aria-expanded="true">
                                                            <div style={{ fontWeight: '500', width: '65%' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M381.565-307.609 652.63-480 381.565-652.63v345.021Zm98.468 233.587q-83.468 0-157.541-31.878-74.073-31.879-129.393-87.199-55.32-55.32-87.199-129.36-31.878-74.04-31.878-157.508 0-84.468 31.878-158.541 31.879-74.073 87.161-128.906 55.283-54.832 129.341-86.818 74.057-31.986 157.545-31.986 84.488 0 158.589 31.968 74.102 31.967 128.916 86.768 54.815 54.801 86.79 128.883Q886.218-564.516 886.218-480q0 83.501-31.986 157.57-31.986 74.069-86.818 129.36-54.833 55.291-128.873 87.17-74.04 31.878-158.508 31.878Zm-.033-68.13q141.043 0 239.446-98.752Q817.848-339.656 817.848-480q0-141.043-98.402-239.446-98.403-98.402-239.566-98.402-140.163 0-238.945 98.402-98.783 98.403-98.783 239.566 0 140.163 98.752 238.945Q339.656-142.152 480-142.152ZM480-480Z"></path></svg>
                                                                <span>Video Course</span>
                                                            </div>
                                                        </button>
                                                    </h2>
                                                    <div id={`accordion-section-v${plan.PlanId}`} className={`accordion-collapse collapse ${accordianCollapse}`}>
                                                        {
                                                            plan.videoList != null && plan.videoList.length > 0 ?
                                                                <div className="accordion-body">
                                                                    {
                                                                        plan.videoList != null && plan.videoList.map((module: any, mIndex: number) => {
                                                                            return <div style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }} key={mIndex}>
                                                                                <div className='row w-100 pb-10'>
                                                                                    <div style={{ fontWeight: '500', width: '65%' }}>
                                                                                        Module {mIndex + 1}. {module.Name}
                                                                                    </div>
                                                                                    <div style={{ width: '35%', paddingTop: '5px' }}>
                                                                                        <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;Lessons ({zeroPad(module.SubTopicCount)})</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='ps-1 pt-2'>
                                                                                    {
                                                                                        module.CourseTopics.map((topic: any, tIndex: number) => {
                                                                                            return <div style={{ padding: '5px' }} key={tIndex}>
                                                                                                <div className='row'>
                                                                                                    <div className='col-sm-5 col-xs-12' style={{ paddingTop: '5px', paddingLeft: '20px', paddingBottom: '5px' }}>
                                                                                                        <h5 style={{ fontSize: '1rem' }}>
                                                                                                            <i className="fa-solid fa-list-ul" style={{ fontSize: '14px' }}></i> {topic.TopicName}
                                                                                                        </h5>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div>
                                                                                                    {
                                                                                                        topic.SubTopics.map((subTopic: any, stIndex: number) => {
                                                                                                            const cloudCodePath = IMAGE_ADDRESS + subTopic.CodePath;
                                                                                                            const cloudPdfPath = IMAGE_ADDRESS + subTopic.PdfPath;
                                                                                                            var styleBookMarked = subTopic.IsBookmarked ? cssBookMarked : cssUnBookMarked;
                                                                                                            var styleCompleted = subTopic.IsVideoCompleted ? cssCompleted : cssNotCompleted;
                                                                                                            return <div style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }} key={stIndex}>
                                                                                                                <div className='row'>
                                                                                                                    <div className='col-sm-5 col-xs-12' style={{ paddingTop: '5px', paddingLeft: '20px' }}>
                                                                                                                        <i className={subTopic.TopicType == 3 ? 'fa-regular fa-file-lines' : 'fa fa-play-circle icon-player'} aria-hidden="true" style={styleCompleted}></i>
                                                                                                                        <span className="accordion-content__row__title" style={{ fontWeight: '500', fontSize: '14px' }}>{subTopic.SubTopicName} </span>
                                                                                                                    </div>
                                                                                                                    <div className='col-sm-7 col-xs-12' style={{ textAlign: 'right' }}>
                                                                                                                        {/* <i style={styleBookMarked} className={subTopic.IsBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(subTopic.SubTopicId, courseId)} title="Create Bookmark"></i>&nbsp;&nbsp; */}
                                                                                                                        <VideoActions subTopic={subTopic} IsSubscribed={coursePlanData.IsSelfPlacedVideoSubscribed || coursePlanData.IsMembershipSelfPlacedVideoSubscribed} cloudCodePath={cloudCodePath} cloudPdfPath={cloudPdfPath} course={subTopic} courseid={courseid} batchid={0} subscriptionid={subscriptionid} topic={topic} isFreeTrial={coursePlanData.IsTrialSubscribed} selfplaced="selfplaced" isAccess={subTopic.Access}></VideoActions>
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
                                                                        })
                                                                    }
                                                                </div> : <div>
                                                                    {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Video Found!"}
                                                                </div>
                                                        }

                                                    </div>
                                                </div>
                                                {
                                                    plan.labList != null && plan.labList.length > 0 &&
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id={`${plan.PlanId}`}>
                                                            <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section-l${plan.PlanId}`} aria-expanded="true">
                                                                <div style={{ fontWeight: '500', width: '65%' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 0 24 24"> <path d="M22.29,18.37a2,2,0,0,0,0-.24,4.3,4.3,0,0,0-.09-.47c-.05-.15-.11-.31-.17-.46a3.88,3.88,0,0,0-.24-.45l-6.3-8.94V3.64h1.48a.92.92,0,0,0,0-1.84H7.36a.92.92,0,0,0,0,1.84H8.84V7.81L2.55,16.75a2.17,2.17,0,0,0-.24.45,2.85,2.85,0,0,0-.17.46A3.89,3.89,0,0,0,2,18.6c0,.08,0,.16,0,.23A3.8,3.8,0,0,0,2.26,20a3.6,3.6,0,0,0,.59,1,2.5,2.5,0,0,0,.32.33,2.54,2.54,0,0,0,.36.29,3.89,3.89,0,0,0,.4.25,4.28,4.28,0,0,0,.43.19,3.76,3.76,0,0,0,1.22.21H18.72A3.67,3.67,0,0,0,19.94,22l.44-.19a3.64,3.64,0,0,0,1.8-2.28,3.2,3.2,0,0,0,.11-.69,1.69,1.69,0,0,0,0-.23A1.77,1.77,0,0,0,22.29,18.37Zm-1.95.44a.78.78,0,0,1-.05.18l0,.08a.78.78,0,0,0-.05.14,2.09,2.09,0,0,1-.46.64l-.09.08a.88.88,0,0,1-.17.12l-.15.09-.11.06-.25.09a2.33,2.33,0,0,1-.53.07H5.85a1.27,1.27,0,0,1-.28,0,1.93,1.93,0,0,1-.73-.26A.91.91,0,0,1,4.68,20l-.23-.2h0a2.21,2.21,0,0,1-.3-.45l-.06-.12a1.77,1.77,0,0,1-.15-.65,1.88,1.88,0,0,1,.3-1.12l0-.05L10.67,8.5h0V3.64h2.95V8.49h0l6.44,8.92a2.38,2.38,0,0,1,.17.31,2.12,2.12,0,0,1,.14.68A2.58,2.58,0,0,1,20.34,18.81Z"></path> <path d="M5.66,17.74A.82.82,0,0,0,6.36,19H17.94a.82.82,0,0,0,.7-1.26l-4.1-5.55H9.76Z"></path> </svg>
                                                                    <span> Hands-on Labs</span>
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id={`accordion-section-l${plan.PlanId}`} className={`accordion-collapse collapse ${accordianCollapse}`}>
                                                            {
                                                                plan.labList != null && plan.labList.length > 0 ?
                                                                    <div className="accordion-body">
                                                                        {
                                                                            plan.labList != null && plan.labList.map((ml: any, mlIndex: number) => {
                                                                                return <div style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }} key={mlIndex}>
                                                                                    <div className='row w-100 pb-10'>
                                                                                        <div style={{ fontWeight: '500', width: '65%' }}>
                                                                                            Module {mlIndex + 1}. {ml.ContentName}
                                                                                        </div>
                                                                                        <div style={{ width: '35%', paddingTop: '5px' }}>
                                                                                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;Labs ({zeroPad(ml.LabCount)})</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='ps-1 pt-2'>
                                                                                        {
                                                                                            ml.LabList != null && ml.LabList.map((item: any, index: number) => {
                                                                                                var isLabStarted = item.IsLabStarted ? 'In-Progress' : 'Not Started';
                                                                                                var styleBookMarked = item.IsBookMarked ? cssBookMarked : cssUnBookMarked;
                                                                                                var styleCompleted = item.IsLabCompleted ? cssCompleted : cssNotCompleted;
                                                                                                return <div className='row' style={{ padding: '10px', margin: '0', borderBottom: '1px solid #e4ecf2', lineHeight: '28px' }} key={index}>
                                                                                                    <span className="col-sm-7 col-xs-12" style={{ fontSize: '15px' }}><i style={styleCompleted} className="fa-solid fa-flask"></i> {item.Name} </span>
                                                                                                    <span className='col-sm-5 col-xs-12' style={{ fontSize: '14px', textAlign: 'right' }}>
                                                                                                        {/* <i style={styleBookMarked} className={item.IsBookMarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(item.LabId, content.ContentId)} title="Create Bookmark"></i>&nbsp; | &nbsp; */}
                                                                                                        <i className="far fa-gem"></i>&nbsp;{item.LearningPoints}&nbsp; | &nbsp;
                                                                                                        <i className="far fa-clock" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Play Video"></i>
                                                                                                        &nbsp;{item.Duration + ' Mins'} &nbsp; | &nbsp;
                                                                                                        <HandsOnLabActions item={item} isLabStarted={isLabStarted} labData={coursePlanData} courseid={courseid} subscriptionid={subscriptionid} membership={coursePlanData.IsMembershipLabSubscribed} access={item.Access}></HandsOnLabActions>
                                                                                                    </span>
                                                                                                </div>
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>

                                                                            })
                                                                        }
                                                                    </div> : <div>
                                                                        {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Lab Found!"}
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    plan.quicknoteList != null && plan.quicknoteList.length > 0 &&
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id={`${plan.PlanId}`}>
                                                            <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section-q${plan.PlanId}`} aria-expanded="true">
                                                                <div style={{ fontWeight: '500', width: '65%' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="22px" viewBox="0 0 16 16">
                                                                        <path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path>
                                                                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
                                                                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>
                                                                    </svg>
                                                                    <span>Quick Notes</span>
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id={`accordion-section-q${plan.PlanId}`} className={`accordion-collapse collapse ${accordianCollapse}`}>
                                                            {
                                                                plan.quicknoteList != null && plan.quicknoteList.length > 0 ?
                                                                    <div className="accordion-body">
                                                                        {
                                                                            plan.quicknoteList != null && plan.quicknoteList.map((mqitem: any, mqindex: number) => {
                                                                                return <div style={{ padding: '8px', borderBottom: '1px solid #e4ecf2' }} key={mqindex}>
                                                                                    <div className='row w-100 pb-10'>
                                                                                        <div style={{ fontWeight: '500', width: '65%' }}>
                                                                                            Module {mqindex + 1}. {mqitem.ContentName}
                                                                                        </div>
                                                                                        <div style={{ width: '35%', paddingTop: '5px' }}>
                                                                                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;QuickNotes ({zeroPad(mqitem.QuickNoteCount)})</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='ps-1 pt-2'>
                                                                                        {
                                                                                            mqitem.QuickNoteList != null && mqitem.QuickNoteList.map((qitem: any, qindex: number) => {
                                                                                                var isQuickNoteStarted = qitem.IsQuickNoteStarted ? 'In-Progress' : 'Not Started';
                                                                                                var styleBookMarked = qitem.IsBookMarked ? cssBookMarked : cssUnBookMarked;
                                                                                                var styleCompleted = qitem.IsQuickNoteCompleted ? cssCompleted : cssNotCompleted;
                                                                                                return <div className='row' style={{ padding: '10px', margin: '0', borderBottom: '1px solid #e4ecf2', lineHeight: '28px' }} key={qindex}>
                                                                                                    <span className="col-sm-7 col-xs-12" style={{ fontSize: '15px' }}>
                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" style={styleCompleted} fill="currentColor" height="20px" viewBox="0 0 16 16">
                                                                                                            <path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path>
                                                                                                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
                                                                                                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>
                                                                                                        </svg> {qitem.Title} </span>
                                                                                                    <span className='col-sm-5 col-xs-12' style={{ fontSize: '14px', textAlign: 'right' }}>
                                                                                                        {/* <i style={styleBookMarked} className={qitem.IsBookMarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(qitem.QuickNoteId, content.ContentId)} title="Create Bookmark"></i>&nbsp; | &nbsp; */}
                                                                                                        <i className="far fa-clock" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Play Video"></i>
                                                                                                        &nbsp;{qitem.Duration + ' Mins'} &nbsp; | &nbsp;

                                                                                                        <QuickNoteActions content={qitem} item={qitem} isQuickNoteStarted={isQuickNoteStarted} quicknotesData={coursePlanData} courseid={courseid} subscriptionid={subscriptionid} membership={coursePlanData.IsMembershipQuickNoteSubscribed} access={qitem.Access}></QuickNoteActions>
                                                                                                    </span>
                                                                                                </div>
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            })
                                                                        }
                                                                    </div> : <div>
                                                                        {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No QuickNote Found!"}
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div> :
                        <div>
                            {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No data Found!"}
                        </div>
                }
            </div>
        </div>
    );
}
