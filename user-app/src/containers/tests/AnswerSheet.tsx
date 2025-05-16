import React, { useEffect, useRef, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import '../../assets/css/test.css';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { QuestionBankOptionsDTO } from '../../models/training/training';

export default function AnswerSheet() {
    const { testpaperid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { subscriptionid } = useParams();
    const { courseid } = useParams();
    const { testattemptedstatusId } = useParams();
    const [ansSheetData, setAnsSheetData] = useState<QuestionBankOptionsDTO | any>();
const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.getAnswerSheet(testpaperid, testattemptedstatusId,user.userId).then(res => {
            setAnsSheetData(res);
            setIsLoading(false);
        })
    }, []);
    const backURL = '/user/app/training/details/' + courseid + '/' + subscriptionid + '/0/tests';
    return <div className='container' style={{ paddingTop: '30px' }}>
        <div className='catinfo p-3'>
            <strong style={{fontSize: '16px' }}>Review the Answers</strong>
            <a href={backURL} style={{float: 'right'}} ><strong><i className="fa fa-arrow-left" aria-hidden="true"></i> Back</strong></a>
        </div>
        {
            (ansSheetData != null && ansSheetData.length > 0) ?
                <div>
                    {
                        ansSheetData.map((question:any, qIndex:number) => {
                            return <div className='box-shadow' key={qIndex}>
                                <div>
                                    <div className={question.IsCorrectAns ? 'temprowcorrect' : question.UsersSelectedAnswer == null ? 'temprowunattempted' : 'temprowincorrect'}>
                                        <div className='col-md-10 d-flex align-items-center'>
                                            <strong style={{ paddingLeft: '10px', fontSize: '16px' }}>Question {qIndex + 1}</strong>
                                        </div>
                                        <div className='col-md-2 d-flex align-items-center' style={{ paddingLeft: '65px' }}>
                                            <div><span className={question.IsCorrectAns ? 'correct' : question.UsersSelectedAnswer == null ? 'unattempted' : 'incorrect'} style={{ float: 'right', fontSize: '16px' }}>&nbsp;&nbsp;{question.IsCorrectAns ? 'Correct' : question.UsersSelectedAnswer == null ? 'Unattempted' : 'Incorrect'}&nbsp;&nbsp;  </span></div>
                                        </div>
                                    </div>
                                    <div className='pt-4'>
                                        <span style={{ paddingLeft: '10px' }}><strong>{question.Title}</strong></span>
                                        <div style={{ paddingLeft: '10px' }}>
                                            {
                                                question != null && question.QuestionOptions != null &&
                                                question.QuestionOptions.map((option:any, oIndex:number) => {
                                                    if (question.QuestionTypeId === 1) {
                                                        return <div key={oIndex} style={{ margin: '3px', marginBottom: '10px' }}>
                                                            <input value={option.OptionChar} checked={question.UsersSelectedAnswer === option.OptionChar} type="radio" readOnly={true} style={{ height: '20px', width: '20px' }} /> <span style={{ paddingLeft: '5px' }}>{option.OptionChar}.&nbsp;&nbsp;{option.OptionTitle}&nbsp;&nbsp;&nbsp;&nbsp;{question.CorrectOption == option.OptionChar ? <span className='optioncorrect'>&nbsp;&nbsp;<i className="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;Right&nbsp;&nbsp;</span> : question.CorrectOption != question.UsersSelectedAnswer && question.UsersSelectedAnswer == option.OptionChar ? <span className='optionincorrect'>&nbsp;&nbsp;<i className="fa fa-xmark" aria-hidden="true"></i>&nbsp;&nbsp;Wrong&nbsp;&nbsp;</span> : ''}</span>
                                                        </div>
                                                    }
                                                    else if (question.QuestionTypeId === 2) {
                                                        const selectedOptions = question.UsersSelectedAnswer?.split(',');
                                                        const correctOptions = question.CorrectOption?.split(',');
                                                        return <div key={oIndex} style={{ margin: '3px', marginBottom: '10px' }}>
                                                            <input value={option.OptionChar} checked={selectedOptions?.indexOf(option.OptionChar) >= 0} type="checkbox" readOnly={true} style={{ height: '20px', width: '20px' }} /> <span style={{ paddingLeft: '5px' }}>{option.OptionChar}.&nbsp;&nbsp;{option.OptionTitle}&nbsp;&nbsp;&nbsp;&nbsp;{correctOptions?.indexOf(option.OptionChar) >= 0 ? <span className='optioncorrect'>&nbsp;&nbsp;<i className="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;Right&nbsp;&nbsp;</span> : question.CorrectOption != question.UsersSelectedAnswer && selectedOptions?.indexOf(option.OptionChar) >= 0 ? <span className='optionincorrect'>&nbsp;&nbsp;<i className="fa fa-xmark" aria-hidden="true"></i>&nbsp;&nbsp;Wrong&nbsp;&nbsp;</span> : ''}</span>
                                                        </div>
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        question.AnswerExplanation != null && question.AnswerExplanation.length > 0 &&
                                        <div className='pt-4'>
                                            <hr style={{ color: 'rgb(221, 221, 221)' }}></hr>
                                            <div className='pt-4'>
                                                <span style={{ paddingLeft: '10px', fontSize: '16px' }}><strong>Explanation:</strong>&nbsp;&nbsp;<p style={{ paddingLeft: '10px', paddingTop: '10px' }}>Answer - {question.CorrectOption}</p></span>
                                                <p dangerouslySetInnerHTML={{ __html: question.AnswerExplanation }} className='pt-2' style={{ paddingLeft: '10px', paddingBottom: '20px' }}></p>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        })
                    }
                </div>
                : <div>
                    {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : " No Course Found!"}
                </div>
        }
    </div>
}