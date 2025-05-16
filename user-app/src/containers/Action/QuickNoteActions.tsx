import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';

export default function QuickNoteActions(props:any) {
    const user = authUser.Get();
    console.log(props);
    const saveTracking = () => {
        const quickNoteTrackingDTO = { QuickNoteId: props.item.QuickNoteId, CourseId: props.content.ContentId, IsComplete: false, UserId:user?.userId }
        // TrainingService.saveQuickNoteTracking(quickNoteTrackingDTO).then(res => { })
    }
    return (
        <span>
            <span style={{ fontSize: '12px' }}>
                {
                    props.item.IsQuickNoteCompleted == true ?
                        <span style={{ cursor: 'pointer', color: '#049285' }} className="ps-2" >
                            <i style={{ color: '#049285' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                        </span> : <span style={{ cursor: 'pointer' }} className="ps-2">
                            {props.isQuickNoteStarted}
                        </span>
                }
            </span> &nbsp;
            {
                props.quicknotesData.IsQuickNoteSubscribed == true && props.access == true ? props.item.IsQuickNoteCompleted == true ? <a onClick={() => saveTracking()} href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/quicknote/details/${props.item.QuickNoteId}`} className="btn btn-success" style={{ lineHeight: '1' }}>Restart</a> :
                    props.item.IsQuickNoteStarted == true ? <a onClick={() => saveTracking()} href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/quicknote/details/${props.item.QuickNoteId}`} className="btn btn-info" style={{ lineHeight: '1', padding: '6px' }}>Resume</a> :
                        <a onClick={() => saveTracking()} href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/quicknote/details/${props.item.QuickNoteId}`} className="btn btn-primary" style={{ lineHeight: '1' }}>Start</a> :
                    <button type="button" className="btn-sm ms-2" style={{ lineHeight: '1.3', backgroundColor: 'dimgrey !important', color: 'Linen !important', opacity: '1' }} disabled>Start Now</button>
            }
        </span>
    )
}