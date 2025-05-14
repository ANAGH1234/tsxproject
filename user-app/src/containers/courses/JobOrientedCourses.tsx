import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import moment from 'moment';
import '../../assets/css/training.css';
import type { CourseDTO } from '../../models/dashboard/dashboard';
import type { SubscribeCourseDetailDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';

const JobOrientedCourses: React.FC = () => {
  const { courseid, subscriptionid, batchid } = useParams<{
    courseid: string;
    subscriptionid: string;
    batchid: string;
  }>();
  const [courseData, setCourseData] = useState<CourseDTO | null >();
  const [batchData, setBatchData] = useState<SubscribeCourseDetailDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = authUser.Get() as User;
  const isCorporateTraining = user.subscriptionType === 8;
  const [batchSelectedValue, setBatchSelectedValue] = useState<string>(
    `${courseid}/${subscriptionid}/${batchid}`
  );

  useEffect(() => {
    setIsLoading(true);
    document.title = 'Job Oriented Courses';

  
    TrainingService.getCourseDetailCourseId(
      Number(courseid),
      user.userId,
      user.membershipId,
      user.membershipExpiry
    )
      .then((res) => {
        setCourseData(res || {});
        document.title = res.Name || 'Job Oriented Courses';
      })
      .catch((err) => {
        console.error('GetCourseDetailCourseId Error:', err);
      });

    // Fetch batch data
    if (isCorporateTraining) {
      // For corporate training, fetch single batch
      TrainingService.getBatchesForCorporate(Number(courseid), user.userId)
        .then((res) => {
          setBatchData(res || null);
          if (res) {
            setBatchSelectedValue(`${courseid}/${subscriptionid}/${res.batchId}`);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('GetBatchesForCorporate Error:', err);
          setBatchData(null);
          setIsLoading(false);
        });
    } else {
      // For non-corporate, fetch all batches
      TrainingService.getBatches(Number(courseid), Number(batchid))
        .then((res) => {
          setBatchData(res || null);
          if (res?.batchLiveList?.length > 0) {
            const defaultBatchId = batchid || res.batchLiveList[0].BatchId;
            setBatchSelectedValue(`${courseid}/${subscriptionid}/${defaultBatchId}`);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('GetBatches Error:', err);
          setBatchData(null);
          setIsLoading(false);
        });
    }

    localStorage.setItem('pl', 'courseplan');
  }, [
    courseid,
    subscriptionid,
    batchid,
    user.userId,
    user.membershipId,
    user.membershipExpiry,
    isCorporateTraining,
  ]);

  const batchSelected = (batch: string) => {
    const preurl = window.location.href.substring(
      0,
      window.location.href.indexOf('details/') + 'details/'.length
    );
    window.location.href = `${preurl}${batch}${window.location.href.includes('livesession') ? '/livesession' : ''}`;
  };

  return (
    <div className="pt-4">
      {isLoading ? (
        <div className="pt-4">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="catinfo">
          <div className="row">
            <div className="col-sm-12">
              <div className="mt-4 left">
                <div className="px-4 py-1 d-none d-sm-block">
                  <img src={courseData?.MobileBanner} alt={courseData?.Name} style={{ width: '80px' }} />
                </div>
                <div className="caption">
                  <h3 className="mb-2 w-100">{courseData?.Name}</h3>
                  <div className="row">
                    <span className="col-sm-12 col-12">
                      <i className="fa-solid fa-calendar-days"></i> Subscription Expiry:{' '}
                      {moment(courseData?.ExpiryDate).format('ddd, MMM DD, YYYY')}
                    </span>
                    <span className="col-sm-12 col-12">
                      <i className="fa-solid fa-user-group"></i> Batch Code:{' '}
                      {isCorporateTraining ? (
                        batchData?.batchLiveList?.[0] ? (
                          <span>
                            {batchData.batchLiveList[0].BatchCode} -{' '}
                            {moment(batchData.batchLiveList[0].BatchTiming).format('hh:mm A')} :{' '}
                            {moment(batchData.batchLiveList[0].StartDate).format('MMM YYYY')}
                          </span>
                        ) : (
                          <span>No Batch Found!</span>
                        )
                      ) : (
                        batchData?.batchLiveList &&
                        batchData?.batchLiveList?.length > 0 ? (
                          batchData?.batchLiveList.length > 1 && window.location.href.includes('livesession') ? (
                            <select
                              id="batchCode"
                              name="batchCode"
                              className="d-inline-block form-select"
                              style={{ width: '14.4rem', marginLeft: '6px' }}
                              onChange={(e) => batchSelected(e.target.value)}
                              value={batchSelectedValue}
                            >
                              <option value="" disabled>
                                --- Filter By Batch Code ---
                              </option>
                              {batchData?.batchLiveList.map((item, index) => {
                                const batchUrl = `${courseid}/${subscriptionid}/${item.BatchId}`;
                                return (
                                  <option value={batchUrl} key={index}>
                                    {item.BatchCode} - {moment(item.BatchTiming).format('hh:mm A')} :{' '}
                                    {moment(item.StartDate).format('MMM YYYY')}

                                  </option>
                                );
                              })}
                            </select>
                          ) : (
                            <span>
                              {batchData?.batchLiveList[0].BatchCode} -{' '}
                              {moment(batchData?.batchLiveList[0].BatchTiming).format('hh:mm A')} :{' '}
                              {moment(batchData?.batchLiveList[0].StartDate).format('MMM YYYY')}
                            </span>
                          )
                        ) : (
                          <span>No Batches Available!</span>
                        )
                      )}
                    </span>
                    {window.location.href.includes('livesession') && (
                      <span className="col-sm-12 col-12">
                        <i className="fa-regular fa-calendar-check"></i>{' '}
                        <NavLink to="/user/app/schedules" className="btn-link">
                          Batch Schedules
                        </NavLink>
                      </span>
                    )}
                    {batchData?.mentorName && (
                      <span className="col-sm-12 col-12 mentorspan">
                        <i className="fa-solid fa-chalkboard-user"></i> Mentor: {batchData.mentorName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="tab">
          {courseData?.DisplayCourseContent?.IsJobOrientedSubscribed && (
            <NavLink to="" end className="tablink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m319-280 161-73 161 73 15-15-176-425-176 425 15 15ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
              </svg>
              <span>Learning Path</span>
            </NavLink>
          )}
          {courseData?.DisplayCourseContent?.IsLiveSessionsSubscribed && (
            <NavLink to="livesession" end className="tablink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height="24px"
                viewBox="0 -960 960 960"
              >
                <path d="M480-406.247q-48.522 0-81.674-34.463-33.152-34.463-33.152-83.696v-245.978q0-47.434 33.493-80.797t81.341-33.363q47.847 0 81.412 33.363 33.565 33.363 33.565 80.797v245.978q0 49.233-33.232 83.696-33.231 34.463-81.753 34.463Zm0-238.934Zm-36.282 537.377v-132.464q-108.921-12.478-181.501-93.55-72.579-81.072-72.579-190.588h72.804q0 90.007 63.611 152.116 63.611 62.109 153.862 62.109 90.252 0 153.948-62.143 63.695-62.143 63.695-152.082h72.804q0 109.573-72.579 190.616-72.58 81.044-181.501 93.506v132.48h-72.564ZM480.017-482q16.996 0 28.026-12.375 11.029-12.375 11.029-30.031v-245.957q0-16.208-11.301-27.318Q496.47-808.79 480-808.79t-27.771 11.109q-11.301 11.11-11.301 27.318v245.957q0 17.656 11.046 30.031Q463.021-482 480.017-482Z"></path>
              </svg>
              <span>Live Sessions</span>
            </NavLink>
          )}
        </div>
        <div className="tab-content">
          <Outlet context={[courseData?.LabGuidePdf]} />
        </div>
      </div>
    </div>
  );
};

export default JobOrientedCourses;