import  { useEffect, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import moment from 'moment';
import type { UserProgressReportDTO } from '../../models/training/training';

export default function LiveSessionsUserProgressReport() {
    const [progressData, setProgressData] = useState<UserProgressReportDTO | any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        document.title = 'Learning Progress';
        TrainingService.liveSessionsUserProgressReport(user?.userId).then(res => {
            setProgressData(res);
            setIsLoading(false);
        })
    }, []);
    return (
        <div className='pt-4'>
            {
                (progressData != null && progressData.progressCards != null && progressData.progressCards.length > 0) ?
                    <div style={{ minHeight: '150px' }}>
                        {
                            progressData != null && progressData.progressCards != null && progressData.progressCards.map((selfC:any, cIndex:number) => {
                                let accordianShow = cIndex == 0 ? 'show' : '';
                                let accordianCollapse = cIndex == 0 ? '' : 'collapsed';
                                return <div key={cIndex} className="accordion-item">
                                    <h4 className="accordion-header" id={`heading-${selfC.CourseId}`}>
                                        <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section${cIndex}`} style={{ background: 'rgb(246 249 253)' }}>
                                            <div className='row w-100'>
                                                <div style={{ fontWeight: '500', width: '65%' }}>
                                                    {cIndex + 1}. {selfC.CourseName}
                                                </div>
                                                <div style={{ width: '35%', paddingTop: '5px' }}>
                                                    <span style={{ float: 'right', fontSize: '13px', fontWeight: '500', paddingRight: '5px' }}></span>
                                                </div>
                                            </div>
                                        </button>
                                    </h4>
                                    <div id={`accordion-section${cIndex}`} className={`accordion-collapse collapse ${accordianShow}`}>
                                        <div className="accordion-body p-0">
                                            {
                                                <div>
                                                    {
                                                        progressData != null && progressData.progressCards != null && progressData.progressCards.length > 0 &&
                                                        <div className="table mb-0">
                                                            <table>
                                                                <tbody>
                                                                    <tr style={{ backgroundColor: '#66849c', color: 'white' }}>
                                                                        <td>Live Sessions</td>
                                                                        <td>Month</td>
                                                                        <td>Batch Code</td>
                                                                        <td>Timing</td>
                                                                        <td>Total Sessions</td>
                                                                        <td>Progress(%)</td>
                                                                    </tr>
                                                                    {
                                                                        selfC.LiveSessionsProgressCardList != null && selfC.LiveSessionsProgressCardList.length > 0 ?
                                                                        selfC.LiveSessionsProgressCardList != null && selfC.LiveSessionsProgressCardList.map((liveC:any, liveI:number) => {
                                                                            
                                                                            return <tr key={liveI}>
                                                                                <td>#{liveI+1}</td>
                                                                                <td>{moment(liveC.StartDate).format('MMM YYYY')}</td>
                                                                                <td>{liveC.BatchCode}</td>
                                                                                <td>{moment(liveC.BatchTiming).format('hh:mm A')}</td>
                                                                                <td>{liveC.TotalLiveSessions}</td>
                                                                                <td>{liveC.LiveSessionProgress}%</td>                                                                               
                                                                            </tr>
                                                                        }):<div>
                                                                            No Data Found!
                                                                        </div>
                                                                    }

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    }
                                                    {
                                                        progressData != null && progressData.progressCards != null && progressData.progressCards.length > 0  &&
                                                        <div className="table mb-0">
                                                            <table>
                                                                <tbody>
                                                                    <tr style={{ backgroundColor: '#66849c', color: 'white' }}>
                                                                        <td>Training Content</td>
                                                                        <td>Video Course</td>
                                                                        <td>Quick Notes</td>
                                                                        <td>Hands-On Labs</td>                                                                        
                                                                        <td>Projects</td>
                                                                        <td>Interview Q&A</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Total Content</strong></td>
                                                                        <td>{selfC.TotalVideoCourse}</td>
                                                                        <td>{selfC.TotalQuickNote}</td>
                                                                        <td>{selfC.TotalLab}</td>
                                                                        <td>{selfC.TotalProject}</td>
                                                                        <td>{selfC.TotalQnA}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td><strong>Progress(%)</strong></td>
                                                                        <td>{selfC.VideoCourseProgress}%</td>
                                                                        <td>{selfC.QuickNoteProgress}%</td>
                                                                        <td>{selfC.LabProgress}%</td>
                                                                        <td>{selfC.ProjectProgress}%</td>
                                                                        <td>{selfC.QnAProgress}%</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                            })
                        }
                    </div> : <div>
                        {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Data Found!"}
                    </div>
            }
        </div>
    )
}
