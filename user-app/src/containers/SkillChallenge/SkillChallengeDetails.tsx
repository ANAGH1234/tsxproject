import React, { useEffect, useRef, useState } from "react";
import TrainingService from "../../services/TrainingService";
import "../../assets/css/test.css";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import authUser from "../../helpers/authUser";
import type { TestPapersDTO } from "../../models/dashboard/dashboard";
import Swal from "sweetalert2";

export default function SkillChallengeDetails() {
  let timerTestData: any;
  let navigate = useNavigate();
  const { testpaperid } = useParams();
  const { courseid } = useParams();
  const user = authUser.Get();
  const [testData, setTestData] = useState<TestPapersDTO[]>([]);
  const [totalQ, setTotalQ] = useState<number>(0);
  let [currentQ, setCurrentQ] = useState<number>(0);
  let [filterTestData, setFilterTestData] = useState<TestPapersDTO[]>([]);
  const [selectedMultipleAns, setSelectedMultipleAns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  let durationInSeconds: any;
  let timerMinute: any;
  let timerSecond: any;

  useEffect(() => {
    setIsLoading(true);
    if (!user) return;
    TrainingService.getTestDetails(testpaperid, user.userId).then((res) => {
      setTestData(res);
      timerTestData = res;
      setTotalQ(res[0].TotalQuestions);
      currentQ = res[0].AttemptedQuestionCount + 1;
      setCurrentQ(currentQ);
      setFilterTestData(
        res.filter((test) => {
          // return test.Sequence === currentQ;
          return test.QuestionN === currentQ;
        })
      );
      durationInSeconds = res[0].Duration;
      timerMinute = res[0].Mins;
      timerSecond = res[0].Secs == 0 ? "00" : res[0].Secs;
      clearTimer(getDeadTime());
      setIsLoading(false);
    });
  }, []);

  // let completed = false;
  const Ref = useRef<any>(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00");

  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    // const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      // total, hours, minutes, seconds
      total,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    // let { total, hours, minutes, seconds }
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      if (total == 0) {
        Swal.fire("", `Times Up!`, "warning").then(function () {
          autoSubmitAllQ();
          return false;
        });
      }

      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        // (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer(timerMinute + ":" + timerSecond);

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + durationInSeconds);
    return deadline;
  };

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  // const onClickReset = () => {
  //   clearTimer(getDeadTime());
  // };

  const ul: React.CSSProperties = {
    margin: "0 auto",
    padding: "0",
    border: "0",
    outline: "0",
    fontSize: "100%",
    verticalAlign: "baseline",
    background: "transparent",
    textDecoration: "none",
    listStyle: "none",
    // outline: 'none',
    boxSizing: "border-box",
  };
  const ul_li: React.CSSProperties = {
    display: "-webkit-flex",
    // display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    background: "#f5f7fa",
    width: "36px",
    height: "36px",
    lineHeight: "36px",
    textAlign: "center",
    padding: "",
    margin: "0 auto",
    borderRadius: "50%",
    cursor: "pointer",
    transition: ".2s ease-in-out",
    float: "left",
    marginBottom: "10px",
    marginRight: "10px",
    marginTop: "10px",
    position: "relative",
  };
  const prev = "< Prev";
  const next = "Next >";
  // let type;
  const nextQ = () => {
    setSelectedMultipleAns([]);

    let selectedAnsTestData = testData;
    selectedAnsTestData.forEach((element) => {
      // if (element.Sequence === currentQ) {
      if (element.QuestionN === currentQ) {
        element.Mins = timer.split(":")[0];
        element.Secs = +timer.split(":")[1];
        // element.BatchId = batchid;
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;

    currentQ = currentQ + 1;
    setCurrentQ(currentQ);
    setFilterTestData(
      testData.filter((test) => {
        // return test.Sequence === currentQ;
        return test.QuestionN === currentQ;
      })
    );
    // console.log(testData);
    TrainingService.saveQuestionAns(testData).then(() => {});
  };
  const prevQ = () => {
    setSelectedMultipleAns([]);
    currentQ = currentQ - 1;
    setCurrentQ(currentQ);
    setFilterTestData(
      testData.filter((test) => {
        // return test.Sequence === currentQ;
        return test.QuestionN === currentQ;
      })
    );
  };
  const qClick = (qNumber: any) => {
    setSelectedMultipleAns([]);

    let selectedAnsTestData = testData;
    selectedAnsTestData.forEach((element) => {
      // if (element.Sequence === currentQ) {
      if (element.QuestionN === currentQ) {
        element.Mins = timer.split(":")[0];
        element.Secs = +timer.split(":")[1];
        // element.BatchId = batchid;
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
    currentQ = qNumber;
    setCurrentQ(currentQ);
    setFilterTestData(
      testData.filter((test) => {
        // return test.Sequence === currentQ;
        return test.QuestionN === currentQ;
      })
    );

    TrainingService.saveQuestionAns(testData).then(() => {});
  };

  let correctQuestions = 0;
  let score = 0;
  let wrongQuestions = 0;
  let leftQuestions = 0;

  const autoSubmitAllQ = () => {
    timerTestData.forEach((element: any) => {
      if (
        element.UsersSelectedAnswer != undefined &&
        element.UsersSelectedAnswer != null
      ) {
        if (element.UsersSelectedAnswer == element.CorrectOption) {
          score++;
          correctQuestions++;
        } else {
          wrongQuestions++;
        }
      } else {
        leftQuestions++;
      }
    });
    let selectedAnsTestData = timerTestData;
    selectedAnsTestData.forEach((element: any) => {
      element.CorrectQuestions = correctQuestions;
      element.WrongQuestions = wrongQuestions;
      element.LeftQuestions = leftQuestions;
      element.Score = score;
      element.Percentage = (score / element.TotalQuestions) * 100;
      element.Mins = timer.split(":")[0];
      element.Secs = timer.split(":")[1];
    });
    TrainingService.autoSaveAllQuestionAns(selectedAnsTestData).then(
      (res: any) => {
        if (res.data > 0) {
          const url =
            "/user/app/skill/challenge/" +
            courseid +
            "/" +
            testpaperid +
            "/skillexam/result";
          navigate(url);
        } else {
          const url =
            "/user/app/skill/challenge/" +
            courseid +
            "/" +
            testpaperid +
            "/skillexam/result";
          navigate(url);
        }
      }
    );
  };
  const submitAllQ = () => {
    Swal.fire({
      title: "",
      text: "Are you sure, You want to submit Test Paper?",
      showCancelButton: true,
      confirmButtonColor: "btn-sm btn-primary",
      confirmButtonText: "Yes, I am sure!",
      cancelButtonText: "No, cancel it!",
      icon: "warning",
    }).then(function (isConfirm) {
      if (isConfirm.value) {
        testData.forEach((element) => {
          if (
            element.UsersSelectedAnswer != undefined &&
            element.UsersSelectedAnswer != null
          ) {
            if (element.UsersSelectedAnswer == element.CorrectOption) {
              score++;
              correctQuestions++;
            } else {
              wrongQuestions++;
            }
          } else {
            leftQuestions++;
          }
        });
        let selectedAnsTestData = testData;
        selectedAnsTestData.forEach((element) => {
          element.CorrectQuestions = correctQuestions;
          element.WrongQuestions = wrongQuestions;
          element.LeftQuestions = leftQuestions;
          element.Score = score;
          element.Percentage = (score / element.TotalQuestions) * 100;
          element.Mins = timer.split(":")[0];
          element.Secs = +timer.split(":")[1];
        });
        setTestData(selectedAnsTestData);

        TrainingService.saveAllQuestionAns(testData).then((res) => {
          if (res.data > 0) {
            const url =
              "/user/app/skill/challenge/" +
              courseid +
              "/" +
              testpaperid +
              "/skillexam/result";
            clearTimer(null);
            navigate(url);
          }
        });
      } else {
        //return false;
      }
    });
  };
  const handleOptionChange = (e: any) => {
    let selectedAnsTestData = testData;
    selectedAnsTestData.forEach((element) => {
      // if (element.Sequence === currentQ) {
      if (element.QuestionN === currentQ) {
        element.UsersSelectedAnswer = e.target.value;
        // element.BatchId = batchid;
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
  };
  const handleMultipleOptionChange = (e: any) => {
    selectedMultipleAns.push(e.target.value);
    let selectedAnsTestData = testData;
    selectedAnsTestData.forEach((element) => {
      // if (element.Sequence === currentQ) {
      if (element.QuestionN === currentQ) {
        element.UsersSelectedAnswer = String(selectedMultipleAns);
        // element.BatchId = batchid;
        return;
      }
    });
    setTestData(selectedAnsTestData);
    timerTestData = selectedAnsTestData;
  };
  const exitTest = () => {
    const exitQuizURL = "/skill-challenge";
    Swal.fire({
      title: "",
      text: "Are you sure, You want to exit Test?",
      showCancelButton: true,
      confirmButtonColor: "btn-sm btn-primary",
      confirmButtonText: "Yes, I am sure!",
      cancelButtonText: "No, cancel it!",
      icon: "warning",
    }).then(function (isConfirm) {
      if (isConfirm.value) {
        clearTimer(null);
        window.location.href = exitQuizURL;
      } else {
        //return false;
      }
    });
  };
  return (
    <div className="container" style={{ paddingTop: "30px" }}>
      {filterTestData != null ? (
        <div>
          <div className="catinfo">
            <div className="row" style={{ height: "50px" }}>
              {filterTestData != null && (
                <div className="col-md-6 d-flex align-items-center">
                  {" "}
                  {filterTestData.map((item, index) => {
                    return (
                      <span key={index} style={{ paddingLeft: "10px" }}>
                        Question <strong>{currentQ}</strong> of{" "}
                        <strong>{item.TotalQuestions}</strong>
                      </span>
                    );
                  })}
                </div>
              )}
              <div className="col-md-3 d-flex align-items-center"></div>
              <div className="col-md-3 d-flex align-items-center">
                <i style={{ fontSize: "24px" }} className="far fa-clock"></i>
                &nbsp;&nbsp;<strong>{timer}</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  className="btn btn-warning"
                  style={{
                    fontSize: "14px",
                    color: "#ff615e",
                    background: "rgba(255,97,94,.2)",
                  }}
                  onClick={() => exitTest()}
                >
                  Exit Test
                </a>
              </div>
            </div>
          </div>
          <div className="box-shadow">
            <div className="row" style={{ marginBottom: "50px" }}>
              {filterTestData != null && (
                <div className="col-md-9">
                  {filterTestData.map((item, index) => {
                    return (
                      <div className="pt-3" key={index}>
                        <p style={{ paddingLeft: "10px" }}>
                          <strong>
                            Q.{currentQ} {item.Title}
                          </strong>
                        </p>

                        <div style={{ paddingLeft: "10px" }}>
                          {item != null &&
                            item.QuestionOptions != null &&
                            item.QuestionOptions.map(
                              (option: TestPapersDTO, oIndex: number) => {
                                const name = "option" + currentQ;
                                if (item.QuestionTypeId === 1) {
                                  return (
                                    <div
                                      key={oIndex}
                                      style={{
                                        margin: "3px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <input
                                        value={option.OptionChar}
                                        checked={
                                          item.UsersSelectedAnswer ===
                                          option.OptionChar
                                        }
                                        name={name}
                                        type="radio"
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                        onChange={handleOptionChange}
                                      />{" "}
                                      <span style={{ paddingLeft: "5px" }}>
                                        {option.OptionChar}.&nbsp;&nbsp;
                                        {option.OptionTitle}
                                      </span>
                                    </div>
                                  );
                                } else if (item.QuestionTypeId === 2) {
                                  const selectedOptions =
                                    item.UsersSelectedAnswer?.split(",");
                                  return (
                                    <div
                                      key={oIndex}
                                      style={{
                                        margin: "3px",
                                        marginBottom: "10px",
                                      }}
                                    >
                                      <input
                                        value={option.OptionChar}
                                        checked={
                                          selectedOptions?.indexOf(
                                            option.OptionChar
                                          ) >= 0
                                        }
                                        name={name}
                                        type="checkbox"
                                        style={{
                                          height: "20px",
                                          width: "20px",
                                        }}
                                        onChange={handleMultipleOptionChange}
                                      />{" "}
                                      <span style={{ paddingLeft: "5px" }}>
                                        {option.OptionChar}.&nbsp;&nbsp;
                                        {option.OptionTitle}
                                      </span>
                                    </div>
                                  );
                                }
                              }
                            )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div
                className="col-md-3"
                style={{ borderLeft: "1px solid #ddd" }}
              >
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
                      question.UsersSelectedAnswer.length != 0
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
            <div style={{ paddingLeft: "10px", marginBottom: "20px" }}>
              <div className="row">
                <div className="col-md-9">
                  {currentQ > 1 && (
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: "14px", width: "80px" }}
                      onClick={() => prevQ()}
                    >
                      {prev}
                    </button>
                  )}
                  {currentQ < totalQ && (
                    <button
                      className="btn btn-primary"
                      style={{
                        fontSize: "14px",
                        width: "80px",
                        float: "right",
                      }}
                      onClick={() => nextQ()}
                    >
                      {next}
                    </button>
                  )}
                  {currentQ === totalQ && (
                    <button
                      className="btn btn-info"
                      style={{ fontSize: "14px", float: "right" }}
                      onClick={() => submitAllQ()}
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
            "No Question Found!"
          )}
        </div>
      )}
    </div>
  );
}
