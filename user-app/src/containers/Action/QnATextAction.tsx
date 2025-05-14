
import React from 'react';
import { Link } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import type { QuickNoteTrackingDTO, CoursePlanDetailDTO } from '../../models/training/training';
import type { InterviewQuestionDto } from '../../models/dashboard/dashboard';

// Define props interface
interface QnATextActionProps {
  item: InterviewQuestionDto; // id may be number | null
  content: { contentId: number };
  isQnATextStarted: string; // e.g., "In-Progress" or "Not Started"
  qnATextData: CoursePlanDetailDTO; // Contains isQnASubscribed
  courseid: string;
  subscriptionid: string;
  access: boolean;
}

// Define User interface (minimal)
interface User {
  userId: number;
}

const QnATextAction: React.FC<QnATextActionProps> = ({ item, content, isQnATextStarted, qnATextData, courseid, subscriptionid, access }) => {
  const user: User | null = authUser.Get();

  const saveTracking = (): void => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    if (item.id === null) {
      console.error('QnA text ID is null');
      return;
    }

    const quickNoteTrackingDTO: QuickNoteTrackingDTO = {
      id: 0, // New tracking entry
      courseId: content.contentId,
      batchId: 0, // Not provided, assume 0
      quickNoteId: item.id, // Type-safe: item.id is number here
      userId: user.userId,
      isComplete: false,
      startDate: new Date(),
      completedDate: undefined,
    };

    TrainingService.saveQnATextTracking(quickNoteTrackingDTO)
      .then((res) => {
        console.log('Tracking saved:', res);
      })
      .catch((err) => {
        console.error('Error saving QnA text tracking:', err);
      });
  };

  if (!user) {
    return <span className="text-danger">Please log in to access this content</span>;
  }

  return (
    <span>
      <span style={{ fontSize: '12px' }}>
        {item.isQnATextCompleted ? (
          <span style={{ cursor: 'pointer', color: '#049285' }} className="ps-2">
            <i style={{ color: '#049285' }} className="fa fa-check-circle" aria-hidden="true" aria-label="Completed"></i>{' '}
            Completed
          </span>
        ) : (
          <span style={{ cursor: 'pointer' }} className="ps-2">
            {isQnATextStarted}
          </span>
        )}
      </span>{' '}
       
      {qnATextData.isQnASubscribed && access ? (
        item.isQnATextCompleted ? (
          <Link
            to={`/user/app/training/details/${courseid}/${subscriptionid}/qnatext/details/${item.id}`}
            onClick={saveTracking}
            className="btn btn-success"
            style={{ lineHeight: '1' }}
            aria-label="Restart QnA Text"
          >
            Restart
          </Link>
        ) : item.isQnATextStarted ? (
          <Link
            to={`/user/app/training/details/${courseid}/${subscriptionid}/qnatext/details/${item.id}`}
            onClick={saveTracking}
            className="btn btn-info"
            style={{ lineHeight: '1', padding: '6px' }}
            aria-label="Resume QnA Text"
          >
            Resume
          </Link>
        ) : (
          <Link
            to={`/user/app/training/details/${courseid}/${subscriptionid}/qnatext/details/${item.id}`}
            onClick={saveTracking}
            className="btn btn-primary"
            style={{ lineHeight: '1' }}
            aria-label="Start QnA Text"
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
          aria-label="Start QnA Text (Disabled)"
        >
          Start Now
        </button>
      )}
    </span>
  );
};

export default QnATextAction;
