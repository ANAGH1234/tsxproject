
import React from 'react';
import { Link } from 'react-router-dom';
import TrainingService from '../../services/TrainingService';
import authUser from '../../helpers/authUser';
import type { QuickNoteTrackingDTO } from '../../models/training/training';
import type { InterviewQuestionDto } from '../../models/dashboard/dashboard';
import type { User } from '../../models/user/User';

interface BookActionProps {
  item: InterviewQuestionDto; 
  content: { contentId: number }; 
  isQnATextStarted: string; 
  qnATextData: { isBookSubscribed: boolean }; 
  access: boolean;
  courseid: string;
  subscriptionid: string;
}



const BookAction: React.FC<BookActionProps> = ({ item, content, isQnATextStarted, qnATextData, access, courseid, subscriptionid }) => {
  const user: User | null = authUser.Get();

  const saveTracking = (): void => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const quickNoteTrackingDTO: QuickNoteTrackingDTO = {
      id: 0, // New tracking entry
      courseId: content.contentId,
      batchId: 0, // Not provided, assume 0 or adjust based on context
      quickNoteId: item. || 0,
      userId: user.userId,
      isComplete: false,
      startDate: new Date(),
      completedDate: undefined, // Nullable
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
       
      {qnATextData.isBookSubscribed && access ? (
        item.isQnATextCompleted ? (
          <Link
            to={`/user/app/books/${courseid}/${subscriptionid}/details/${item.id}`}
            onClick={saveTracking}
            className="btn btn-success"
            style={{ lineHeight: '1' }}
            aria-label="Restart QnA Text"
          >
            Restart
          </Link>
        ) : item.isQnATextStarted ? (
          <Link
            to={`/user/app/books/${courseid}/${subscriptionid}/details/${item.id}`}
            onClick={saveTracking}
            className="btn btn-info"
            style={{ lineHeight: '1', padding: '6px' }}
            aria-label="Resume QnA Text"
          >
            Resume
          </Link>
        ) : (
          <Link
            to={`/user/app/books/${courseid}/${subscriptionid}/details/${item.id}`}
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

export default BookAction;
