import React from 'react';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import type { QuickNotesDTO, CourseQuickNoteDTO } from '../../models/dashboard/dashboard';
import type { QuickNoteTrackingDTO } from '../../models/training/training';
import type { User } from '../../models/user/User';


// Define the props interface
interface QuickNoteActionsProps {
  item: QuickNotesDTO;
  content: CourseQuickNoteDTO;
  courseid: number;
  subscriptionid: number;
  quicknotesData: {
    IsQuickNoteSubscribed: boolean;
  };
  isQuickNoteStarted: boolean;
  access: boolean;
}

const QuickNoteActions: React.FC<QuickNoteActionsProps> = (props) => {
  const user: User | null = authUser.Get();

  const saveTracking = () => {
    if (!user) return;
    const quickNoteTrackingDTO: QuickNoteTrackingDTO = {
      id: 0,
      quickNoteId: props.item.quickNoteId,
      courseId: props.content.contentId,
      isComplete: false,
      userId: user.userId,
      batchId: 0,
      startDate: new Date(),
      completedDate: undefined,
    };
    TrainingService.saveQuickNoteTracking(quickNoteTrackingDTO).then(() => {
      // No action needed on success
    }).catch((err) => console.error(err));
  };

  return (
    <span>
      <span style={{ fontSize: '12px' }}>
        {props.item.isQuickNoteCompleted ? (
          <span style={{ cursor: 'pointer', color: '#049285' }} className="ps-2">
            <i style={{ color: '#049285' }} className="fa fa-check-circle" aria-hidden="true"></i> Completed
          </span>
        ) : (
          <span style={{ cursor: 'pointer' }} className="ps-2">
            {props.isQuickNoteStarted ? 'In-Progress' : 'Not Started'}
          </span>
        )}
      </span>{' '}
      {props.quicknotesData.IsQuickNoteSubscribed && props.access ? (
        props.item.isQuickNoteCompleted ? (
          <a
            onClick={saveTracking}
            href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/quicknote/details/${props.item.quickNoteId}`}
            className="btn btn-success"
            style={{ lineHeight: '1' }}
          >
            Restart
          </a>
        ) : props.item.isQuickNoteStarted ? (
          <a
            onClick={saveTracking}
            href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/quicknote/details/${props.item.quickNoteId}`}
            className="btn btn-info"
            style={{ lineHeight: '1', padding: '6px' }}
          >
            Resume
          </a>
        ) : (
          <a
            onClick={saveTracking}
            href={`/user/app/training/details/${props.courseid}/${props.subscriptionid}/quicknote/details/${props.item.quickNoteId}`}
            className="btn btn-primary"
            style={{ lineHeight: '1' }}
          >
            Start
          </a>
        )
      ) : (
        <button
          type="button"
          className="btn-sm ms-2"
          style={{ lineHeight: '1.3', backgroundColor: 'dimgrey', color: 'Linen', opacity: '1' }}
          disabled
        >
          Start Now
        </button>
      )}
    </span>
  );
};

export default QuickNoteActions;