import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import type { AppliedJobDTO } from '../../models/training/training';
import authUser from '../../helpers/authUser';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function AppliedJobs() {
  const [JobData, setJobData] = useState<AppliedJobDTO[]| any>([]);
  const [JobCount, setJobCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = authUser.Get();
  useEffect(() => {
    setIsLoading(true);
    if(!user) return
    document.title = 'JobList';
    TrainingService.getJobList(user.email).then(res => {
      setJobData(res);
      setIsLoading(false);
    })
  }, []);

  return (
    <div className='pt-5'>
      <div className="block-header">
        <h2>My Applied Jobs</h2>
      </div>
      {
        (JobData != null && JobData != null && JobData.length > 0)?
        <div className='pt-3'>
          <table className="table table-bordered bordered table-striped" style={{ border: '1px solid #dee2e6' }}>
            <tbody>
              <tr>
                <th style={{ border: '1px solid #dee2e6' }}>S.No.</th>
                <th style={{ border: '1px solid #dee2e6' }}>Title </th>
                <th style={{ border: '1px solid #dee2e6' }}>Company </th>
                <th style={{ border: '1px solid #dee2e6' }}>Location </th>
                <th style={{ border: '1px solid #dee2e6' }}>Applied Date </th>

                <th style={{ border: '1px solid #dee2e6' }}>Status</th>
              </tr>
              {
                JobData.map((job:any, cIndex:number) => {

                  return <tr key={cIndex}>
                    <td style={{ border: '1px solid #dee2e6' }}>{cIndex + 1}</td>
                    <td style={{ border: '1px solid #dee2e6' }}>{job.JobTitle}</td>
                    <td style={{ border: '1px solid #dee2e6' }}>{job.CompanyName}</td>
                    <td style={{ border: '1px solid #dee2e6' }}>{job.JobLocation}</td>
                    <td style={{ border: '1px solid #dee2e6' }}>{moment(job.SubmitedDate).format("DD MMM yyyy")}</td>

                    <td> <a >Applied</a>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>: <div>
                            {isLoading ? <div className="pt-4"><LoadingSpinner /></div> 
                            : JobData.length == 0 &&
                            <div className="text-center pt-3">
                              <p className="pt-2 pb-2">
                                <img src="/images/empty-box.png" />
                              </p>
                              <p>You haven't applied any job yet.</p>
                              <p className="pt-2 pb-2">
                                <NavLink to="/jobs" className="btn btn-primary">Browse Jobs</NavLink>
                              </p>
                            </div> 
                            }
                        </div>
      }
      
    </div>
  )
}
