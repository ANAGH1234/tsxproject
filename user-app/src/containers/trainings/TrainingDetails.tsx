import React, { useEffect, useState } from 'react';
import TrainingService from '../../services/TrainingService';
import { Outlet, NavLink, useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import '../../assets/css/training.css';
import authUser from '../../helpers/authUser';
import type { SubscribeCourseDetailDTO } from '../../models/training/training';
import type { CourseDTO } from '../../models/dashboard/dashboard';

export default function TrainingDetails() {
    const { courseid } = useParams();
    const { subscriptionid } = useParams();
    let { batchid } = useParams();
    const [courseData, setCourseData] = useState<CourseDTO | any>();
    const [batchData, setBatchData] = useState<SubscribeCourseDetailDTO | any>();
    const user = authUser.Get();

    let batchValue = courseid + '/' + subscriptionid + '/' + batchid;
    const [batchSelectedValue, setBatchSelectedValue] = useState(batchValue);

    useEffect(() => {
        if(!user) return
        TrainingService.getCourseDetailCourseId(courseid, user.userId, user.membershipId, user.membershipExpiry).then(res => {
           
            
            setCourseData(res);
            document.title = res.Name;
        });
        TrainingService.getBatches(courseid, batchid).then(res => {
           
            
            setBatchData(res);
            batchValue = courseid + '/' + subscriptionid + '/' + res.BatchId;
            setBatchSelectedValue(batchValue);
        });

        localStorage.setItem('pl', "training");
    }, []);

    console.log(batchData);
    

   

    function batchSelected(batch : any) {
        const preurl = window.location.href.substring(0, window.location.href.indexOf('details/') + 'details/'.length);
        window.location.href = preurl + batch;
    }

    return (
        <div className='pt-4'>
            <div className='catinfo'>
                <div className='row'>
                    <div className='col-sm-12'>
                        {courseData &&
                        <div className="mt-4 left">
                            <div className='px-4 py-1 d-none d-sm-block'>
                                <img src={courseData?.MobileBanner} alt={courseData?.Name} style={{ width: '80px' }}></img>
                            </div>
                            <div className='caption'>
                                <h3 className="mb-2 w-100">{courseData?.Name}</h3>
                                <div className='row'>
                                    {
                                        !(window.location.href.includes('selfplaced')) && !(window.location.href.includes('tests')) && !(window.location.href.includes('labs')) && !(window.location.href.includes('qna')) && !(window.location.href.includes('project')) && !(window.location.href.includes('certificate')) && !(window.location.href.includes('quicknotes')) ?
                                            <>
                                                <span className='col-sm-8 col-12'>
                                                    <i className="fa-solid fa-calendar-days"></i> Subscription Expiry: {moment(courseData.ExpiryDate).format('ddd, MMM DD, YYYY')}
                                                </span>
                                                <span className='col-sm-4 col-12'>
                                                    <i className="fa-regular fa-calendar-check"></i> <NavLink to="/user/app/schedules" className="btn-link">Batch Schedules</NavLink>
                                                </span>
                                            </> : <>
                                                <span className='col-sm-12 col-12'>
                                                    <i className="fa-solid fa-calendar-days"></i> Subscription Expiry: {moment(courseData.ExpiryDate).format('ddd, MMM DD, YYYY')}
                                                </span>
                                            </>
                                    }
                                </div>
                                {
                                    batchData != null && batchData.BatchLiveList != null && batchData.BatchLiveList.length > 0 && batchData.CourseType != 2 && !(window.location.href.includes('selfplaced')) && !(window.location.href.includes('tests')) && !(window.location.href.includes('labs')) && !(window.location.href.includes('qna')) && !(window.location.href.includes('project')) && !(window.location.href.includes('certificate')) && !(window.location.href.includes('quicknotes')) &&
                                    <div className='pt-4 pb-3'> 
                                        <i className="fa-solid fa-user-group"></i> Batch Code: 
                                        {
                                            batchData.CourseType === 14 ? (
                                               
                                                <span style={{ marginLeft: '6px' }}>
                                                    {batchData.BatchLiveList[0]?.BatchCode} - {moment(batchData.BatchLiveList[0]?.BatchTiming).format('hh:mm A')} : {moment(batchData.BatchLiveList[0]?.StartDate).format('MMM YYYY')}
                                                </span>
                                            ) : (
                                              
                                                <select 
                                                    id="batchCode" 
                                                    name="batchCode" 
                                                    className="d-inline-block form-select" 
                                                    style={{ width: '14.4rem', marginLeft: '6px' }}
                                                    onChange={(e) => batchSelected(e.target.value)} 
                                                    value={batchSelectedValue}
                                                >
                                                    <option value="value" disabled> --- Filter By Batch Code ---</option>
                                                    {
                                                        batchData.BatchLiveList && batchData.BatchLiveList.map((item2 :any, index2:number) => {
                                                            const batchUrl = courseid + "/" + subscriptionid + "/" + item2.BatchId;
                                                            return (
                                                                <option value={batchUrl} key={index2}>
                                                                    {item2.BatchCode} - {moment(item2.BatchTiming).format('hh:mm A')} : {moment(item2.StartDate).format('MMM YYYY')}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            )
                                        }&nbsp;&nbsp;
                                        {batchData.MentorName != null && (
                                            <span className="mentorspan"> 
                                                <i className="fa-solid fa-chalkboard-user"></i> Mentor: {batchData.MentorName}
                                            </span>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>
}
                    </div>
                </div>
            </div>

            <div>
                {
                    !(window.location.href.includes('books')) &&
                    <div className='tab'>
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsLiveSessionsSubscribed &&
                            <NavLink to="" end className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M480-406.247q-48.522 0-81.674-34.463-33.152-34.463-33.152-83.696v-245.978q0-47.434 33.493-80.797t81.341-33.363q47.847 0 81.412 33.363 33.565 33.363 33.565 80.797v245.978q0 49.233-33.232 83.696-33.231 34.463-81.753 34.463Zm0-238.934Zm-36.282 537.377v-132.464q-108.921-12.478-181.501-93.55-72.579-81.072-72.579-190.588h72.804q0 90.007 63.611 152.116 63.611 62.109 153.862 62.109 90.252 0 153.948-62.143 63.695-62.143 63.695-152.082h72.804q0 109.573-72.579 190.616-72.58 81.044-181.501 93.506v132.48h-72.564ZM480.017-482q16.996 0 28.026-12.375 11.029-12.375 11.029-30.031v-245.957q0-16.208-11.301-27.318Q496.47-808.79 480-808.79t-27.771 11.109q-11.301 11.11-11.301 27.318v245.957q0 17.656 11.046 30.031Q463.021-482 480.017-482Z"></path></svg>
                                <span> Live Sessions</span></NavLink>
                        }
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsSelfPlacedVideoSubscribed &&
                            <NavLink to="selfplaced" end className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M381.565-307.609 652.63-480 381.565-652.63v345.021Zm98.468 233.587q-83.468 0-157.541-31.878-74.073-31.879-129.393-87.199-55.32-55.32-87.199-129.36-31.878-74.04-31.878-157.508 0-84.468 31.878-158.541 31.879-74.073 87.161-128.906 55.283-54.832 129.341-86.818 74.057-31.986 157.545-31.986 84.488 0 158.589 31.968 74.102 31.967 128.916 86.768 54.815 54.801 86.79 128.883Q886.218-564.516 886.218-480q0 83.501-31.986 157.57-31.986 74.069-86.818 129.36-54.833 55.291-128.873 87.17-74.04 31.878-158.508 31.878Zm-.033-68.13q141.043 0 239.446-98.752Q817.848-339.656 817.848-480q0-141.043-98.402-239.446-98.403-98.402-239.566-98.402-140.163 0-238.945 98.402-98.783 98.403-98.783 239.566 0 140.163 98.752 238.945Q339.656-142.152 480-142.152ZM480-480Z"></path></svg>
                                <span> Video Course</span></NavLink>
                        }
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsQuickNoteSubscribed &&
                            <NavLink to="quicknotes" end className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 0 16 16">
                                    <path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>
                                </svg>
                                <span> Quick Notes</span></NavLink>
                        }
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsLabSubscribed &&
                            <NavLink to="labs" className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 0 24 24"> <path d="M22.29,18.37a2,2,0,0,0,0-.24,4.3,4.3,0,0,0-.09-.47c-.05-.15-.11-.31-.17-.46a3.88,3.88,0,0,0-.24-.45l-6.3-8.94V3.64h1.48a.92.92,0,0,0,0-1.84H7.36a.92.92,0,0,0,0,1.84H8.84V7.81L2.55,16.75a2.17,2.17,0,0,0-.24.45,2.85,2.85,0,0,0-.17.46A3.89,3.89,0,0,0,2,18.6c0,.08,0,.16,0,.23A3.8,3.8,0,0,0,2.26,20a3.6,3.6,0,0,0,.59,1,2.5,2.5,0,0,0,.32.33,2.54,2.54,0,0,0,.36.29,3.89,3.89,0,0,0,.4.25,4.28,4.28,0,0,0,.43.19,3.76,3.76,0,0,0,1.22.21H18.72A3.67,3.67,0,0,0,19.94,22l.44-.19a3.64,3.64,0,0,0,1.8-2.28,3.2,3.2,0,0,0,.11-.69,1.69,1.69,0,0,0,0-.23A1.77,1.77,0,0,0,22.29,18.37Zm-1.95.44a.78.78,0,0,1-.05.18l0,.08a.78.78,0,0,0-.05.14,2.09,2.09,0,0,1-.46.64l-.09.08a.88.88,0,0,1-.17.12l-.15.09-.11.06-.25.09a2.33,2.33,0,0,1-.53.07H5.85a1.27,1.27,0,0,1-.28,0,1.93,1.93,0,0,1-.73-.26A.91.91,0,0,1,4.68,20l-.23-.2h0a2.21,2.21,0,0,1-.3-.45l-.06-.12a1.77,1.77,0,0,1-.15-.65,1.88,1.88,0,0,1,.3-1.12l0-.05L10.67,8.5h0V3.64h2.95V8.49h0l6.44,8.92a2.38,2.38,0,0,1,.17.31,2.12,2.12,0,0,1,.14.68A2.58,2.58,0,0,1,20.34,18.81Z"></path> <path d="M5.66,17.74A.82.82,0,0,0,6.36,19H17.94a.82.82,0,0,0,.7-1.26l-4.1-5.55H9.76Z"></path> </svg>
                                <span> Hands-on Labs</span></NavLink>
                        }
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsProjectSubscribed &&
                            <NavLink to="project" end className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="m188.913-556.739 101.696 43.326q17.282-33.848 36.706-67.174 19.424-33.326 40.989-63.891l-76.369-15.283-103.022 103.022Zm156.391 84.109L476.63-341.065q58.435-27.435 107.479-59.598 49.043-32.163 79.804-62.924 80.044-80.283 117.804-163.848Q819.478-711 823.196-819.196 715-815.478 631.435-777.717q-83.565 37.76-163.609 117.804-30.761 30.761-62.924 79.804-32.163 49.044-59.598 107.479Zm231.153-99.588q-19.761-19.76-19.761-48.663 0-28.902 19.761-48.663 19.761-19.521 48.543-19.521 28.783 0 48.544 19.521 19.521 19.761 19.521 48.663 0 28.903-19.521 48.663-19.761 19.522-48.544 19.522-28.782 0-48.543-19.522ZM560.5-184.913l103.261-103.022-15.283-76.369q-30.565 21.565-63.891 41.108-33.326 19.544-67.174 36.587L560.5-184.913Zm331.261-702.609q8.522 143.174-35.076 257.087-43.598 113.913-142.12 212.674-1.478 1.239-2.956 2.837t-2.718 2.837l22 110.478q3.479 17.153-1.739 33.185-5.217 16.033-17.652 28.468L537.87-65.326l-88.827-206.848-172.869-172.869L69.326-533.87 244.195-707.5q12.435-12.435 28.348-17.652 15.913-5.218 33.066-1.739l110.478 22q1.239-1.24 2.717-2.098 1.479-.859 2.957-2.098 98.761-99 212.793-142.978 114.033-43.979 257.207-35.457ZM141.587-324.043q36.913-36.914 89.565-37.294 52.652-.38 89.326 36.294 36.435 36.434 36.055 89.206-.381 52.772-37.055 89.446-27.674 27.674-85.641 45.63-57.968 17.957-168.642 32 14.044-110.674 31.5-169.261 17.457-58.587 44.892-86.021Zm47.978 48.739q-13.761 14.761-23.924 44.848-10.163 30.086-18.163 78.652 48.565-8 78.652-18.402 30.087-10.403 44.609-24.164 18.283-16.043 18.543-40.347.261-24.305-16.782-42.587-18.283-17.044-42.587-16.544-24.304.5-40.348 18.544Z"></path></svg>
                                <span> Projects</span></NavLink>
                        }
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsTestPaperSubscribed &&
                            <NavLink to="tests" className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M223.036-202.957 74.42-351.334l53.283-53.043 95 94.334 176-176.24L451.746-432l-228.71 229.043Zm0-320L74.42-671.334l53.283-53.043 95 94.334 176-176.24L451.746-752l-228.71 229.043Zm298 240.834v-75.754H885.58v75.754H521.036Zm0-320v-75.754H885.58v75.754H521.036Z"></path></svg>
                                <span> Skill Tests</span></NavLink>
                        }
                        {
                            courseData != null && courseData.DisplayCourseContent != null && courseData.DisplayCourseContent.IsQnASubscribed &&
                            <NavLink to="qna" className="tablink">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24px" viewBox="0 -960 960 960"><path d="M481.442-244.667q18.304 0 31.228-12.924 12.924-12.924 12.924-31.341 0-18.418-12.924-31.188-12.924-12.771-31.308-12.771t-31.228 12.758q-12.844 12.758-12.844 31.281 0 18.337 12.865 31.261t31.287 12.924Zm-37.485-148.666h67.985q0-27.696 6.873-48.442 6.873-20.747 40.33-49.776 28.775-25.043 42.322-49.86 13.547-24.817 13.547-56.261 0-54.755-36.235-86.447-36.236-31.692-92.967-31.692-52.464 0-90.254 27.369-37.79 27.369-54.268 71.176l61.637 23.491q9.319-24.986 29.379-42.16 20.059-17.174 50.469-17.174 30.863 0 49.2 17.155 18.337 17.154 18.337 42.273 0 20.348-12.308 38.902-12.308 18.555-33.62 36.279-34.029 29.855-47.228 54.29-13.199 24.435-13.199 70.877Zm36.065 320.029q-83.95 0-158.142-31.959-74.193-31.958-129.426-87.191-55.233-55.233-87.191-129.404-31.959-74.171-31.959-158.12 0-84.616 31.959-158.809 31.958-74.193 87.166-129.101t129.39-86.937q74.183-32.03 158.146-32.03 84.629 0 158.841 32.017 74.211 32.018 129.107 86.905 54.897 54.886 86.919 129.086Q886.855-564.648 886.855-480q0 83.972-32.03 158.162-32.029 74.19-86.937 129.403-54.908 55.214-129.079 87.172-74.171 31.959-158.787 31.959ZM480-149.058q138.377 0 234.66-96.516Q810.942-342.089 810.942-480q0-138.377-96.282-234.66-96.283-96.282-234.74-96.282-137.79 0-234.326 96.282-96.536 96.283-96.536 234.74 0 137.79 96.516 234.326Q342.089-149.058 480-149.058ZM480-480Z"></path></svg>
                                <span> Interview Q&A</span></NavLink>
                        }
                        <NavLink to="certificate" end className="tablink">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentcolor" viewBox="0 0 32 32" height="24" width="24"><path fillRule="evenodd" d="M4 26h12v2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v10h-2V6H4v20zM16 8H6v2h10V8zM6 12h10v2H6v-2zm6 4H6v2h6v-2zm12 1 1.912 3.703 4.088.594L27 24l.771 4L24 25.75 20.229 28 21 24l-3-2.703 4.2-.594L24 17z" clipRule="evenodd"></path></svg>
                            <span> Certificate</span></NavLink>
                    </div>
                }
                <div className="tab-content">
                    <Outlet context={[courseData?.LabGuidePdf, courseData?.CourseType]} />
                </div>
            </div>
        </div>
    );
}