import { IMAGE_ADDRESS } from '../../helpers/constant';
import { useNavigate } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';

export default function VideoActions(props: any) {
    const navigate = useNavigate();
    const user = authUser.Get();
    const GoToPage = (url: any) => {
        navigate(url, { replace: true });
    }
    const SaveAndDownloadContent = (item: any, downloadPath: any, type: any, courseid: any, topicid: any, coursetype: any) => {
        let cType = 2;
        let contentType = 'VideoCourse';
        if (coursetype == 'selfplaced') {
            cType = 2;
            contentType = 'VideoCourse';
        }
        else if (coursetype == 'qna') {
            cType = 10;
            contentType = 'Interview Q&A';
        }
        else if (coursetype == 'project') {
            cType = 7;
            contentType = 'Project';
        }
        if (!user) return
        const ContentDownloadHistoryDTO = { CourseId: courseid, TopicId: topicid, SubTopicId: item.SubTopicId, ContentType: contentType + '(' + type + ')', ContentName: item.SubTopicName, CourseType: cType, MemberId: user.userId, MembershipId: user.membershipId };
        TrainingService.saveContentDownloadHistory(ContentDownloadHistoryDTO).then(res => {
            window.location.href = downloadPath;
        })
    }
    return (
        <span>
            <span style={{ fontSize: '12px', paddingTop: '8px', display: 'inline-block' }}>
                {
                    props.subTopic.PdfPath !== undefined && props.subTopic.PdfPath !== null && props.subTopic.PdfPath.length !== 0 &&
                    props.subTopic.PdfPath.includes(IMAGE_ADDRESS) && props.IsSubscribed == true && props.isFreeTrial == false && props.subTopic.Access == true &&
                    <a onClick={() => SaveAndDownloadContent(props.subTopic, props.subTopic.PdfPath, 'PDF', props.course.CourseContentId, props.topic.TopicId, props.selfplaced)} target="_blank" style={{ color: '#d21507', padding: '0 10px 0 0', cursor: 'pointer' }}>
                        <i className="fas fa-file-pdf" aria-hidden="true" style={{ paddingRight: '2px', color: '#d21507' }}></i>
                        &nbsp;Pdf &nbsp;
                    </a>
                }
                {
                    props.subTopic.PdfPath !== undefined && props.subTopic.PdfPath !== null && props.subTopic.PdfPath.length !== 0 &&
                    props.subTopic.PdfPath.includes(IMAGE_ADDRESS) === false && props.IsSubscribed == true && props.isFreeTrial == false && props.subTopic.Access == true &&
                    <a onClick={() => SaveAndDownloadContent(props.subTopic, props.cloudPdfPath, 'PDF', props.course.CourseContentId, props.topic.TopicId, props.selfplaced)} target="_blank" style={{ color: '#d21507', padding: '0 10px 0 0', cursor: 'pointer' }}>
                        <i className="fas fa-file-pdf" aria-hidden="true" style={{ paddingRight: '2px', color: '#d21507' }}></i>
                        &nbsp;Pdf &nbsp;
                    </a>
                }
                {
                    props.subTopic.CodePath !== undefined && props.subTopic.CodePath !== null && props.subTopic.CodePath.length !== 0 &&
                    props.subTopic.CodePath.includes(IMAGE_ADDRESS) && props.IsSubscribed == true && props.isFreeTrial == false && props.subTopic.Access == true &&
                    <a onClick={() => SaveAndDownloadContent(props.subTopic, props.subTopic.CodePath, 'Code', props.course.CourseContentId, props.topic.TopicId, props.selfplaced)} target="_blank" style={{ fontSize: '12px', padding: '0 10px 0 0', cursor: 'pointer' }}>
                        <i className="fa fa-file-code" aria-hidden="true" style={{ paddingRight: '2px' }} ></i>
                        &nbsp;Code
                    </a>
                }
                {
                    props.subTopic.CodePath !== undefined && props.subTopic.CodePath !== null && props.subTopic.CodePath.length !== 0 &&
                    props.subTopic.CodePath.includes(IMAGE_ADDRESS) === false && props.IsSubscribed == true && props.isFreeTrial == false && props.subTopic.Access == true &&
                    <a onClick={() => SaveAndDownloadContent(props.subTopic, props.cloudCodePath, 'Code', props.course.CourseContentId, props.topic.TopicId, props.selfplaced)} target="_blank" style={{ fontSize: '12px', padding: '0 10px 0 0', cursor: 'pointer' }}>
                        <i className="fa fa-file-code" aria-hidden="true" style={{ paddingRight: '2px' }}></i>
                        &nbsp;Code
                    </a>
                }
            </span>
            <span className='ms-2' style={{ fontSize: '12px' }}>
                <i className="far fa-clock" aria-hidden="true"></i>
                &nbsp;{props.subTopic.Duration}
            </span>
            {
                (props.subTopic.SelfPlacedVideoProgress != null && props.subTopic.SelfPlacedVideoProgress != undefined && props.subTopic.SelfPlacedVideoProgress > 0 && props.subTopic.IsVideoCompleted == true) ?
                    <span style={{ fontSize: '12px' }}>
                        <span style={{ cursor: 'pointer', color: 'green' }} className="ps-2" >
                            <i style={{ color: 'green' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                        </span>
                    </span> :
                    (props.subTopic.SelfPlacedVideoProgress != null && props.subTopic.SelfPlacedVideoProgress != undefined && props.subTopic.SelfPlacedVideoProgress > 0 && props.subTopic.IsVideoCompleted == false) ?
                        <span className="ms-2">
                            <div className="progress" style={{ height: '10px', display: 'inline-block', width: '100px' }}>
                                <div className="progress-bar" style={{ width: props.subTopic.SelfPlacedVideoProgress + '%', height: '10px' }}></div>
                            </div>
                            <span style={{ fontSize: '12px' }}>{props.subTopic.SelfPlacedVideoProgress}%</span>
                        </span> : <span style={{ fontSize: '12px' }}><span style={{ cursor: 'pointer' }} className="ps-2">
                            Not Started</span></span>
            }
            {
                props.IsSubscribed == true && props.subTopic.Access == true ?
                    props.subTopic.SelfPlacedVideoProgress != null && props.subTopic.SelfPlacedVideoProgress != undefined && props.subTopic.SelfPlacedVideoProgress > 0 && props.subTopic.IsVideoCompleted == false
                        ? <button type="button" onClick={() => GoToPage(`/user/app/videos/${props.selfplaced}/${props.courseid}/${props.batchid}/${props.subscriptionid}/${props.topic.TopicId}/${props.subTopic.SubTopicId}/${props.course.CourseContentId}`)} className="btn btn-info ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px' }}>Resume</button>
                        : props.subTopic.IsVideoCompleted == true
                            ? <button type="button" onClick={() => GoToPage(`/user/app/videos/${props.selfplaced}/${props.courseid}/${props.batchid}/${props.subscriptionid}/${props.topic.TopicId}/${props.subTopic.SubTopicId}/${props.course.CourseContentId}`)} className="btn-sm btn-success ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px 10px' }}>Rewatch</button>
                            : <button type="button" onClick={() => GoToPage(`/user/app/videos/${props.selfplaced}/${props.courseid}/${props.batchid}/${props.subscriptionid}/${props.topic.TopicId}/${props.subTopic.SubTopicId}/${props.course.CourseContentId}`)} className="btn-sm btn-primary ms-2" style={{ lineHeight: '1', width: '70px', padding: '6px 20px' }}>Start</button>
                    : <button type="button" className="btn-sm ms-2" style={{ lineHeight: '1.3', backgroundColor: 'dimgrey !important', color: 'Linen !important', opacity: '1' }} disabled>Start Now</button>
            }
        </span>
    )
}