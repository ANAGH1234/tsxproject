import  { useEffect, useState } from 'react';
import { EnumTestPaperType } from '../../helpers/enum';

import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { CourseDTO, TestPapersDTO } from '../../models/dashboard/dashboard';
import DashboardService from '../../services/DashBoardService';



export default function MySkillChallenge() {
  const [courseData, setCourseData] = useState<TestPapersDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = authUser.Get();

  // Check if dark mode is active by looking for the 'dark-mode' class on body
  const isDarkMode: boolean = document.body.classList.contains('dark-mode');

  useEffect(() => {
    document.title = 'Skill Challenge | ScholarHat';
    setIsLoading(true);
    if(!user) return
    DashboardService.GetSkillChallengeByCategory(EnumTestPaperType.SkillChallenge, 0, user.userId)
      .then((res) => {
        const filteredData: TestPapersDTO[] = res.filter(
          (item: TestPapersDTO) => item.Score != null && item.Percentage != null
        );
        setCourseData(filteredData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error('Error fetching skill challenges:', err);
      });
  }, []);

  return (
    <div className="mt-4">
      <div className="block-header">
        <h2>My Skill Challenges</h2>
      </div>
      <div className="tab-wrapper">
        <section className="tab-content">
          {courseData.length > 0 ? (
            <div className="row mt-5">
              {courseData.map((item: TestPapersDTO, index: number) => (
                <div className="col-sm-6 mb-3" key={index}>
                  <div
                    className="card shadow-sm box-shadow"
                    style={{
                      borderRadius: '10px',
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div className="row m-1 flex-grow-1">
                      <div className="d-flex flex-row align-items-center">
                        <div className="p-2">
                          <img
                            src={`https://dotnettrickscloud.blob.core.windows.net${item.CatImage}`}
                            alt={item.Title}
                            className="img-fluid"
                            style={{
                              maxHeight: '70px',
                              width: '70px',
                              height: '70px',
                              objectFit: 'contain',
                              borderRadius: '5px',
                            }}
                          />
                        </div>
                        <div className="p-2 w-100">
                          <h5 className="pt-1 mb-2">{item.Title}</h5>
                          <div
                            style={{
                              fontSize: '13px',
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '15px',
                              color: isDarkMode ? '#b0b0b0' : '#666666',
                            }}
                          >
                            <span>
                              <i className="fa fa-question-circle me-1" style={{ color: isDarkMode ? '#66b0ff' : '#007bff' }}></i>
                              Questions: {item.TotalQuestions}
                            </span>
                            <span>
                              <i className="fa fa-trophy me-1" style={{ color: isDarkMode ? '#ffca28' : '#ffc107' }}></i>
                              Max Score: {item.TotalQuestions}
                            </span>
                            {item.Score != null && item.Percentage != null ? (
                              <>
                                <span>
                                  <i className="fa fa-star me-1" style={{ color: isDarkMode ? '#4caf50' : '#28a745' }}></i>
                                  Your Score: {item.Score}
                                </span>
                                <span>
                                  <i className="fa fa-percent me-1" style={{ color: isDarkMode ? '#f44336' : '#dc3545' }}></i>
                                  Percentage: {item.Percentage}%
                                </span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ color: isDarkMode ? '#ffffff' : '#333333' }}>
              {isLoading ? (
                <div className="pt-4">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="pt-2" style={{ color: isDarkMode ? '#b0b0b0' : '#666666' }}>
                  No Skill Challenges Found!
                </div>
              )}
            </div>
          )}
          <div className="text-center mt-4">
            <a href="/library/skillchallenges">
              <button
                className="btn"
                style={{
                  backgroundColor: isDarkMode ? '#0056b3' : '#2196f3',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  fontWeight: '500',
                }}
              >
                Browse Free Skill Challenges
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}