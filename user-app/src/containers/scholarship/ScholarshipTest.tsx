import React, { useEffect, useState } from 'react'
import '../../assets/css/test.css';
import TrainingService from '../../services/TrainingService';
import { useParams, useNavigate } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import type { TestPapersDTO } from '../../models/dashboard/dashboard';

export default function ScholarshipTest() {
   // alert('scholarship');
    let navigate = useNavigate();
    const { courseid } = useParams();
    const [scholarshipTestData, setScholarshipTestData] = useState<TestPapersDTO | any>();
    const [testpaperid, Settestpaperid] = useState<number>();
    const user = authUser.Get();
    useEffect(() => {
        if(!user) return
        TrainingService.getScholarshipTest(courseid,user?.userId).then(res => {
            setScholarshipTestData(res);
            Settestpaperid(res.TestPaperId);
        })
    }, []);
    const examStartURL = "/user/app/scholarship/test/" + courseid + "/" + testpaperid + "/exam/start";
    const backURL = '/scholarship-exam';
    return (
        <div className='container' style={{ paddingTop: '30px' }}>
            <div className='catinfo'>
                <div className='row'>
                    <div className='col-md-10'>
                        <div className='left'>
                            <figure>
                                <img src={scholarshipTestData.MobileBanner} alt="courseimg"></img>
                            </figure>
                            <div className='caption'>
                                <span>Level: {scholarshipTestData.DifficultyType}</span>
                                <div className="title">{scholarshipTestData.Title}</div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-md-2'>
                        <div style={{ float: 'right', paddingTop: '10px', paddingRight: '10px' }}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i> 
                            <a href={backURL}><strong>Back</strong></a>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="box-shadow">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4"><div className="exam-details">
                            <div className="title">Scholarship Test Details</div>
                            <div className="details-group">
                                <div className="details">
                                    <i className="fa-regular fa-circle-question"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>{scholarshipTestData.TotalQuestions}</strong></span>
                                    &nbsp;&nbsp;<span>Question</span>
                                </div>
                                <div className="details">
                                    <i className="far fa-clock"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>{scholarshipTestData.Duration}</strong>m&nbsp;&nbsp;Time</span>
                                </div>
                                <div className="details">
                                    <i className="far fa-check-circle" aria-hidden="true"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>{scholarshipTestData.TotalQuestions}</strong>&nbsp;&nbsp;Max. Marks</span>
                                </div>
                                <div className="details">
                                    <i className="far fa-thumbs-up" aria-hidden="true"></i>
                                    <span style={{ paddingLeft: '10px' }}><strong>10%</strong>&nbsp;&nbsp;Passing</span>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
  {scholarshipTestData ? (
    <a
      href={examStartURL}
      className="btn btn-startQuiz"
      style={{ background: 'rgb(240, 100, 33)', cursor: 'pointer', fontSize: '14px' }}
    >
      <strong>Start Test11</strong>
    </a>
  ) : (
    <span
      className="btn btn-startQuiz disabled"
      style={{ background: 'rgb(240, 100, 33)', cursor: 'not-allowed', fontSize: '14px', opacity: 0.6 }}
    >
      <strong>Start Test11</strong>
    </span>
  )}
</div>
                        </div></div>
                        <div className="col-sm-8">  <div className="exam-instructions">
                            <div className="title">Scholarship Test Instructions</div>
                            <div>
                                <ol>
                                    <li>The test comprises of the following types of questions: - Multiple Choice Single Response (MCSR) - Multiple Choice Multiple Response (MCMR)</li>
                                    <li>There is no negative marking.</li>
                                    <li>There is a timer at the upper-right corner of the exam screen that indicates the time remaining for the completion of the exam.</li>
                                    <li><strong>Note</strong> - Please do not refresh the page during the exam.</li>
                                </ol>
                            </div>
                        </div>
                     </div>
                  </div>
                </div>
            </div>
        </div>
    )
}