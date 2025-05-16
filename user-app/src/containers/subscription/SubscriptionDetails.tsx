import { useEffect, useState } from 'react'


import moment from 'moment';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import TrainingService from '../../services/TrainingService';
import type { SubscriptionDTO } from '../../models/training/training';


export default function SubscriptionDetails() {
  const [membershipData, setMembershipData] = useState<SubscriptionDTO[] | any>();
  const [isLoading, setIsLoading] = useState(false);
  const user = authUser.Get();
  
  useEffect(() => {
    setIsLoading(true);
    if(!user) return
    TrainingService.membershipDetails(user.userId).then(res => {
      setMembershipData(res);
      setIsLoading(false);
    })
  }, []);

  return (
    <div className="mt-5">
      <div className="block-header">
        <h2>Subscription Details</h2>
      </div>
      <div className="mt-4">
        <div className="tab-wrapper">
          <section className="tab-content">
            {
              ((membershipData != null && membershipData.Data != null && membershipData.Data.length > 0) || 
              user?.membershipId) ?
                <div>
                  <table className="table table-bordered bordered table-striped" style={{ border: '1px solid #dee2e6' }}>
                    <tbody>
                      <tr>
                        <th style={{ border: '1px solid #dee2e6' }}>SNo.</th>
                        <th style={{ border: '1px solid #dee2e6' }}>Course Name</th>
                        <th style={{ border: '1px solid #dee2e6' }} className="hidden-xs">Course Type</th>
                        <th style={{ border: '1px solid #dee2e6' }} className="hidden-xs">Subscribed Date</th>
                        <th style={{ border: '1px solid #dee2e6' }} className="hidden-xs">Expiry Date</th>
                        <th style={{ border: '1px solid #dee2e6' }} className="hidden-xs">Status</th>
                        {/* <th style={{ border: '1px solid #dee2e6' }}>Action</th> */}
                      </tr>                      
                      {
                        membershipData != null && membershipData.Data != null && membershipData.Data.map((course:any, cIndex:number) => {
                          const SNo = cIndex + 1;
                          
                          return <tr key={cIndex}>
                            <td style={{ border: '1px solid #dee2e6' }}>{SNo}</td>
                            <td style={{ border: '1px solid #dee2e6' }}>{course.Course}</td>
                            <td style={{ border: '1px solid #dee2e6' }} className="hidden-xs">{course.CourseTypeName}</td>
                            <td style={{ border: '1px solid #dee2e6' }} className="hidden-xs">{moment(course.strSubscribeDate).format("DD MMM yyyy")}</td>
                            <td style={{ border: '1px solid #dee2e6' }} className="hidden-xs">{moment(course.ExpiryDate).format("DD MMM yyyy")}</td>
                            <td style={{ border: '1px solid #dee2e6' }} className="hidden-xs">
                              {course.Status}
                              {course.Status == 'Expired' ? <div><a href={course.URL}>Renew</a></div>:''}
                            </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div> : <div>
                  {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Subscription Found!"}
                </div>
            }
          </section>
        </div>
      </div>
    </div>
  )
}