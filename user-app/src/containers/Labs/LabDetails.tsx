import React, { useEffect, useState } from 'react'
import TrainingService from '../../services/TrainingService';
import '../../assets/css/test.css';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import type { LabDTO } from '../../models/dashboard/dashboard';

export default function LabDetails() {
    const { labid } = useParams();
    const { subscriptionid } = useParams();
    const { courseid } = useParams();
    const [labDetailData, setLabDetailData] = useState<LabDTO |any>();
const user = authUser.Get();
    useEffect(() => {
        if(!user) return
        TrainingService.getLabDetails(labid, courseid, user.userId).then(res => {
            setLabDetailData(res);
            document.title =`Lab: ${res.Name}`;
        })
    }, []);

    const saveTracking = () => {
        const labTrackingDTO = { LabId: labid, CourseId: labDetailData.ContentId, IsComplete: false, UserId:user?.userId }
       //console.log(labTrackingDTO);
        TrainingService.saveLabTracking(labTrackingDTO).then(res => { })
    }
let backHref = '';
let ref = document.referrer;
//console.log(ref);
 if(ref.includes('/courseplan/details')){
    backHref = '/user/app/courseplan/details/'+ courseid + "/" + subscriptionid + "/0";        
}
else{
    backHref = "/user/app/training/details/" + courseid + "/" + subscriptionid + "/0/labs" ;        
}
    return <div className='pt-4'>
        <div className='catinfo mb-4'>
            <div className='p-3'>
                <div className='row'>
                    <div className='col-sm-10 pt-3'>
                        <h3><i className="fa-solid fa-flask"></i> {labDetailData.Name}</h3>
                    </div>
                    <div className='col-sm-2 d-none d-sm-block'>
                        <a className="gobackicon btn btn-outline-primary" href={backHref} style={{ float: 'right', marginRight: '30px', marginTop: '4px' }} ><i className="fa fa-arrow-circle-left "></i> <span className="gobacktext">Go Back</span></a>
                    </div>
                </div>
                <div className='pt-2'>
                    <div className='row'>
                        <div className='col-sm-2 col-6'>
                            <i className="fa-solid fa-signal"></i> Level : {labDetailData.DifficultyTypeName}
                        </div>
                        <div className='d-block d-sm-none col-6'>
                            <a className="gobackicon btn btn-outline-primary" href={backHref} style={{ float: 'right', marginRight: '30px', marginTop: '-6px' }} ><i className="fa fa-arrow-circle-left "></i> <span className="gobacktext">Go Back</span></a>
                        </div>
                        <div className='col-sm-4'>
                            <span className="mentorspan"> <i className="fa-solid fa-chalkboard-user"></i> Mentor: {labDetailData.MentorName != null ? labDetailData.MentorName : 'NA'}</span>
                        </div>
                    </div>
                </div>
                <div className='pt-2'>
                    <div className='row'>
                        <div className='col-sm-2 col-8'>
                            <i className="fa-solid fa-flask"></i>  Type : {labDetailData.LabTypeName}
                        </div>
                        <div className='col-sm-2 col-4'>
                            <i className="far fa-gem"></i> Points : {labDetailData.LearningPoints}
                        </div>
                        <div className='col-sm-2'>
                            <i className="far fa-clock"></i> Duration : {labDetailData.Duration}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='tab'>
            <NavLink end to={`/user/app/training/details/${courseid}/${subscriptionid}/lab/details/${labid}`} className="tablink"><i className="fa-solid fa-list-ul"></i> <span>Lab Problem</span></NavLink>
            <NavLink end onClick={() => saveTracking()} to={`/user/app/training/details/${courseid}/${subscriptionid}/lab/details/${labid}/solution`} className="tablink"><i className="fa-solid fa-asterisk"></i> <span>Lab Solution</span></NavLink>
        </div>
        <div className='row pt-4'>
            <Outlet context={[labDetailData]}></Outlet>
        </div>
    </div>
}