import React, { useEffect, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import LoadingSpinner from '../../components/LoadingSpinner';
import authUser from '../../helpers/authUser';
import type { ProgressCardDTO } from '../../models/training/training';

export default function UserProgressReport() {
    const [progressData, setProgressData] = useState<ProgressCardDTO[]| any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        document.title = 'Learning Progress';
        if(!user) return
        TrainingService.getUserProgressReport(user.userId).then(res => {
            setProgressData(res);
            setIsLoading(false);
        })
    }, []);
    return (
        <div className='pt-4'>
            {
                (progressData != null && progressData.length > 0) ?
                    <div style={{ minHeight: '150px' }}>
                        {
                            progressData.map((item:any, cIndex:number) => {
                                let accordianShow = cIndex == 0 ? 'show' : '';
                                let accordianCollapse = cIndex == 0 ? '' : 'collapsed';
                                return <div key={cIndex} className="accordion-item">
                                            <h4 className="accordion-header" id={`heading-${item.CourseId}`}>
                                                <button className={`accordion-button ${accordianCollapse}`} type="button" data-bs-toggle="collapse" data-bs-target={`#accordion-section${cIndex}`} style={{ background: 'rgb(246 249 253)' }}>
                                                    <div className='row w-100'>
                                                        <div style={{ fontWeight: '500', width: '65%' }}>
                                                            {cIndex + 1}. {item.CourseName}
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
                                                                progressData != null &&
                                                                <div className="table mb-0">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr style={{ backgroundColor: '#66849c', color: 'white' }}>
                                                                                <td></td>                                                                                
                                                                                <td>Video Course</td>
                                                                                <td>Quick Notes</td>
                                                                                <td>Hands-On Labs</td>
                                                                                <td>Projects</td>
                                                                                <td>Interview Q&A</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>Total</strong></td>
                                                                                <td>{item.TotalVideoCourse}</td>         
                                                                                <td>{item.TotalQuickNote}</td>
                                                                                <td>{item.TotalLab}</td> 
                                                                                <td>{item.TotalProject}</td> 
                                                                                <td>{item.TotalQnA}</td>                                                                       
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>Progress(%)</strong></td>
                                                                                <td>{item.VideoCourseProgress}%</td>  
                                                                                <td>{item.QuickNoteProgress}%</td>    
                                                                                <td>{item.LabProgress}%</td>                                                                                  
                                                                                <td>{item.ProjectProgress}%</td>  
                                                                                <td>{item.QnAProgress}%</td>                                                                              
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
