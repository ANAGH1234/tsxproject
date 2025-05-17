import React, { useEffect, useRef, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import '../../assets/css/test.css';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';

// Interface matching the API response structure
interface QuestionDTO {
  QuestionId: number;
  Title: string;
  QuestionOptions: {
    QuestionOptionId: number;
    QuestionId: number;
    OptionChar: string;
    OptionTitle: string;
    IsActive: boolean;
  }[];
  CorrectOption: string;
  QuestionTypeId: number;
  DifficultyType: number;
  DifficultyLevel: number;
  CategoryId: number;
  CategoryName: string | null;
  SubCategoryId: number;
  SubCategoryName: string | null;
  TestPaperTitle: string | null;
  UsersSelectedAnswer: string | null;
  TestPaperId: number;
  Sequence: number;
  Duration: number;
  TotalQuestions: number;
  BatchId: number;
  UserId: number;
  Mins: number;
  Secs: number;
  AttemptedQuestionCount: number;
  CorrectQuestions: number;
  WrongQuestions: number;
  LeftQuestions: number;
  Score: number;
  Percentage: number;
  IsPass: boolean;
  DifficultyTypeName: string | null;
  IsCorrectAns: boolean;
  AnswerExplanation: string | null;
  MobileBanner: string | null;
  QuestionN: number;
}

interface Params {
  testpaperid: string;
  courseid: string;
}

const SkillChallengeDetails: React.FC = () => {
  let timerTestData: QuestionDTO[] = [];
  const navigate = useNavigate();
  const { testpaperid, courseid } = useParams<Params>();
  const user = authUser.Get();
  const [testData, setTestData] = useState<QuestionDTO[]>([]);
  const [totalQ, setTotalQ] = useState<number>(0);
  const [currentQ, setCurrentQ] = useState<number>(0);
  const [filterTestData, setFilterTestData] = useState<QuestionDTO[]>([]);
  const [selectedMultipleAns, setSelectedMultipleAns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let durationInSeconds: number = 0;
  let timerMinute: string = '';
  let timerSecond: string = '';

  useEffect(() => {
    if (!user || !testpaperid) return;
    setIsLoading(true);
    TrainingService.getTestDetails(testpaperid, user.userId)
      .then((res: any) => {
        if (!res || res.length === 0) {
          setIsLoading(false);
          return;
        }
        setTestData(res);
        timerTestData = res;
        setTotalQ(res[0].TotalQuestions);
        const newCurrentQ = res[0].AttemptedQuestionCount + 1;
        setCurrentQ(newCurrentQ);
        setFilterTestData(res.filter((test) => test.QuestionN === newCurrentQ));
        durationInSeconds = res[0].Duration;
        timerMinute = res[0].Mins.toString();
        timerSecond = res[0].Secs === 0 ? '00' : res[0].Secs.toString();
        clearTimer(getDeadTime());
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [testpaperid, user?.userId]);

  const Ref = useRef(null);
  const [timer, setTimer] = useState<string>('00:00');

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds };
  };

  const startTimer = (e: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      if (total === 0) {
        (window as any).swal
          .fire('', `Times Up!`, 'warning')
          .then(() => {
            autoSubmitAllQ();
            return false;
          });
      }
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    }
  };

  const clearTimer = (e: Date | null) => {
    setTimer(timerMinute + ':' + timerSecond);
    if (Ref.current) clearInterval(Ref.current);
    if (e) {
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    }
  };

  const getDeadTime = (): Date => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + durationInSeconds);
    return deadline;
  };

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
    boxSizing: 'border-box',
  };

  const ul_li: React.CSSProperties = {
    display: '-webkit-flex',
    alignItems: 'center',
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
    position: 'relative',
  };

  const prev: string = '< Prev';
  const next: string = 'Next >';

  const nextQ = () => {
    setSelectedMultipleAns([]);
    const selectedAnsTestData = [...testData];
    selectedAnsTestData.forEach((element) => {
      if (element.QuestionN === currentQ) {
        element.Mins = parseInt(timer.split(':')[0]);
        element.Secs = parseInt(timer.split(':')[1]);
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
    const newCurrentQ = currentQ + 1;
    setCurrentQ(newCurrentQ);
    setFilterTestData(testData.filter((test) => test.QuestionN === newCurrentQ));
    TrainingService.saveQuestionAns(selectedAnsTestData).then(() => {});
  };

  const prevQ = () => {
    setSelectedMultipleAns([]);
    const newCurrentQ = currentQ - 1;
    setCurrentQ(newCurrentQ);
    setFilterTestData(testData.filter((test) => test.QuestionN === newCurrentQ));
  };

  const qClick = (qNumber: number) => {
    setSelectedMultipleAns([]);
    const selectedAnsTestData = [...testData];
    selectedAnsTestData.forEach((element) => {
      if (element.QuestionN === currentQ) {
        element.Mins = parseInt(timer.split(':')[0]);
        element.Secs = parseInt(timer.split(':')[1]);
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
    setCurrentQ(qNumber);
    setFilterTestData(testData.filter((test) => test.QuestionN === qNumber));
    TrainingService.saveQuestionAns(selectedAnsTestData).then(() => {});
  };

  let correctQuestions: number = 0;
  let score: number = 0;
  let wrongQuestions: number = 0;
  let leftQuestions: number = 0;

  const autoSubmitAllQ = () => {
    timerTestData.forEach((element) => {
      if (element.UsersSelectedAnswer != null) {
        if (element.UsersSelectedAnswer === element.CorrectOption) {
          score++;
          correctQuestions++;
        } else {
          wrongQuestions++;
        }
      } else {
        leftQuestions++;
      }
    });
    const selectedAnsTestData = [...timerTestData];
    selectedAnsTestData.forEach((element) => {
      element.CorrectQuestions = correctQuestions;
      element.WrongQuestions = wrongQuestions;
      element.LeftQuestions = leftQuestions;
      element.Score = score;
      element.Percentage = parseInt(
        ((score / element.TotalQuestions) * 100).toString()
      );
      element.Mins = parseInt(timer.split(':')[0]);
      element.Secs = parseInt(timer.split(':')[1]);
    });
    TrainingService.autoSaveAllQuestionAns(selectedAnsTestData).then(() => {
      const url = `/user/app/skill/challenge/${courseid}/${testpaperid}/skillexam/result`;
      navigate(url);
    });
  };

  const submitAllQ = () => {
    (window as any).swal
      .fire({
        title: '',
        text: 'Are you sure, You want to submit Test Paper?',
        showCancelButton: true,
        confirmButtonColor: 'btn-sm btn-primary',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
        icon: 'warning',
      })
      .then((isConfirm: { value: boolean }) => {
        if (isConfirm.value) {
          testData.forEach((element) => {
            if (element.UsersSelectedAnswer != null) {
              if (element.UsersSelectedAnswer === element.CorrectOption) {
                score++;
                correctQuestions++;
              } else {
                wrongQuestions++;
              }
            } else {
              leftQuestions++;
            }
          });
          const selectedAnsTestData = [...testData];
          selectedAnsTestData.forEach((element) => {
            element.CorrectQuestions = correctQuestions;
            element.WrongQuestions = wrongQuestions;
            element.LeftQuestions = leftQuestions;
            element.Score = score;
            element.Percentage = parseInt(
              ((score / element.TotalQuestions) * 100).toString()
            );
            element.Mins = parseInt(timer.split(':')[0]);
            element.Secs = parseInt(timer.split(':')[1]);
          });
          setTestData(selectedAnsTestData);
          TrainingService.saveAllQuestionAns(selectedAnsTestData).then(
            (res: { data: number }) => {
              if (res.data > 0) {
                const url = `/user/app/skill/challenge/${courseid}/${testpaperid}/skillexam/result`;
                clearTimer(null);
                navigate(url);
              }
            }
          );
        }
      });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnsTestData = [...testData];
    selectedAnsTestData.forEach((element) => {
      if (element.QuestionN === currentQ) {
        element.UsersSelectedAnswer = e.target.value;
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
  };

  const handleMultipleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedMultipleAns = [...selectedMultipleAns, e.target.value];
    setSelectedMultipleAns(newSelectedMultipleAns);
    const selectedAnsTestData = [...testData];
    selectedAnsTestData.forEach((element) => {
      if (element.QuestionN === currentQ) {
        element.UsersSelectedAnswer = newSelectedMultipleAns.join(',');
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
  };

  const exitTest = () => {
    const exitQuizURL = '/skill-challenge';
    (window as any).swal
      .fire({
        title: '',
        text: 'Are you sure, You want to exit Test?',
        showCancelButton: true,
        confirmButtonColor: 'btn-sm btn-primary',
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
        icon: 'warning',
      })
      .then((isConfirm: { value: boolean }) => {
        if (isConfirm.value) {
          clearTimer(null);
          window.location.href = exitQuizURL;
        }
      });
  };

  return (
    <div className="container" style={{ paddingTop: '30px' }}>
      {filterTestData.length > 0 ? (
        <div>
          <div className="catinfo">
            <div className="row" style={{ height: '50px' }}>
              <div className="col-md-6 d-flex align-items-center">
                {filterTestData.map((item, index) => (
                  <span key={index} style={{ paddingLeft: '10px' }}>
                    Question <strong>{currentQ}</strong> of{' '}
                    <strong>{item.TotalQuestions}</strong>
                  </span>
                ))}
              </div>
              <div className="col-md-3 d-flex align-items-center"></div>
              <div className="col-md-3 d-flex align-items-center">
                <i style={{ fontSize: '24px' }} className="far fa-clock"></i>  
                <strong>{timer}</strong>    
                <a
                  className="btn btn-warning"
                  style={{
                    fontSize: '14px',
                    color: '#ff615e',
                    background: 'rgba(255,97,94,.2)',
                  }}
                  onClick={exitTest}
                >
                  Exit Test
                </a>
              </div>
            </div>
          </div>
          <div className="box-shadow">
            <div className="row" style={{ marginBottom: '50px' }}>
              <div className="col-md-9">
                {filterTestData.map((item, index) => (
                  <div className="pt-3" key={index}>
                    <p style={{ paddingLeft: '10px' }}>
                      <strong>
                        Q.{currentQ} {item.Title}
                      </strong>
                    </p>
                    <div style={{ paddingLeft: '10px' }}>
                      {item.QuestionOptions?.map((option, oIndex) => {
                        const name = 'option' + currentQ;
                        if (item.QuestionTypeId === 1) {
                          return (
                            <div
                              key={oIndex}
                              style={{ margin: '3px', marginBottom: '10px' }}
                            >
                              <input
                                value={option.OptionChar}
                                checked={
                                  item.UsersSelectedAnswer === option.OptionChar
                                }
                                name={name}
                                type="radio"
                                style={{ height: '20px', width: '20px' }}
                                onChange={handleOptionChange}
                              />{' '}
                              <span style={{ paddingLeft: '5px' }}>
                                {option.OptionChar}.  {option.OptionTitle}
                              </span>
                            </div>
                          );
                        } else if (item.QuestionTypeId === 2) {
                          const selectedOptions = item.UsersSelectedAnswer?.split(
                            ','
                          );
                          return (
                            <div
                              key={oIndex}
                              style={{ margin: '3px', marginBottom: '10px' }}
                            >
                              <input
                                value={option.OptionChar}
                                checked={
                                  selectedOptions?.includes(option.OptionChar) ||
                                  false
                                }
                                name={name}
                                type="checkbox"
                                style={{ height: '20px', width: '20px' }}
                                onChange={handleMultipleOptionChange}
                              />{' '}
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
              <div className="col-md-3" style={{ borderLeft: '1px solid #ddd' }}>
                <ul style={ul}>
                  {testData.map((question, qIndex) => {
                    const nIndex = qIndex + 1;
                    if (currentQ === nIndex) {
                      return (
                        <li
                          key={qIndex}
                          style={ul_li}
                          className="qli currentQuestion"
                          onClick={() => qClick(nIndex)}
                        >
                          {nIndex}
                        </li>
                      );
                    } else if (
                      question.UsersSelectedAnswer != null &&
                      question.UsersSelectedAnswer.length !== 0
                    ) {
                      return (
                        <li
                          key={qIndex}
                          style={ul_li}
                          className="qli completedQuestion"
                          onClick={() => qClick(nIndex)}
                        >
                          {nIndex}
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={qIndex}
                          style={ul_li}
                          className="qli leftQuestion"
                          onClick={() => qClick(nIndex)}
                        >
                          {nIndex}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <div style={{ paddingLeft: '10px', marginBottom: '20px' }}>
              <div className="row">
                <div className="col-md-9">
                  {currentQ > 1 && (
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '14px', width: '80px' }}
                      onClick={prevQ}
                    >
                      {prev}
                    </button>
                  )}
                  {currentQ < totalQ && (
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '14px', width: '80px', float: 'right' }}
                      onClick={nextQ}
                    >
                      {next}
                    </button>
                  )}
                  {currentQ === totalQ && (
                    <button
                      className="btn btn-info"
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
        <div>
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : (
            'No Question Found!'
          )}
        </div>
      )}
    </div>
  );
};

export default SkillChallengeDetails;