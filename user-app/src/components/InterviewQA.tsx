import React, { useEffect, useState } from 'react';
import type { CourseDTO } from '../models/dashboard/dashboard';
import DashboardService from '../services/DashBoardService';

const InterviewQA: React.FC = () => {
  const [qAData, setQAData] = useState<CourseDTO[]>([]);

  useEffect(() => {
    DashboardService.InterviewQA().then(res => {
      setQAData(res);
    }).catch(err => {
      console.error('Failed to fetch InterviewQA data:', err);
    });
  }, []);

  return (
    <div className='pt-2'>
      <div style={{ paddingBottom: '10px' }}>
        <span><strong>Interview Q&A</strong></span>
        <span style={{ float: 'right' }}><a href='/user/app/subscribed-training'>View All</a></span>
      </div>

      {qAData.length > 0 && (
        <span className="box-shadow pt-4">
          {qAData.map((course, cIndex) => (
            <div key={cIndex} className="border-bottom">
              <div className="row">
                <div className="d-flex flex-row">
                  <div className="p-2">
                    <img
                      src={course.mobileBanner}
                      alt={course.title}
                      className="img-fluid"
                      style={{ maxHeight: '46px' }}
                    />
                  </div>
                  <div className="p-2 d-flex flex-row">
                    <h6 className='pt-3'>
                      {course.name}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </span>
      )}
    </div>
  );
};

export default InterviewQA;