import React, { useEffect, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import '../../assets/css/test.css';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { SubscribeCourseDetailDTO } from '../../models/training/training';

export default function Tests() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [sessionData, setSessionData] = useState<SubscribeCourseDetailDTO>();
    const [isLoading, setIsLoading] = useState(false);
    const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        if(!user) return;
        TrainingService.getTestPapers(courseid?parseInt(courseid) : null, subscriptionid, batchid, user.userId, user.membershipId).then(res => {
            setSessionData(res);
            setIsLoading(false);
        })
    }, []);

    console.log(sessionData);
    
    return (
        <div className="mt-4">
            <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                {
                    (sessionData != null && sessionData.AssingTestList != null && sessionData.AssingTestList.length > 0) ?
                        <div className="row">
                            {
                                sessionData.IsTestPaperSubscribed == false && <div className="box-shadow">
                                    <div className="p-2">
                                        <span className="float-start mt-2 ms-2 mb-3"><strong>Subscribe Skill Tests</strong> - Subscribe and get access to all Skill Tests.</span>
                                        <a href={`${sessionData.CourseURL}`} className="float-end btn btn-primary me-3 mb-1"> &nbsp;Subscribe</a>
                                    </div>
                                </div>
                            }
                            {/* <div className='row'> */}
                            <div className='col-sm-4 offset-sm-8 col-xs-4 offset-sm-7'>
                                <span style={{ fontSize: '14px' }}><strong>OverAll Progress</strong></span>
                                <span className='ps-1' style={{ fontSize: '12px' }}>({sessionData.TestPerformance}%)</span>
                                {
                                    sessionData != null && sessionData.TotalTestCount > 0 &&
                                    <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{sessionData.CompletedTestCount}</strong> out of <strong>{sessionData.TotalTestCount}</strong> Skill Test</span>
                                }

                                <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                    <div className="progress-bar" style={{ width: sessionData.TestPerformance + '%', height: '10px' }}></div>
                                </div>
                            </div>
                            {/* </div> */}

                            <div className='pt-3'>
                                {
                                    sessionData.AssingTestList.map((item, cIndex) => {
                                        let accordianShow = cIndex == 0 ? 'show' : '';
                                        let accordianCollapse = cIndex == 0 ? '' : 'collapsed';
                                        const takeTestURL = "/user/app/test/" + courseid + "/" + subscriptionid + "/" + item.TestPaperId;
                                        return <div key={cIndex} className="accordion-item">
                                            <h4 className="accordion-header" id={`heading-${item.TestPaperId}`}>
                                                <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section${cIndex}`} style={{ background: 'rgb(246 249 253)' }}>
                                                    <div className='row w-100'>
                                                        <div style={{ fontWeight: '500', width: '65%' }}>
                                                            {cIndex + 1}. {item.Title}
                                                        </div>
                                                        <div style={{ width: '35%', paddingTop: '5px' }}>
                                                            <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}></span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h4>
                                            <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                                                <div className="accordion-body p-0">
                                                    {
                                                        <div>
                                                            <div className='p-3'> {item.TestAttemptedStatusList != null ?
                                                                <span className='h6 '>Your Previous Attempts</span> : <span>&nbsp;</span>}
                                                                <span className='float-end pb-2'>
                                                                    <span style={{ fontSize: '14px' }}>
                                                                        {
                                                                            sessionData.IsTestPaperSubscribed == true ? item.TestAttemptedStatusList != null && item.TestAttemptedStatusList.length >= 5 ? '' : <a href={takeTestURL} className="btn btn-primary" style={{ lineHeight: '1.3' }}>Take Test</a>
                                                                                : <button type="button" className="btn-sm ms-2" style={{ lineHeight: '1.3', backgroundColor: 'dimgrey !important', color: 'Linen !important', opacity: '1' }} disabled>Start Now</button>
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </div>
                                                            {
                                                                item.TestAttemptedStatusList != null &&
                                                                <div className="table mb-0">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr style={{ backgroundColor: '#66849c', color: 'white' }}>
                                                                                <td>Date</td>
                                                                                <td>Marks</td>
                                                                                <td>Percentage</td>
                                                                                <td>CorrectQuestions</td>
                                                                                <td>WrongQuestions</td>
                                                                                <td>LeftQuestions</td>
                                                                                <td>Time Taken</td>
                                                                                <td>Result</td>
                                                                                <td>Answer Sheet</td>
                                                                            </tr>
                                                                            {
                                                                                item.TestAttemptedStatusList != null && item.TestAttemptedStatusList.map((test, testI) => {
                                                                                    const answerSheetUrl = '/user/app/test/' + courseid + '/' + subscriptionid + '/' + item.TestPaperId + '/' + test.TestAttemptedStatusId + '/exam/answersheet';
                                                                                    return <tr key={testI}>
                                                                                        <td>{moment(test.TestTakenDate).format('ddd, MMM DD, YYYY')}</td>
                                                                                        <td>{test.Score}</td>
                                                                                        <td>{test.Percentage}%</td>
                                                                                        <td>{test.CorrectQuestions}</td>
                                                                                        <td>{test.WrongQuestions}</td>
                                                                                        <td>{test.LeftQuestions}</td>
                                                                                        <td>{test.TimeTaken} Sec.</td>
                                                                                        <td>{test.IsPass ? 'PASS' : 'FAIL'}</td>
                                                                                        <td><a href={answerSheetUrl}>View Answers</a></td>
                                                                                    </tr>
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                {
                                    sessionData != null && sessionData.AssingTestList == null &&
                                    <div>
                                        No Skill Test Found!
                                    </div>
                                }
                            </div>
                        </div> : <div>
                            {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Skill Test Found!"}
                        </div>
                }
            </div>
        </div>
    )
}