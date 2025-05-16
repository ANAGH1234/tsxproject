import React, { useEffect, useRef, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import '../../assets/css/test.css';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';

export default function ExamDetails() {
    let timerTestData;
    let navigate = useNavigate();
    const { testpaperid } = useParams();
    // const {batchid} = useParams();
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
const user = authUser.Get();
    const [testData, setTestData] = useState([]);
    const [totalQ, setTotalQ] = useState([]);
    let [currentQ, setCurrentQ] = useState([]);
    let [filterTestData, setFilterTestData] = useState([]);
    const [selectedMultipleAns, setSelectedMultipleAns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let durationInSeconds;
    let timerMinute;
    let timerSecond;

    useEffect(() => {
        setIsLoading(true);
        TrainingService.GetTestDetails(testpaperid,user.UserId).then(res => {
            setTestData(res.data);
            timerTestData = res.data;
            setTotalQ(res.data[0].TotalQuestions);
            currentQ = res.data[0].AttemptedQuestionCount + 1;
            setCurrentQ(currentQ);
            setFilterTestData(res.data.filter((test) => {
                // return test.Sequence === currentQ;
                return test.QuestionN === currentQ;
            }))
            durationInSeconds = res.data[0].Duration;
            timerMinute = res.data[0].Mins;
            timerSecond = res.data[0].Secs == 0 ? '00' : res.data[0].Secs;
            clearTimer(getDeadTime());
            setIsLoading(false);
        })
    }, []);

    // let completed = false;
    const Ref = useRef(null);
    // The state for our timer
    const [timer, setTimer] = useState('00:00');


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        // const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            // total, hours, minutes, seconds
            total, minutes, seconds
        };
    }


    const startTimer = (e) => {
        // let { total, hours, minutes, seconds }
        let { total, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            if (total == 0) {
                swal.fire('', `Times Up!`, 'warning').then(
                    function (okay) {
                        autoSubmitAllQ();
                        return false;
                    }
                );
            }

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                // (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer(timerMinute + ':' + timerSecond);

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + durationInSeconds);
        return deadline;
    }

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    const ul = {
        margin: '0 auto',
        padding: '0',
        border: '0',
        outline: '0',
        fontSize: '100%',
        verticalAlign: 'baseline',
        background: 'transparent',
        textDecoration: 'none',
        listStyle: 'none',
        outline: 'none',
        boxSizing: 'border-box'
    }
    const ul_li = {
        display: '-webkit-flex',
        display: 'flex',
        AlignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        background: '#f5f7fa',
        width: '36px',
        height: '36px',
        lineHeight: '36px',
        textAlign: 'center',
        padding: '',
        margin: '0 auto',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: '.2s ease-in-out',
        float: 'left',
        marginBottom: '10px',
        marginRight: '10px',
        marginTop: '10px',
        position: 'relative'
    }
    const prev = '< Prev';
    const next = 'Next >';
    let type;
    const nextQ = () => {
        setSelectedMultipleAns([]);

        let selectedAnsTestData = testData;
        selectedAnsTestData.forEach(element => {
            // if (element.Sequence === currentQ) {
            if (element.QuestionN === currentQ) {
                element.Mins = timer.split(':')[0];
                element.Secs = timer.split(':')[1];
                // element.BatchId = batchid;
                return;
            }
        });
        setTestData(selectedAnsTestData);
        timerTestData = selectedAnsTestData;

        currentQ = currentQ + 1;
        setCurrentQ(currentQ);
        setFilterTestData(testData.filter((test) => {
            // return test.Sequence === currentQ;
            return test.QuestionN === currentQ;
        }))
        // console.log(testData);
        TrainingService.SaveQuestionAns(testData).then(res => { });
    }
    const prevQ = () => {
        setSelectedMultipleAns([]);
        currentQ = currentQ - 1;
        setCurrentQ(currentQ);
        setFilterTestData(testData.filter((test) => {
            // return test.Sequence === currentQ;
            return test.QuestionN === currentQ;
        }))
    }
    const qClick = (qNumber) => {
        setSelectedMultipleAns([]);

        let selectedAnsTestData = testData;
        selectedAnsTestData.forEach(element => {
            // if (element.Sequence === currentQ) {
            if (element.QuestionN === currentQ) {
                element.Mins = timer.split(':')[0];
                element.Secs = timer.split(':')[1];
                // element.BatchId = batchid;
                return;
            }
        });
        setTestData(selectedAnsTestData);
        timerTestData = selectedAnsTestData;
        currentQ = qNumber;
        setCurrentQ(currentQ);
        setFilterTestData(testData.filter((test) => {
            // return test.Sequence === currentQ;
            return test.QuestionN === currentQ;
        }))

        TrainingService.SaveQuestionAns(testData).then(res => { });
    }

    let correctQuestions = 0;
    let score = 0;
    let wrongQuestions = 0;
    let leftQuestions = 0;

    const autoSubmitAllQ = () => {
        timerTestData.forEach(element => {
            if (element.UsersSelectedAnswer != undefined && element.UsersSelectedAnswer != null) {
                if (element.UsersSelectedAnswer == element.CorrectOption) {
                    score++;
                    correctQuestions++;
                } else {
                    wrongQuestions++;
                }
            }
            else {
                leftQuestions++;
            }
        });
        let selectedAnsTestData = timerTestData;
        selectedAnsTestData.forEach(element => {
            element.CorrectQuestions = correctQuestions;
            element.WrongQuestions = wrongQuestions;
            element.LeftQuestions = leftQuestions;
            element.Score = score;
            element.Percentage = parseInt((score / element.TotalQuestions) * 100);
            element.Mins = timer.split(':')[0];
            element.Secs = timer.split(':')[1];
        });
        TrainingService.AutoSaveAllQuestionAns(selectedAnsTestData).then(res => {
            if (res.data > 0) {
                const url = '/user/app/test/' + courseid + '/' + subscriptionid + '/' + testpaperid + '/' + res.data + '/exam/result';
                navigate(url);
            }
            else {
                const url = '/user/app/test/' + courseid + '/' + subscriptionid + '/' + testpaperid + '/' + res.data + '/exam/result';
                navigate(url);
            }
        });
    }
    const submitAllQ = () => {
        swal.fire({
            title: "",
            text: "Are you sure, You want to submit Test Paper?",
            showCancelButton: true,
            confirmButtonColor: 'btn-sm btn-primary',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            icon: 'warning'
        }).then(
            function (isConfirm) {
                if (isConfirm.value) {
                    testData.forEach(element => {
                        if (element.UsersSelectedAnswer != undefined && element.UsersSelectedAnswer != null) {
                            if (element.UsersSelectedAnswer == element.CorrectOption) {
                                score++;
                                correctQuestions++;
                            } else {
                                wrongQuestions++;
                            }
                        }
                        else {
                            leftQuestions++;
                        }
                    });
                    let selectedAnsTestData = testData;
                    selectedAnsTestData.forEach(element => {
                        element.CorrectQuestions = correctQuestions;
                        element.WrongQuestions = wrongQuestions;
                        element.LeftQuestions = leftQuestions;
                        element.Score = score;
                        element.Percentage = parseInt((score / element.TotalQuestions) * 100);
                        element.Mins = timer.split(':')[0];
                        element.Secs = timer.split(':')[1];
                    });
                    setTestData(selectedAnsTestData);
                    TrainingService.SaveAllQuestionAns(testData).then(res => {
                        //console.log(res.data);
                        if (res.data > 0) {
                            const url = '/user/app/test/' + courseid + '/' + subscriptionid + '/' + testpaperid + '/' + res.data + '/exam/result';
                            clearTimer(null);
                            navigate(url);
                        }
                    });
                }
                else {
                    //return false;
                }
            });
    }
    const handleOptionChange = (e) => {
        let selectedAnsTestData = testData;
        selectedAnsTestData.forEach(element => {
            // if (element.Sequence === currentQ) {
            if (element.QuestionN === currentQ) {
                element.UsersSelectedAnswer = e.target.value;
                // element.BatchId = batchid;
                return;
            }
        });
        setTestData(selectedAnsTestData);
        timerTestData = selectedAnsTestData;
    }
    const handleMultipleOptionChange = (e) => {
        selectedMultipleAns.push(e.target.value);
        let selectedAnsTestData = testData;
        selectedAnsTestData.forEach(element => {
            // if (element.Sequence === currentQ) {
            if (element.QuestionN === currentQ) {
                element.UsersSelectedAnswer = String(selectedMultipleAns);
                // element.BatchId = batchid;
                return;
            }
        });
        setTestData(selectedAnsTestData);
        timerTestData = selectedAnsTestData;
    }
    const exitTest = () => {
        const exitQuizURL = '/user/app/test/' + courseid + '/' + subscriptionid + '/' + testpaperid;
        swal.fire({
            title: "",
            text: "Are you sure, You want to exit Test?",
            showCancelButton: true,
            confirmButtonColor: 'btn-sm btn-primary',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            icon: 'warning'
        }).then(
            function (isConfirm) {
                if (isConfirm.value) {
                    clearTimer(null);
                    navigate(exitQuizURL);
                }
                else {
                    //return false;
                }
            });
    }
    return <div className='container' style={{ paddingTop: '30px' }}>

        {
            (filterTestData != null) ?
            <div>
                <div className='catinfo'>
                    <div className='row' style={{ height: '50px' }}>
                        {
                            filterTestData != null &&
                            <div className='col-md-6 d-flex align-items-center'> {
                                filterTestData.map((item, index) => {
                                    return <span key={index} style={{ paddingLeft: '10px' }}>Question <strong>{currentQ}</strong> of <strong>{item.TotalQuestions}</strong></span>
                                })
                            }
                            </div>
                        }
                        <div className='col-md-4 d-flex align-items-center'>
                        </div>
                        <div className='col-md-2 d-flex align-items-center'><i style={{ fontSize: '24px' }} className="far fa-clock"></i>&nbsp;&nbsp;<strong>{timer}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className='btn btn-warning' style={{ fontSize: '14px', color: '#ff615e', background: 'rgba(255,97,94,.2)' }} onClick={() => exitTest()}>Exit Test</a></div>
                    </div>
                </div>
                <div className='box-shadow'>
                    <div className='row' style={{ marginBottom: '50px' }}>
                        {
                            filterTestData != null &&
                            <div className='col-md-9'>
                                {
                                    filterTestData.map((item, index) => {
                                        return <div className='pt-3' key={index}>
                                            <p style={{ paddingLeft: '10px' }}><strong>Q.{currentQ}  {item.Title}</strong></p>

                                            <div style={{ paddingLeft: '10px' }}>
                                                {
                                                    item != null && item.QuestionOptions != null &&
                                                    item.QuestionOptions.map((option, oIndex) => {
                                                        const name = "option" + currentQ;
                                                        if (item.QuestionTypeId === 1) {
                                                            return <div key={oIndex} style={{ margin: '3px', marginBottom: '10px' }}>
                                                                <input value={option.OptionChar} checked={item.UsersSelectedAnswer === option.OptionChar} name={name} type="radio" style={{ height: '20px', width: '20px' }} onChange={handleOptionChange} /> <span style={{ paddingLeft: '5px' }}>{option.OptionChar}.&nbsp;&nbsp;{option.OptionTitle}</span>
                                                            </div>
                                                        }
                                                        else if (item.QuestionTypeId === 2) {
                                                            const selectedOptions = item.UsersSelectedAnswer?.split(',');
                                                            return <div key={oIndex} style={{ margin: '3px', marginBottom: '10px' }}>
                                                                <input value={option.OptionChar} checked={selectedOptions?.indexOf(option.OptionChar) >= 0} name={name} type="checkbox" style={{ height: '20px', width: '20px' }} onChange={handleMultipleOptionChange} /> <span style={{ paddingLeft: '5px' }}>{option.OptionChar}.&nbsp;&nbsp;{option.OptionTitle}</span>
                                                            </div>
                                                        }
                                                    })
                                                }
                                            </div>

                                        </div>
                                    })
                                }


                            </div>
                        }
                        <div className='col-md-3' style={{ borderLeft: '1px solid #ddd' }}>
                            <ul style={ul}>
                                {
                                    testData.map((question, qIndex) => {
                                        const nIndex = qIndex + 1;
                                        if (currentQ === nIndex) {
                                            return <li key={qIndex} style={ul_li} className='qli currentQuestion' onClick={() => qClick(nIndex)}>{nIndex}</li>
                                        } else if (question.UsersSelectedAnswer != null && question.UsersSelectedAnswer.length != 0) {
                                            return <li key={qIndex} style={ul_li} className='qli completedQuestion' onClick={() => qClick(nIndex)}>{nIndex}</li>
                                        }
                                        else {
                                            return <li key={qIndex} style={ul_li} className='qli leftQuestion' onClick={() => qClick(nIndex)}>{nIndex}</li>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div style={{ paddingLeft: '10px', marginBottom: '20px' }}>
                        <div className='row'>
                            <div className='col-md-9'>
                                {
                                    currentQ > 1 &&
                                    <button className='btn btn-primary' style={{ fontSize: '14px', width: '80px' }} onClick={() => prevQ()}>{prev}</button>
                                }
                                {
                                    currentQ < totalQ &&
                                    <button className='btn btn-primary' style={{ fontSize: '14px', width: '80px', float: 'right' }} onClick={() => nextQ()}>{next}</button>
                                }
                                {
                                    currentQ === totalQ &&
                                    <button className='btn btn-info' style={{ fontSize: '14px', float: 'right' }} onClick={() => submitAllQ()}>Submit Test</button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>:
                        <div>
                            {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Question Found!"}
                        </div>
        }

    </div>
}