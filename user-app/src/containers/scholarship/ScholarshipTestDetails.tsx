import React, { useEffect, useRef, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import '../../assets/css/test.css';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { TestPapersDTO } from '../../models/dashboard/dashboard';



const SkillChallengeDetails: React.FC = () => {
  const navigate = useNavigate();
  const { testpaperid, courseid } = useParams();
  const user = authUser.Get();
  
  const [testData, setTestData] = useState<TestPapersDTO | any>([]);
  const [totalQ, setTotalQ] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [filterTestData, setFilterTestData] = useState<TestPapersDTO[]>([]);
  const [selectedMultipleAns, setSelectedMultipleAns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timer, setTimer] = useState<string>('00:00');
  
  const Ref = useRef(null);

  useEffect(() => {
    if (!testpaperid || !user?.userId) return;

    setIsLoading(true);
    TrainingService.getTestDetails(testpaperid, user.userId).then(res => {
      const data: TestPapersDTO = res;
      setTestData(data);
      setTotalQ(data[0].TotalQuestions);
      const newCurrentQ = data[0].AttemptedQuestionCount + 1;
      setCurrentQ(newCurrentQ);
      setFilterTestData(data.filter(test => test.QuestionN === newCurrentQ));
      
      const durationInSeconds = data[0].Duration;
      const timerMinute = data[0].Mins;
      const timerSecond = data[0].Secs === 0 ? '00' : data[0].Secs.toString().padStart(2, '0');
      clearTimer(getDeadTime(durationInSeconds));
      setIsLoading(false);
    });
  }, [testpaperid, user?.UserId]);

  const getTimeRemaining = (deadline: Date) => {
    const total = Date.parse(deadline.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds };
  };

  const startTimer = (deadline: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
      if (total === 0) {
        // Note: swal is not typed here as it's likely a global
        // Consider importing and typing it properly in a real application
        // @ts-ignore
        swal.fire('', `Times Up!`, 'warning').then(() => {
          autoSubmitAllQ();
        });
      }

      setTimer(
        `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
      );
    }
  };

  const clearTimer = (deadline: Date | null) => {
    if (!deadline) {
      if (Ref.current) clearInterval(Ref.current);
      return;
    }

    setTimer(`${timer.split(':')[0]}:${timer.split(':')[1] || '00'}`);
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => startTimer(deadline), 1000);
    Ref.current = id;
  };

  const getDeadTime = (durationInSeconds: number) => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + durationInSeconds);
    return deadline;
  };

  const nextQ = () => {
    setSelectedMultipleAns([]);
    const selectedAnsTestData = testData.map(element => {
      if (element.QuestionN === currentQ) {
        return {
          ...element,
          Mins: parseInt(timer.split(':')[0]),
          Secs: parseInt(timer.split(':')[1])
        };
      }
      return element;
    });

    setTestData(selectedAnsTestData);
    const newCurrentQ = currentQ + 1;
    setCurrentQ(newCurrentQ);
    setFilterTestData(selectedAnsTestData.filter(test => test.QuestionN === newCurrentQ));
    
    TrainingService.SaveQuestionAns(selectedAnsTestData).then(() => {});
  };

  const prevQ = () => {
    setSelectedMultipleAns([]);
    const newCurrentQ = currentQ - 1;
    setCurrentQ(newCurrentQ);
    setFilterTestData(testData.filter(test => test.QuestionN === newCurrentQ));
  };

  const qClick = (qNumber: number) => {
    setSelectedMultipleAns([]);
    const selectedAnsTestData = testData.map(element => {
      if (element.QuestionN === currentQ) {
        return {
          ...element,
          Mins: parseInt(timer.split(':')[0]),
          Secs: parseInt(timer.split(':')[1])
        };
      }
      return element;
    });

    setTestData(selectedAnsTestData);
    setCurrentQ(qNumber);
    setFilterTestData(selectedAnsTestData.filter(test => test.QuestionN === qNumber));
    
    TrainingService.SaveQuestionAns(selectedAnsTestData).then(() => {});
  };

  const autoSubmitAllQ = () => {
    let correctQuestions = 0;
    let score = 0;
    let wrongQuestions = 0;
    let leftQuestions = 0;

    const selectedAnsTestData = testData.map(element => {
      if (element.UsersSelectedAnswer) {
        if (element.UsersSelectedAnswer === element.CorrectOption) {
          score++;
          correctQuestions++;
        } else {
          wrongQuestions++;
        }
      } else {
        leftQuestions++;
      }
      return {
        ...element,
        CorrectQuestions: correctQuestions,
        WrongQuestions: wrongQuestions,
        LeftQuestions: leftQuestions,
        Score: score,
        Percentage: parseInt(((score / element.TotalQuestions) * 100).toString()),
        Mins: parseInt(timer.split(':')[0]),
        Secs: parseInt(timer.split(':')[1])
      };
    });

    TrainingService.autoSaveAllQuestionAns(selectedAnsTestData).then(res => {
      const url = `/user/app/skill/challenge/${courseid}/${testpaperid}/skillexam/result`;
      navigate(url);
    });
  };

  const submitAllQ = () => {
    // @ts-ignore
    swal.fire({
      title: "",
      text: "Are you sure, You want to submit Test Paper?",
      showCancelButton: true,
      confirmButtonColor: 'btn-sm btn-primary',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!",
      icon: 'warning'
    }).then((result: { value: boolean }) => {
      if (result.value) {
        let correctQuestions = 0;
        let score = 0;
        let wrongQuestions = 0;
        let leftQuestions = 0;

        const selectedAnsTestData = testData.map(element => {
          if (element.UsersSelectedAnswer) {
            if (element.UsersSelectedAnswer === element.CorrectOption) {
              score++;
              correctQuestions++;
            } else {
              wrongQuestions++;
            }
          } else {
            leftQuestions++;
          }
          return {
            ...element,
            CorrectQuestions: correctQuestions,
            WrongQuestions: wrongQuestions,
            LeftQuestions: leftQuestions,
            Score: score,
            Percentage: parseInt(((score / element.TotalQuestions) * 100).toString()),
            Mins: parseInt(timer.split(':')[0]),
            Secs: parseInt(timer.split(':')[1])
          };
        });

        setTestData(selectedAnsTestData);
        
        TrainingService.SaveAllQuestionAns(selectedAnsTestData).then(res => {
          if (res.data > 0) {
            const url = `/user/app/skill/challenge/${courseid}/${testpaperid}/skillexam/result`;
            clearTimer(null);
            navigate(url);
          }
        });
      }
    });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnsTestData = testData.map(element => {
      if (element.QuestionN === currentQ) {
        return { ...element, UsersSelectedAnswer: e.target.value };
      }
      return element;
    });
    setTestData(selectedAnsTestData);
  };

  const handleMultipleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedMultipleAns = [...selectedMultipleAns, e.target.value];
    setSelectedMultipleAns(newSelectedMultipleAns);
    
    const selectedAnsTestData = testData.map(element => {
      if (element.QuestionN === currentQ) {
        return { ...element, UsersSelectedAnswer: newSelectedMultipleAns.join(',') };
      }
      return element;
    });
    setTestData(selectedAnsTestData);
  };

  const exitTest = () => {
    const exitQuizURL = '/skill-challenge';
    // @ts-ignore
    swal.fire({
      title: "",
      text: "Are you sure, You want to exit Test?",
      showCancelButton: true,
      confirmButtonColor: 'btn-sm btn-primary',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!",
      icon: 'warning'
    }).then((result: { value: boolean }) => {
      if (result.value) {
        clearTimer(null);
        window.location.href = exitQuizURL;
      }
    });
  };

  // Styles
  const ul: React.CSSProperties = {
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
  };

  const ul_li: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    background: '#f5f7fa',
    width: '36px',
    height: '36px',
    lineHeight: '36px',
    textAlign: 'center',
    margin: '0 auto',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '.2s ease-in-out',
    float: 'left',
    marginBottom: '10px',
    marginRight: '10px',
    marginTop: '10px',
    position: 'relative'
  };

  return (
    <div className='container' style={{ paddingTop: '30px' }}>
      {filterTestData.length > 0 ? (
        <div>
          <div className='catinfo'>
            <div className='row' style={{ height: '50px' }}>
              <div className='col-md-6 d-flex align-items-center'>
                {filterTestData.map((item, index) => (
                  <span key={index} style={{ paddingLeft: '10px' }}>
                    Question <strong>{currentQ}</strong> of <strong>{item.TotalQuestions}</strong>
                  </span>
                ))}
              </div>
              <div className='col-md-3 d-flex align-items-center'></div>
              <div className='col-md-3 d-flex align-items-center'>
                <i style={{ fontSize: '24px' }} className="far fa-clock"></i>  <strong>{timer}</strong>     
                <a
                  className='btn btn-warning'
                  style={{ fontSize: '14px', color: '#ff615e', background: 'rgba(255,97,94,.2)' }}
                  onClick={exitTest}
                >
                  Exit Test
                </a>
              </div>
            </div>
          </div>
          <div className='box-shadow'>
            <div className='row' style={{ marginBottom: '50px' }}>
              <div className='col-md-9'>
                {filterTestData.map((item, index) => (
                  <div className='pt-3' key={index}>
                    <p style={{ paddingLeft: '10px' }}>
                      <strong>Q.{currentQ} {item.Title}</strong>
                    </p>
                    <div style={{ paddingLeft: '10px' }}>
                      {item.QuestionOptions?.map((option, oIndex) => {
                        const name = `option${currentQ}`;
                        if (item.QuestionTypeId === 1) {
                          return (
                            <div key={oIndex} style={{ margin: '3px', marginBottom: '10px' }}>
                              <input
                                value={option.OptionChar}
                                checked={item.UsersSelectedAnswer === option.OptionChar}
                                name={name}
                                type="radio"
                                style={{ height: '20px', width: '20px' }}
                                onChange={handleOptionChange}
                              />
                              <span style={{ paddingLeft: '5px' }}>
                                {option.OptionChar}.  {option.OptionTitle}
                              </span>
                            </div>
                          );
                        } else if (item.QuestionTypeId === 2) {
                          const selectedOptions = item.UsersSelectedAnswer?.split(',');
                          return (
                            <div key={oIndex} style={{ margin: '3px', marginBottom: '10px' }}>
                              <input
                                value={option.OptionChar}
                                checked={selectedOptions?.includes(option.OptionChar)}
                                name={name}
                                type="checkbox"
                                style={{ height: '20px', width: '20px' }}
                                onChange={handleMultipleOptionChange}
                              />
                              <span style={{ paddingLeft: '5px' }}>
                                {option.OptionChar}.  {option.OptionTitle}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className='col-md-3' style={{ borderLeft: '1px solid #ddd' }}>
                <ul style={ul}>
                  {testData.map((question, qIndex) => {
                    const nIndex = qIndex + 1;
                    return (
                      <li
                        key={qIndex}
                        style={ul_li}
                        className={`qli ${
                          currentQ === nIndex
                            ? 'currentQuestion'
                            : question.UsersSelectedAnswer
                            ? 'completedQuestion'
                            : 'leftQuestion'
                        }`}
                        onClick={() => qClick(nIndex)}
                      >
                        {nIndex}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div style={{ paddingLeft: '10px', marginBottom: '20px' }}>
              <div className='row'>
                <div className='col-md-9'>
                  {currentQ > 1 && (
                    <button
                      className='btn btn-primary'
                      style={{ fontSize: '14px', width: '80px' }}
                      onClick={prevQ}
                    >
                      {'< Prev'}
                    </button>
                  )}
                  {currentQ < totalQ && (
                    <button
                      className='btn btn-primary'
                      style={{ fontSize: '14px', width: '80px', float: 'right' }}
                      onClick={nextQ}
                    >
                      {'Next >'}
                    </button>
                  )}
                  {currentQ === totalQ && (
                    <button
                      className='btn btn-info'
                      style={{ fontSize: '14px', float: 'right' }}
                      onClick={submitAllQ}
                    >
                      Submit Test
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Question Found!"}</div>
      )}
    </div>
  );
};

export default SkillChallengeDetails;