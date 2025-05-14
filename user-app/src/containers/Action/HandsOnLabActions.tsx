
import React from 'react';
import { Link } from 'react-router-dom';
import type { CoursePlanDetailDTO } from '../../models/training/training';
import type { LabDTO } from '../../models/dashboard/dashboard';



interface HandsOnLabActionsProps {
  item: LabDTO;
  isLabStarted: string; 
  labData: CoursePlanDetailDTO; 
  courseid: string;
  subscriptionid: string;
  access: boolean;
}

const HandsOnLabActions: React.FC<HandsOnLabActionsProps> = ({ item, isLabStarted, labData, courseid, subscriptionid, access }) => {
  return (
    <span>
      <span style={{ fontSize: '12px' }}>
        {item.isLabCompleted ? (
          <span style={{ cursor: 'pointer', color: '#049285' }} className="ps-2">
            <i style={{ color: '#049285' }} className="fa fa-check-circle" aria-hidden="true" aria-label="Completed"></i>{' '}
            Completed
          </span>
        ) : (
          <span style={{ cursor: 'pointer' }} className="ps-2">
            {isLabStarted}
          </span>
        )}
      </span>{' '}
       
      {labData.isLabSubscribed && access ? (
        item.isLabCompleted ? (
          <Link
            to={`/user/app/training/details/${courseid}/${subscriptionid}/lab/details/${item.labId}`}
            className="btn btn-success"
            style={{ lineHeight: '1' }}
            aria-label="Restart Lab"
          >
            Restart
          </Link>
        ) : item.isLabStarted ? (
          <Link
            to={`/user/app/training/details/${courseid}/${subscriptionid}/lab/details/${item.labId}`}
            className="btn btn-info"
            style={{ lineHeight: '1', padding: '6px' }}
            aria-label="Resume Lab"
          >
            Resume
          </Link>
        ) : (
          <Link
            to={`/user/app/training/details/${courseid}/${subscriptionid}/lab/details/${item.labId}`}
            className="btn btn-primary"
            style={{ lineHeight: '1' }}
            aria-label="Start Lab"
          >
            Start
          </Link>
        )
      ) : (
        <button
          type="button"
          className="btn-sm ms-2"
          style={{ lineHeight: '1.3', backgroundColor: 'dimgrey', color: 'Linen', opacity: '1' }}
          disabled
          aria-label="Start Lab (Disabled)"
        >
          Start Now
        </button>
      )}
    </span>
  );
};

export default HandsOnLabActions;
