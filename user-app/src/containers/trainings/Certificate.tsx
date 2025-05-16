import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner';
import TrainingService from '../../services/TrainingService';
import { useParams } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import type { ProgressCardDTO } from '../../models/training/training';
import Swal from 'sweetalert2';

export default function Certificate() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    const { batchid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [progressData, setProgressData] = useState<ProgressCardDTO[] | any>();
    const user = authUser.Get();
    useEffect(() => {
        setIsLoading(true);
        if(!user) return
        TrainingService.getOverAllPerformance(courseid, subscriptionid, user.userId, batchid).then(res => {
            setProgressData(res);
            setIsLoading(false);
        })
    }, []);

    const saveCertificate = (courseName : any) => {
        if(!user) return
        const CertificateMaster = { CourseId: courseid, CourseName: courseName, MemberId: user.userId, Name: user.firstName }
        TrainingService.saveCertificate(CertificateMaster).then(res => {
            if (res == true){
                Swal.fire({
                    title: '',
                    text: 'Congrats, your certificate has been generated successfully!',
                    icon: 'success'
                }).then((result : any) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }
            else
            Swal.fire('', 'Sorry, your certificate has not been generated!', 'error');
        });
    }
    return (
        <div className="mt-4">
            {
                (progressData != null && isLoading == false) ?
                    <div className="tab-pane fade show active mt-4 pb-5" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="box-shadow mb-3">
                            <div className="p-2">
                                <span className="float-start mt-2 ms-2 mb-3">
                                    {progressData.IsGenerateCertificate != true ? <span>
                                        <strong> <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 32 32" height="24" width="24"><path fillRule="evenodd" d="M4 26h12v2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v10h-2V6H4v20zM16 8H6v2h10V8zM6 12h10v2H6v-2zm6 4H6v2h6v-2zm12 1 1.912 3.703 4.088.594L27 24l.771 4L24 25.75 20.229 28 21 24l-3-2.703 4.2-.594L24 17z" clipRule="evenodd"></path></svg></strong> Earn course certificate by completing your live sessions or course videos, quick notes, hands-on labs and skill tests progress.</span>
                                        : <span>
                                            <strong> <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 32 32" height="24" width="24"><path fillRule="evenodd" d="M4 26h12v2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v10h-2V6H4v20zM16 8H6v2h10V8zM6 12h10v2H6v-2zm6 4H6v2h6v-2zm12 1 1.912 3.703 4.088.594L27 24l.771 4L24 25.75 20.229 28 21 24l-3-2.703 4.2-.594L24 17z" clipRule="evenodd"></path></svg> Congratulations!</strong> on your great achievement! There are no secret of success. It is the result of preparation, hard work and learning from failure. Well done!</span>
                                    }
                                </span>
                                {
                                    ((progressData.IsSessionExist == 1 ? progressData.LiveSessionProgress >= 90 : 1 == 1) && (progressData.IsVedioExist == 1 ? progressData.VideoCourseProgress >= 90 : 1 == 1) && (progressData.IsLabExist == 1 ? progressData.LabProgress >= 90 : 1 == 1) && (progressData.IsQuickNoteExist == 1 ? progressData.QuickNoteProgress >= 90 : 1 == 1) && (progressData.IsSkillTestExist == 1 ? progressData.SkillTestProgress >= 90 : 1 == 1) && (progressData.IsGenerateCertificate == false)) ?
                                        <a onClick={() => saveCertificate(progressData.CourseName)} className="float-end btn btn-primary me-3 mb-2"> <i className="fa-solid fa-file-arrow-down"></i> &nbsp;Generate Certificate</a>
                                        : (progressData.IsGenerateCertificate == true) && <a href={`/User/Home/ViewCertificateDownload/${progressData.CertificateId}`} className="float-end btn btn-primary me-3 mb-2"> <i className="fa-solid fa-file-arrow-down"></i> &nbsp;Download Certificate</a>
                                }
                            </div>
                        </div>
                        {
                            progressData != null && progressData.IsSessionExist == 1 && <div className='row' style={{ padding: '10px', background: 'rgba(216, 211, 211, 0.18)', margin: '4px 0' }}>
                                <div className='col-sm-5 col-xs-12'>
                                    <span><i className='fa-solid fa-microphone'></i> Live Sessions</span>
                                </div>
                                <div className='col-sm-5 col-xs-12'>
                                    <span className='ps-1' style={{ fontSize: '12px' }}>({progressData.LiveSessionProgress}%)</span>
                                    {
                                        progressData != null && progressData.TotalLiveLessons > 0 &&
                                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{progressData.CompletedLiveLessons}</strong> out of <strong>{progressData.TotalLiveLessons}</strong> Lessons</span>
                                    }
                                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                        <div className="progress-bar" style={{ width: progressData.LiveSessionProgress + '%', height: '10px' }}></div>
                                    </div>
                                </div>
                                <div className='col-sm-2 col-xs-12 pt-2 text-center'>
                                    {
                                        (progressData.LiveSessionProgress < 100) ?
                                            <a href={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}`} className="btn btn-info btn-sm" style={{ lineHeight: '1.5', width: '155px' }}>Complete Sessions</a>
                                            : (progressData.LiveSessionProgress == 100) && <span style={{ color: 'green' }}><i className="fa-solid fa-trophy"></i> Well Done!</span>
                                    }
                                </div>
                            </div>
                        }
                        {
                            progressData != null && progressData.IsVedioExist == 1 &&
                            <div className='row' style={{ padding: '10px', background: 'rgba(216, 211, 211, 0.18)', margin: '4px 0' }}>
                                <div className='col-sm-5 col-xs-12'>
                                    <span><i className="fa-regular fa-circle-play"></i> Video Course</span>
                                </div>
                                <div className='col-sm-5 col-xs-12'>
                                    <span className='ps-1' style={{ fontSize: '12px' }}>({progressData.VideoCourseProgress}%)</span>
                                    {
                                        progressData != null && progressData.TotalVideoCourse > 0 &&
                                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{progressData.CompletedVideoCourse}</strong> out of <strong>{progressData.TotalVideoCourse}</strong> Lessons</span>
                                    }

                                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                        <div className="progress-bar" style={{ width: progressData.VideoCourseProgress + '%', height: '10px' }}></div>
                                    </div>

                                </div>
                                <div className='col-sm-2 col-xs-12 pt-2 text-center'>
                                    {
                                        (progressData.VideoCourseProgress < 100) ?
                                            <a href={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/selfplaced`} className="btn btn-info btn-sm" style={{ lineHeight: '1.5', width: '155px' }}>Complete Course</a>
                                            : (progressData.VideoCourseProgress == 100) && <span style={{ color: 'green' }}><i className="fa-solid fa-trophy"></i> Well Done!</span>
                                    }
                                </div>
                            </div>
                        }
                        {
                            progressData != null && progressData.IsQuickNoteExist == 1 &&
                            <div className='row' style={{ padding: '10px', background: 'rgba(216, 211, 211, 0.18)', margin: '4px 0' }}>
                                <div className='col-sm-5 col-xs-12'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="18px" viewBox="0 0 16 16"><path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path><path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path><path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path></svg> Quick Notes</span>
                                </div>
                                <div className='col-sm-5 col-xs-12'>
                                    <span className='ps-1' style={{ fontSize: '12px' }}>({progressData.QuickNoteProgress}%)</span>
                                    {
                                        progressData != null && progressData.TotalQuickNote > 0 &&
                                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{progressData.TotalCompletedQuickNote}</strong> out of <strong>{progressData.TotalQuickNote}</strong> QuickNotes</span>
                                    }

                                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                        <div className="progress-bar" style={{ width: progressData.QuickNoteProgress + '%', height: '10px' }}></div>
                                    </div>
                                </div>
                                <div className='col-sm-2 col-xs-12 pt-2 text-center'>
                                    {
                                        (progressData.QuickNoteProgress < 100) ?
                                            <a href={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/quicknotes`} className="btn btn-info btn-sm" style={{ lineHeight: '1.5', width: '155px' }}>Complete QuickNotes</a>
                                            : (progressData.QuickNoteProgress == 100) && <span style={{ color: 'green' }}><i className="fa-solid fa-trophy"></i> Well Done!</span>
                                    }

                                </div>
                            </div>
                        }
                        {
                            progressData != null && progressData.IsLabExist == 1 &&
                            <div className='row' style={{ padding: '10px', background: 'rgba(216, 211, 211, 0.18)', margin: '4px 0' }}>
                                <div className='col-sm-5 col-xs-12'>
                                    <span><i className="fa-solid fa-flask"></i> Hands-on Labs</span>
                                </div>
                                <div className='col-sm-5 col-xs-12'>
                                    <span className='ps-1' style={{ fontSize: '12px' }}>({progressData.LabProgress}%)</span>
                                    {
                                        progressData != null && progressData.TotalLab > 0 &&
                                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{progressData.CompletedLab}</strong> out of <strong>{progressData.TotalLab}</strong> Labs</span>
                                    }

                                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                        <div className="progress-bar" style={{ width: progressData.LabProgress + '%', height: '10px' }}></div>
                                    </div>
                                </div>
                                <div className='col-sm-2 col-xs-12 pt-2 text-center'>
                                    {
                                        (progressData.LabProgress < 100) ?
                                            <a href={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/labs`} className="btn btn-info btn-sm" style={{ lineHeight: '1.5', width: '155px' }}>Complete Labs</a>
                                            : (progressData.LabProgress == 100) && <span style={{ color: 'green' }}><i className="fa-solid fa-trophy"></i> Well Done!</span>
                                    }

                                </div>
                            </div>
                        }
                        {
                            progressData != null && progressData.IsSkillTestExist == 1 &&
                            <div className='row' style={{ padding: '10px', background: 'rgba(216, 211, 211, 0.18)', margin: '4px 0' }}>
                                <div className='col-sm-5 col-xs-12'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M223.036-202.957 74.42-351.334l53.283-53.043 95 94.334 176-176.24L451.746-432l-228.71 229.043Zm0-320L74.42-671.334l53.283-53.043 95 94.334 176-176.24L451.746-752l-228.71 229.043Zm298 240.834v-75.754H885.58v75.754H521.036Zm0-320v-75.754H885.58v75.754H521.036Z"></path></svg> Skill Test</span>
                                </div>
                                <div className='col-sm-5 col-xs-12'>
                                    <span className='ps-1' style={{ fontSize: '12px' }}>({progressData.SkillTestProgress}%)</span>
                                    {
                                        progressData != null && progressData.TotalSkillTestCount > 0 &&
                                        <span style={{ fontSize: '12px', paddingLeft: '10px' }}>Completed <strong>{progressData.CompletedSkillTestCount}</strong> out of <strong>{progressData.TotalSkillTestCount}</strong> Skill Test</span>
                                    }

                                    <div className="progress" style={{ height: '10px', marginTop: '5px' }}>
                                        <div className="progress-bar" style={{ width: progressData.SkillTestProgress + '%', height: '10px' }}></div>
                                    </div>
                                </div>
                                <div className='col-sm-2 col-xs-12 pt-2 text-center'>
                                    {
                                        (progressData.SkillTestProgress < 100) ?
                                            <a href={`/user/app/training/details/${courseid}/${subscriptionid}/${batchid}/tests`} className="btn btn-info btn-sm" style={{ lineHeight: '1.5', width: '155px' }}>Complete SkillTest</a>
                                            : (progressData.SkillTestProgress == 100) && <span style={{ color: 'green' }}><i className="fa-solid fa-trophy"></i> Well Done!</span>
                                    }

                                </div>
                            </div>
                        }
                    </div> : <div>
                        {isLoading ? <div className="pt-4"><LoadingSpinner /></div> : "No Data Found!"}
                    </div>
            }
        </div>
    )
}
