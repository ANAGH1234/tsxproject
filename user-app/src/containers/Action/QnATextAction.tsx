import React from 'react'
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';

export default function QnATextAction(props:any) {
    const user = authUser.Get();
    //console.log(props);
    const saveTracking = () => {
        if(!user) return
        const quickNoteTrackingDTO = { QuickNoteId: props.item.Id, CourseId: props.content.ContentId, IsComplete: false, UserId:user.userId }
        //TrainingService.saveQnATextTracking(quickNoteTrackingDTO).then(res => { })
    }
    return (
        <span>
            <span style={{ fontSize: '12px' }}>
                {
                    props.item.IsQnATextCompleted == true ?
                        <span style={{ cursor: 'pointer', color: '#049285' }} className="ps-2" >
                            <i style={{ color: '#049285' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                        </span> : <span style={{ cursor: 'pointer' }} className="ps-2">
                            {props.isQnATextStarted}
                        </span>
                }
            </span> &nbsp;
            {
                props.qnATextData.IsQnASubscribed == true && props.access == true ? props.item.IsQnATextCompleted == true ? <a onClick={() => saveTracking()} href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/qnatext/details/${props.item.Id}`} className="btn btn-success" style={{ lineHeight: '1' }}>Restart</a> :
                    props.item.IsQnATextStarted == true ? <a onClick={() => saveTracking()} href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/qnatext/details/${props.item.Id}`} className="btn btn-info" style={{ lineHeight: '1', padding: '6px' }}>Resume</a> :
                        <a onClick={() => saveTracking()} href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/qnatext/details/${props.item.Id}`} className="btn btn-primary" style={{ lineHeight: '1' }}>Start</a> :
                    <button type="button" className="btn-sm ms-2" style={{ lineHeight: '1.3', backgroundColor: 'dimgrey !important', color: 'Linen !important', opacity: '1' }} disabled>Start Now</button>
            }
        </span>
    )
}