import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import TrainingService from '../../services/TrainingService';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import { useParams } from 'react-router-dom';

import '../../assets/css/labs.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { UserTranningDTO } from '../../models/dashboard/dashboard';
import HandsOnLabActions from '../Action/HandsOnLabActions';
const zeroPad = (num:any, places = 2) => String(num).padStart(places, '0')

export default function Labs() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [labData, setLabData] = useState<UserTranningDTO | any>();
    const [LabGuidePdf] = useOutletContext<any>();
    const [isLoading, setIsLoading] = useState(false);
    const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.getLabs(courseid, batchid, user?.userId).then(res => {
            setLabData(res);
            setIsLoading(false);
        })
    }, []);
    const bookMarkClick = (contentId:any, courseId:any) => {
        if(!user) return
        const ContentBookMarksDTO = ({ CourseId: courseId, ContentId: contentId, CourseType: 8, UserId:user.userId });
        TrainingService.setContentBookMarked(ContentBookMarksDTO).then(res => { });
        TrainingService.getLabs(courseid, batchid, user?.userId).then(res => {
            setLabData(res);
        })
    }
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
                labData != null && labData.CourseLabs != null && labData.CourseLabs.length > 0 && labData.TotalLabs &&
                <div className='col-sm-4 offset-sm-8 col-xs-4 offset-sm-7'>
                    <span style={{ fontSize: '14px' }}><strong>OverAll Progress</strong></span>
                    <span className='ps-1' style={{ fontSize: '12px' }}>({labData.LabProgress}%)</span>
                    {
                        labData != null && labData.TotalLabs > 0 &&
                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{labData.TotalCompletedLabs}</strong> out of <strong>{labData.TotalLabs}</strong> Labs</span>
                    }

                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                        <div className="progress-bar" style={{ width: labData.LabProgress + '%', height: '10px' }}></div>
                    </div>

                </div>
            }

            <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                {
                    (labData != null && labData.CourseLabs != null && labData.CourseLabs.length > 0) ?
                        <>
                            {
                                LabGuidePdf != null && <div className="box-shadow mb-3">
                                    <div className="p-2">
                                        <span className="float-start mt-2 ms-2 mb-3"><strong className=" "> Download Lab Guide</strong> - A detailed System Setup Guide for your hands-on</span>
                                        <a href={IMAGE_ADDRESS + LabGuidePdf} className="float-end btn btn-primary me-3 mb-1"> <i className="fa-solid fa-file-arrow-down"></i> &nbsp;Download</a>
                                    </div>
                                </div>
                            }
                            {
                                (labData.IsLabSubscribed == false || labData.IsTrialSubscribed == true || labData.IsMembershipLabSubscribed == false) && <div className="box-shadow">
                                    <div className="p-2">
                                        <span className="float-start mt-2 ms-2 mb-3"><strong>Subscribe Labs </strong> - Subscribe and get access to all Labs.</span>
                                        <a href={labData.CourseURL} className="float-end btn btn-primary me-3 mb-1"> &nbsp;Subscribe</a>
                                    </div>
                                </div>
                            }
                            <div className="pt-2">
                                {
                                    labData.CourseLabs.map((content:any, cIndex:number) => {
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
                                                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}><i className="fa-solid fa-bars-staggered"></i> &nbsp;Labs ({zeroPad(content.LabList.length)})</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h4>
                                            <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                                                <div className="accordion-body p-0">
                                                    {
                                                        content.LabList.map((item:any, index:number) => {
                                                            var isLabStarted = item.IsLabStarted ? 'In-Progress' : 'Not Started';
                                                            var styleBookMarked = item.IsBookMarked ? cssBookMarked : cssUnBookMarked;
                                                            var styleCompleted = item.IsLabCompleted ? cssCompleted : cssNotCompleted;
                                                            return <div className='row' style={{ padding: '10px', margin: '0', borderBottom: '1px solid #e4ecf2', lineHeight: '28px' }} key={index}>
                                                                <span className="col-sm-7 col-xs-12" style={{ fontSize: '15px' }}><i style={styleCompleted} className="fa-solid fa-flask"></i> {item.Name} </span>
                                                                <span className='col-sm-5 col-xs-12' style={{ fontSize: '14px', textAlign: 'right' }}>
                                                                    <i style={styleBookMarked} className={item.IsBookMarked ? 'fas fa-bookmark' : 'far fa-bookmark'} onClick={() => bookMarkClick(item.LabId, content.ContentId)} title="Create Bookmark"></i>&nbsp; | &nbsp;
                                                                    <i className="far fa-gem"></i>&nbsp;{item.LearningPoints}&nbsp; | &nbsp;
                                                                    <i className="far fa-clock" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Play Video"></i>
                                                                    &nbsp;{item.Duration + ' Mins'} &nbsp; | &nbsp;
                                                                    <HandsOnLabActions item={item} isLabStarted={isLabStarted} labData={labData} courseid={courseid} subscriptionid={subscriptionid} membership={labData.IsMembershipLabSubscribed} access={true}></HandsOnLabActions>
                                                                </span>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div></> : <div>
                            {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Lab Found!"}
                        </div>
                }
            </div>
        </div>
    )
}
