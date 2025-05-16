import React, { useEffect, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import QuickNoteActions from '../Action/QuickNoteActions';
import type { UserTranningDTO } from '../../models/dashboard/dashboard';

const zeroPad = (num:any, places = 2) => String(num).padStart(places, '0')

export default function QuickNotes() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();

    const [quicknotesData, setQuicknotesData] = useState<UserTranningDTO |any>();
    const [isLoading, setIsLoading] = useState(false);
    const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.getQuickNotes(courseid, user.userId).then(res => {
            setQuicknotesData(res);
            setIsLoading(false);
        })
    }, []);
    //console.log(quicknotesData);
    const bookMarkClick = (contentId:any, courseId:any) => {
        if(!user) return
        const ContentBookMarksDTO = ({ CourseId: courseId, ContentId: contentId, CourseType: 13,UserId:user?.userId });
        TrainingService.setContentBookMarked(ContentBookMarksDTO).then(res => {
            TrainingService.getQuickNotes(courseid, user.userId).then(res => {
                setQuicknotesData(res);
            })
        });

    }
    //console.log(quicknotesData);
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
                quicknotesData != null && quicknotesData.CourseQuickNote != null && quicknotesData.CourseQuickNote.length > 0 && quicknotesData.TotalQuickNotes &&
                <div className='col-sm-4 offset-sm-8 col-xs-4 offset-sm-7'>
                    <span style={{ fontSize: '14px' }}><strong>OverAll Progress</strong></span>
                    <span className='ps-1' style={{ fontSize: '12px' }}>({quicknotesData.QuickNoteProgress}%)</span>
                    {
                        quicknotesData != null && quicknotesData.TotalQuickNotes > 0 &&
                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{quicknotesData.TotalCompletedQuickNotes}</strong> out of <strong>{quicknotesData.TotalQuickNotes}</strong> QuickNotes</span>
                    }

                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                        <div className="progress-bar" style={{ width: quicknotesData.QuickNoteProgress + '%', height: '10px' }}></div>
                    </div>

                </div>
            }

            <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                {
                    (quicknotesData != null && quicknotesData.CourseQuickNote != null && quicknotesData.CourseQuickNote.length > 0) ?
                        <div className="pt-3">
                            {
                                (quicknotesData.IsQuickNoteSubscribed == false || quicknotesData.IsTrialSubscribed == true || quicknotesData.IsMembershipQuickNoteSubscribed == false) && <div className="box-shadow">
                                    <div className="p-2">
                                        <span className="float-start mt-2 ms-2 mb-3"><strong>Subscribe QuickNote </strong> - Subscribe and get access to all QuickNotes.</span>
                                        <a href={quicknotesData.CourseURL} className="float-end btn btn-primary me-3 mb-1"> &nbsp;Subscribe</a>
                                    </div>
                                </div>
                            }

                            {
                                quicknotesData.CourseQuickNote.map((content:any, cIndex:number) => {
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
                                                        <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;QuickNotes ({zeroPad(content.QuickNoteList.length)})</span>
                                                    </div>
                                                </div>
                                            </button>
                                        </h4>
                                        <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                                            <div className="accordion-body p-0">
                                                {
                                                    content.QuickNoteList.map((item:any, index:number) => {

                                                        var isQuickNoteStarted = item.IsQuickNoteStarted ? 'In-Progress' : 'Not Started';
                                                        var styleBookMarked = item.IsBookMarked ? cssBookMarked : cssUnBookMarked;
                                                        var styleCompleted = item.IsQuickNoteCompleted ? cssCompleted : cssNotCompleted;
                                                        return <div className='row' style={{ padding: '10px', margin: '0', borderBottom: '1px solid #e4ecf2', lineHeight: '28px' }} key={index}>
                                                            <span className="col-sm-7 col-xs-12" style={{ fontSize: '15px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" style={styleCompleted} fill="currentColor" height="20px" viewBox="0 0 16 16">
                                                                    <path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path>
                                                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
                                                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>
                                                                </svg> {item.Title} </span>
                                                            <span className='col-sm-5 col-xs-12' style={{ fontSize: '14px', textAlign: 'right' }}>
                                                                <i style={styleBookMarked} className={item.IsBookMarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(item.QuickNoteId, content.ContentId)} title="Create Bookmark"></i>&nbsp; | &nbsp;
                                                                <i className="far fa-clock" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Play Video"></i>
                                                                &nbsp;{item.Duration + ' Mins'} &nbsp; | &nbsp;

                                                                <QuickNoteActions content={content} item={item} isQuickNoteStarted={isQuickNoteStarted} quicknotesData={quicknotesData} courseid={courseid} subscriptionid={subscriptionid} membership={quicknotesData.IsMembershipQuickNoteSubscribed} access={true}></QuickNoteActions>
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

