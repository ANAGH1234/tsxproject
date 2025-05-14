import  { useEffect, useState, type JSX } from 'react';
import BatchService from '../../services/BatchService';
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { BatchMasterDTO } from '../../models/training/training';
import moment from 'moment';
import type { TimeZone } from '../../models/dashboard/dashboard';


export default function Batches(): JSX.Element {
  const [batchData, setBatchData] = useState<BatchMasterDTO[]>([]);
  const [zoneData, setZoneData] = useState<TimeZone[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedZone, setSelectedZone] = useState<string>('India Standard Time');

  useEffect(() => {
    document.title = 'Live Batches';
    setIsLoading(true);
    Promise.all([
      BatchService.getAll(selectedZone).then((res) => {
        setBatchData(res.data);
      }),
      TrainingService.getTimeZonesList().then((res) => {
        setZoneData(res);
      }),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [selectedZone]);

  const zoneSelected = (zone: string): void => {
    setSelectedZone(zone);
    setIsLoading(true);
    BatchService.getAll(zone)
      .then((res) => {
        setBatchData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="pt-5">
      <div>
        <div className="card">
          <h4 className="ps-3 pt-3 pb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5 피해480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"></path>
            </svg>{' '}
            Important Information
          </h4>
          <div className="ps-2">
            <ul>
              <li>
                The <b>current batches and upcoming batches</b> schedule are listed
                here.
              </li>
              <li>
                The batches schedule, you can filter as per your <b>time zone</b>.
              </li>
              <li>
                To check each batch's live training sessions do click on{' '}
                <b>Session Schedules</b> tab.
              </li>
            </ul>
            <p className="ps-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m480-80-10-120h-10q-142 0-241-99t-99-241q0-142 99-241t241-99q71 0 132.5 26.5t108 73q46.5 46.5 73 108T800-540q0 75-24.5 144t-67 128q-42.5 59-101 107T480-80Zm80-146q71-60 115.5-140.5T720-540q0-109-75.5-184.5T460-800q-109 0-184.5 75.5T200-540q0 109 75.5 184.5T460-280h100v54Zm-101-95q17 0 29-12t12-29q0-17-12-29t-29-12q-17 0-29 12t-12 29q0 17 12 29t29 12Zm-29-127h60q0-30 6-42t38-44q18-18 30-39t12-45q0-51-34.5-76.5T460-720q-44 0-74 24.5T344-636l56 22q5-17 19-33.5t41-16.5q27 0 40.5 15t13.5 33q0 17-10 30.5T480-558q-35 30-42.5 47.5T430-448Zm30-65Z"></path>
              </svg>{' '}
              Can't find convenient schedule? let us know through email at{' '}
              <a href="mailto:support@scholarhat.com">support@scholarhat.com</a> or
              call us at <b>+91-9999 123 502.</b>
            </p>
          </div>
        </div>
        <div>
          <div className="float-end mb-3 mt-3">
            <span className="d-inline-block fw-bold pe-2">Time Zone</span>
            {zoneData.length > 0 && (
              <select
                id="countryZone"
                name="countryZone"
                className="selectpicker form-select d-inline-block"
                data-show-subtext="true"
                data-live-search="true"
                style={{ width: 200 }}
                value={selectedZone}
                onChange={(e) => zoneSelected(e.target.value)}
              >
                <option value="">-- Select Country --</option>
                {zoneData.map((item: TimeZone, index: number) => (
                  <option value={item.Id} key={index}>
                    {item.DisplayName}
                  </option>
                ))}
              </select>
            )}
          </div>
          {isLoading ? (
            <div className="pt-5">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="card w-100">
              {batchData.length > 0 ? (
                <table className="table mb-0">
                  <tbody>
                    <tr className="schedule-header">
                      <td colSpan={2}>Batch Start Date (Code)</td>
                      <td>Training Program</td>
                      <td>Batch Time/Days</td>
                    </tr>
                    {batchData.map((item: BatchMasterDTO, index: number) => (
                      <tr
                        key={index}
                        style={{ borderBottom: '1px solid rgb(219, 214, 214)' }}
                      >
                        <td>
                          <span className="pe-1">
                            <img
                              src={item.MobileBanner}
                              alt={item.CourseName}
                              className="img-fluid"
                              style={{ maxHeight: '60px', marginTop: '4px' }}
                            />
                          </span>
                        </td>
                        <td>
                          {new Date(item.StartDate).toDateString()}
                          <div>({item.BatchCode})</div>
                        </td>
                        <td>
                          <i className="fas fa-video"></i> {item.CourseName}
                          <div>
                            <i className="fas fa-chalkboard-teacher"></i> By:{' '}
                            {item.Name}
                          </div>
                        </td>
                        <td>
                          <i className="far fa-clock"></i>{' '}
                          {moment(item.BatchTiming).format('hh:mm A')} -{' '}
                          {moment(item.BatchEndTiming).format('hh:mm A')}
                          <div>
                            <i className="far fa-calendar-alt"></i> {item.BatchDays}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="row">
                  <div className="col-sm-12 mt-5 pt-5">
                    <b>No Schedule Available!</b>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}