import React, { useEffect, useState } from 'react'
import '../../assets/css/test.css';
import TrainingService from '../../services/TrainingService';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import authUser from '../../helpers/authUser';
import type { TestPapersDTO } from '../../models/dashboard/dashboard';

export default function SkillTest() {
    let navigate = useNavigate();
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    // const { batchid } = useParams();
    const { testpaperid } = useParams();
    const [skillTestData, setSkillTestData] = useState<TestPapersDTO>();
    const user = authUser.Get();
    useEffect(() => {
        if(!user) return 
        TrainingService.getSkillTest(courseid, subscriptionid, testpaperid, user.userId).then(res => {
            setSkillTestData(res);
        })
    }, []);
    const examStartURL = "/user/app/test/" + courseid + "/" + subscriptionid + "/" + testpaperid + "/exam/start";
    const backURL = '/user/app/training/details/' + courseid + '/' + subscriptionid + '/0/tests';
    return (
        <div className='container' style={{ paddingTop: '30px' }}>
            <div className='catinfo'>
                <div className='row p-4 pb-0'>
                    <div className='col-md-10'>
                        <div className='left'>
                            <figure>
                                <img src={skillTestData?.MobileBanner} alt="course"></img>
                            </figure>
                            <div className='caption'>
                                <span>Level: {skillTestData?.DifficultyType}</span>
                                <div className="title">{skillTestData?.Title}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <div style={{ float: 'right', paddingTop: '10px', paddingRight: '10px' }}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i> <a href={backURL}><strong>Back</strong></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="box-shadow">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4"><div className="exam-details">
                            <div className="title">Exam Details</div>
                            <div className="details-group">
                                <div className="details">
                                    <i className="fa-regular fa-circle-question"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>{skillTestData?.TotalQuestions}</strong></span>
                                    &nbsp;&nbsp;<span>Question</span>
                                </div>
                                <div className="details">
                                    <i className="far fa-clock"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>{skillTestData?.Duration}</strong>m&nbsp;&nbsp;Time</span>
                                </div>
                                <div className="details">
                                    <i className="far fa-check-circle" aria-hidden="true"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>40</strong>&nbsp;&nbsp;Max. Marks</span>
                                </div>
                                <div className="details">
                                    <i className="far fa-thumbs-up" aria-hidden="true"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>80%</strong>&nbsp;&nbsp;Passing</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}><a href={examStartURL} className="btn btn-startQuiz" style={{ background: 'rgb(240, 100, 33)', cursor: 'pointer', fontSize: '14px' }}><strong>Start Test</strong></a></div>
                        </div></div>
                        <div className="col-sm-8">  <div className="exam-instructions">
                            <div className="title">Exam Instructions</div>
                            <div>
                                <ol>
                                    <li>The exam comprises of the following types of questions: - Multiple Choice Single Response (MCSR) - Multiple Choice Multiple Response (MCMR)</li>
                                    <li>There is no negative marking.</li>
                                    <li>There is a timer at the upper-right corner of the exam screen that indicates the time remaining for the completion of the exam.</li>
                                    <li><strong>Pause Test</strong> - You can pause the ongoing test anytime by clicking on "Pause Test" button next to timer on the upper right corner. the timer/test will pause and resume only after you click on "continue the last attempt" button.</li>
                                </ol>
                            </div>
                        </div></div>
                    </div>
                </div>
            </div>
            {/* {
                skillTestData && skillTestData.TestAttemptedStatus != null && skillTestData.TestAttemptedStatus.length > 0 &&
                <div>
                    <div className='h5 p-2 pt-4'>Your Previous Attempts</div>
                    <div className="table">
                        <table>
                            <tbody>
                                <tr style={{ backgroundColor: '#796eff', color: 'white' }}>
                                  
                                    <td>Date</td>
                                    <td>Status</td>
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
                                    skillTestData.TestAttemptedStatus.map((item, index) => {
                                        const answerSheetUrl = '/user/app/test/' + courseid + '/' + subscriptionid+ '/' +testpaperid + '/' + item.TestAttemptedStatusId +'/exam/answersheet';
                                        return <tr key={index}>
                                           
                                            <td>{moment(item.TestTakenDate).format('ddd, MMM DD, YYYY')}</td>
                                            <td>{item.Status}</td>
                                            <td>{item.Score}</td>
                                            <td>{item.Percentage}</td>
                                            <td>{item.CorrectQuestions}</td>
                                            <td>{item.WrongQuestions}</td>
                                            <td>{item.LeftQuestions}</td>
                                            <td>{item.TimeTaken} Sec.</td>
                                            <td>{item.IsPass?'PASS':'FAIL'}</td>
                                            <td><a href={answerSheetUrl}>View Answers</a></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            } */}
        </div>
    )

}