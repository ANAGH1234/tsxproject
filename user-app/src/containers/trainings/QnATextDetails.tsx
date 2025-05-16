import React, { useEffect, useState } from 'react'
import hljs from 'highlight.js';

import TrainingService from '../../services/TrainingService';

import '../../assets/css/quicknote.css';

import { useParams, useNavigate } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import Swal from 'sweetalert2';

export default function QnATextDetails() {
    let navigate = useNavigate();
    const { id } = useParams();
    const { subscriptionid } = useParams();
    const { courseid } = useParams();
    const user = authUser.Get();
    const [qnATextDetailData, setQnATextDetailData] = useState<any>();
    let [filterQnATextData, setFilterQnATextData] = useState([]);
    let [pIndex, setPIndex] = useState<any>();
    let [totalQN, setTotalQN] = useState<any>();
    const highlightCode = () => {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((block:any) => {
            hljs.highlightBlock(block);
        });
    };

    useEffect(() => {
        if(!user) return
        TrainingService.getQnATextDetails(id, courseid, user.userId).then(res => {
            setQnATextDetailData(res);
            document.title = `QnA Text: ${res.Title}`;
            highlightCode();
            setFilterQnATextData(res.QnATextPagingList.filter((qn:any) => {
                return qn.Id == id;
            }))
            setPIndex(res.CurrentPageIndex);
            setTotalQN(res.TotalQuickNote);
        });
    }, []);

    const saveTracking = () => {
        Swal.fire({
            title: "",
            text: "Have you completed this QnA Text?",
            showCancelButton: true,
            confirmButtonColor: 'btn-sm btn-primary',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            icon: 'warning'
        }).then(
            function (isConfirm) {
                if (isConfirm.value) {
                    const quickNoteTrackingDTO = { QuickNoteId: id, CourseId: qnATextDetailData.CourseId, IsComplete: true, UserId:user?.userId }
                    TrainingService.saveQnATextTracking(quickNoteTrackingDTO).then(res => {
                        if (res) {
                            if(!user) return
                            Swal.fire('', `You've successfully marked it completed`, 'success');
                            TrainingService.getQnATextDetails(id, courseid, user.userId).then(res => {
                                if (res != undefined) {
                                    setQnATextDetailData(res);
                                }
                            });
                        }
                    })
                }
                else {
                    //return false;
                }
            });
    }
    const prevQN = () => {
        const filteredData = qnATextDetailData.QnATextPagingList.filter((qnId:any) => qnId.Id === id);
        if (filteredData.length > 0) {
            let pIndex = filteredData[0].PageIndex - 1;
            setPIndex(pIndex);
    
            const updatedList = qnATextDetailData.QnATextPagingList.filter((qnId:any) => qnId.PageIndex === pIndex);
            if (updatedList.length > 0) {
                const url = `/user/app/training/details/${courseid}/${subscriptionid}/qnatext/details/${updatedList[0].Id}`;
                window.location.href = url;
            } else {
                console.warn("Previous question not found!");
            }
        } else {
            console.warn("Current question not found!");
        }
    }
    
    const nextQN = () => {
        const filteredData = qnATextDetailData.QnATextPagingList.filter((qnId:any) => qnId.Id === id);
        if (filteredData.length > 0) {
            let pIndex = filteredData[0].PageIndex + 1;
            setPIndex(pIndex);
    
            const updatedList = qnATextDetailData.QnATextPagingList.filter((qnId:any) => qnId.PageIndex === pIndex);
            if (updatedList.length > 0) {
                const url = `/user/app/training/details/${courseid}/${subscriptionid}/qnatext/details/${updatedList[0].Id}`;
                window.location.href = url;
            } else {
                console.warn("Next question not found!");
            }
        } else {
            console.warn("Current question not found!");
        }
    }
    

    let backHref = '';
    let ref = document.referrer;
    //console.log(ref);
    if(ref.includes('/courseplan/details')){
        backHref = '/user/app/courseplan/details/'+ courseid + "/" + subscriptionid + "/0";        
    }
    else{
        backHref = "/user/app/training/details/" + courseid + "/" + subscriptionid + "/0/qna/text" ;        
    }

    const prev = '< Prev';
    const next = 'Next >';
    return <div className='mt-2'>
        <div className='catinfo mt-4 mb-4'>
            <div className='p-3'>
                <div className='row'>
                    <div className='col-sm-9 pt-3'>
                        <h1 className='h2'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-240q21 0 35.5-14.5T530-290q0-21-14.5-35.5T480-340q-21 0-35.5 14.5T430-290q0 21 14.5 35.5T480-240Zm-36-154h74q0-36 8-53t34-43q35-35 49.5-58.5T624-602q0-53-36-85.5T491-720q-55 0-93.5 27T344-618l66 26q7-27 28-43.5t49-16.5q27 0 45 14.5t18 38.5q0 17-11 36t-37 42q-33 29-45.5 55.5T444-394ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"></path></svg> {qnATextDetailData.Title}</h1>
                    </div>
                    <div className='col-sm-3 d-none d-sm-block' style={{ paddingTop: '5px' }}>
                        <a className="gobackicon btn btn-outline-primary" href={backHref} ><i className="fa fa-arrow-circle-left "></i> <span className="gobacktext">Go Back</span></a>
                        {
                            (qnATextDetailData != null && qnATextDetailData.IsQnATextCompleted) ?
                                <span style={{ color: 'green', fontSize: '14px' }} className="ps-2" >
                                    <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                                </span>

                                : <a onClick={() => saveTracking()} className="btn-sm btn-primary ms-2" style={{ padding: '11px', cursor: 'pointer' }}>I've Finished</a>
                        }
                    </div>

                </div>
                <div className='pt-2'>
                    <div className='row'>
                        <div className='col-sm-2 col-6'>
                            <i className="fa-solid fa-signal"></i> Level : {qnATextDetailData.DifficultyTypeName}
                        </div>
                        <div className='d-block d-sm-none col-6'>
                            <a className="gobackicon btn btn-outline-primary" href={"/user/app/training/details/" + courseid + "/" + subscriptionid + "/0/qna/text"} style={{ float: 'right', marginRight: '6px', marginTop: '-6px' }} ><i className="fa fa-arrow-circle-left "></i> <span className="gobacktext">Go Back</span>
                            </a>
                        </div>
                        <div className='col-sm-4 col-12'>
                            <span className="mentorspan"> <i className="fa-solid fa-chalkboard-user"></i> Mentor: {qnATextDetailData.MentorName != null ? qnATextDetailData.MentorName : 'NA'}</span>
                        </div>
                        <div className='col-sm-2 col-6'>
                            <i className="far fa-clock"></i> Duration : {qnATextDetailData.Duration}
                        </div>
                        <div className='d-block d-sm-none col-6'>
                            {
                                (qnATextDetailData != null && qnATextDetailData.IsQnATextCompleted) ?
                                    <span style={{ color: 'green', fontSize: '14px', float: 'right' }} className="ps-2" >
                                        <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                                    </span> : <a onClick={() => saveTracking()} className="btn-sm btn-primary ms-2" style={{ padding: '11px', cursor: 'pointer', float: 'right', marginRight: '6px', marginTop: '-6px' }}>I've Finished</a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='quicknote'>
            <div className='box-shadow p-3' dangerouslySetInnerHTML={{ __html: qnATextDetailData.Description }}></div>
        </div>
        <div style={{ textAlign: 'center' }}>
            {
                pIndex > 1 &&
                <button type="button" onClick={() => prevQN()} className="btn-sm btn-primary ms-2" style={{padding: '6px 20px' }}>{prev}</button>
            }
            {
                pIndex < totalQN &&
                <button type="button" onClick={() => nextQN()} className="btn-sm btn-primary ms-2" style={{padding: '6px 20px' }}>{next}</button>
            }
            {
                (qnATextDetailData != null && qnATextDetailData.IsQnATextCompleted) ?
                    <span style={{ color: 'green', fontSize: '14px' }} className="ps-2" >
                        <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                    </span>

                    : <a onClick={() => saveTracking()} className="btn-sm btn-primary ms-2" style={{ padding: '9px 20px', cursor: 'pointer' }}>I've Finished</a>
            }

        </div>
    </div>
}