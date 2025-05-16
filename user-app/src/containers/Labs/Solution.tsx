import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";

import TrainingService from '../../services/TrainingService';
import PDFViewer from './PDFViewer';
import authUser from '../../helpers/authUser';
import Swal from 'sweetalert2';
import type { LabDTO } from '../../models/dashboard/dashboard';

export default function Solution() {
    const { labid } = useParams();
    const { courseid } = useParams();
    const [labDetailData] = useOutletContext<any>();
    const [lab, setlab] = useState<LabDTO>();
    const user = authUser.Get();

    useEffect(() => {
        //loading adobe document service
        let documentService = 'https://documentservices.adobe.com/view-sdk/viewer.js';
        let script = document.createElement('script');
        script.src = documentService;
        document.body.appendChild(script);

        setlab(labDetailData);
        return () => {
            document.body.removeChild(script);
        }
    }, [])

    const saveLabTracking = () => {
        Swal.fire({
            title: "",
            text: "Have you completed this lab?",
            showCancelButton: true,
            confirmButtonColor: 'btn-sm btn-primary',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            icon: 'warning'
        }).then(
            function (isConfirm) {
                if(!user) return
                if (isConfirm.value) {
                    const labTrackingDTO = { LabId: labid, CourseId: labDetailData.ContentId, IsComplete: true, UserId: user.userId }
                    TrainingService.saveLabTracking(labTrackingDTO).then(res => {
                        if (res) {
                            Swal.fire('', `You've successfully marked it completed`, 'success');
                            TrainingService.getLabDetails(labid, courseid, user.userId).then(res => {
                                if (res != undefined) {
                                    setlab(res);
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
    return (
        <>
            <div style={{ height: 'calc(100vh + 150px)' }}>
                <div style={{ float: 'right', marginBottom: '10px' }}>
                    <div style={{ paddingLeft: '80px' }}>
                        {
                            (lab != null && lab.IsLabCompleted) ?
                                <span style={{ color: 'green', fontSize: '14px' }} className="ps-2" >
                                    <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                                </span>

                                : <a onClick={() => saveLabTracking()} className="btn-sm btn-primary ms-2" style={{ padding: '8px', cursor: 'pointer' }}>I've Finished</a>
                        }
                    </div>
                </div>
                <div className="container fixed-top-lab">
                    <div className='row'>
                        <div className='col-sm-12 col-xs-12'>
                            <h3 style={{ fontSize: '20px', paddingTop: '5px', height: '33px' }}><i className="fa-solid fa-asterisk" /> Lab Solution</h3>
                        </div>
                    </div>
                </div>
                {
                    labDetailData.SolutionPdf != undefined && <PDFViewer SolutionPdf={labDetailData.SolutionPdf} />
                }
            </div>
        </>
    )
}
