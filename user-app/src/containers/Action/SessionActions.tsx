import { IMAGE_ADDRESS } from '../../helpers/constant';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import { EnumCourseType } from '../../helpers/enum';


export default function SessionActions(props:any) {
    const navigate = useNavigate();
    const user = authUser.Get();
    const GoToPage = (url:any) => {
        navigate(url, { replace: true });
    }
    
    const SaveAndDownloadContent = (item:any, downloadPath:any, type:any) => {
        if(!user) return
        const ContentDownloadHistoryDTO = {CourseId : item.CourseId, ContentType : 'LiveSession('+ type +')', ContentName : item.TopicName, CourseType: EnumCourseType.Instructorled, MemberId:user.userId,MembershipId:user.membershipId};
        TrainingService.saveContentDownloadHistory(ContentDownloadHistoryDTO).then(res => { 
          window.location.href = downloadPath;           
        })
    }
    return (
        <div className='col-sm-7 col-xs-12' style={{ textAlign: 'right' }}>
            <span>
                {
                    props.item.PdfPath !== undefined && props.item.PdfPath !== null && props.item.PdfPath.length !== 0 &&
                    props.item.PdfPath.includes(IMAGE_ADDRESS) && props.sessionData.IsLiveSessionsSubscribed == true && props.sessionData.IsTrialSubscribed == false &&                    
                    <a onClick={() => SaveAndDownloadContent(props.item, props.item.PdfPath, 'PDF')} className="ms-2 btn btn-outline-danger" target="_blank" style={{ fontSize: '12px', padding: '2px 8px' }}>
                        <i className="fa-solid fa-file-arrow-down" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Download Pdf"></i>
                        &nbsp;PDF
                    </a>
                }
                {
                    props.item.PdfPath !== undefined && props.item.PdfPath !== null && props.item.PdfPath.length !== 0 &&
                    props.item.PdfPath.includes(IMAGE_ADDRESS) === false && props.sessionData.IsLiveSessionsSubscribed == true && props.sessionData.IsTrialSubscribed == false &&           
                    <a onClick={() => SaveAndDownloadContent(props.item,props.cloudPdfPath,'PDF')} className="ms-2 btn btn-outline-danger" target="_blank" style={{ fontSize: '12px', padding: '3px 7px' }}>
                        <i className="fa-solid fa-file-arrow-down" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Download Pdf"></i>
                        &nbsp;PDF
                    </a>
                }
                {
                    props.item.CodePath !== undefined && props.item.CodePath !== null && props.item.CodePath.length !== 0 &&
                    props.item.CodePath.includes(IMAGE_ADDRESS) && props.sessionData.IsLiveSessionsSubscribed == true && props.sessionData.IsTrialSubscribed == false &&                  
                    <a onClick={() => SaveAndDownloadContent(props.item, props.item.CodePath,'Code')} className="ms-2 btn btn-outline-primary" target="_blank" style={{ fontSize: '12px', padding: '4px 6px', height: '26px' }}>
                        <i className="fa-solid fa-code" aria-hidden="true" style={{ paddingRight: '2px' }} data-toggle="tooltip" data-placement="top" title="" data-original-title="Download Code"></i>
                        &nbsp;Code
                    </a>
                }
                {
                    props.item.CodePath !== undefined && props.item.CodePath !== null && props.item.CodePath.length !== 0 &&
                    props.item.CodePath.includes(IMAGE_ADDRESS) === false && props.sessionData.IsLiveSessionsSubscribed == true && props.sessionData.IsTrialSubscribed == false &&                   
                    <a onClick={() => SaveAndDownloadContent(props.item, props.cloudCodePath,'Code')} className="ms-2 btn btn-outline-primary" target="_blank" style={{ fontSize: '12px', padding: '4px 6px', height: '26px' }}>
                        <i className="fa-solid fa-code" aria-hidden="true" style={{ paddingRight: '2px' }} data-toggle="tooltip" data-placement="top" title="" data-original-title="Download Code"></i>
                        &nbsp;Code
                    </a>
                }
            </span>
            <span className="ms-2" style={{ fontSize: '12px', paddingRight: '5px' }}>
                <i className="fa-regular fa-calendar-check"></i>&nbsp;
                {moment(props.item.CreatedDate).format('ll')}
            </span>
            <span className="ms-2" style={{ fontSize: '12px' }}>
                <i className="far fa-clock" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="" data-original-title="Play Video"></i>
                &nbsp;{props.item.Duration}
            </span>
            {
                (props.item.LiveVideoProgress != null && props.item.LiveVideoProgress != undefined && props.item.LiveVideoProgress > 0 && props.item.IsVideoCompleted == true) ?
                    <span style={{ fontSize: '12px' }}>
                        <span style={{ cursor: 'pointer', color: '#009688' }} className="ps-2" >
                            <i style={{ color: '#009688' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                        </span>
                    </span> :
                    (props.item.LiveVideoProgress != null && props.item.LiveVideoProgress != undefined && props.item.LiveVideoProgress > 0 && props.item.IsVideoCompleted == false) ?
                        <span className="ms-2">
                            <div className="progress" style={{ height: '10px', display: 'inline-block', width: '100px' }}>
                                <div className="progress-bar" style={{ width: props.item.LiveVideoProgress + '%', height: '10px' }}></div>
                            </div>
                            <span style={{ fontSize: '12px' }}>{props.item.LiveVideoProgress}%</span>
                        </span> : <span style={{ fontSize: '12px' }}><span style={{ cursor: 'pointer' }} className="ps-2">
                            Not Started</span></span>
            }
            {
                props.sessionData.IsLiveSessionsSubscribed == true ?
                    props.item.LiveVideoProgress != null && props.item.LiveVideoProgress != undefined && props.item.LiveVideoProgress > 0 && props.item.IsVideoCompleted == false
                        ? <button type="button" onClick={() => GoToPage(`/user/app/videos/${props.courseid}/${props.item.BatchId}/${props.subscriptionid}/${props.item.LiveTopicId}`)} className="btn btn-info ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px' }}>Resume</button>
                        : <button type="button" onClick={() => GoToPage(`/user/app/videos/${props.courseid}/${props.item.BatchId}/${props.subscriptionid}/${props.item.LiveTopicId}`)} className="btn btn-primary ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px' }}>Start</button>
                    : <button type="button" className="btn-sm ms-2" style={{ lineHeight: '1.3', backgroundColor: 'dimgrey !important', color: 'Linen !important', opacity: '1' }} disabled>Start Now</button>
            }
        </div>
    )
}