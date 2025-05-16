import React, { useEffect, useRef, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import '../../assets/css/test.css';
import { NavLink, useParams } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import type { QuestionBankOptionsDTO } from '../../models/training/training';

export default function SkillChallengeResult() {

    const { testpaperid } = useParams();
    const { courseid } = useParams();
const user = authUser.Get();
    const [testResultData, setTestResultData] = useState<QuestionBankOptionsDTO | any>();

    useEffect(() => {
        if(!user) return
        TrainingService.getSkillChallengeResult(testpaperid, courseid,user.userId).then(res => {
            setTestResultData(res);
        })
    }, []);
    const backURL = '/user/app/skill/challenge/' + courseid;

    return <div className='container' style={{ paddingTop: '30px' }}>
        <div className='catinfo'>
            <div className='row'>
                <div className='col-md-10'>
                    <div className='left'>
                        <figure>
                            <img src={testResultData.MobileBanner} alt="courseimg" className='img-fluid'></img>
                        </figure>
                        <div className='caption'>
                            <span>Level: {testResultData.DifficultyTypeName}</span>
                            <div className="title">{testResultData.Title}</div>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'>
                    {/* <div style={{ float: 'right', paddingTop: '10px', paddingRight: '10px' }}>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i> <a href={backURL}><strong>Back</strong></a>
                    </div> */}
                    {/* <div style={{float:'right', paddingTop:'45px', paddingRight:'10px'}}>
                        <a href="answersheet"><strong>Answer Sheet</strong></a>
                </div> */}

                </div>
            </div>

        </div>
        <div className='box-shadow'>
            <div className='row skill_imgrslt' style={{ marginBottom: '50px' }}>
                <div className='col-md-3' style={{ textAlign: 'center' }}>
                    <img className="img-full" style={{ paddingTop: '40px' }} src="/images/reports-marks-obtained.60bf4061.svg" alt="img"></img>
                    <span style={{ display: 'block', paddingTop: '15px' }}> <strong style={{ fontSize: '16px' }}>{testResultData.CorrectQuestions}/{testResultData.TotalQuestions}</strong></span>
                    <span style={{ display: 'block', paddingTop: '10px' }}> Marks Obtained</span>
                </div>
                <div className='col-md-3' style={{ borderLeft: '1px solid #ddd', textAlign: 'center' }}>
                    <img className="img-full" style={{ paddingTop: '40px' }} src="/images/reports-scrore.db803ff3.svg" alt="img"></img>
                    <span style={{ display: 'block', paddingTop: '15px' }}> <strong style={{ fontSize: '16px' }}>{testResultData.Percentage}</strong></span>
                    <span style={{ display: 'block', paddingTop: '10px' }}>Your Score</span>
                </div>
                <div className='col-md-3' style={{ borderLeft: '1px solid #ddd', textAlign: 'center' }}>
                    <img className="img-full" style={{ paddingTop: '40px' }} src="/images/reports-time-tacken.3f85260b.svg" alt="img"></img>
                    <span style={{ display: 'block', paddingTop: '15px' }}> <strong style={{ fontSize: '16px' }}>{testResultData.Mins < 10 ? '0' + testResultData.Mins : testResultData.Mins}:{testResultData.Secs < 10 ? '0' + testResultData.Secs : testResultData.Secs}</strong></span>
                    <span style={{ display: 'block', paddingTop: '10px' }}>Time Taken</span>
                </div>
                <div className='col-md-3' style={{ borderLeft: '1px solid #ddd', textAlign: 'center' }}>
                    <img className="img-full" style={{ paddingTop: '40px' }} src={testResultData.IsPass ? '/images/reports-pass-result.e1fd0efc.svg' : '/images/sad-emoji.f537e7a6.svg'} alt="img"></img>
                    <span style={{ display: 'block', paddingTop: '15px' }}> <strong style={{ fontSize: '16px' }}>{testResultData.IsPass ? 'PASS' : 'FAIL'}</strong></span>
                    <span style={{ display: 'block', paddingTop: '10px' }}>Result</span>
                </div>
            </div>
            <div className='text-center pt-3 pb-3'>
                <NavLink className='btn btn-primary btn-lg' to="/user/app">Go to Dashboard</NavLink>
            </div>
        </div>
    </div>
}