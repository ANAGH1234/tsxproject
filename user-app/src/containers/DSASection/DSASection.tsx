import React, { useEffect, useRef, useState } from 'react';
import authUser from '../../helpers/authUser';
import './DSASection.css';
import Icons from '../../helpers/Icons';
import RankingsService from '../../services/ProblemService';
import type { ProblemsEntityDTO, UserRankingDTO } from '../../models/problems/problems';
import type { User } from '../../models/user/User';



// Define the component
const DSASection: React.FC = () => {
  const [currentUserData, setCurrentUserData] = useState<UserRankingDTO | null>(null);
  const [problemOfTheDay, setProblemOfTheDay] = useState<ProblemsEntityDTO | null>(null);
  const user = authUser.Get() as User;

  const fetchProblemOfTheDayData = async () => {
    try {
      const data = await RankingsService.fetchProblemOfTheDay();
      console.log(data.Problem)
      setProblemOfTheDay(data?.Problem);
    } catch (error) {
      console.error('fetchProblemOfTheDay Error:', error);
      setProblemOfTheDay(null);
    }
  };

  useEffect(() => {
    fetchProblemOfTheDayData();
  }, []);

  const timeRef = useRef<any>(null); 
  const intervalRef = useRef<any>(null); 


  const fetchUserRankingData = async () => {
    if (!user) return;
    try {
      const res = await RankingsService.fetchUserRanking(user.userId);
      console.log(res)
      setCurrentUserData(res);
    } catch (error) {
      console.error('Error fetching user ranking data:', error);
      setCurrentUserData(null);
    }
  };

  useEffect(() => {
    fetchUserRankingData();
  }, [user.userId]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const difference = endOfDay.getTime() - now.getTime();
      if (difference <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        if (timeRef.current) {
          timeRef.current.innerText = '00:00:00';
        }
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      if (timeRef.current) {
        timeRef.current.innerText = formattedTime;
      }
    };

    updateTime();
    intervalRef.current = setInterval(updateTime, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="dsa-container">
      <div className="dsa-left">
        <div className="summary-item">
          <span className="summary-value">
            {currentUserData?.Ranking ?? 0}{' '}
            <Icons.rank width={50} height={50} fill="#2196F3" />
          </span>
          <span className="summary-title">Current Rank</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">
            {currentUserData?.ProblemsSolved ?? 0}
            <Icons.problemSolved width={50} height={50} fill="green" />
          </span>
          <span className="summary-title">Problems Solved</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">
            {currentUserData?.TotalPoints ?? 0}{' '}
            <Icons.coinStack width={50} height={50} fill="#FFD700" />
          </span>
          <span className="summary-title">Points Scored</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">
            {currentUserData?.TotalAttempts ?? 0}{' '}
            <Icons.attempt width={50} height={50} fill="red" />
          </span>
          <span className="summary-title">Total Attempts</span>
        </div>
        <a href="/leaderboard" className="dsa-left-button">
          View Leaderboard
        </a>
      </div>
      <div className="dsa-right">
        <div className="dsa-right-badge">Problem Of The Day</div>
        <div className="dsa-right-problem-name truncate-text">
          {problemOfTheDay?.Title ?? 'No Problem Available'}
        </div>
        <div className="dsa-right-details">
          {problemOfTheDay
            ? `Difficulty: ${problemOfTheDay.Difficulty} | Points: ${problemOfTheDay.Points} | Acceptance: ${problemOfTheDay.Acceptance} %`
            : 'No Details Available'}
        </div>
        <div className="dsa-right-bottom">
          <div className="dsa-right-timer">
            <Icons.timeIcon fill="red" />
            <span ref={timeRef}>Loading...</span>
          </div>
          <a
            href={problemOfTheDay?.Url ?? '#'}
            className="dsa-right-button"
            style={{ pointerEvents: problemOfTheDay ? 'auto' : 'none' }}
          >
            Solve Problem
          </a>
        </div>
      </div>
    </div>
  );
};

export default DSASection;