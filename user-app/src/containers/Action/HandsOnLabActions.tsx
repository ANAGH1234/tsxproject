
export default function HandsOnLabActions(props:any) {
    //console.log(props);
    return (
        <span>
            <span style={{ fontSize: '12px' }}>
                {
                    props.item.IsLabCompleted == true ?
                        <span style={{ cursor: 'pointer', color: '#049285' }} className="ps-2" >
                            <i style={{ color: '#049285' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
                        </span> : <span style={{ cursor: 'pointer' }} className="ps-2">
                            {props.isLabStarted}
                        </span>
                }
            </span> &nbsp;
            {
                props.labData.IsLabSubscribed == true && props.access == true ? props.item.IsLabCompleted == true ? <a href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/lab/details/${props.item.LabId}`} className="btn btn-success" style={{ lineHeight: '1' }}>Restart</a> :
                    props.item.IsLabStarted == true ? <a href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/lab/details/${props.item.LabId}`} className="btn btn-info" style={{ lineHeight: '1', padding: '6px' }}>Resume</a> :
                        <a href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/lab/details/${props.item.LabId}`} className="btn btn-primary" style={{ lineHeight: '1' }}>Start</a> :
                    <button type="button" className="btn-sm ms-2" style={{ lineHeight: '1.3', backgroundColor: 'dimgrey !important', color: 'Linen !important', opacity: '1' }} disabled>Start Now</button>
            }
        </span>
    )
}