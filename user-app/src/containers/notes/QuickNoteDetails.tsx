import React, { useEffect, useState } from 'react'
import hljs from 'highlight.js';

import TrainingService from '../../services/TrainingService';

import '../../assets/css/quicknote.css';

import { useParams, useNavigate } from 'react-router-dom';
import authUser from '../../helpers/authUser';
import Swal from 'sweetalert2';

export default function QuickNoteDetails() {
    let navigate = useNavigate();
    const { quicknoteid } = useParams();
    const { subscriptionid } = useParams();
    const { courseid } = useParams();
    const user = authUser.Get();
    const [quicknoteDetailData, setQuickNoteDetailData] = useState<any>();
    let [filterQuikcnoteData, setFilterQuikcnoteData] = useState<any>();
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
        TrainingService.getQuickNoteDetails(quicknoteid, courseid, user.userId).then(res => {
            setQuickNoteDetailData(res);
            document.title = `Quick Note: ${res.Title}`;
            highlightCode();
            setFilterQuikcnoteData(res.QuickNotePagingList?.filter((qn:any) => {
                return qn.QuickNoteId == quicknoteid;
            }))
            setPIndex(res.CurrentPageIndex);
            setTotalQN(res.TotalQuickNote);
        });
    }, []);

    const saveTracking = () => {
        Swal.fire({
            title: "",
            text: "Have you completed this Quick Note?",
            showCancelButton: true,
            confirmButtonColor: 'btn-sm btn-primary',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            icon: 'warning'
        }).then(
            function (isConfirm) {
                if (isConfirm.value) {
                    const quickNoteTrackingDTO = { QuickNoteId: quicknoteid, CourseId: quicknoteDetailData.CourseId, IsComplete: true, UserId:user?.userId }
                    TrainingService.saveQuickNoteTracking(quickNoteTrackingDTO).then(res => {
                        if (res) {
                            if(!user) return
                            Swal.fire('', `You've successfully marked it completed`, 'success');
                            TrainingService.getQuickNoteDetails(quicknoteid, courseid, user.userId).then(res => {
                                if (res != undefined) {
                                    setQuickNoteDetailData(res);
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
        setFilterQuikcnoteData(quicknoteDetailData.QuickNotePagingList.filter((qnId:any) => {
            return qnId.QuickNoteId === quicknoteid;
        }))
        pIndex = filterQuikcnoteData[0].PageIndex;
        pIndex = pIndex - 1;
        setPIndex(pIndex);
        let updatedList = quicknoteDetailData.QuickNotePagingList.filter((qnId:any) => {
            return qnId.PageIndex === pIndex;
        })
        const url = '/user/app/training/details/' + courseid + '/' + subscriptionid + '/quicknote/details/' + updatedList[0].QuickNoteId;
        window.location.href = url;
    }
    const nextQN = () => {
        setFilterQuikcnoteData(quicknoteDetailData.QuickNotePagingList.filter((qnId:any) => {
            return qnId.QuickNoteId === quicknoteid;
        }))
        pIndex = filterQuikcnoteData[0].PageIndex;
        pIndex = pIndex + 1;
        setPIndex(pIndex);
        let updatedList = quicknoteDetailData.QuickNotePagingList.filter((qnId:any) => {
            return qnId.PageIndex === pIndex;
        })
        const url = '/user/app/training/details/' + courseid + '/' + subscriptionid + '/quicknote/details/' + updatedList[0].QuickNoteId;
        window.location.href = url;
    }

    let backHref = '';
    let ref = document.referrer;
    //console.log(ref);
    if(ref.includes('/courseplan/details')){
        backHref = '/user/app/courseplan/details/'+ courseid + "/" + subscriptionid + "/0";        
    }
    else{
        backHref = "/user/app/training/details/" + courseid + "/" + subscriptionid + "/0/quicknotes" ;        
    }

    const prev = '< Prev';
    const next = 'Next >';
    return <div className='mt-2'>
        {quicknoteDetailData && <>
        <div className='catinfo mt-4 mb-4'>
            <div className='p-3'>
                <div className='row'>
                    <div className='col-sm-9 pt-3'>
                        <h1 className='h2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="28px" viewBox="0 0 16 16">
                                <path d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"></path>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"></path>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"></path>
                            </svg> {quicknoteDetailData.Title}</h1>
                    </div>
                    <div className='col-sm-3 d-none d-sm-block' style={{ paddingTop: '5px' }}>
                        <a className="gobackicon btn btn-outline-primary" href={backHref} ><i className="fa fa-arrow-circle-left "></i> <span className="gobacktext">Go Back</span></a>
                        {
                            (quicknoteDetailData != null && quicknoteDetailData.IsQuickNoteCompleted) ?
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
                            <i className="fa-solid fa-signal"></i> Level : {quicknoteDetailData.DifficultyTypeName}
                        </div>
                        <div className='d-block d-sm-none col-6'>
                            <a className="gobackicon btn btn-outline-primary" href={"/user/app/training/details/" + courseid + "/" + subscriptionid + "/0/quicknotes"} style={{ float: 'right', marginRight: '6px', marginTop: '-6px' }} ><i className="fa fa-arrow-circle-left "></i> <span className="gobacktext">Go Back</span>
                            </a>
                        </div>
                        <div className='col-sm-4 col-12'>
                            <span className="mentorspan"> <i className="fa-solid fa-chalkboard-user"></i> Mentor: {quicknoteDetailData.MentorName != null ? quicknoteDetailData.MentorName : 'NA'}</span>
                        </div>
                        <div className='col-sm-2 col-6'>
                            <i className="far fa-clock"></i> Duration : {quicknoteDetailData.Duration}
                        </div>
                        <div className='d-block d-sm-none col-6'>
                            {
                                (quicknoteDetailData != null && quicknoteDetailData.IsQuickNoteCompleted) ?
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
            <div className='box-shadow p-3' dangerouslySetInnerHTML={{ __html: quicknoteDetailData.Description }}></div>
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
                (quicknoteDetailData != null && quicknoteDetailData.IsQuickNoteCompleted) ?
                    <span style={{ color: 'green', fontSize: '14px' }} className="ps-2" >
                        <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                    </span>

                    : <a onClick={() => saveTracking()} className="btn-sm btn-primary ms-2" style={{ padding: '9px 20px', cursor: 'pointer' }}>I've Finished</a>
            }

        </div>
        </>}
    </div>
}