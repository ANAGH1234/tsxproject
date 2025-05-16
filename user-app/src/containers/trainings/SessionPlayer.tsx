import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import TrainingService from '../../services/TrainingService';
import '../../assets/css/video.css';
import '../../assets/css/player.css';
import authUser from '../../helpers/authUser';
import type { ContentDownloadHistoryDTO, CourseLiveSessionVideo, LiveVideoTrackingDTO } from '../../models/training/training';



const SessionPlayer: React.FC = () => {
  const navigate = useNavigate();
  const playerRef = useRef<ReactPlayer>(null);
  const { cid, bid, sid, tid } = useParams<{ cid: string; bid: string; sid: string; tid: string }>();
  const [played, setPlayed] = useState<number>(0);
  const [course, setCourse] = useState<CourseLiveSessionVideo[]>([]);
  const [currentCourse, setCurrentCourse] = useState<CourseLiveSessionVideo[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | any>(null);
  const [preTopicId, setPreTopicId] = useState<string | any>(null);
  const [duration, setDuration] = useState<string>('');
  const user = authUser.Get();

  // Disable back button
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

  const prevPath = localStorage.getItem('pl') || '';
  const backHref: string = prevPath.includes('courseplan')
    ? `/user/app/courseplan/details/${cid}/${sid}/${bid}/livesession`
    : `/user/app/training/details/${cid}/${sid}/${bid}`;

  useEffect(() => {
    if(!user) return
    TrainingService.liveCourseVideo(cid!, bid!, sid!, user.userId).then((res) => {
      setCourse(res);
      setCurrentCourse(
        res.filter((video: CourseLiveSessionVideo) => {
          setSelectedTopicId(tid);
          if (preTopicId != null && preTopicId > '0') {
            setPreTopicId(tid);
          }
          if(!tid) return false
          return video.LiveTopicId === +tid;
        })
      );
    });

    // if (played > 0) {
    //   const liveVideoTrackingDTO: LiveVideoTrackingDTO = {
    //     BatchId: bid!,
    //     CourseId: cid!,
    //     TopicId: preTopicId || '',
    //     VideoPlayTime: played,
    //     VideoTotalTime: duration,
    //     UserId: user.UserId,
    //   };
    //   TrainingService.setVideoTracking(liveVideoTrackingDTO).then(() => {});
    // }
  }, []);

  const handlePlay = (playedTime: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(playedTime, 'seconds');
    }
  };

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

  const videoClick = (liveTopicId: number) => {
    if(!user) return
    const liveVideoTrackingDTO: LiveVideoTrackingDTO = {
      BatchId: bid!,
      CourseId: cid!,
      TopicId: preTopicId || '',
      VideoPlayTime: played,
      VideoTotalTime: duration,
      UserId: user.userId,
    };

    if (played > 0) {
      TrainingService.setVideoTracking(liveVideoTrackingDTO).then(() => {});
    }

    setTimeout(() => {
      TrainingService.liveCourseVideo(cid!, bid!, sid!, user.userId).then((res) => {
        setCourse(res);
        setSelectedTopicId(liveTopicId);
        setCurrentCourse(
          course.filter((video: CourseLiveSessionVideo) => video.LiveTopicId === +liveTopicId)
        );
      });
    }, 500);
  };

  const checkProgress = (
    progress: { playedSeconds: number },
    currentTopicId: string,
    videoDuration: string
  ) => {
    setPlayed(progress.playedSeconds);
    setPreTopicId(currentTopicId);
    setDuration(videoDuration);
  };

  const backClick = (url: string) => {
    if(!user) return
    const liveVideoTrackingDTO: LiveVideoTrackingDTO = {
      BatchId: bid!,
      CourseId: cid!,
      TopicId: preTopicId || '',
      VideoPlayTime: played,
      VideoTotalTime: duration,
      UserId: user.userId,
    };

    if (played > 0) {
      TrainingService.setVideoTracking(liveVideoTrackingDTO).then(() => {
        navigate(url);
      });
    } else {
      navigate(url);
    }
  };


  const handlePlayEnd = () => {
    if(!user) return
    const liveVideoTrackingDTO: LiveVideoTrackingDTO = {
      BatchId: bid!,
      CourseId: cid!,
      TopicId: preTopicId || '',
      VideoPlayTime: played,
      VideoTotalTime: duration,
      IsVideoEnded: true,
      UserId: user.userId,
    };

    if (played > 0) {
      TrainingService.setVideoTracking(liveVideoTrackingDTO).then(() => {});
    }
  };

  const saveAndDownloadContent = (
    item: any,
    downloadPath: string,
    type: string
  ) => {
    const contentDownloadHistoryDTO: ContentDownloadHistoryDTO = {
        
      CourseId: item.CourseId,
      ContentType: `LiveSession(${type})`,
      ContentName: item.TopicName,
      CourseType: 1,
      MemberId: user?.userId,
      MembershipId: user?.membershipId,
    };

    TrainingService.saveContentDownloadHistory(contentDownloadHistoryDTO).then(() => {
      window.location.href = downloadPath;
    });
  };

  let currentVideoURL: string = '';
  let currentTopic: string = '';
  let currentTopicId: string = '';
  let videoDuration: string = '';
  let videoPlayedTime: any = 0;

  return (
    <div className="app">
      {/* Left Sidebar Start */}
      <div className="w3-sidebar w3-animate-left" id="mySidebar">
        {currentCourse.length > 0 &&
          currentCourse.map((item, index) => (
            <div className="course-heading" key={index}>
              <div
                style={{ color: '#fff', cursor: 'pointer' }}
                title="Go back to Course"
              >
                <div className="course-logo">
                  <img src={item.CourseSmallBanner} height="40px" alt="Course Banner" />
                </div>
                <div className="text-middle">{item.CourseName}</div>
              </div>
              <div className="row m-0">
                <div className="col-sm-7 ps-1">
                  <span style={{ fontSize: '12px' }}>
                    <strong>Overall Progress</strong>
                  </span>
                  <span className="ps-1" style={{ fontSize: '12px' }}>
                    ({item.BatchWisePerformace}%)
                  </span>
                  <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                    <div
                      className="progress-bar"
                      style={{ width: `${item.BatchWisePerformace}%`, height: '10px' }}
                    ></div>
                  </div>
                </div>
                <div className="col-sm-5 pe-1">
                  <button
                    className="gobackicon btn btn-primary p-1 mt-2"
                    onClick={() => backClick(backHref)}
                    style={{ color: 'white', fontSize: '14px' }}
                  >
                    <i className="fa fa-arrow-circle-left"></i> Go Back
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* Sidebar Topic navigation panel */}
        <nav className="nav" role="navigation">
          <ul className="nav__list w-100">
            {course.map((topic : any, index) => (
              <li
                key={index}
                className={selectedTopicId === topic.LiveTopicId ? 'topic-active' : 'topic'}
              >
                <label
                  style={{ minHeight: '55px' }}
                  onClick={() => videoClick(topic.LiveTopicId)}
                  htmlFor={`group-topic-${topic.LiveTopicId}`}
                  title="Play Video"
                >
                  <i className="fa fa-play-circle icon-player" aria-hidden="true" title="Play Video" />{' '}
                  {topic.TopicName}
                </label>
                <div className="d-flex pt-2 pb-2">
                  {topic.LiveVideoProgress ? (
                    <span className="ps-2">
                      <div
                        className="progress"
                        style={{ height: '10px', display: 'inline-block', width: '55px' }}
                      >
                        <div
                          className="progress-bar"
                          style={{ width: `${topic.LiveVideoProgress}%`, height: '10px' }}
                        ></div>
                      </div>
                      <span style={{ fontSize: '11px' }}> {topic.LiveVideoProgress}%</span>
                    </span>
                  ) : (
                    <span style={{ cursor: 'pointer' }} className="ps-2">
                      <i className="fas fa-dot-circle" title="Not Viewed" style={{ fontSize: '12px' }}></i>
                      {selectedTopicId === topic.LiveTopicId ? ' Started' : ' Not Started'}
                    </span>
                  )}

                  {topic.PdfPath && !topic.IsTrialSubscription && (
                    <span style={{ cursor: 'pointer' }} title="Download Slides" className="ps-2">
                      <a onClick={() => saveAndDownloadContent(topic, topic.PdfPath, 'PDF')}>
                        <i className="fa fa-file-pdf" aria-hidden="true"></i> Pdf
                      </a>
                    </span>
                  )}
                  {topic.CodePath && !topic.IsTrialSubscription && (
                    <span style={{ cursor: 'pointer' }} title="Download Code" className="ps-2">
                      <a onClick={() => saveAndDownloadContent(topic, topic.CodePath, 'Code')}>
                        <i className="fa fa-file-code" aria-hidden="true"></i> Code
                      </a>
                    </span>
                  )}

                  <span className="ms-auto me-1" style={{ cursor: 'pointer' }} title="Duration">
                    <a>
                      <i className="far fa-clock" aria-hidden="true"></i> {topic.Duration}
                    </a>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Left Sidebar End */}

      {/* Player/Content Section Start */}
      <div id="main">
        <div className="w3-teal">
          {/* Handling sidebar open/close */}
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
            {currentCourse.map((video) => {
              currentTopic = video.TopicName;
              return null;
            })}
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
            <a>
              <span
                style={{ float: 'right', marginRight: '330px', marginTop: '-4px' }}
                id="spanlogo"
              >
                <img src="/images/logo-white.png" height="24px" alt="Logo" />
              </span>
            </a>
          </span>
        </div>

        <div className="players">
          <div className="media-wrapper">
            {currentCourse.map((video) => {
              currentVideoURL = video.UrlPath;
              currentTopicId = video.LiveTopicId.toString();
              videoDuration = video.Duration;
              videoPlayedTime = video.VideoPlayTime;
              return null;
            })}

            <ReactPlayer
              onEnded={handlePlayEnd}
              ref={playerRef}
              controls
              url={currentVideoURL}
              className="vimeo-video"
              playing
              onProgress={(state) => checkProgress(state, currentTopicId, videoDuration)}
              onPause={() => checkProgress({ playedSeconds: played }, currentTopicId, videoDuration)}
              onReady={() => handlePlay(videoPlayedTime)}
            />
          </div>
        </div>
      </div>
      {/* Player/Content Section End */}
    </div>
  );
};

export default SessionPlayer;