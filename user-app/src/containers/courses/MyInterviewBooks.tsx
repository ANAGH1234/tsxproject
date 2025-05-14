import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import { EnumCourseType } from '../../helpers/enum';
import DashboardService from '../../services/DashBoardService';
import type { CourseCategoryDTO } from '../../models/dashboard/dashboard';

const MyInterviewBooks: React.FC = () => {
  const [courseData, setCourseData] = useState<CourseCategoryDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Free Interview Books Library | ScholarHat';
    setIsLoading(true);
    DashboardService.GetDisplayCoursesByCategory(EnumCourseType.Books, 0)
      .then((res) => {
        // Ensure the response is treated as CourseCategoryDTO[]
        const typedResponse = (res as CourseCategoryDTO[]) || [];
        // Optional: Validate response structure
        if (
          typedResponse.every(
            (item) =>
              typeof item.courseCategoryId === 'number' &&
              typeof item.courseCategoryName === 'string' &&
              Array.isArray(item.courses)
          )
        ) {
          setCourseData(typedResponse);
        } else {
          console.warn('Invalid response structure:', res);
          setCourseData([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching interview books:', err);
        setCourseData([]);
        setIsLoading(false);
      });
  }, []);

  // Placeholder TimeFormatter component (replace with actual implementation)
  const TimeFormatter: React.FC<{ duration: string }> = ({ duration }) => (
    <span>{duration}</span>
  );

  return (
    <div className="mt-4">
      <div className="tab-wrapper">
        <section className="tab-content">
          {isLoading ? (
            <div className="pt-4">
              <LoadingSpinner />
            </div>
          ) : courseData.length > 0 ? (
            <div className="row mt-5">
              {courseData.map((item) =>
                item.courses && item.courses.length > 0 ? (
                  item.courses.map((course, index) => {
                    const sessionURL = course.url;
                    return (
                      <div
                        className="col-sm-6 mb-3"
                        key={`${item.courseCategoryId}-${index}`}
                      >
                        <div className="card">
                          <div className="row m-1">
                            <div className="d-flex flex-row">
                              <div className="p-2">
                                <img
                                  src={course.mobileBanner || '/default-image.jpg'}
                                  alt={course.name || item.courseCategoryName}
                                  className="img-fluid"
                                  style={{ maxHeight: '70px' }}
                                />
                              </div>
                              <div className="p-2 w-100">
                                <h5 className="pt-1">{course.name || item.courseCategoryName}</h5>
                                <div style={{ fontSize: '13px', paddingTop: '5px' }}>
                                  {course.duration && (
                                    <span>
                                      <i className="fa fa-clock" aria-hidden="true"></i>{' '}
                                      <span className="ps-1">
                                        <strong>
                                          <TimeFormatter duration={course.duration} />
                                        </strong>
                                      </span>
                                    </span>
                                  )}
                                  {course.qaCount > 0 && (
                                    <span className="ps-2">
                                      <i className="fa fa-question" aria-hidden="true"></i>{' '}
                                      <span className="ps-1">
                                        <strong>{course.qaCount} Interview Books Videos</strong>
                                      </span>
                                    </span>
                                  )}
                                </div>
                                <div className="pt-2 float-end">
                                  <a
                                    className="btn btn-primary btn-sm"
                                    href={sessionURL}
                                    target="_self"
                                  >
                                    Access Now
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-sm-6 mb-3" key={item.courseCategoryId}>
                    <div className="card">
                      <div className="row m-1">
                        <div className="d-flex flex-row">
                          <div className="p-2">
                            <img
                              src="/default-image.jpg"
                              alt={item.courseCategoryName}
                              className="img-fluid"
                              style={{ maxHeight: '70px' }}
                            />
                          </div>
                          <div className="p-2 w-100">
                            <h5 className="pt-1">{item.courseCategoryName}</h5>
                            <div className="pt-2 float-end">
                              <a href="#" className="btn btn-primary btn-sm">
                                Access Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            'No Data Found!'
          )}
        </section>
      </div>
    </div>
  );
};

export default MyInterviewBooks;