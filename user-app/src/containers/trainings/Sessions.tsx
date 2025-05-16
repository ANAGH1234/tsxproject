import React, { useEffect, useState } from 'react'
import { useOutletContext } from "react-router-dom";
import TrainingService from '../../services/TrainingService';
import { IMAGE_ADDRESS } from '../../helpers/constant';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { SubscribeCourseDetailDTO } from '../../models/training/training';
import SessionActions from '../Action/SessionActions';

export default function Sessions() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [sessionData, setSessionData] = useState<SubscribeCourseDetailDTO | any>();
    const [LabGuidePdf] = useOutletContext<any>();
    const [isLoading, setIsLoading] = useState(false);
    const user = authUser.Get();

    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.getLiveSessions(courseid, subscriptionid, batchid, user.userId, user.membershipId).then(res => {
            setSessionData(res);
            setIsLoading(false);
        })
    }, []);

    return (
        <div className="mt-4">
            <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                {
                    sessionData != null && sessionData.CurRecTopiclist != null && sessionData.CurRecTopiclist.length > 0 && sessionData.BatchWisePerformace != null && sessionData.BatchWisePerformace != undefined && 
                    <div className='row'>
                        <div className='col-sm-4 offset-sm-8 col-xs-4 offset-sm-7'>
                            <span style={{ fontSize: '14px' }}><strong>OverAll Progress</strong></span>
                            <span className='ps-1' style={{ fontSize: '12px' }}>({sessionData.BatchWisePerformace}%)</span>
                            {
                                sessionData != null && sessionData.TotalLessons > 0 &&
                                <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{sessionData.CompletedLessons}</strong> out of <strong>{sessionData.TotalLessons}</strong> Lessons</span>
                            }
                            
                            <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                <div className="progress-bar" style={{ width: sessionData.BatchWisePerformace + '%', height: '10px' }}></div>
                            </div>
                        </div>
                    </div>
                }
                {
                    (sessionData != null && sessionData.CurRecTopiclist != null && sessionData.CurRecTopiclist.length > 0) ?
                        <div className="pt-3">
                            {
                                LabGuidePdf != null && <div className="box-shadow">
                                    <div className="p-2">
                                        <span className="float-start mt-2 ms-2 mb-3"><strong className=" "> Download Lab Guide</strong> - A detailed System Setup Guide for your hands-on</span>
                                        <a href={IMAGE_ADDRESS + LabGuidePdf} className="float-end btn btn-primary me-3 mb-1"> <i className="fa-solid fa-file-arrow-down"></i> &nbsp;Download</a>
                                    </div>
                                </div>
                            }
                            {
                                (sessionData.IsLiveSessionsSubscribed == false) && <div className="box-shadow">
                                    <div className="p-2">
                                        <span className="float-start mt-2 ms-2 mb-3"><strong>Subscribe Live Training</strong> - Subscribe and get access to all Videos, Codes and PPTs.</span>
                                        <a href={`${sessionData.CourseURL}`} className="float-end btn btn-primary me-3 mb-1"> &nbsp;Subscribe</a>
                                    </div>
                                </div>
                            }
                            {
                                sessionData.CurRecTopiclist.map((item:any, index:number) => {
                                    const cloudCodePath = IMAGE_ADDRESS + item.CodePath;
                                    const cloudPdfPath = IMAGE_ADDRESS + item.PdfPath;
                                    return <div style={{ padding: '10px', background: 'rgba(216, 211, 211, 0.18)', margin: '8px 0', minHeight: '50px' }} key={index}>
                                        <div className='row'>
                                            <div className='col-sm-5 col-xs-12' style={{ paddingTop: '5px' }}>
                                                <i className="fa fa-play-circle" aria-hidden="true" style={{ marginRight: '4px' }} data-original-title="Play Video"></i>
                                                <span>{item.TopicName} </span>
                                            </div>                 
                                            <SessionActions item={item} sessionData={sessionData} cloudPdfPath={cloudPdfPath} cloudCodePath={cloudCodePath} courseid={courseid} subscriptionid={subscriptionid}></SessionActions>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : <div>
                            {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Session Found!"}
                        </div>
                }
            </div>
        </div>
    )
}
