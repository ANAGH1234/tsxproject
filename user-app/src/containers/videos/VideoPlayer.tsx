import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import TrainingService from '../../services/TrainingService';
import '../../assets/css/video.css';
import '../../assets/css/player.css';
import '../../assets/css/article.css';
import authUser from '../../helpers/authUser';
import type { ContentDownloadHistoryDTO, CourseDetailsDTO, SelfPlacedVideoTrackingDTO } from '../../models/training/training';



const VideoPlayer: React.FC = () => {
  const navigate = useNavigate();
  const playerRef = useRef<ReactPlayer>(null);
  const { cid, bid, sid, tid, stid, ccid } = useParams<{
    cid?: string;
    bid?: string;
    sid?: string;
    tid?: string;
    stid?: string;
    ccid?: string;
  }>();
  const [played, setPlayed] = useState<number>(0);
  const [videoData, setVideoData] = useState<CourseDetailsDTO | any>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>();
  const [currentContent, setCurrentContent] = useState<string | undefined>();
  const [currentTopicType, setCurrentTopicType] = useState<number | undefined>();
  const [videoPlayTime, setVideoPlayTime] = useState<number | undefined>();
  const [currentTopic, setCurrentTopic] = useState<string | undefined>();
  const [selectedSubTopicId, setSelectedSubTopicId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preSubTopicId, setPreSubTopicId] = useState<string | undefined>();
  const [duration, setDuration] = useState<string | undefined>();
  const [durationInSeconds, setDurationInSeconds] = useState<number | undefined>();
  const [preDuration, setPreDuration] = useState<string | undefined>();
  const [preTopicId, setPreTopicId] = useState<string | undefined>();
  const [currentTopicId, setCurrentTopicId] = useState<string | undefined>();
  const [topicSequence, setTopicSequence] = useState<number | undefined>();
  const [subTopicSequence, setSubTopicSequence] = useState<number | undefined>();
  const user = authUser.Get();

  // Disable back button
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  let backHref: string = '';
  let cType: number = 2;
  const prevPath = localStorage.getItem('pl') || '';
  const ref = document.referrer || prevPath;

  if (prevPath.includes('courseplan')) {
    backHref = `/user/app/courseplan/details/${cid}/${sid}/0`;
  } else if (ref.includes('/bmlessons')) {
    backHref = '/user/app/subscribed-training/bmlessons';
  } else if (
    ref.includes('/user/app/subscribed-training') &&
    !window.location.href.includes('/qna') &&
    !window.location.href.includes('/selfplaced') &&
    !window.location.href.includes('/project')
  ) {
    backHref = `/user/app/courseplan/details/${cid}/${sid}/0`;
  } else {
    if (window.location.href.includes('/qna')) {
      backHref = `/user/app/training/details/${cid}/${sid}/${bid}/qna`;
      cType = 10;
    } else if (window.location.href.includes('/selfplaced')) {
      backHref = `/user/app/training/details/${cid}/${sid}/${bid}/selfplaced`;
      cType = 2;
    } else if (window.location.href.includes('/project')) {
      backHref = `/user/app/training/details/${cid}/${sid}/${bid}/project`;
      cType = 7;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if(!user) return
    TrainingService.getSelfPlacedVideosCourseWise(ccid!, cid!, user.userId).then((res) => {
      const data: CourseDetailsDTO = res;
      setVideoData(data);
      data.CourseTopics?.forEach((topic : any) => {
        if(!tid || !stid) return 
        if (topic.TopicId === +tid) {
          topic.SubTopics.forEach((subTopic : any) => {
           
            if (subTopic.SubTopicId === +stid) {
              setCurrentVideoUrl(subTopic.VideoUrl);
              setVideoPlayTime(subTopic.VideoPlayTime);
              setCurrentTopic(subTopic.SubTopicName);
              setSelectedSubTopicId(subTopic.SubTopicId);
              setPreTopicId(topic.TopicId);
              setCurrentTopicId(topic.TopicId);
              setDuration(subTopic.Duration);
              setPreDuration(subTopic.Duration);
              setCurrentContent(subTopic.Content);
              setCurrentTopicType(subTopic.TopicType);
              setTopicSequence(topic.TopicSequence);
              setSubTopicSequence(subTopic.SubTopicSequence);
              setDurationInSeconds(subTopic.DurationInSeconds);
            }
          });
        }
      });
      setIsLoading(false);
    });
  }, [ccid, cid, tid, stid, user?.userId]);

  const openme = () => {
    const width = window.innerWidth;
    const openmeEl = document.getElementById('openme');
    const closemeEl = document.getElementById('closeme');
    const mainEl = document.getElementById('main');
    const sidebarEl = document.getElementById('mySidebar');
    const logoEl = document.getElementById('spanlogo');
    const videoEl = document.getElementById('iframeVideo');

    if (openmeEl) openmeEl.style.display = 'none';
    if (closemeEl) closemeEl.style.display = 'block';
    if (mainEl) mainEl.style.marginLeft = width > 500 ? '320px' : '100%';
    if (sidebarEl) {
      sidebarEl.style.width = width > 500 ? '320px' : '100%';
      sidebarEl.style.display = 'block';
    }
    if (logoEl) logoEl.style.marginRight = '330px';
    if (videoEl) {
      videoEl.style.width = '100%';
      videoEl.style.height = `${window.innerHeight - 20}px`;
    }
  };

  const closeme = () => {
    const openmeEl = document.getElementById('openme');
    const closemeEl = document.getElementById('closeme');
    const mainEl = document.getElementById('main');
    const sidebarEl = document.getElementById('mySidebar');
    const logoEl = document.getElementById('spanlogo');
    const videoEl = document.getElementById('iframeVideo');

    if (openmeEl) openmeEl.style.display = 'block';
    if (closemeEl) closemeEl.style.display = 'none';
    if (mainEl) mainEl.style.marginLeft = '0';
    if (sidebarEl) sidebarEl.style.display = 'none';
    if (logoEl) logoEl.style.marginRight = '10px';
    if (videoEl) {
      videoEl.style.width = '100%';
      videoEl.style.height = `${window.innerHeight - 20}px`;
    }
  };

  const videoClick = (
    videoUrl: string | undefined,
    subTopicId: string,
    subTopicName: string,
    topicId: string,
    duration: string,
    videoPlayTime: number,
    content: string | undefined,
    topicType: number,
    tSequence: number,
    sTSequence: number,
    durationInSeconds: number
  ) => {
    setCurrentVideoUrl(videoUrl);
    setVideoPlayTime(videoPlayTime);
    setCurrentTopic(subTopicName);
    setSelectedSubTopicId(subTopicId);
    setDuration(duration);
    setCurrentTopicId(topicId);
    setCurrentContent(content);
    setCurrentTopicType(topicType);
    setTopicSequence(tSequence);
    setSubTopicSequence(sTSequence);
    setDurationInSeconds(durationInSeconds);

    if (topicType === 3) {
      const selfPlacedTextTrackingDTO: SelfPlacedVideoTrackingDTO = {
        CourseId: +ccid!,
        TopicId: +topicId,
        VideoPlayTime: played,
        VideoTotalTime: duration,
        SubTopicId: +subTopicId,
        UserId: user?.userId,
      };
      TrainingService.setSelfPlacedVideoTracking(selfPlacedTextTrackingDTO).then(() => {});
    }

    if (played > 0) {
      const selfPlacedVideoTrackingDTO: SelfPlacedVideoTrackingDTO = {
        CourseId: +ccid!,
        TopicId: preTopicId || '',
        VideoPlayTime: played,
        VideoTotalTime: preDuration || '',
        SubTopicId: preSubTopicId || '',
        UserId: user?.userId,
      };
      TrainingService.setSelfPlacedVideoTracking(selfPlacedVideoTrackingDTO).then(() => {});
    }

    if(!user) return

    TrainingService.getSelfPlacedVideosCourseWise(ccid!, cid!, user?.userId).then((res) => {
      setVideoData(res);
    });
  };

  const checkProgress = (
    progress: { playedSeconds: number } | null, // Allow null for onPause
    currentSubTopicId: string | undefined,
    videoDuration: string | undefined,
    topicId: string | undefined
  ) => {
    if (progress) {
      setPlayed(progress.playedSeconds);
    } else {
      setPlayed(played); // Use current played state
    }
    setPreSubTopicId(currentSubTopicId);
    setPreDuration(videoDuration);
    setPreTopicId(topicId);
  };

  const handlePlay = (playedTime: number | undefined) => {
    if (playerRef.current && playedTime !== undefined) {
      playerRef.current.seekTo(playedTime, 'seconds');
    }
  };

  const handlePlayEnd = () => {
    const selfPlacedVideoTrackingDTO: SelfPlacedVideoTrackingDTO = {
      CourseId: +ccid!,
      TopicId: preTopicId || '',
      VideoPlayTime: durationInSeconds || 0,
      VideoTotalTime: preDuration || '',
      SubTopicId: preSubTopicId || '',
      IsVideoEnded: true,
      UserId: user?.userId,
    };

    if (durationInSeconds) {
      TrainingService.setSelfPlacedVideoTracking(selfPlacedVideoTrackingDTO).then(() => {});
    }

    if (videoData) {
      videoData.CourseTopics.forEach((topic : any) => {
        if (topic.TopicId === preTopicId) {
          topic.SubTopics.forEach((subTopic:any) => {
            if (subTopic.SubTopicId === preSubTopicId) {
              subTopic.SelfPlacedVideoProgress = 100;
            }
          });
        }
      });

      let tCounter = topicSequence || 0;
      let sTCounter = subTopicSequence || 0;

      if (
        videoData.CourseTopics[topicSequence! - 1].SubTopics.length === subTopicSequence
      ) {
        tCounter = topicSequence! + 1;
        setTopicSequence(tCounter);
        const nextTopic = videoData.CourseTopics.find(
          (t:any) => t.TopicSequence === tCounter
        );
        if (nextTopic) {
          const nextSubTopic = nextTopic.SubTopics.find((st:any) => st.SubTopicSequence === 1);
          if (nextSubTopic) {
            setCurrentVideoUrl(nextSubTopic.VideoUrl);
            setVideoPlayTime(nextSubTopic.VideoPlayTime);
            setCurrentTopic(nextSubTopic.SubTopicName);
            setSelectedSubTopicId(nextSubTopic.SubTopicId);
            setPreTopicId(nextTopic.TopicId);
            setCurrentTopicId(nextTopic.TopicId);
            setDuration(nextSubTopic.Duration);
            setPreDuration(nextSubTopic.Duration);
            setCurrentContent(nextSubTopic.Content);
            setCurrentTopicType(nextSubTopic.TopicType);
            setDurationInSeconds(nextSubTopic.DurationInSeconds);
            setTopicSequence(tCounter);
            setSubTopicSequence(1);
          }
        }
      } else {
        sTCounter = subTopicSequence! + 1;
        setSubTopicSequence(sTCounter);
        const currentTopic = videoData.CourseTopics.find(
          (t:any) => t.TopicSequence === topicSequence
        );
        if (currentTopic) {
          const nextSubTopic = currentTopic.SubTopics.find(
            (st:any) => st.SubTopicSequence === sTCounter
          );
          if (nextSubTopic) {
            setCurrentVideoUrl(nextSubTopic.VideoUrl);
            setVideoPlayTime(nextSubTopic.VideoPlayTime);
            setCurrentTopic(nextSubTopic.SubTopicName);
            setSelectedSubTopicId(nextSubTopic.SubTopicId);
            setPreTopicId(currentTopic.TopicId);
            setCurrentTopicId(currentTopic.TopicId);
            setDuration(nextSubTopic.Duration);
            setPreDuration(nextSubTopic.Duration);
            setCurrentContent(nextSubTopic.Content);
            setCurrentTopicType(nextSubTopic.TopicType);
            setDurationInSeconds(nextSubTopic.DurationInSeconds);
            setTopicSequence(topicSequence);
            setSubTopicSequence(sTCounter);
          }
        }
      }
    }
  };

  const backClick = (url: string) => {
    const selfPlacedVideoTrackingDTO: SelfPlacedVideoTrackingDTO = {
      CourseId: +ccid!,
      TopicId: preTopicId || '',
      VideoPlayTime: played,
      VideoTotalTime: preDuration || '',
      SubTopicId: preSubTopicId || '',
      UserId: user?.userId,
    };

    if (played > 0) {
      TrainingService.setSelfPlacedVideoTracking(selfPlacedVideoTrackingDTO).then(() => {});
    }

    if (currentTopicType === 3) {
      const selfPlacedTextTrackingDTO: SelfPlacedVideoTrackingDTO = {
        CourseId: +ccid!,
        TopicId: currentTopicId || '',
        VideoPlayTime: durationInSeconds || 0,
        VideoTotalTime: duration || '',
        SubTopicId: selectedSubTopicId || '',
        UserId: user?.userId,
      };
      TrainingService.setSelfPlacedVideoTracking(selfPlacedTextTrackingDTO).then(() => {});
    }

    navigate(url);
  };

  const saveAndDownloadContent = (
    item: any,
    downloadPath: string,
    type: string,
    courseId: string,
    topicId: string
  ) => {
    let contentType = 'VideoCourse';
    if (cType === 2) {
      contentType = 'VideoCourse';
    } else if (cType === 10) {
      contentType = 'Interview Q&A';
    } else if (cType === 7) {
      contentType = 'Project';
    }

    const contentDownloadHistoryDTO: ContentDownloadHistoryDTO = {
      CourseId: +courseId,
      TopicId: +topicId,
      SubTopicId: item.SubTopicId,
      ContentType: `${contentType}(${type})`,
      ContentName: item.SubTopicName,
      CourseType: cType,
      MemberId: user?.userId,
      MembershipId: user?.membershipId,
    };

    TrainingService.saveContentDownloadHistory(contentDownloadHistoryDTO).then(() => {
      window.location.href = downloadPath;
    });
  };

  return (
    <div className="app">
      <div className="w3-sidebar w3-animate-left" id="mySidebar">
        {videoData && (
          <div className="course-heading">
            <div style={{ color: '#fff', cursor: 'pointer' }} title="Go back to Course">
              <div className="text-middle">{videoData.Name}</div>
            </div>
            <div className="row m-0">
              <div className="col-sm-7 ps-1">
                <span style={{ fontSize: '12px' }}>
                  <strong>Overall Progress</strong>
                </span>
                <span className="ps-1" style={{ fontSize: '12px' }}>
                  ({videoData.CourseWisePerformance}%)
                </span>
                <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${videoData.CourseWisePerformance}%`, height: '10px' }}
                  ></div>
                </div>
              </div>
              <div className="col-sm-5 pe-1">
                <button
                  type="button"
                  className="gobackicon btn btn-primary p-1 mt-2"
                  onClick={() => backClick(backHref)}
                  style={{ color: 'white', fontSize: '14px' }}
                >
                  <i className="fa fa-arrow-circle-left"></i> Go Back
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="accordion" id="accordionPanelself">
          {videoData && videoData.CourseTopics.length > 0 ? (
            videoData.CourseTopics.map((topic:any, index:number) => {
              const parentClass = index <= 1 ? 'accordion-button' : 'accordion-button collapsed';
              return (
                <div key={topic.TopicId} className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${topic.TopicId}`}>
                    <button
                      className={parentClass}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#panel-${topic.TopicId}`}
                      aria-expanded={index <= 1}
                      aria-controls={topic.TopicId}
                    >
                      {topic.TopicName}
                    </button>
                  </h2>
                  {topic.SubTopics.map((subTopic:any) => {
                    const cssClass = index <= 1 ? 'accordion-collapse collapse show' : 'accordion-collapse collapse';
                    return (
                      <div
                        key={subTopic.SubTopicId}
                        id={`panel-${topic.TopicId}`}
                        className={cssClass}
                        aria-labelledby={`heading-${topic.TopicId}`}
                      >
                        <div className="accordion-body">
                          <nav className="nav" role="navigation">
                            <ul className="nav__list w-100">
                              <li
                                className={
                                  selectedSubTopicId === subTopic.SubTopicId ? 'topic-active' : 'topic'
                                }
                              >
                                <label
                                  style={{ minHeight: '55px' }}
                                  onClick={() =>
                                    videoClick(
                                      subTopic.VideoUrl,
                                      subTopic.SubTopicId,
                                      subTopic.SubTopicName,
                                      topic.TopicId,
                                      subTopic.Duration,
                                      subTopic.VideoPlayTime,
                                      subTopic.Content,
                                      subTopic.TopicType,
                                      topic.TopicSequence,
                                      subTopic.SubTopicSequence,
                                      subTopic.DurationInSeconds
                                    )
                                  }
                                  htmlFor="group-topic-3000"
                                  title="Play Video"
                                >
                                  <i
                                    className={
                                      subTopic.TopicType === 3
                                        ? 'fa-regular fa-file-lines'
                                        : 'fa fa-play-circle icon-player'
                                    }
                                    aria-hidden="true"
                                    title="Play Video"
                                  ></i>{' '}
                                  {subTopic.SubTopicName}
                                </label>
                                <div className="d-flex pt-2 pb-2">
                                  {subTopic.SelfPlacedVideoProgress ? (
                                    <span className="ps-2">
                                      <div
                                        className="progress"
                                        style={{
                                          height: '10px',
                                          display: 'inline-block',
                                          width: '55px',
                                        }}
                                      >
                                        <div
                                          className="progress-bar"
                                          style={{
                                            width: `${subTopic.SelfPlacedVideoProgress}%`,
                                            height: '10px',
                                          }}
                                        ></div>
                                      </div>
                                      <span style={{ fontSize: '11px' }}>
                                        {' '}
                                        {subTopic.SelfPlacedVideoProgress}%
                                      </span>
                                    </span>
                                  ) : (
                                    <span style={{ cursor: 'pointer' }} className="ps-2">
                                      <i
                                        className="fas fa-dot-circle"
                                        title="Not Viewed"
                                        style={{ fontSize: '12px' }}
                                      ></i>
                                      {selectedSubTopicId === subTopic.SubTopicId
                                        ? ' Started'
                                        : ' Not Started'}{' '}
                                    </span>
                                  )}
                                  {subTopic.PdfPath && !videoData.IsTrialSubscribed && (
                                    <span style={{ cursor: 'pointer' }} title="Download Slides" className="ps-2">
                                      <a
                                        onClick={() =>
                                          saveAndDownloadContent(
                                            subTopic,
                                            subTopic.PdfPath,
                                            'PDF',
                                            ccid!,
                                            topic.TopicId
                                          )
                                        }
                                      >
                                        <i className="fa fa-file-pdf" aria-hidden="true"></i> Pdf
                                      </a>
                                    </span>
                                  )}
                                  {subTopic.CodePath && !videoData.IsTrialSubscribed && (
                                    <span style={{ cursor: 'pointer' }} title="Download Code" className="ps-2">
                                      <a
                                        onClick={() =>
                                          saveAndDownloadContent(
                                            subTopic,
                                            subTopic.CodePath,
                                            'Code',
                                            ccid!,
                                            topic.TopicId
                                          )
                                        }
                                      >
                                        <i className="fa fa-file-code" aria-hidden="true"></i> Code
                                      </a>
                                    </span>
                                  )}
                                  <span className="ms-auto me-1" title="Duration">
                                    <i className="far fa-clock" aria-hidden="true"></i>{' '}
                                    {subTopic.Duration}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>

      <div id="main">
        <div className="w3-teal">
          <a
            id="openme"
            onClick={openme}
            className="w3-button w3-teal w3-medium btn"
            style={{ display: 'none' }}
          >
            <img src="/images/vhome.png" height="26px" alt="Open Sidebar" />
          </a>
          <a
            id="closeme"
            onClick={closeme}
            style={{ display: 'block' }}
            className="w3-button w3-teal w3-medium btn"
          >
            <img src="/images/vbak.png" height="26px" alt="Close Sidebar" />
          </a>
          <span className="topicheader">
            <button
              type="button"
              className="gobackicon btn btn-primary"
              onClick={() => backClick(backHref)}
              style={{
                color: 'white',
                fontSize: '13px',
                marginTop: '-4px',
                padding: '4px 8px',
                marginRight: '6px',
              }}
            >
              <i className="fa fa-arrow-circle-left"></i> Back
            </button>
            <span>{currentTopic}</span>
            <a title="Go To Dashboard" href="/user/app/subscribed-training">
              <span
                style={{ float: 'right', marginRight: '330px', marginTop: '-4px' }}
                id="spanlogo"
              >
                <img src="/images/logo-white.png" height="24px" alt="Logo" />
              </span>
            </a>
          </span>
        </div>
        {currentTopicType === 3 ? (
          <div className="article">
            <div dangerouslySetInnerHTML={{ __html: currentContent || '' }}></div>
          </div>
        ) : (
          <div className="players">
            <div className="media-wrapper">
              {currentVideoUrl ? (
                <ReactPlayer
                  autoPlay
                  onEnded={handlePlayEnd}
                  ref={playerRef}
                  controls
                  url={currentVideoUrl}
                  className="vimeo-video"
                  playing
                  onProgress={(state) =>
                    checkProgress(state, selectedSubTopicId, duration, currentTopicId)
                  }
                  onPause={() => checkProgress(null, selectedSubTopicId, duration, currentTopicId)} 
                  onReady={() => handlePlay(videoPlayTime)}
                />
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;