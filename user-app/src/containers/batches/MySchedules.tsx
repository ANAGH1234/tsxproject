import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import TrainingService from "../../services/TrainingService";
import LoadingSpinner from "../../components/LoadingSpinner";
import authUser from "../../helpers/authUser";
import apiClient from "../../helpers/apiClient";
import { PLATFORM_VIDEOS } from "../../helpers/constant";
import EnumMembershipType, { DiamondCourses, EnumCourseType } from "../../helpers/enum";
import type { TimeZone, CourseDTO } from "../../models/dashboard/dashboard";
import type { BatchMasterDTO, PagingBatchMasterDTO } from "../../models/training/training";
import type { User } from "../../models/user/User";

interface ScheduleDay {
  Day: string;
  StartEventDateTime: Date;
}

const FreeCourses = [122];
const EnumSessionStatus = { Scheduled: 1, Canceled: 2 };

function GetUniqueDays(array: BatchMasterDTO[] | undefined): ScheduleDay[] {
  const result: ScheduleDay[] = [];
  const map = new Map<string, boolean>();
  if (array && array.length > 0) {
    for (const item of array) {
      const day = moment(item.StartEventDateTime).format("DD/MM/YYYY");
      if (!map.has(day)) {
        map.set(day, true);
        result.push({
          Day: day,
          StartEventDateTime: item.StartEventDateTime,
        });
      }
    }
  }
  return result;
}

function CheckPremiumCourseAccess(membershipId: number, courseId: number): boolean {
  if (EnumMembershipType.Diamond === membershipId) {
    return true;
  } else if (EnumMembershipType.Premium === membershipId) {
    return !DiamondCourses.includes(courseId);
  }
  return false;
}

