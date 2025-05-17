import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner";
import TrainingService from "../../services/TrainingService";
import { IMAGE_ADDRESS } from "../../helpers/constant";
import authUser from "../../helpers/authUser";
import { EnumCourseType } from "../../helpers/enum";
import type { SelfPacedVideoDTO } from "../../models/dashboard/dashboard";
import type { ContentBookMarksDTO } from "../../models/training/training";
import VideoActions from "../Action/VideoActions";

const zeroPad = (num: number, places: number = 2): string =>
  String(num).padStart(places, "0");

export default function Project() {
  const { courseid = "", subscriptionid = "", batchid = "" } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<SelfPacedVideoDTO>();
  const user = authUser.Get();
  const [, CourseType] = useOutletContext<any>();

  useEffect(() => {
    setIsLoading(true);
    console.log(CourseType);
    if (!user) return;
    if (CourseType === EnumCourseType.Project) {
      TrainingService.getProjectVideos(courseid, CourseType, user.userId).then(
        (res) => {
          setVideoData(res);
          setIsLoading(false);
        }
      );
    } else if (CourseType !== undefined) {
      TrainingService.getSelfPlacedVideos(
        courseid,
        EnumCourseType.Project,
        user.userId
      ).then((res) => {
        setVideoData(res);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [CourseType]);

  const cssBookMarked = {
    color: "#009688 !important",
    fontSize: "16px !important",
    cursor: "pointer",
  };
  const cssUnBookMarked = {
    fontSize: "16px !important",
    cursor: "pointer",
  };
  const cssCompleted = {
    color: "#009688",
    marginRight: "4px",
  };
  const cssNotCompleted = {
    marginRight: "4px",
    color: "",
  };

  const bookMarkClick = (contentId: string, courseId: string | any): void => {
    if (!user) return;
    const ContentBookMarksDTO: ContentBookMarksDTO = {
      CourseId: courseId,
      ContentId: contentId,
      CourseType: CourseType!,
      UserId: user.userId,
    };
    TrainingService.setContentBookMarked(ContentBookMarksDTO).then(() => {});
    setIsLoading(true);
    setTimeout(() => {
      TrainingService.getSelfPlacedVideos(
        courseid,
        CourseType!,
        user.userId
      ).then((res) => {
        setVideoData(res);
        setIsLoading(false);
      });
    }, 500);
  };

  return (
    <div className="mt-4">
      <div
        className="tab-pane fade show active mt-4 pb-5"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        {videoData &&
          videoData.CourseWisePerformance != null &&
          videoData.CourseWisePerformance > 0 && (
            <div className="row">
              <div className="col-sm-4 offset-sm-8 col-xs-4 offset-sm-7">
                <span style={{ fontSize: "14px" }}>
                  <strong>OverAll Progress</strong>
                </span>
                <span className="ps-1" style={{ fontSize: "12px" }}>
                  ({videoData.CourseWisePerformance}%)
                </span>
                {videoData.TotalLessons != null &&
                  videoData.TotalLessons > 0 && (
                    <span style={{ fontSize: "12px", paddingLeft: "10px" }}>
                      Completed <strong>{videoData.CompletedLessons}</strong>{" "}
                      out of <strong>{videoData.TotalLessons}</strong> Lessons
                    </span>
                  )}
                <div
                  className="progress"
                  style={{ height: "10px", marginTop: "5px" }}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: videoData.CourseWisePerformance + "%",
                      height: "10px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        <div className="row pt-3">
          {CourseType !== EnumCourseType.Project &&
          videoData?.courseContentList != null &&
          videoData.courseContentList.length > 0 ? (
            <div>
              {(videoData.IsProjectSubscribed === false ||
                videoData.IsTrialSubscribed === true ||
                videoData.IsMembershipProjectSubscribed === false) && (
                <div className="box-shadow">
                  <div className="p-2">
                    <span className="float-start mt-2 ms-2 mb-3">
                      <strong>Subscribe Project</strong> - Subscribe and get
                      access to Project's videos, code & ppts.
                    </span>
                    <a
                      href={videoData.CourseURL}
                      className="float-end btn btn-primary me-3 mb-1"
                    >
                      Subscribe
                    </a>
                  </div>
                </div>
              )}
              {videoData.courseContentList.map((course, cIndex) => {
                let accordianShow = cIndex === 0 ? "show" : "";
                let accordianCollapse = cIndex === 0 ? "" : "collapsed";

                return (
                  <div key={cIndex} className="accordion-item">
                    <h4 className="accordion-header">
                      <button
                        className={`accordion-button ${accordianCollapse}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#accordion-section${cIndex}`}
                        style={{ background: "rgb(246 249 253)" }}
                      >
                        <div className="row w-100">
                          <div style={{ fontWeight: "500", width: "65%" }}>
                            {cIndex + 1}. {course.Name}
                          </div>
                          <div style={{ width: "35%", paddingTop: "5px" }}>
                            <span
                              style={{
                                float: "right",
                                fontSize: "13px",
                                fontWeight: "500",
                                paddingRight: "5px",
                              }}
                            >
                              <i className="fa-solid fa-bars-staggered"></i>{" "}
                              Lessons ({zeroPad(course.SubTopicCount)})
                            </span>
                          </div>
                        </div>
                      </button>
                    </h4>
                    <div
                      id={`accordion-section${cIndex}`}
                      className={`accordion-collapse collapse ${accordianShow}`}
                    >
                      <div className="accordion-body p-0">
                        <div className="ps-1">
                          {course.CourseTopics.map((topic, tIndex) => (
                            <div style={{ padding: "5px" }} key={tIndex}>
                              <div className="row">
                                <div
                                  className="col-sm-5 col-xs-12"
                                  style={{
                                    color: "#3e3636",
                                    fontFamily: "sans-serif",
                                    paddingTop: "5px",
                                    paddingLeft: "20px",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  <h5 style={{ fontSize: "1rem" }}>
                                    <i className="fa-solid fa-list-ul"></i>{" "}
                                    {topic.TopicName}
                                  </h5>
                                </div>
                              </div>
                              <div>
                                {topic.SubTopics.map(
                                  (subTopic: any, stIndex) => {
                                    const cloudCodePath =
                                      IMAGE_ADDRESS + subTopic.CodePath;
                                    const cloudPdfPath =
                                      IMAGE_ADDRESS + subTopic.PdfPath;
                                    const styleBookMarked =
                                      subTopic.IsBookMarked
                                        ? cssBookMarked
                                        : cssUnBookMarked;
                                    const styleCompleted =
                                      subTopic.IsVideoCompleted
                                        ? cssCompleted
                                        : cssNotCompleted;
                                    return (
                                      <div
                                        style={{
                                          padding: "8px",
                                          borderBottom: "1px solid #e4ecf2",
                                        }}
                                        key={stIndex}
                                      >
                                        <div className="row">
                                          <div
                                            className="col-sm-5 col-xs-12"
                                            style={{
                                              paddingTop: "5px",
                                              paddingLeft: "20px",
                                            }}
                                          >
                                            <i
                                              className={
                                                subTopic.TopicType === 3
                                                  ? "fa-regular fa-file-lines"
                                                  : "fa fa-play-circle icon-player"
                                              }
                                              aria-hidden="true"
                                              style={styleCompleted}
                                            ></i>
                                            <span
                                              className="accordion-content__row__title"
                                              style={{
                                                fontWeight: "500",
                                                fontSize: "14px",
                                              }}
                                            >
                                              {subTopic.SubTopicName}
                                            </span>
                                          </div>
                                          <div
                                            className="col-sm-7 col-xs-12"
                                            style={{ textAlign: "right" }}
                                          >
                                            <i
                                              style={styleBookMarked}
                                              className={
                                                subTopic.IsBookmarked
                                                  ? "fas fa-bookmark"
                                                  : "far fa-bookmark"
                                              }
                                              onClick={() =>
                                                bookMarkClick(
                                                  subTopic.SubTopicId,
                                                  course.CourseId
                                                )
                                              }
                                              title="Create Bookmark"
                                            ></i>
                                            <VideoActions
                                              subTopic={subTopic}
                                              IsSubscribed={
                                                videoData.IsProjectSubscribed
                                              }
                                              cloudCodePath={cloudCodePath}
                                              cloudPdfPath={cloudPdfPath}
                                              course={course}
                                              courseid={courseid}
                                              batchid={batchid}
                                              subscriptionid={subscriptionid}
                                              topic={topic}
                                              isFreeTrial={
                                                videoData.IsTrialSubscribed
                                              }
                                              selfplaced="project"
                                              membership={
                                                videoData.IsMembershipProjectSubscribed
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {isLoading ? (
                <div className="pt-4">
                  <LoadingSpinner />
                </div>
              ) : (
                CourseType !== EnumCourseType.Project && "No Project Found!"
              )}
            </div>
          )}
          {CourseType === EnumCourseType.Project &&
          videoData?.CourseTopics != null &&
          videoData.CourseTopics.length > 0 ? (
            <div>
              {(videoData.IsProjectSubscribed === false ||
                videoData.IsTrialSubscribed === true ||
                videoData.IsMembershipProjectSubscribed === false) && (
                <div className="box-shadow">
                  <div className="p-2">
                    <span className="float-start mt-2 ms-2 mb-3">
                      <strong>Subscribe Project</strong> - Subscribe and get
                      access to Project's videos, code & ppts.
                    </span>
                    <a
                      href={videoData.CourseURL}
                      className="float-end btn btn-primary me-3 mb-1"
                    >
                      Subscribe
                    </a>
                  </div>
                </div>
              )}
              <div className="accordion-item">
                <div className="ps-1 accordion-body">
                  {videoData.CourseTopics.map((topic, tIndex) => (
                    <div style={{ padding: "5px" }} key={tIndex}>
                      <div className="row">
                        <div
                          className="col-sm-5 col-xs-12"
                          style={{
                            paddingTop: "5px",
                            paddingLeft: "20px",
                            paddingBottom: "5px",
                          }}
                        >
                          <h5 style={{ fontSize: "1rem" }}>
                            <i className="fa-solid fa-list-ul"></i>{" "}
                            {topic.TopicName}
                          </h5>
                        </div>
                      </div>
                      <div>
                        {topic.SubTopics.map((subTopic: any, stIndex) => {
                          const course = { CourseContentId: courseid };
                          const cloudCodePath =
                            IMAGE_ADDRESS + subTopic.CodePath;
                          const cloudPdfPath = IMAGE_ADDRESS + subTopic.PdfPath;
                          const styleBookMarked = subTopic.IsBookMarked
                            ? cssBookMarked
                            : cssUnBookMarked;
                          const styleCompleted = subTopic.IsVideoCompleted
                            ? cssCompleted
                            : cssNotCompleted;
                          return (
                            <div
                              style={{
                                padding: "8px",
                                borderBottom: "1px solid #e4ecf2",
                              }}
                              key={stIndex}
                            >
                              <div className="row">
                                <div
                                  className="col-sm-5 col-xs-12"
                                  style={{
                                    paddingTop: "5px",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  <i
                                    className={
                                      subTopic.TopicType === 3
                                        ? "fa-regular fa-file-lines"
                                        : "fa fa-play-circle icon-player"
                                    }
                                    aria-hidden="true"
                                    style={styleCompleted}
                                  ></i>
                                  <span
                                    className="accordion-content__row__title"
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {subTopic.SubTopicName}
                                  </span>
                                </div>
                                <div
                                  className="col-sm-7 col-xs-12"
                                  style={{ textAlign: "right" }}
                                >
                                  <i
                                    style={styleBookMarked}
                                    className={
                                      subTopic.IsBookMarked
                                        ? "fas fa-bookmark"
                                        : "far fa-bookmark"
                                    }
                                    onClick={() =>
                                      bookMarkClick(
                                        subTopic.SubTopicId,
                                        course.CourseContentId
                                      )
                                    }
                                    title="Create Bookmark"
                                  ></i>
                                  <VideoActions
                                    subTopic={subTopic}
                                    IsSubscribed={videoData.IsProjectSubscribed}
                                    cloudCodePath={cloudCodePath}
                                    cloudPdfPath={cloudPdfPath}
                                    course={course}
                                    courseid={courseid}
                                    batchid={batchid}
                                    subscriptionid={subscriptionid}
                                    topic={topic}
                                    isFreeTrial={videoData.IsTrialSubscribed}
                                    selfplaced="project"
                                    membership={
                                      videoData.IsMembershipProjectSubscribed
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
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
                CourseType === EnumCourseType.Project && "No Project Found!"
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
