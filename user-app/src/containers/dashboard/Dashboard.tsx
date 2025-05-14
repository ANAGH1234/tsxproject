import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import VideoProgress from './VideoProgress';
import LiveSessionProgress from './LiveSessionProgress';
import authUser from '../../helpers/authUser';
import CheckVerification from '../../components/CheckVerification';
import { PLATFORM_VIDEOS } from '../../helpers/constant';
import type { User } from '../../models/user/User';
import DashboardService from '../../services/DashBoardService';
import type { DashboardVideoProgressDTO } from '../../models/dashboard/dashboard';
import type { ProblemsDTO } from '../../models/problems/problems';
import RankingsService from '../../services/ProblemService';
import CourseCount from './CoursesCount';
import DSASection from '../DSASection/DSASection';
import Icons from '../../helpers/Icons';
import { ShowEnumMembershipType } from '../../helpers/enum';




const Dashboard: React.FC = () => {
  const [videoProgressData, setVideoProgressData] = useState<DashboardVideoProgressDTO[]>([]);
  const [problemList, setProblemList] = useState<ProblemsDTO[] | null>(null);
  const [sessionProgressData, setSessionProgressData] = useState<DashboardVideoProgressDTO[]>([]);
  const [platformVideos, setPlatformVideos] = useState<Record<string, string>>(PLATFORM_VIDEOS);

  const user = authUser.Get() as User;

  useEffect(() => {
    document.title = 'Dashboard';
    DashboardService.VideoProgress(user.userId)
      .then((res) => {
        setVideoProgressData(res);
      })
      .catch((err) => {
        console.error('VideoProgress Error:', err);
        setVideoProgressData([]);
      });
    DashboardService.LiveSessionProgress(user.userId)
      .then((res) => {
        setSessionProgressData(res);
      })
      .catch((err) => {
        console.error('LiveSessionProgress Error:', err);
        setSessionProgressData([]);
      });
  }, [user.userId]);

  const fetchProblemsList = async () => {
    try {
      const data = await RankingsService.fetchProblemsList();
      setProblemList(data);
    } catch (error) {
      console.error('fetchProblemsList Error:', error);
      setProblemList([]);
    }
  };

  useEffect(() => {
    fetchProblemsList();
  }, []);

  return (
    <div className="pb-3">
      <div className="pt-5">
        {!user.isVerified && <CheckVerification />}
        <h2>
          Welcome, {user.firstName}{' '}
          {user.membershipId > 0 && (
            <NavLink to="/user/app/subscriptions" className="membership-badge">
              {ShowEnumMembershipType(user.membershipId)}
            </NavLink>
          )}
        </h2>
      </div>
      <CourseCount />
      <h2 className="pt-2">DSA Problems Solving Progress</h2>
      <DSASection />
      <div className="row" style={{ marginTop: '1rem' }}>
        <div className="col-12 col-xxl-6 problem-list">
          <div className="problem-list-top">
            <div className="problem-list-title">Problem List</div>
            <a href="/problems" className="dsa-right-button">
              View All
            </a>
          </div>
          <div className="problem-list-table-container">
            <table className="problem-list-table">
              <thead>
                <tr>
                  <th>
                    <Icons.user style={{ marginRight: '5px' }} fill="gray" />
                    Name
                  </th>
                  <th>
                    <Icons.pin style={{ marginRight: '5px' }} fill="gray" />
                    Topics
                  </th>
                  <th>
                    <Icons.award style={{ marginRight: '5px' }} fill="gray" />
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody>
                {problemList != null &&
                  problemList.length > 0 &&
                  problemList.map((problem, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        window.location.href = problem.Url;
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="truncate-text">{problem.Title}</td>
                      <td>
  {problem.Topics && typeof problem.Topics === 'string' ? (
    problem.Topics.split(',').map((topic, index) => (
      <div className="problem-list-topic-badge" key={index}>
        {topic.trim()}
      </div>
    ))
  ) : (
    <div className="problem-list-topic-badge">No topics</div>
  )}
</td>
                      <td
                        style={{
                          color:
                            problem.Difficulty === 'Hard'
                              ? 'red'
                              : problem.Difficulty === 'Medium'
                              ? '#FCA301'
                              : 'green',
                        }}
                      >
                        {problem.Difficulty}
                      </td>
                    </tr>
                  ))}
                {problemList != null && problemList.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '0.5rem' }}>
                      No Problems Available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {problemList == null && (
              <div
                style={{
                  padding: '0.5rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="#007BFF"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="31.415, 31.415"
                    strokeLinecap="round"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-xxl-6">
          <div className="row pt-1 text-center">
            <a href="/refer-and-earn">
              <img
                src="https://www.scholarhat.com/images/Refer-and-Earn.png"
                className="img-fluid"
                style={{ border: '2px solid #557298', borderRadius: '10px' }}
                alt="Refer and Earn"
              />
            </a>
          </div>
          <h2 className="pt-4">How to Access ScholarHat Platform?</h2>
          <div className="row pt-2" id="video-container">
            {['AccessCourse', 'JoinLiveSession', 'SettingUpDiscord', 'LiveMembership'].map(
              (key) => (
                <div className="col-12 col-sm-6" key={key}>
                  <iframe
                    className="ratio ratio-4x3"
                    src={`//youtube.com/embed/${platformVideos[key]}`}
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href="//youtube.com/embed/${platformVideos[key]}?autoplay=1"><img src="//img.youtube.com/vi/${platformVideos[key]}/hqdefault.jpg"><span><svg viewBox='0 0 200 200' height='40px' width='40px' y='0' x='0'><circle r='96' cy='100' cx='100' stroke-width='8' stroke='#FFFFFF' fill='#347eff'></circle><circle r='130' cy='100' cx='100' fill='url(#ripple)' clip-path='url(#clipper)'></circle><polygon points='70.993,60.347 153.398,102.384 70.993,144.42' fill='#FFFFFF'></polygon></svg></span></a>`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`ScholarHat ${key} Video`}
                  ></iframe>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className="row pt-3">
        {videoProgressData.length > 0 && (
          <div className="col-sm-6">
            <VideoProgress />
          </div>
        )}
        {sessionProgressData.length > 0 && (
          <div className="col-sm-6">
            <LiveSessionProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;