const MySchedules: React.FC = () => {
  const user: User | null = authUser.Get();
  const navigate = useNavigate();
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [schedulesData, setSchedulesData] = useState<PagingBatchMasterDTO<BatchMasterDTO>>({
    Data: [],
    TotalRows: 0,
    TotalAmount: 0,
  });
  const [schedulesDays, setSchedulesDays] = useState<ScheduleDay[]>([]);
  const [zoneData, setZoneData] = useState<TimeZone[]>([]);
  const [courseData, setCourseData] = useState<CourseDTO[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);
  const [selectedZone, setSelectedZone] = useState<string>("India Standard Time");
  const [isDataCount, setIsDataCount] = useState<boolean>(false);
  const [subscriptionData, setSubscriptionData] = useState<number[]>([]);
  const [platformVideos] = useState<Record<string, string>>(PLATFORM_VIDEOS);

  // Handle null user
  if (!user) {
    useEffect(() => {
      navigate("/login"); // Redirect to login if user is null
    }, [navigate]);
    return null;
  }

  useEffect(() => {
    document.title = "Live Schedules";
    setIsLoading(true);

    Promise.all([
      TrainingService.getCourseListBySubscription(user.userId, user.membershipId).then((res) =>
        
  {setCourseData(res),console.log(res)}
      ),
      
      TrainingService.getTimeZonesList().then((res) => setZoneData(res)),
      TrainingService.getUserSubscriptions(user.userId).then((res) => setSubscriptionData(res)),
    ])
      .catch((err) => {
        Swal.fire("Error", "Failed to load initial data. Please try again.", "error");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [user.userId, user.membershipId]);

  useEffect(() => {
    setIsLoading(true);
    TrainingService.getMySchedules(
      user.userId,
      user.membershipId,
      selectedCourseId,
      selectedZone,
      isMore
    )
      .then((res) => {
        setIsDataCount(res.TotalRows > 0);
        const days = GetUniqueDays(res.Data);
        setSchedulesDays(days);
        setSchedulesData(res);
        setIsMore(true);
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to load schedules. Please try again.", "error");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [selectedCourseId, selectedZone, user.userId, user.membershipId]);

  const zoneSelected = (zone: string): void => {
    setSelectedZone(zone);
  };

  const courseSelected = (courseId: string): void => {
    setSelectedCourseId(parseInt(courseId, 10));
    setIsMore(false);
  };

  const handleSessionJoin = (id: string, batchId: number, schId: number): void => {
    const url = `${window.location.origin}/api/zoom/checkmeeting/${id}`;
    apiClient
      .get<string>(url)
      .then((res) => {
        if (res.data === "started") {
          localStorage.setItem("id", id);
          localStorage.setItem("shId", schId.toString());
          localStorage.setItem("batchId", batchId.toString());
          navigate("/user/app/meeting");
        } else {
          Swal.fire("", "Session is not started yet! Please try after some time.", "warning");
        }
      })
      .catch((error) => {
        Swal.fire("Error", "Failed to check meeting status. Please try again.", "error");
        console.error(error);
      });
  };

  const LoadSchedules = (): void => {
    setIsLoadingMore(true);
    TrainingService.getMySchedules(
      user.userId,
      user.membershipId,
      selectedCourseId,
      selectedZone,
      isMore
    )
      .then((res) => {
        setIsDataCount(res.TotalRows > 0);
        const days = GetUniqueDays(res.Data);
        setSchedulesDays(days);
        setSchedulesData(res);
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to load more schedules. Please try again.", "error");
        console.error(err);
      })
      .finally(() => setIsLoadingMore(false));

    TrainingService.getUserSubscriptions(user.userId)
      .then((res) => setSubscriptionData(res))
      .catch((err) => {
        console.error(err);
      });
  };

  const JoinGroups = (whatsAppLink: string, discordLink?: string): void => {
    const video = `
      <div className="mt-2 mb-3" id="video-container" style="text-align: center;">
        <iframe
          src="//youtube.com/embed/${platformVideos["SettingUpDiscord"]}"
          srcdoc="<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href='//youtube.com/embed/${
            platformVideos["SettingUpDiscord"]
          }?autoplay=1'><img src='//img.youtube.com/vi/${
            platformVideos["SettingUpDiscord"]
          }/hqdefault.jpg'><span><svg viewBox='0 0 200 200' height='40px' width='40px'><circle r='96' cy='100' cx='100' stroke-width='8' stroke='#FFFFFF' fill='#347eff'></circle><polygon points='70.993,60.347 153.398,102.384 70.993,144.420' fill='#FFFFFF'></polygon></svg></span></a>"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    `;
    let content = `${video}<hr/><div><i className="fa-solid fa-bell"></i> Join our WhatsApp group to get notification about the batch schedules and updates. <div><a target="_blank" href="${whatsAppLink}" type="button" role="button" tabindex="0" className="SwalBtn1 customSwalBtn btn btn-success" style="margin: 15px 0 0px;padding: 7px 15px;background: #4CAF50 !important;color:#fff"><i className="fa-brands fa-whatsapp"></i> Join WhatsApp</a></div>`;
    if (discordLink && discordLink.length > 0) {
      content += `<hr/><i className="fa-solid fa-handshake-angle"></i> Join our Discord group to get help from our support team while your learning journey!</div><div><a target="_blank" href="${discordLink}" type="button" role="button" tabindex="0" className="SwalBtn1 customSwalBtn btn btn-dark" style="margin: 15px 0 0px;padding: 7px 20px;background: #4a5b64;color:#fff"><i className="fa-brands fa-discord"></i> Join Discord</a></div>`;
    }

    Swal.fire({
      title: "Get Notification & Support",
      html: content,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  return (
    <div className="pt-4">
      <div className="row mb-2 mt-4 justify-content-end">
        <div className="col-sm-4 col-xs-12">
          <span className="d-inline-block fw-bold pe-2">Time Zone</span>
          {zoneData.length > 0 && (
            <select
              id="countryZone"
              name="countryZone"
              className="selectpicker form-select d-inline-block"
              data-show-subtext="true"
              data-live-search="true"
              style={{ width: "200px" }}
              onChange={(e) => zoneSelected(e.target.value)}
              value={selectedZone}
            >
              <option value="">-- Select Time Zone --</option>
              {zoneData.map((item, index) => (
                <option value={item.Id} key={index}>
                  {item.DisplayName}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="col-sm-3 col-xs-12">
          <span className="d-inline-block fw-bold pe-2">Training</span>
          {courseData.length > 0 && (
            <select
              id="courseId"
              name="courseId"
              className="selectpicker form-select d-inline-block"
              data-show-subtext="true"
              data-live-search="true"
              style={{ width: "200px" }}
              onChange={(e) => courseSelected(e.target.value)}
              value={selectedCourseId}
            >
              <option value="0">-- All Live Training --</option>
              {courseData.map((item, index) => (
                <option value={item.CourseId} key={index}>
                  {item.Name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="mt-3">
        {isLoading ? (
          <div className="pt-4">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {schedulesDays.length > 0 && (
              <>
                {schedulesDays.map((item, index) => {
                  const newDate = new Date();
                  const todaydate = `${("0" + newDate.getDate()).slice(-2)}/${(
                    "0" +
                    (newDate.getMonth() + 1)
                  ).slice(-2)}/${newDate.getFullYear()}`;
                  const todaydateforComparision = `${newDate.getFullYear()}/${(
                    "0" +
                    (newDate.getMonth() + 1)
                  ).slice(-2)}/${("0" + newDate.getDate()).slice(-2)}`;
                  const tomorrow = newDate.getDate() + 1;
                  const tomorrowdate = `${("0" + tomorrow).slice(-2)}/${(
                    "0" +
                    (newDate.getMonth() + 1)
                  ).slice(-2)}/${newDate.getFullYear()}`;

                  const dayname = item.Day;
                  const daynameforComparision = dayname.split("/").reverse().join("/");
                  const batches = schedulesData.Data
                    .filter(
                      (x) => moment(x.StartEventDateTime).format("DD/MM/YYYY") === item.Day
                    )
                    .sort((a, b) => (a.BatchTimeOnly > b.BatchTimeOnly ? 1 : -1));

                  return (
                    <div key={index} className="card mb-2">
                      <div className="row schedule-header">
                        {dayname === todaydate && (
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="22px"
                              viewBox="0 -960 960 960"
                              width="22px"
                              fill="currentColor"
                            >
                              <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"></path>
                            </svg>
                            {moment(item.StartEventDateTime).format("ddd, MMM DD")}
                            <strong>, {moment(item.StartEventDateTime).format("yyyy")}</strong>
                            <span> (Today)</span>
                          </span>
                        )}
                        {dayname === tomorrowdate && (
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="22px"
                              viewBox="0 -960 960 960"
                              width="22px"
                              fill="currentColor"
                            >
                              <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v- SLO400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"></path>
                            </svg>
                            {moment(item.StartEventDateTime).format("ddd, MMM DD")}
                            <strong>, {moment(item.StartEventDateTime).format("yyyy")}</strong>
                            <span> (Tomorrow)</span>
                          </span>
                        )}
                        {dayname !== todaydate && dayname !== tomorrowdate && (
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="22px"
                              viewBox="0 -960 960 960"
                              width="22px"
                              fill="currentColor"
                            >
                              <path d="M438-226 296-368l58-58 84 84 168-168 58 58-226 226ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"></path>
                            </svg>
                            {moment(item.StartEventDateTime).format("ddd, MMM DD")}
                            <strong>, {moment(item.StartEventDateTime).format("yyyy")}</strong>
                          </span>
                        )}
                      </div>
                      {batches.map((batch, bindex) => {
                        const startEventDateTime = moment(batch.StartEventDateTime).format(
                          "DD/MM/YYYY"
                        );
                        if (startEventDateTime === dayname) {
                          return (
                            <div className="row schedule-row" key={bindex}>
                              <div className="col-sm-1 col-3">
                                <img
                                  src={batch.MobileBanner}
                                  alt={batch.CourseName}
                                  className="img-fluid"
                                  style={{ maxHeight: "60px", marginTop: "4px" }}
                                />
                              </div>
                              <div className="col-sm-3 col-9">
                                <i className="far fa-clock"></i> 
                                {moment(batch.BatchTiming).format("hh:mm A")} -{" "}
                                {moment(batch.BatchEndTiming).format("hh:mm A")}
                                <div>
                                  <i className="fas fa-chalkboard-teacher"></i> By {batch.Name}
                                </div>
                                {batch.Remark && batch.Remark.length > 0 && (
                                  <div className="text-danger">
                                    <i className="fas fa-bullhorn"></i> {batch.Remark}
                                  </div>
                                )}
                              </div>
                              <div className="col-sm-4 col-12">
                                <i className="fas fa-video"></i> {batch.CourseName}
                                <div>
                                  <i className="far fa-calendar-alt"></i> Batch Start Date:{" "}
                                  {moment(batch.StartDate).format("ddd, DD MMM yyy")}
                                </div>
                              </div>
                              <div className="col-sm-4 col-12">
                                <span>
                                  <svg
                                    style={{ height: "20px" }}
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                  >
                                    <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                                  </svg>
                                  Batch Code: {batch.BatchCode}
                                </span>
                                <div>
                                  {(() => {
                                    const daynameParse = new Date(daynameforComparision);
                                    const todaydateParse = new Date(todaydateforComparision);

                                    let sessionURL = "";
                                    if (EnumCourseType.JobOriented === batch.CourseType) {
                                      sessionURL = `/user/app/courseplan/details/${batch.CourseId}/${batch.SubscriptionId}/${batch.BatchId}/livesession`;
                                    } else {
                                      sessionURL = `/user/app/training/details/${batch.CourseId}/${batch.SubscriptionId}/${batch.BatchId}`;
                                    }

                                    if (
                                      user.membershipId === EnumMembershipType.Premium ||
                                      user.membershipId === EnumMembershipType.Diamond
                                    ) {
                                      if (EnumCourseType.JobOriented === batch.CourseType) {
                                        sessionURL = `/user/app/courseplan/details/${batch.CourseId}/${batch.SubscriptionId}/${batch.BatchId}/livesession`;
                                      } else {
                                        sessionURL = `/user/app/training/details/${batch.CourseId}/${user.membershipId}/${batch.BatchId}`;
                                      }
                                    }

                                    if (
                                      CheckPremiumCourseAccess(user.membershipId, batch.CourseId) ||
                                      (subscriptionData.length > 0 &&
                                        (subscriptionData.includes(batch.CourseId) ||
                                          FreeCourses.includes(batch.CourseId)))
                                    ) {
                                      if (batch.SessionStatus === EnumSessionStatus.Canceled) {
                                        return (
                                          <>
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-outline-primary"
                                              title="Session has been canceled."
                                              style={{ cursor: "not-allowed" }}
                                            >
                                              Session Canceled
                                            </a>
                                            <span>  </span>
                                            <NavLink
                                              className="btn btn-sm btn-info"
                                              to={sessionURL}
                                              target="_self"
                                              title="WATCH SESSIONS RECORDING"
                                            >
                                              Session Videos
                                            </NavLink>
                                             
                                            {batch.WhatsAppLink && batch.WhatsAppLink !== "" && (
                                              <a
                                                onClick={() =>
                                                  JoinGroups(batch.WhatsAppLink!, batch.DiscordLink)
                                                }
                                                className="btn btn-sm btn-success"
                                              >
                                                Join Support Group
                                              </a>
                                            )}
                                          </>
                                        );
                                      } else if (daynameParse <= todaydateParse) {
                                        return (
                                          <>
                                            <button
                                              onClick={() =>
                                                handleSessionJoin(
                                                  batch.MeetingUrl,
                                                  batch.BatchId,
                                                  batch.ScheduleId
                                                )
                                              }
                                              className="btn btn-sm btn-primary btn-meeting"
                                            >
                                              Join Session
                                            </button>
                                            <span>  </span>
                                            <NavLink
                                              className="btn btn-sm btn-info"
                                              to={sessionURL}
                                              target="_self"
                                              title="WATCH SESSIONS RECORDING"
                                            >
                                              Session Videos
                                            </NavLink>
                                             
                                            {batch.WhatsAppLink && batch.WhatsAppLink !== "" && (
                                              <a
                                                onClick={() =>
                                                  JoinGroups(batch.WhatsAppLink!, batch.DiscordLink)
                                                }
                                                className="btn btn-sm btn-success"
                                              >
                                                Join Support Group
                                              </a>
                                            )}
                                          </>
                                        );
                                      } else {
                                        return (
                                          <>
                                            <a
                                              href="#"
                                              onClick={(event) => event.preventDefault()}
                                              className="btn btn-sm btn-outline-primary"
                                              title="SESSION IS NOT LIVE - You can join once the host start"
                                              style={{ cursor: "not-allowed" }}
                                            >
                                              Join Session
                                            </a>
                                            <span>  </span>
                                            <NavLink
                                              className="btn btn-sm btn-info"
                                              to={sessionURL}
                                              target="_self"
                                              title="WATCH SESSIONS RECORDING"
                                            >
                                              Session Videos
                                            </NavLink>
                                             
                                            {batch.WhatsAppLink && batch.WhatsAppLink !== "" && (
                                              <a
                                                onClick={() =>
                                                  JoinGroups(batch.WhatsAppLink!, batch.DiscordLink)
                                                }
                                                className="btn btn-sm btn-success"
                                              >
                                                Join Support Group
                                              </a>
                                            )}
                                          </>
                                        );
                                      }
                                    } else {
                                      return (
                                        <a
                                          href="/training"
                                          className="btn btn-sm btn-info"
                                          title="To join session upgrade your plan."
                                        >
                                          Enroll Now
                                        </a>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </>
            )}
            {!isDataCount && (
              <div className="row no_schedule schedule-header">
                <span>
                  <strong>No Schedule Available!</strong>
                </span>
              </div>
            )}
          </>
        )}
      </div>
      {isLoadingMore ? (
        <div className="pt-4">
          <LoadingSpinner />
        </div>
      ) : (
        schedulesData.IsDisplayMoreButton &&
        isDataCount &&
        !isLoading && (
          <div className="pt-4 text-center mb-3">
            <a className="btn btn-primary btn-meeting" onClick={LoadSchedules}>
              Load More..
            </a>
          </div>
        )
      )}
    </div>
  );
};

export default MySchedules;