import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
import TrainingService from '../../services/TrainingService';

import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';
import type { UserTranningDTO } from '../../models/dashboard/dashboard';
import BookAction from '../Action/BookAction';

const zeroPad = (num:any, places=2) => String(num).padStart(places, '0')
export default function Books() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [qnATextData, setQnATextData] = useState<UserTranningDTO | any>();
    const courseType = EnumCourseType.QnA;
    const user = authUser.Get();

    useEffect(() => {        
        setIsLoading(true);
        if(!user) return
        TrainingService.getQnATextData(courseid, user.userId).then(res => {
            setQnATextData(res);
            //console.log(res.data);
            setIsLoading(false);
        })
        
    }, []);
   
    const cssBookMarked = {
        color: '#009688',
        fontSize: '16px',
        cursor: 'pointer'
    }
    const cssUnBookMarked = {
        fontSize: '16px',
        cursor: 'pointer'
    }
    const cssCompleted = {
        color: '#009688'
    }
    const cssNotCompleted = {
        color: ''
    }

    return (
            <div className="mt-4">
                {
                    qnATextData != null && qnATextData.CourseQuickNote != null && qnATextData.CourseQuickNote.length > 0 && qnATextData.TotalQuickNotes &&
                    <div className='col-sm-4 offset-sm-8 col-xs-4 offset-sm-7'>
                        <span style={{ fontSize: '14px' }}><strong>OverAll Progress</strong></span>
                        <span className='ps-1' style={{ fontSize: '12px' }}>({qnATextData.QuickNoteProgress}%)</span>
                        {
                            qnATextData != null && qnATextData.TotalQuickNotes > 0 &&
                            <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{qnATextData.TotalCompletedQuickNotes}</strong> out of <strong>{qnATextData.TotalQuickNotes}</strong> QnA Text</span>
                        }
    
                        <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                            <div className="progress-bar" style={{ width: qnATextData.QuickNoteProgress + '%', height: '10px' }}></div>
                        </div>
    
                    </div>
                }
    
                <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                    {
                        (qnATextData != null && qnATextData.CourseQuickNote != null && qnATextData.CourseQuickNote.length > 0) ?
                            <div className="pt-3">
                                {
                                    (qnATextData.IsBookSubscribed == false || qnATextData.IsTrialSubscribed == true || qnATextData.IsMembershipBookSubscribed == false) && <div className="box-shadow">
                                        <div className="p-2">
                                            <span className="float-start mt-2 ms-2 mb-3"><strong>Subscribe QnA Notes </strong> - Subscribe and get access to all QnA Notes.</span>
                                            <a href={qnATextData.CourseURL} className="float-end btn btn-primary me-3 mb-1"> &nbsp;Subscribe</a>
                                        </div>
                                    </div>
                                }
    
                                {
                                    qnATextData.CourseQuickNote.map((content:any, cIndex:number) => {
                                        let accordianShow = cIndex == 0 ? 'show' : '';
                                        let accordianCollapse = cIndex == 0 ? '' : 'collapsed';
                                        return <div key={cIndex} className="accordion-item">
                                            <h4 className="accordion-header" id={`heading-${content.ContentId}`}>
                                                <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section${cIndex}`} style={{ background: 'rgb(246 249 253)' }}>
                                                    <div className='row w-100'>
                                                        <div style={{ fontWeight: '500', width: '65%' }}>
                                                            Module {cIndex + 1}. {content.ContentName}
                                                        </div>
                                                        <div style={{ width: '35%', paddingTop: '5px' }}>
                                                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;QnA ({zeroPad(content.InterviewQuestionList.length)})</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h4>
                                            <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                                                <div className="accordion-body p-0">
                                                    {
                                                        content.InterviewQuestionList.map((item:any, index:number) => {
    
                                                            var isQnATextStarted = item.IsQnATextStarted ? 'In-Progress' : 'Not Started';
                                                            var styleBookMarked = item.IsBookMarked ? cssBookMarked : cssUnBookMarked;
                                                            var styleCompleted = item.IsQuickNoteCompleted ? cssCompleted : cssNotCompleted;
                                                            return <div className='row' style={{ padding: '10px', margin: '0', borderBottom: '1px solid #e4ecf2', lineHeight: '28px' }} key={index}>
                                                                <span className="col-sm-7 col-xs-12" style={{ fontSize: '15px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-240q21 0 35.5-14.5T530-290q0-21-14.5-35.5T480-340q-21 0-35.5 14.5T430-290q0 21 14.5 35.5T480-240Zm-36-154h74q0-36 8-53t34-43q35-35 49.5-58.5T624-602q0-53-36-85.5T491-720q-55 0-93.5 27T344-618l66 26q7-27 28-43.5t49-16.5q27 0 45 14.5t18 38.5q0 17-11 36t-37 42q-33 29-45.5 55.5T444-394ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg> {item.Title} </span>
                                                                <span className='col-sm-5 col-xs-12' style={{ fontSize: '14px', textAlign: 'right' }}>
                                                                    {/* <i style={styleBookMarked} className={item.IsBookMarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(item.QuickNoteId, content.ContentId)} title="Create Bookmark"></i>&nbsp; | &nbsp; */}
                                                                    <i className="far fa-clock" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Play Video"></i>
                                                                    &nbsp;{item.Duration + ' Mins'} &nbsp; | &nbsp;
    
                                                                    <BookAction content={content} item={item} isQnATextStarted={isQnATextStarted} qnATextData={qnATextData} courseid={courseid} subscriptionid={subscriptionid} membership={qnATextData.IsMembershipBookSubscribed} access={true}></BookAction>
                                                                </span>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div> : <div>
                                {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Quick Notes Found!"}
                            </div>
                    }
                </div>
            </div>
        )
    }
    
    